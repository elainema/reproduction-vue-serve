<template>
<div v-yeah-loading='loadingZone'>
    <div class="box">
        <div class="box-header"  v-box-action-resize>
            <h2>Blend Traffic</h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container" ref="blend_traffic_wrapper" id="blend_traffic_wrapper">
            <div class="box-content form-horizontal frm-entity frm-detail"> 
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Method</label>
                    <div class="col-md-10">
                        <common-switch 
                            :isEnable="manual_on" 
                            :yes_text="'Manual'" 
                            :no_text="'Automatic'" 
                            :switch_param="'is_blend'"
                            :updateState="false"
                            :default_val="manual_on"
                            :onChange="switchCallBackModelOn">
                        </common-switch>
                    </div>
                </div>
                <div class="control-group form-group">
                    <keep-alive>
                       <component 
                            :is="isShowWhat" 
                            :switchCallBackAutomatic="switchCallBackAutomatic" 
                            :autoText="autoText" 
                            :autoText2="autoText2" 
                            :loadingBtn="loadingBtn"
                            :showAlert="showAlert" 
                            :allShadowAffiliatesManul="allShadowAffiliatesManul"
                            :allShadowAffiliatesAuto="allShadowAffiliatesAuto"
                            :lastDayData="lastDayData"
                            :manualSubmit="manualSubmit"
                            :manualStart="manualStart"
                            :mutipleChosenKpis="mutipleChosenKpis"
                            :savaBlendData="savaBlendData"
                            :accessInfoIdOnly="accessInfoIdOnly"
                            :accessInfo="accessInfo"
                            :spanArr="spanArr"
                            :autoStart="autoStart"
                        ></component>
                    </keep-alive>
                </div>
            </div>
            
        </div>
    </div>
    <!-- <confirmWnd :modalState="modalStateBlend" :hideModal="hideModalBlend" :onConfirm="confirmOff" :modalBody="confirmMsg.stop_blend_msg"></confirmWnd>
    <confirmWnd :modalState="modalStateAuto" :hideModal="hideModalAuto" :onConfirm="confirmStop" :modalBody="confirmMsg.stop_auto"></confirmWnd>
    <confirmWnd :modalState="modalStateManual" :hideModal="hideModalManual" :onConfirm="confirmStopManual" :modalBody="confirmMsg.stop_manual"></confirmWnd>
    <editBlendModal :showAlert="showAlert" :accessInfo="accessInfo" :lastDayData="lastDayData" :onConfirm="savaBlendData" :modalState="manualEditState" :hideModal="hideModalEdit" ></editBlendModal> -->
    <modal
        :dialogVisible.sync="modalStateBlend"
        :title="title"
        :confirmText="confirmText"
        :onConfirm="confirmOff"
        :onCancel="hideModalBlend"
        :dialogBody="confirmMsg.stop_blend_msg">
    </modal>
    <modal
        :dialogVisible.sync="modalStateAuto"
        :title="title"
        :confirmText="confirmText" 
        :onConfirm="confirmStop"
        :onCancel="hideModalAuto"
        :dialogBody="confirmMsg.stop_auto">
    </modal>
    <modal
        :dialogVisible.sync="modalStateManual"
        :title="title"
        :onConfirm="confirmStopManual"
        :confirmText="confirmText"
        :dialogBody="confirmMsg.stop_manual">
    </modal>
</div>
</template>
<script>
import Vue from "vue";
import { defaultKpiNameList, mergeKpiSettingName } from '../../config/config'
const AutomaticBlendTraffic = () => import(
/* webpackChunkName: "AutomaticBlendTraffic" */ '../../components/automatic-blend-traffic/'
);
const ManualBlendTraffic = () => import(
/* webpackChunkName: "ManualBlendTraffic" */ '../../components/manual-blend-traffic/'
);

/*const confirmWnd = () => import(
 webpackChunkName: "ConfirmWnd"  '@/components/ConfirmWnd.vue');*/
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/');

export default {
    data() {
        return {
            loadingZone:true,
            selected_option: '2',
            blend_traffic_on: this.offerInfo.blend_traffic_on,
            kpiList: [],
            unSave: false,
            disCheck: false,
            unSaveMenuel: false,
            confirmMsg:{
                stop_blend_msg: `Are you sure to stop automatic blend traffic?`,
                stop_auto: "Are you sure to stop automatic blend traffic?",
                stop_manual: "Are you sure to stop manual blend traffic?"
            },
            modalStateBlend:'hide',
            modalStateAuto: 'hide',
            modalStateManual: 'hide',
            manualEditState: 'hide',
            manual_on: false,
            autoStart: false,
            manualStart: false,
            lastDayData:[],
            newLastData:[],
            OrderIndexArr:[],
            offer_id: this.$route.query.id,
            loadingBtn: false,
            spanArr: [],
            accessInfo: [],
            title:'Confirmation',
            confirmText:'OK',
            dialogName:'dialogVisible',
            shadowAffiliate:[], // 影子渠道
            allShadowAffiliatesManul: [], //正常渠道和影子渠道 手动参量
            allShadowAffiliatesAuto: [], //正常渠道和影子渠道 自动参量
            automaticData:[],
            selectedOptionValue:'',
            techAffs:[],
            mutipleChosenKpis:[],
            accessInfoIdOnly:[],
            defaultKpiNameList:[],
        }
    },
    components: {CommonSwitch,Modal,AutomaticBlendTraffic,ManualBlendTraffic},
    props:{
        renderOffer:{default:false},
        offerInfo:{
            default:{}
        },
        showAlert:{},
        ocpaData: {
            default:{}
        },
        setOfferEditAuth:{},
        affAccessInfo:{},
        appAccessInfo:{},
        offerKpiSettingEvents:{
            type: Array,
            datault: []
        }
    },
    computed: {
        autoText(){
            return this.autoStart ? "Stop" : "Start"
        },
        autoText2(){
            return this.manualStart ? "Stop" : "Save and Start"
        },
        isShowWhat() {
            return this.manual_on ? 'ManualBlendTraffic' : 'AutomaticBlendTraffic'
        },
    },
    methods:{
        fecthOcpaData() {
            let that = this
            let kpiList = this.ocpaData.kpis ? this.ocpaData.kpis : []
            let mutipleChosenKpis = []
            let kpiCanAuto = {}
            let kpiNameList = mergeKpiSettingName(this.defaultKpiNameList, this.offerKpiSettingEvents)
            kpiList.map((o) => {
                let canAuto = false
                let _setting = _.find(kpiNameList, function(kpi) {
                    return  (kpi.event_name == o.event_name && kpi.canSetOnAutoBlendTraffic)
                });
                if (_setting) {
                    canAuto = true
                }
                if (canAuto) {
                    //自动参量组合retention只允许配 1,3, 7,30
                    let type = o.type == 'retention'
                    if (type) {
                        let event_param = o.event_param
                        let isRetentionCan = event_param == 1 || event_param == 3 || event_param == 7 || event_param == 30
                        if (isRetentionCan) {
                            let day = _.find(_setting.days, function(day) {
                                return day.key == o.event_param
                            });
                            let _day = day.label || ''
                            let label = `${_setting.label} ${_day}`
                            mutipleChosenKpis.push({id:o.id,text:o.event_name,label:label}) 
                        }
                    } else {
                        mutipleChosenKpis.push({id:o.id,text:o.event_name,label:_setting.label}) 
                    }
                }
            })
            this.mutipleChosenKpis = mutipleChosenKpis
        },
        // 获取所有影子渠道ID(真正渠道和影子渠道)
        getAllShadowAffs() {
            let that = this;
            that.setPubliserToShadowAffs()
            const shadowArr = that.shadowAffiliate
            let shadowChosen = {
              label: 'shadow',
              options: []
            }
            for (let item of shadowArr){
                shadowChosen.options.push({'value': item, 'text': item})
            }
            that.allShadowAffiliatesManul.push(shadowChosen)
            that.allShadowAffiliatesAuto.push(shadowChosen)
        },
        // 将真正的渠道塞进影子渠道
        setPubliserToShadowAffs() {
            this.allShadowAffiliatesManul = []
            this.allShadowAffiliatesAuto = []
            this.accessInfoIdOnly = []
            let pub1 = {
                label: 'pub',
                options:[{'value': '', 'text': '- -'}]
            }
            let pub2 = {
                label: 'pub',
                options:[]
            }
            for (let item of this.accessInfo){
                this.accessInfoIdOnly.push(item.id.toString())
                pub1.options.push({'value': item.id, 'text': item.id})
                pub2.options.push({'value': item.id, 'text': item.id})
            }
            this.allShadowAffiliatesManul.push(pub1)
            this.allShadowAffiliatesAuto.push(pub2)
        },
        // 将影子渠道塞进影子渠道
        setShadowAffiliate() {
            let that = this
            let shadowAffiliate = this.shadowAffiliate
            shadowAffiliate = shadowAffiliate.map(function(c_obj) {
                let item = { id: c_obj, name: c_obj, text:c_obj};
                that.allShadowAffiliates.push(item)
            })
        },
        hideModal(type) {
            this[type] = false
        },
        savaBlendData(data){
            this.newLastData = data.saveData
            this.lastDayData = this.newLastData
            this.spanArr = []
            this.getSpanArr(this.lastDayData)
        },
       /* hideModalBlend(e) {
            if (this.modalStateBlend == "show"){
                this.modalStateBlend = "hide"
            }
            else {
                this.manual_on = !this.manual_on
            }
        },
*/
        hideModalBlend() {
            this.manual_on = !this.manual_on
            this.hideModal('modalStateBlend')
        },
        hideModalAuto(e){
            if (e && e.target.name == 'cancel'){
              this.autoStart = true
            }
            this.hideModal('modalStateAuto')
        },
        /*hideModalManual(){
            this.modalStateManual = "hide"
        },
        hideModalEdit(){
            this.manualEditState = "hide"
        },*/
        switchCallBackModelOn(value,switch_param){
            this.manual_on = value
             if (this.manualStart){
                 this.confirmMsg.stop_blend_msg = `Are you sure to stop manual?`
                 this.modalStateBlend = "show"
             }
             else if (this.autoStart){
                 this.confirmMsg.stop_blend_msg = `Are you sure to stop automatic blend traffic?`
                 this.modalStateBlend = "show"
             }
        },
        confirmOff() {  //每次换method都停掉当前开着的参量
            this.blend_traffic_on = false
            if (this.autoStart){
                //this.manual_on = !this.manual_on
                this.confirmStop()
            }
            else if (this.manualStart){
                //this.manual_on = !this.manual_on
                this.confirmStopManual()
            }
            this.hideModal('modalStateBlend')
        },
        confirmStop(){ //autoStop
            this.trafficOnOff({is_blend:0,offer_id:this.offer_id,is_manual_blend:0},()=>{
                 this.autoStart = false
                 this.manualStart = false
            })
            this.hideModal('modalStateAuto')
        },
        confirmStopManual(){ //maenulStop
            this.trafficOnOff({is_blend:0,offer_id:this.offer_id,is_manual_blend:0},()=>{
                this.autoStart = false
                this.manualStart = false
            })
            this.hideModal('modalStateManual')
        },
        trafficOnOff(params,callback){
            let that=this
            //下发blend开关状态
            Vue.http.post("Blend/traffic",params).then(response => {
                that.showAlert(response.body.msg,'success');
                callback && callback()
            }, response => {
                // error callback
                this.loadingBtn = false 
                that.showAlert(response.body.msg);
            })
        },
        switchCallBackAutomatic() {
            this.loadingBtn = true
            if (this.autoStart) { //关自动掺时提示
                this.modalStateAuto = "show"
                this.loadingBtn = false
            } else {
                let params = {}
                params = {
                    is_blend: 1,
                    offer_id: this.offer_id,
                    is_manual_blend: 0
                }
                this.trafficOnOff(params,() =>{
                    this.autoStart = !this.autoStart
                    this.manualStart = false
                    this.loadingBtn = false
                })
            }
        },
        changeData(e){
            if ($(e.target).is(":checked")){
                this.kpiList.push(e.target.value)
            }
            else {
                this.kpiList.splice(this.kpiList.indexOf(e.target.value),1)
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex < 2) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
      },
      manualSubmit(){
          this.loadingBtn = true
          if (this.manualStart){
              this.modalStateManual = "show"
              this.loadingBtn = false
          }
          else {
              let params = {
                    offer_id: this.offer_id,
                    is_manual_blend: 1,
                    is_blend: 1,
                    manual_blend_config: JSON.stringify(this.lastDayData)
                }
                this.trafficOnOff(params,()=>{
                    this.loadingBtn = false
                    this.manualStart = !this.manualStart
                    this.autoStart = false
                })
          }
        },
        getSpanArr(data) {
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].aff_id === data[i - 1].aff_id) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
        getAccessInfo(){
            let that = this
            var approvedAff = this.affAccessInfo && this.affAccessInfo.approved || []
            var approvedApp = this.appAccessInfo || []
            approvedAff = approvedAff.map(function(c_obj) {
                var text =  c_obj.id + ' - ' + (c_obj.first_name || '') +  ' ' + (c_obj.last_name || '') + ' - ' + c_obj.pm;
                var name = (c_obj.first_name || '') +  ' ' + (c_obj.last_name|| '');
                return { id: c_obj.id, name: name, text:text};
            })
            this.accessInfo = approvedAff
            approvedApp = approvedApp.map(function(c_obj) {
                let isExsit = _.find(approvedAff, function(o) {
                    return o.id == c_obj.publisher_id
                });
                if (!isExsit) {
                    var text =  c_obj.publisher_id + ' - ' + (c_obj.firstName || '') +  ' ' + (c_obj.lastName || '');
                    var name = (c_obj.firstName || '') +  ' ' + (c_obj.lastName|| '');
                    let el = { id: c_obj.publisher_id, name: name, text:text};
                    that.accessInfo.push(el)
                }
            })
        },
        getShadowAffiliate() {
            let that = this;
            Vue.http.get("Blend/getShadowAffs").then(response => {
                let result = response && response.body && response.body.data || []
                that.shadowAffiliate = result
            }, response => {
                // error callback
                that.showAlert(response.body.msg);
            })
        },
        getConfig() {
            let that = this
            Vue.http.get("Blend/getConfig?offer_id="+ that.$route.query.id).then(response => {
                this.loadingZone = false 
                let result = response && response.body.data
                that.blend_traffic_on = result && result.is_blend
                that.manual_on = result && result.is_manual_blend
                that.manual_on = that.manual_on==1 ? true : false
                that.lastDayData = result ? (result.manual_blend_config ? result.manual_blend_config : []) : []

                that.getSpanArr(_.cloneDeep(that.lastDayData))
                that.kpiList = result && result.kpi_ids ? result.kpi_ids : []
                if (that.blend_traffic_on == "1"){
                    if (that.manual_on){
                        that.manualStart = true
                    }
                    else {
                        that.autoStart = true
                    }
                }
                else {
                    that.autoStart = false
                    that.manualStart = false
                }
                
            }, response => {
                // error callback
                that.showAlert(response.body.msg);
            })  
        },
    },
    watch: {
        accessInfo (val) {
            if(val) this.getAllShadowAffs()
            
        },
        /*accessInfo: {
            handler() {
                this.getAllShadowAffs()
            },
            immediate: true
        },*/
        shadowAffiliate (val) {
            if(val) this.getAllShadowAffs()
        },
        /*ocpaData: function(val){
            this.fecthOcpaData()
        },*/
        offerKpiSettingEvents() {
            this.fecthOcpaData()
        },
        /*kpiList: {
            handler :function(newVal,oldVal){
                if (this.kpiList.length == 0){
                     this.unSave = true
                }
                else this.unSave = false
                
            },
            immediate: true
        },*/
        renderOffer(newVal, oldVal){
            if (newVal) {
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.blend_traffic_wrapper)
                })
            }
        },
        affAccessInfo(newVal, oldVal) {
           if (newVal) {
                this.getAccessInfo()
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.tracking_wrapper)
                })
            } 
        },
    },
    created() {
        this.getShadowAffiliate()
        this.getConfig()
        this.defaultKpiNameList = defaultKpiNameList
    },
    mounted() {         
    }
}
</script>
<style lang="less">
#blend_traffic_wrapper{
    .col-md-10{
        padding-left: 0;
    }
    .el-table thead{
        color:#666 !important;
    }
    .checkbox-inline{
        margin-left: 0;
    }
    .el-select input[type=text][readonly]{
        cursor: pointer;
        background: #fff;
    }
    .el-input__suffix{    
        display: flex;
        align-items: center;
    } 
    .el-table--border th{
        color:#666;
        border-top: 0;
    }
    .select2-container.select2-container-multi{
        min-width: auto;
        width: auto;
    }
    .editable-buttons{
       // display: block;
        margin-top: 10px;
    }
    .switch .ivu-switch-inner{
        background: #f70;    
        color: #fff !important;    
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px
    }
    .switch .ivu-switch-checked .ivu-switch-inner{
        background: transparent;
    }
}
</style>