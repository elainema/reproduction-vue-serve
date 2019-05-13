<template>
    <div :class="loadingZone ? 'ajax_loading' : '' ">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li class="">Advertiser BI</li>
            </ul>
        </div>
        <div class="box">
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <div class="box-content form-horizontal frm-entity frm-detail" >
                    <form class="form-inline form-actions" ref="form" @submit.prevent="onSubmit">
                        <div  style="display: block;height:30px;margin-bottom: 10px;" >
                            <chosen  v-if="amChosen && ['3', '6'].indexOf(userInfo.role_id) !== -1" :chosen="amChosen"  :chosen_name="'bd_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All AMs -'"></chosen>
                        </div>
                        <div class="aff_filter col-md-12 mb10 row">
                            <select class=" form-control col-md-2" name="time_type" id="timeType">  <!--@change="onChangeType"-->
                                <option value="" selected="selected">- All Time -</option>
                                <option value="month">Monthly</option>
                                <option value="quarter">Quarterly</option>
                                <option value="year">Annual</option>
                                <option value="week">Weekly</option>
                            </select>
                        </div>
                        <input class="col-md-5 form-control" type="text" name="q" autocomplete="off" placeholder="Keywords of Advertisers" />
                        <button type="submit" class="btn btn-primary" >Search</button>
                        <button type="reset" class="btn btn-default" id="reset_page">Reset</button>


                        <input type="hidden" name="page" id="" v-model="currentAdvListPage" />
                        <input type="hidden" name="limit" id="" v-model="currentAdvListLimit" />
                    </form>

                    <pagination :page="advListTablePage" :onChangeLimit="onChangeAdvListLimit" :onChangePage="onChangeAdvListPage" :currentPage="currentAdvListPage" v-if="advListTablePage"></pagination>
                    <div class="overflow_scroll">
                        <table class="table table-hover tablesorter mt20" id="advs_list">
                            <thead>
                            <tr>
                                <!-- <th><input type="checkbox" id="check_all" /></th> -->
                                <th>ID</th>
                                <th>Company Name</th>
                                <th v-if="['3', '6'].indexOf(userInfo.role_id) !== -1">AM Name</th>

                                <th>Report Name</th>

                                <th>Status</th>
                                <th>Report</th>
                            </tr>
                            </thead>
                            <tbody id="cp_list">
                            <tr v-for="(item,index ) in advs_list">
                                <td class="no-wrap">
                                    {{item.id}}
                                </td>
                                <td>
                                    {{item.company}}
                                </td>
                                <td v-if="['3', '6'].indexOf(userInfo.role_id) !== -1">{{item.first_name}} {{item.last_name}}</td>

                                <td>{{item.report_name}}</td>
                                <td >{{item.status}}</td>
                                <td class="bd_show">
                                    <router-link :to="'bi_adv_dedail?id=' + item.id" v-if="item.status != 'sent'">Edit</router-link>&nbsp;
                                    <a target="_blank" :href="'http://uploads.yeahmobi.com/advertiser/index.html?e=o&adv_id=' + item.adv_id +'&cycle_identifier=' +item.cycle_identifier+'&sig='+item.sig" >View</a>
                                    <a  href="#" class="pointer " :data-id="item.id" @click.prevent="onConfirm(item.id,'email')">Send</a>&nbsp;
                                    <a  href="#" v-if="item.status == 'edited'" class="pointer " :data-id="item.id" @click.prevent="onConfirm(item.id,'recount')">Recount</a><!--点了recount后，status变为new-->
                                </td>
                            </tr>

                            <tr v-show="!advs_list.length && renderTable"><td colspan="10"><strong>No Results Found.</strong></td></tr>

                            </tbody>
                        </table>
                    </div>

                    <pagination :page="advListTablePage" :onChangeLimit="onChangeAdvListLimit" :onChangePage="onChangeAdvListPage" :currentPage="currentAdvListPage" v-if="advListTablePage"></pagination>
                    <!-- <confirmWnd :modalState="modalState" :hideModal="hideModal" :modalBody="modalBody" :onConfirm="sendEmail"></confirmWnd>
                    <confirmModal ref="recountComfirm"  :modalState="modalState2" :hideModal="hideModal2" :onConfirm="setRecount" :editable_modal_body="editable_modal_body2"></confirmModal> -->
                    <modal 
                        :dialogVisible.sync="modalState"
                        :title="'Confirmation'"
                        :onConfirm="onConfirmModal"
                        :cancelOnLeft="true"
                        :dialogBody="modalBody">
                    </modal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import chosen from '@/components/Chosen.vue'
    import mixin_alert_msg from '@/mixins/alert_msg'
    import Vue from 'vue'
    import commonDataAPI from '@/api/commonData'
    import pagination from '@/components/Pagination.vue'
   /* import confirmModal  from "@/components/ConfirmModal.vue"*/
    const Modal = () => import( /* webpackChunkName: "Modal" */ '@/components/common/modal/');
    const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
    export default {
        data(){
            return {
                loadingZone:"",
                geoChosen:"",
                timeType:"all",
                selMonthVal:[],
                annualRecent:this.getRecentYear(),
                advs_list:"",
                amChosen:"",
                renderTable:false,
                advListTablePage:false,
                currentAdvListPage:1,
                currentAdvListLimit:20,
                needConfirmModal:false,
                modalState:"hide",
                modalBody:"<p>Who do you want to send to the mail?</p><textarea id='emailRows' rows='6' placeholder='Please separate emails with a comma.'></textarea>",
                showConfirmModal:{default:true},
                editable_modal_body2:"Are you sure to delete this data？\n" +
                "you can get this data back by recounting the whole report\n",
                modalState2:"hide",
                emailId:'',
                recountId:'',
                onConfirmModal: () => {}
            }
        },
        mixins: [mixin_alert_msg],
        components:{pagination, chosen,AlertPop,Modal},
        computed:{
            userInfo(){
                return this.$store.state.app.userInfo
            },
        },
        methods: {
            hideModal:function() {
                this.modalState = "hide"
            },
            hideModal2:function() {
                this.modalState2 = "hide"
            },
            onSubmit(){
                this.currentAdvListPage = 1;
                this.currentAdvListLimit = 20;
                this.$nextTick(function(){
                    this.getAllList()
                })
            },
            getAllList(){
                this.loadingZone = "ajax_loading"
                Vue.http.get('Bi/getBiReportList',{params:$(this.$refs.form).getFormQuery()}).then(response => {
                    let data  = response.body.data
                    this.loadingZone = ""
                    this.renderTable = true
                    this.advs_list = data && data.list || []
                    this.advListTablePage = data && data.paginator
                }, response => {
                    this.loadingZone = ""
                    this.showAlert(response.body.msg)
                })
            },
            onChangeAdvListLimit(limit){
                this.currentAdvListLimit = limit;
                this.currentAdvListPage = 1;
                this.$nextTick(function(){
                    this.getAllList()
                })
            },
            onChangeAdvListPage(page){
                this.currentAdvListPage = page;
                this.$nextTick(function(){
                    this.getAllList()
                })
            },
            onConfirm(id,type){
                if (this.showConfirmModal) {
                    this.modalState = "show";
                    if (type == 'email'){
                        this.onConfirmModal = this.sendEmail
                        this.emailId = id
                    }
                    else if (type == 'recount'){
                        this.onConfirmModal = this.setRecount
                        this.modalBody = this.editable_modal_body2
                        this.recountId = id
                    }
                } else {
                    this.onConfirm && this.onConfirm()
                }
            },
            sendEmail(){
                let that = this;
                let value = $.trim(document.getElementById("emailRows").value);
                if (value == ''){
                    this.showAlert("emails is needed");
                    this.modalState = "show"
                    return;
                }
                let arr = value.split(',');
                let exp = new RegExp("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?");
                let flag = false;
                if (Array.isArray(arr)){
                    arr.forEach(function(value,i){
                        if (!exp.test(value)){
                            flag = true;
                            that.modalState = "show";
                            return false;
                        }
                    })
                }
                if (!flag){
                    Vue.http.post('Bi/sendBiReportEmail',{id:this.emailId,emails:value}).then(response => {
                        this.showAlert('send success！',"success");
                        this.getAllList();
                    }, response => {
                        this.showAlert(response.body.msg)
                    })
                }
                else {
                    this.showAlert("the format is error!")
                }
                this.hideModal()
            },
            setRecount(id){
                Vue.http.post('Bi/recountBiReport',{id:this.recountId}).then(response => {
                    this.showAlert('recount success！',"success")
                }, response => {
                    this.showAlert(response.body.msg)
                })
                this.hideModal()
            },
            onChangeType(e) {
                var selVal = e.target.value;
                this.selMonthVal = [];
                if (selVal === 'monthly'){
                    this.selMonthVal.push(
                        {text:'Jan.',value:'1'},
                        {text:'Feb.',value:'2'},
                        {text:'Mar.',value:'3'},
                        {text:'Apr.',value:'4'},
                        {text:'May.',value:'5'},
                        {text:'June.',value:'6'},
                        {text:'July.',value:'7'},
                        {text:' Aug.',value:'8'},
                        {text:'Sept.',value:'9'},
                        {text:'Oct.',value:'10'},
                        {text:'Nov.',value:'11'},
                        {text:'Dec.',value:'12'}
                    );
                }
                else if (selVal === 'quarterly'){
                    this.selMonthVal.push(
                        {text:'Quarter 1',value:'1'},
                        {text:'Quarter 2',value:'2'},
                        {text:'Quarter 3.',value:'3'},
                        {text:'Quarter 4',value:'4'}
                    );
                }
            },
            getRecentYear() {
                var arr = [],i=0;
                var curYear = new Date().getFullYear();
                while (i < 3){
                    arr.push(curYear);
                    curYear--;
                    i++;
                }
                return arr;
            }
        },
        mounted () {
            let that = this;
            commonDataAPI.getAMs(function(data){
                that.amChosen = { name: "am", trans_name:"",  full_name: "am_id", data: data }
            })
            this.onSubmit();
        }
    }
</script>