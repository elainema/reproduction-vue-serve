<template>
    <div :class="loadingZone ? 'ajax_loading' : '' ">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li><router-link to="./p_offers">Offers</router-link></li>
                <li class="active">Rotate Group</li>
            </ul>
        </div>
        <div class="box">
            <div class="box-header" v-box-action-resize>
                <h2>Rotate Group</h2>
                <div class="box-action">
                    <span class="icon-chevron-up" title="Fold"></span>
                    <span class="icon-chevron-down hide" title="Unfold"></span>
                </div>
            </div>
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <div class="box-content">
                    <form ref="filterForm">
                        <offer-group-filter-form :currentPage="currentPage" :pageLimit="pageLimit" :list_offers="list_offers" :renderFilter="renderFilter" :groupChosen="groupChosen"  :renderCallback="renderCallback" :showAlert="showAlert" :sort_by_group="sortFilter.group_id"></offer-group-filter-form>
                    </form>
                    <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                    <div class="overflow_scroll">
                        <table class="table table-hover tablesorter tbl-fixed list-table"  id="offer_list" >
                            <colgroup>
                                <col width="50" />
                                <col width="60" />
                                <col width="380" />
                                <col class="180" />
                                <col width="180" />
                                <col width="60" />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="check_all" v-model="toggleAll" @click="selectchange"/>
                                </th>
                                <th :class="sorting('offer_id')" data-sort="offer_id" @click="sortOffer('offer_id')">ID</th>
                                <th :class="sorting('name')" data-sort="name" @click="sortOffer('name')">Offer</th>
                                <th >Group</th>
                                <th>Status</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody id="cp_list" ref="cp_list">
                            <tr v-if="offersData.length == 0 && renderTable"><td colspan="15"><strong>No Results Found.</strong></td></tr>
                            <tr v-else :data-id="item.offer_id" :class="isActive(item)" v-for="(item,index ) in offersData">
                                <td v-if="userInfo.role_id != 14" :class="search_offer == item.offer_id ? ' highlight' : ''">
                                    <input type="checkbox" :value="item.offer_id" v-model="selected_id" name="id[]" class="check-box" />
                                </td>
                                <td v-else :class="search_offer == item.offer_id ? ' highlight' : ''"></td>
                                <td :class="search_offer == item.offer_id ? ' highlight' : ''">
                                    <a class="offer_wrap" :href="'p_manage_offer?id=' + item.offer_id" target="_blank">{{ item.offer_id }}</a>
                                </td>
                                <td :class="search_offer == item.offer_id ? ' highlight' : ''">
                                    <a class="offer_wrap" :href="'p_manage_offer?id=' + item.offer_id" target="_blank"><strong>{{ item.name }}</strong>
                                    </a>
                                </td>
                                <td>{{item.group_name}}</td>

                                <td :class="'no-wrap capt ' + item.status + (search_offer == item.offer_id ? ' highlight' : '')">
                                    {{ item.status }}
                                </td>
                                <td class="bd_show">
                                    <a  href="#" v-if="item.smartgroup_id != ''" class="pointer " @click.prevent="onConfirm(item.offer_id,item.smartgroup_id)">Remove</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table id="table2excel" class="hidden">

                        </table>
                    </div>
                    <pagination :pageLimit="pageLimit"　:page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <div id="hidden_sort" :data-sort="key">
            <input type="hidden" name="sort" :value="key" />
            <input type="hidden" name="dir" :value="sort_dir" />
        </div>

        <!-- <confirmModal ref="removeComfirm"  :modalState="modalState" :hideModal="hideModal" :onConfirm="removeOffer" :editable_modal_body="modalBody"></confirmModal> -->
        <modal 
          :dialogVisible.sync="modalState" 
          :dialogBody="modalBody" 
          :title="'Confirm'"
          :onConfirm="removeOffer">
        </modal>

        <!-- offerAddRemoteGroup未找到展示模态框的地方：offerAddRemoteGroup='show'
            <addRotateGroupModal :modalState="offerAddRemoteGroup" :hideModal="hideModal" :param_id="'ids'" :showAlert="showAlert" :onSuccess="onSetStatusSuccess" :selected_id="selected_id.join(',')"></addRotateGroupModal> -->
    </div>
</template>
<script>
    import OfferGroupFilterForm from '../components/offer-group-filter-form/'

    const AlertPop = () => import(
        /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/'
        );

    const pagination = () => import(
        /* webpackChunkName: "pagination" */ '@/components/Pagination.vue'
        );
    const Modal = () => import(
    /* webpackChunkName: "Modal" */ '@/components/common/modal/'
    );
    import confirmModal  from "@/components/ConfirmModal.vue"
    import mixin_alert_msg from '@/mixins/alert_msg'

    import commonDataAPI from '@/api/commonData'
    let EventProxy = require('eventproxy');
    let ep = new EventProxy()

    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                loadingZone: false,
                offersData: [],
                currentPage: 1,
                pageLimit: 20,
                dataPage:false,
                selected_id:[],
                offerAddRemoteGroup:'hide',
                alertMsg:"",
                alertType:"info",
                alertPop:"hide",
                title: '',
                'data-sort-dir':'asc',
                key: 'offerID',
                sort_dir: '',
                offer_id: '',
                search_offer:'',
                renderTable:false,
                renderFilter:false,
                groupChosen:[],
                renderOffer:false,
                sortFilter:{
                    group_id:[]
                },
                toggleAll :false,
                showConfirmModal:{default:true},
                modalBody:"Are you sure to delete this offer from this group？\n",
                modalState: "hide",
                group_id:""
            }
        },
        mixins: [mixin_alert_msg],
        components: {
            OfferGroupFilterForm,pagination,AlertPop,Modal
        },
        watch:{
            selected_id() {
                this.toggleAll = this.offersData.length > 0 && (this.selected_id.length == this.offersData.length)
            }
        },
        computed: {
            userInfo(){
                return this.$store.state.app.userInfo
            },
        },
        methods:{

            showModal() {

            },
            renderCallback(page_limit, current_page) {
                if (page_limit) {
                    this.pageLimit = page_limit
                }
                if (current_page) {
                    this.currentPage = current_page
                }
            },
            selectchange (e) {
                var selectall = e.target.checked
                this.toggleAll = selectall
                if (selectall) {
                    this.selected_id = []
                    for (var i = 0; i < this.offersData.length; i++) {
                        this.selected_id.push(this.offersData[i].offer_id)
                    }
                } else {
                    this.selected_id = []
                }
            },
            sorting(type){
                if (type == this.key) {
                    return 'tl-left sorting ' + this.key
                } else {
                    return 'sorting'
                }
            },
            sortOffer(type, dir) {
                var _this = $(this);
                var _key = type;
                var _sort = $('#hidden_sort'); //点击的排序字段
                var _sort_key = this.key;     //上次点击的排序字段
                var _class = 'asc';

                var sort_dir = dir || "asc"  //排序类型asc or desc

                if (_key != '') {
                    if (_key != _sort_key) {
                        this.key = type
                        this.sort_dir = sort_dir
                    } else {
                        var dir = this.sort_dir
                        if (dir == 'ASC') {
                            this.sort_dir = 'DESC';
                            _class = 'desc';
                        } else {
                            this.sort_dir= 'ASC';
                        }
                    }
                    this.list_offers()
                }
            },
            onSetStatusSuccess(params) {
                this.$nextTick(function(){
                    this.list_offers()
                })
            },
            hideModal () {
                this.offerAddRemoteGroup = 'hide'
                this.modalState = "hide"
            },
            hideAlertPop() {
                this.alertPop = "hide"
            },
            curPage() {
                return this.$store.state.offer_all.page
            },
            pagLimit() {
                return this.$store.state.offer_all.limit
            },
            onChangePage(page){
                this.currentPage = page;

                this.$nextTick(function(){
                    this.list_offers()
                })
            },
            onChangeLimit(limit){
                this.pageLimit = limit;
                this.currentPage = 1;
                this.$nextTick(function(){
                    this.list_offers()
                })
            },
            parseFloat (number){
                return parseFloat(number)
            },
            isActive(item) {
                if (this.selected_id.indexOf(item.offer_id) > 0 || this.toggleAll) {
                    return ' active';
                } else {
                    return ''
                }
            },
            getFormQuery() {
                var queryData = $(this.$refs.filterForm).serialize() + "&limit=" + this.pageLimit + "&page=" + this.currentPage
                if (this.key != "offerID") {
                    queryData += '&sort='+ this.key + '&dir=' + this.sort_dir
                }
                return queryData;
            },
            list_offers(type, id) {
                let that = this
                that.loadingZone = true
                this.selected_id = []

                var params = that.getFormQuery()
                if (type != 'init' && type !== 'search_offer') {
                    window.location.hash = params
                }

                if (type == 'search_offer') {
                    var id = $.trim($('.offer_id').val())
                    if($('[data-id="'+id+'"]').length || _.find(that.offersData,{offer_id: parseInt(id)})) {
                        that.showAlert('The offer has existed!.', "info")
                        that.loadingZone = ""
                        return
                    }
                    params = 'q=' +　'id:' + id
                    that.$nextTick(function() {
                        that.$http.get('Offer2/getAllOffers?' + params)
                            .then(response => {
                                that.loadingZone = ""
                                that.renderTable = true;
                                if(response.body.data &&　response.body.data.list.length == 0){
                                    that.showAlert("The offer doesn't existed!.", "info")
                                    that.loadingZone = ""
                                    return;
                                }
                                that.offersData.unshift(response.body.data.list.length && response.body.data.list[0])
                                that.search_offer = response.body.data.list[0].offer_id
                                $.scrollToDom($("#cp_list"))
                            }, response => {
                                that.loadingZone = ""
                                that.renderTable = true;
                                that.showAlert(response.body.msg)
                            })
                    })
                } else {
                    that.$nextTick(function() {
                        that.$http.get('Offer2/getAllOffers?' + params)
                            .then(response => {
                                that.renderTable = true;
                                that.loadingZone = ""

                                that.offersData = response.body && response.body.data && response.body.data.list
                                that.dataPage = response.body && response.body.data && response.body.data.paginator

                                if(response.body.data &&　response.body.data.list.length == 0){
                                    return;
                                }
                                if ($.isMobile()) {
                                    $.scrollToDom($("#cp_list"), -250)
                                }


                            }, response => {
                                that.loadingZone = ""
                                that.renderTable = true;
                                that.showAlert(response.body.msg)
                            })
                    })
                }

            },
            removeOffer() {
                let that = this;
                if (this.offer_id != '' && this.group_id != ''){
                    that.$http.post('Offer2/removeOffersFromGroup',{offer_ids:this.offer_id,group_id:this.group_id}).then(response => {
                        that.showAlert('success！',"success");
                        that.list_offers();
                        this.selected_id = [];
                    }, response => {
                        this.showAlert(response.body.msg)
                    })
                }
                this.hideModal() 
            },
            onConfirm(off_id,group_id){
                if (this.showConfirmModal) {
                    this.modalState = "show";
                    this.offer_id = off_id;
                    this.group_id = group_id;
                } else {
                    this.onConfirm && this.onConfirm()
                }
            }
        },
        created () {
            let that = this

            ep.all('group',  function(group) {
                    that.renderFilter = true
            });

            commonDataAPI.getRotateGroup(function(data) {
                that.groupChosen = data;
                ep.emit("group", data)
            })
            that.loadingZone = true
        },
        mounted () {

        }
    }
</script>


<style scoped>

    .btn:focus{
        color: #000
    }

    .hide {
        display: none;
    }

    .pointer {
        cursor: pointer;
    }
    .table th {
        padding: 4px;
        height: 36px;
        line-height: 36px;
        text-align: left;
        text-overflow: ellipsis;
    }

    .table td {
        padding: 4px;
    }
    .offer_wrap {
        word-break: break-word;
    }
    .high_risk .tooltip.top .tooltip-arrow {
        border-top-color: #FF0F00;
    }

    .high_risk .tooltip-inner {
        background-color: #FF0F00;
    }
    .medium_risk .tooltip.top .tooltip-arrow {
        border-top-color: #FFA800;
    }

    .medium_risk .tooltip-inner {
        background-color: #FFA800;
    }
    [data-type="text"] {
        cursor: pointer;
    }
    .modal-large .modal-body {
        min-height: 250px;
        padding-left: 50px;
        padding-top: 50px;
    }

    .tbl-fixed .row-name {
        width: 30%
    }
</style>
