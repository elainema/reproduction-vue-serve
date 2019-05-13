<template>
<div id="confirm_dialog" class="modal fade" aria-hidden="false" ref="modal"  data-backdrop="static">
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Batch AppCaps</h3>
            </div>
            <div class="modal-body form-horizontal">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Caps:</label>
                    <div class="controls col-md-6">
                        <div class="input-append">
                            <select :name="is_caps != '' ? 'is_caps': ''" v-model="is_caps" @change="onChangeCaps">
                                <option value="">Empty</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                           <!--  <switch_offer :name='"is_caps"' :switchCallBack="switchCallBack" :offer_val="1"></switch_offer> -->
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Caps - App</label>
                    <div class="controls col-md-10">
                        <select2Aff :select2_mode="'simple'" :showSelectAll="false" :aff_name="'publisher_ids'" :select2_class="' nopadding col-xs-12'" :classList="classList1" :select2_multiple="false" :select2_container_width="'200px'" :select2CallBack="select2CallBack"></select2Aff>
                        <chosen_container_offer class="inline-block" :option0="option1" :renderOffer="renderOffer" v-if="activeApp" :chosenInfo="activeApp"  :chosenCallback="setSelectedAppVal" :classList="classList" :chosenWidth="'200px'" :defaultVal="defaultAdv"></chosen_container_offer>
                        <a href="#" class="btn btn-primary btn_add_payout" data-control-name='bt-button' data-target="#app_payment_container" is-app-payout="1" @click.prevent="addAppCaps">Add</a>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"></label>
                    <div class="controls overflow_scroll col-md-9">
                        <table class="col-md-offset-2 table tablesorter defaultTable" style="color: #333;">
                            <colgroup>
                                <col width="150" />
                                <col width="140" />
                                <col width="140" />
                                <col width="" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Affiliate</th>
                                    <th>APP ID</th>
                                    <th>APP Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="">
                                <tr v-for="i in appsInfo">
                                    <td> {{i.aff_id}}</td>
                                    <td>{{ i.app_id }}</td>
                                    <td>{{ i.app_name }}</td>
                                    <td><a href="#" class="btn" data-control-name="bt-button" @click.prevent="removeAppCaps(i.aff_id, i.app_id)"><i class="fa fa-remove icon-white"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <form class="form-horizontal form-report" ref="form">
                    <div class="control-group form-group">
                        <div class="col-md-4">
                            <label class="control-label col-md-6">Daily Conversion</label>
                            <div class="controls col-md-6">
                                <div class="input-append">
                                    <input type="number" class="txt-value"  :name="daily_conversions ? 'daily_conversions' : ''" v-model="daily_conversions">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="control-label col-md-6">Monthly Conversion</label>
                            <div class="controls col-md-6">
                                <div class="input-append">
                                    <input type="number" class="txt-value"  :name="monthly_conversions ? 'monthly_conversions' : ''" v-model.trim="monthly_conversions">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="control-label col-md-6">Hide</label>
                            <div class="controls col-md-6">
                                <div class="input-append">
                                    <input type="number" class="txt-value" :name="hide_conv ? 'hide_conv' : ''" v-model.trim="hide_conv">
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="offer_ids" :value="selected_id.join(',')">
                    <input type="hidden" name="devapp_ids" :value="app_ids.join(',')" v-if="app_ids && app_ids.length > 0">
                    <input type="hidden" name="confirm" value="1" v-if="confirm">
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirm" :disabled="disabledBtn">Confirm</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>

    <div class="hidden" ref="no_authorize_table">
        <div class="overflow_scroll" id="aff_payment_container">
            <table class="table tablesorter defaultTable" style="color: #333;">
                <colgroup>
                    <col width="150" />
                    <col width="140" />
                    <col width="" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Offer ID</th>
                        <th>APP ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="">
                    <tr v-for="i in no_authorize_data">
                        <td>{{ i.offer_id }}</td>
                        <td>{{ i.devapp_id }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <confirmModal :modalState="secondConfirmModalState" :hideModal="hideConfirmModal" :onConfirm="setConfirm" :editable_modal_title="editable_modal_title" :editable_modal_body="editable_modal_body" :classList="classList"></confirmModal>
</div>
</template>
<script>

const chosen_container_offer = () => import(
/* webpackChunkName: "chosen_container_offer" */ './Chosen_Container_Offer.vue'
);
import offerAPI from '../api/offer'


const confirmModal = () => import(
 /*webpackChunkName: "confirmWnd"  */ './ConfirmModal.vue'
);

const select2Aff = () => import(
/* webpackChunkName: "select2Aff" */ './Select2Aff.vue'
);

export default {
  data(){
    return {
        platform:"ios",
        categorList:[],
        option0:'- Select an Affiliate -',
        option1:'- Select an App -',
        activeAppUser:[],
        classList:'chosenSelect affiliate_approved',
        activeApp:[],
        publisher_id:'',
        app_id:'',
        app_name:'',
        appsInfo:[],
        app_ids:[],
        daily_conversions:'',
        hide_conv:'',
        monthly_conversions:'',
        editable_modal_title:'Unauthorized affiliate,please authorize again after operation',
        editable_modal_body:'',
        secondConfirmModalState:'hide',
        confirm:false,
        no_authorize_data:[],
        classList:'red',
        defaultAdv:'',
        els:[],
        is_caps:'',
        disabledBtn:true,
        classList1:'filter-affiliate_id chosen-filter nopadding',
    }
  },
  components:{chosen_container_offer,confirmModal,select2Aff},
  props: {
    modalState:{},
    hideModal:{},
    renderOffer:{},
    appAccessInfo:{},
    selected_id:{},
    showAlert:{},
    onSuccess:{},
  },
  computed:{
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },
    appsInfo(newVal, oldVal) {
        this.setBtnDisable();
    },
    monthly_conversions(newVal, oldVal) {
        this.setBtnDisable();
    },
    daily_conversions (newVal, oldVal) {
        this.setBtnDisable();
    },
    renderOffer(newVal, oldVal){
        if(newVal){
            this.getActiveAppUser()
        }
    },
    publisher_id(newVal, oldVal) {
        if (newVal) {
            this.getAppList()
        }
    },
},
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    setBtnDisable() {
        var appsInfo = this.appsInfo
        var is_caps = this.is_caps
        var monthly_conversions = this.monthly_conversions
        var daily_conversions = this.daily_conversions
        if (appsInfo.length == 0 || (appsInfo.length > 0 && is_caps == 1) && !(monthly_conversions || daily_conversions)) {
           this.disabledBtn = true
        } else {
            this.disabledBtn = false
        }
    },
    onChangeCaps(e) {
        var val = e.target.value
        this.is_caps = val
        this.setBtnDisable()
    },
    setConfirm(){
        this.confirm = true
        this.$nextTick(function() {
            this.onConfirm()
        })
    },
    hideConfirmModal() {
        this.secondConfirmModalState = 'hide'
    },
    validator(){
        var that = this
        var p = new promise.Promise();
        var daily_conversions = that.daily_conversions
        var monthly_conversions = this.monthly_conversions
        var is_caps = that.is_caps
        var app_ids = this.app_ids
        if(monthly_conversions && monthly_conversions <= 0) {
            that.showAlert("The Monthly Conversion must be more than 0, please check!", 'info')
        } else if (daily_conversions && daily_conversions <= 0) {
            that.showAlert("The Daily Conversion must be more than 0, please check!", 'info')
        } else if (is_caps == '' && (monthly_conversions || daily_conversions)) {
            that.showAlert("The caps must be Yes, please check!", 'info')
        } else if (app_ids.length == 0) {
            that.showAlert("Please select at least one app!", 'info')
        } else {
            p.done(null, "");
        }
        return p;
    },
    setInit() {
        this.daily_conversions = ''
        this.monthly_conversions = ''
        this.hide_conv = ''
        this.publisher_id = ''
        this.app_id = ''
        this.app_name = ''
        this.appsInfo = []
        this.app_ids = []
        this.is_caps = ''
        this.activeApp = []
        $(".select2-container").filter(":visible").select2('val', '')
        this.disabledBtn = true
        _.each(this.els, function(v,k){
            $(v).find("option:first").prop("selected", true).trigger('chosen:updated');
        })
    },
    onConfirm() {
        let that = this
        var query = $(this.$refs.form).getFormQuery();
        var p = that.validator();
        if (that.is_caps != '') query.is_caps = that.is_caps
        p.then(function(error, result) {
            that.$http.post('Offer2/batchEditDevappOfferAccessInfo', query).then(response => {
                var data = response && response.body
                if (data.data && data.data.no_authorize) {
                    that.no_authorize_data = data.data.no_authorize
                    that.$nextTick(function() {
                        that.editable_modal_body = $(that.$refs.no_authorize_table).html();
                        that.secondConfirmModalState = "show"
                    })
                    return
                }
                if (data.flag == 'success' && !(data.data && data.data.no_authorize)) {
                    that.setInit()
                    that.onSuccess && that.onSuccess();
                    that.showAlert(response.body.msg, 'success')
                    that.hideModal();
                }
            }, response => {
                that.loadingZone = ""
                that.showAlert(response.body.msg)
            })
        })
        that.confirm = false
    },
    addAppCaps() {
        if(!this.publisher_id || !this.app_id || _.findIndex(this.appsInfo, {app_id: this.app_id}) !== -1 || _.findIndex(this.appsInfo, {aff_id: parseInt(this.app_id)}) !== -1) return;
        var appInfo = {
            aff_id:this.publisher_id,
            app_id:this.app_id,
            app_name:this.app_name,
        }
        this.appsInfo.push(appInfo)
        this.app_ids.push(this.app_id)
    },
    removeAppCaps(aff_id,app_id) {
        var oldVal = this.appsInfo
        var newVal = _.filter(oldVal, function(n) {
            return (n.app_id != app_id)
        });
        this.appsInfo = newVal
        this.app_ids = _.filter(this.app_ids, function(n) {
            return (n != app_id)
        });
    },
    getActiveAppUser() {
        let publisher_ids = _.uniq(_.map(this.appAccessInfo, "publisher_id"))

        let arr = []
        let that = this
        _.each(publisher_ids, function(v,k){
            let _index = _.findIndex(that.activeUser, {id: v})
            if( _index !== -1){
                arr.push(that.activeUser[_index])
            }
        })
        that.activeAppUser = arr
    },
    /*setSelectedAffVal(val, name, text, $el) {
        let that = this
        that.publisher_id = val;
        this.els.push($el)
    },*/
    select2CallBack(val) {
        let that = this
        that.publisher_id = val;
        this.els.push(val)
    },
    setSelectedAppVal(val, name, text, $el) {
        this.app_id =  val;
        this.app_name =  name
        this.els.push($el)
    },
    getAppList() {
        let that = this
        var query = {
            publisher_id: that.publisher_id
        }
        offerAPI.getAppList(query, function(data){
            var app_list = data && data.data || []
            that.getActiveApp(app_list)
        })
    },
    getActiveApp(app_list){
        let that = this
        let arr = []
        var publisher_id = that.publisher_id
        _.map(app_list, function(v,k){
            if(v.publisher_id == publisher_id){
                arr.push(v)
            }
        })
        var info = arr.map(function(c_obj) {
            var text =  c_obj.id + ' - ' + c_obj.name;
            var name = c_obj.name;
            return { id: c_obj.id, name: name, text:text, publisher_id:c_obj.publisher_id};
        })
        this.activeApp =  info
    },
  },
  mounted () {}
}
</script>
<style scoped>
.overflow_scroll{
    width: 80%;
    margin-bottom: 50px;
}
.modal-dialog{
    width: 60%;
}
</style>