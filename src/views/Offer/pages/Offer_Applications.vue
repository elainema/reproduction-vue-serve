<template>
<div>
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Offer Applications</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Offer Applications</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container" v-yeah-loading='ajax_loading'>
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="filter-form well" id="qf_offer">
                    <div class="row-fluid">
                        <form class="form-inline col-md-10" ref="qf_offer">
                            <div class="row-fluid mb">
                                <!-- //AM的member看到的应该只有自己名下的affiliate的offer申请，页面上取消AM下拉框。效果等同于在AM下拉框中选择了当前AM的账号后，offer选择框和affiliate选择框的效果。 -->
                                <select name="parent_id" class="col-md-3" id="ams" v-show="!(userInfo.item_role_id == 3 && userInfo.role_id != 2)" v-model="parent_id">
                                    <option value="">- All PMs -</option>
                                    <option :value="n.id" v-for="n in ams">{{ n.id }} -  {{n.first_name}}  {{n.last_name}}</option>
                                </select>
                                <select name="offer_id" class="col-md-3" id="offers" :disabled="is_disabled_offer">
                                    <option value="">- All Offers -</option>
                                    <option :value="n.offer_id" v-for="n in offers">{{ n.offer_id}} - {{ n.name }}</option>
                                </select>
                                <select name="aff_id" class="col-md-3" id="affiliate" :disabled="is_disabled_aff">
                                    <option value="">- All Affiliates -</option>
                                    <option v-for="n in affs" :value="n.passport_id">{{n.passport_id}}  - {{ n.first_name }}  {{n.last_name}}</option>
                                </select>
                                <a href="#" id="showList" class="btn btn-primary ml15" @click.prevent="getApplicationList">Show</a>
                            </div>
                            <div class="row-fluid" id="action_float">
                                <a href="#" id="btn_approve" class="btn btn-primary" data-value="approved" @click.prevent="liatTable('approved')">Approve</a>
                                <a href="#" id="btn_deny" class="btn btn-primary" data-value="unapproved" @click.prevent="liatTable('unapproved')">Deny</a>
                            </div>
                            <input v-if="sort_field" type="hidden" name="sort_field" :value="sort_field" />
                            <input v-if="sort_field" type="hidden" name="sort_type" :value="sort_type">
                            <input type="hidden" name="limit" v-model="pageLimit" />
                            <input type="hidden" name="page" v-model="currentPage">
                        </form>
                    </div>
                </div>
                <pagination :pageLimit="pageLimit"　:page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                <div class="overflow_scroll">
                    <table class="table table-hover tablesorter" id="app_list">
                        <colgroup>
                            <col width="20" />
                            <col width="150" />
                            <col width="150" />
                            <col width="150" />
                            <col width="100" />
                            <col width="250" />
                            <col width="" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="check_all" v-model="toggleAll" @click="selectchange"/></th>
                                <th class="sorting" data-sort="aff_id" @click="sortOffer('aff_id')">Affiliate ID</th>
                                <th class="sorting" data-sort="aff_name" @click="sortOffer('aff_name')">Affiliate Name</th>
                                <th>AM Name</th>
                                <th class="sorting" data-sort="offer_id" @click="sortOffer('offer_id')">Offer ID</th>
                                <th class="sorting" data-sort="offer_name" @click="sortOffer('offer_name')">Offer Name</th>
                                <th data-sort="offer_name">Q&A</th>
                            </tr>
                        </thead>
                        <tbody id="cp_list">
                            <tr v-if="render && renderData.length == 0"><td colspan="5"><strong>No Results Found.</strong></td></tr>
                            <tr v-if="render && renderData.length > 0" v-for="i in renderData">
                                <td v-if="i.questionandanswer">
                                    <input type="checkbox" :id="md5ID(i.aff_id)" :data-id="i.offer_id" :value="i.aff_id + '-' + i.offer_id" name="id[]" class="check-box"  v-model="selected_id" />
                                </td>
                                <td v-if="i.questionandanswer">{{ i.aff_id }}</td>
                                <td v-if="i.questionandanswer">{{i.first_name }}   {{ i.last_name }}</td>
                                <td v-if="i.questionandanswer">{{ i.bd }}</td>
                                <td v-if="i.questionandanswer">{{ i.offer_id }}</td>
                                <td v-if="i.questionandanswer">
                                    <router-link class="offer_wrap" :to="'p_manage_offer?id='+ i.offer_id" target="_blank"><strong> {{ i.offer_name }}</strong></router-link>
                                </td>
                                <td v-if="i.questionandanswer">
                                    <div v-for="(n,index)  in i.questionandanswer">
                                        <p><strong>Question  {{index * 1 + 1}}: </strong>{{ n.question }}</p>
                                        <p><strong>Expect Answer: </strong> {{ n.expected_answer }}</p>
                                        <p><strong>Affiliate Answer: </strong>{{ n.aff_answer }}</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination :pageLimit="pageLimit"　:page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
            </div>
        </div>
    </div>

<!--     <textareaModal :modalState="modalState" :hideModal="hideModal" :modal_title="modal_title" :modal_body="editable_modal_body" :confirm_btn="editable_confirm_btn" :onConfirm="onConfirmBtn" :showTips="false"></textareaModal> -->
    <modal 
        :dialogVisible.sync="modalState" 
        :title="modal_title"
        :onConfirm="onConfirmBtn"
        :confirmText="editable_confirm_btn">
        <template slot="dialogBody">
            <form class="form-horizontal frm-entity">
              <div class="form-group">
                <textarea id="reason" maxlength="200" rows="5" class="col-md-12" v-model="editable_modal_body"></textarea></div>
            </form>
        </template>
    </modal>
</div>
</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import pagination from '@/components/Pagination.vue'
import chosen_container_offer from '@/components/Chosen_Container_Offer.vue'
/*import textareaModal from '@/components/TextareaModal.vue'*/
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false,
            renderData:[],
            pageLimit:20,
            dataPage:{},
            currentPage:1,
            selected_id:[],
            toggleAll :false,
            is_disabled_aff:true,
            is_disabled_offer:true,
            sort_field:'',
            sort_type:1,
            ams:[],
            offers:[],
            affs:[],
            parent_id:'',
            modalState:'hide',
            editable_modal_body:'',
            editable_confirm_btn:'Confirm',
            modal_title:'Reason',
            status:'',
            offer_id:[],
            aff_id:[],
            render:false,
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
        parent_id(newVal, oldVal) {
            if(newVal) {
                this.is_disabled_aff = false
                this.is_disabled_offer = false
            }
        },
        selected_id() {
            this.toggleAll = this.renderData.length > 0 && (this.selected_id.length == this.renderData.length)
            this.setOfferAndAffID()
        }
    },
    computed:{
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    components: {AlertPop,pagination,chosen_container_offer,Modal},
    methods:{
        selectchange (e) {
            var selectall = e.target.checked
            this.toggleAll = selectall
            if (selectall) {
                this.selected_id = []
                for (var i = 0; i < this.renderData.length; i++) {
                    this.selected_id.push(this.renderData[i].aff_id + '-' + this.renderData[i].offer_id)
                }
            } else {
                this.selected_id = []
            }
        },
        setOfferAndAffID() {
            var that = this
            var ids = that.selected_id;
            var offer_id = []
            var aff_id = []
            _.forEach(ids, function(index) {
                  var id = index.split('-')
                  aff_id.push(id[0])
                  offer_id.push(id[1])
            });
            that.aff_id = aff_id
            that.offer_id = offer_id
        },
        onConfirmBtn() {
            let reason = this.editable_modal_body
            let that = this
            let query = {
                offer_id: that.offer_id.join(","),
                aff_id: that.aff_id.join(","),
                status: that.status,
                check_info:reason
            };
            if(!reason) return that.showAlert('Reason can not empty.', 'info')
            Vue.http.post('Offer2/approve', query).then(response => {
                /*that.renderData.filter = that.renderData.filter(function(index) {
                    return (index.offer_id != offer_id && index.aff_id != aff_id)
                });*/
                that.getApplicationList()
                that.toggleAll = false
                that.selected_id = [];
            }, response => {
                that.showAlert('Offer answers error.', 'error')
            })
            this.hideModal()
        },
        hideModal () {
            this.modalState = "hide"
        },
        liatTable(action) {
            let that = this
            var ids = that.selected_id;
            that.status = action
            if(ids.length > 0){
                that.modalState = 'show'
                if (action == 'approved') {
                    that.editable_modal_body = 'Thank you for your application.';
                } else {
                    that.editable_modal_body = '';
                }
            }else{
                that.showAlert('Please select the list before approve', 'error');
            }
        },
        sortOffer(type) {
            var _key = type;
            var _sort_key = this.sort_field;     //上次点击的排序字段
            if (_key != '') {
                if (_key != _sort_key) {
                    this.sort_field = type
                    this.sort_type = 1
                } else {
                    if (this.sort_type == 1) {
                        this.sort_type = -1;
                    } else {
                        this.sort_type = 1;
                    }
                }
                this.$nextTick(function () {
                    this.getApplicationList()
                })
            }
        },
        md5ID(id) {
            return md5(id)
        },
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        getApplicationList() {
            let that = this
            let query = $(that.$refs.qf_offer).getFormQuery();
            this.ajax_loading = true
            Vue.http.get('Offer2/getApplicationList', {params:query}).then(response => {
                var data = response && response.body && response.body.data
                that.renderData = data && data.list
                that.render = true
                that.dataPage = data && data.paginator
                this.ajax_loading = false
            }, response => {
                that.showAlert('Offer answers error.', 'error')
                this.ajax_loading = false
            })
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
                this.getApplicationList()
            })
        },
        onChangeLimit(limit){
            this.pageLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
                this.getApplicationList()
            })
        },
        getAmApplications() {
            let that = this
            that.ams = []
            var new_ams = [];
            Vue.http.get('Affiliate/getAppliedOfferManager').then(response => {
                var ams = response && response.body && response.body.data && response.body.data.list
                that.ams = ams
            }, response => {
            })
        },
        getOfferApplications() {
            let that = this
            that.ams = []
            Vue.http.get('Offer2/getAppliedOfferList').then(response => {
                var data = response && response.body && response.body.data && response.body.data.list
                that.offers = data
            }, response => {
            })
        },
        getAffiliateList() {
            let that = this
            that.affs = []
            Vue.http.get('Offer2/getAppliedAffiliateList').then(response => {
                var data = response && response.body && response.body.data && response.body.data.list
                that.affs = data
            }, response => {
            })
        },

    },
    created() {
    },
    mounted() {
        this.getApplicationList()
        this.getAmApplications()
        this.getOfferApplications()
        this.getAffiliateList()
    }

}
</script>