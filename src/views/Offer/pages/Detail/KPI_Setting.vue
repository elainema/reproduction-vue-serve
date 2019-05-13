<template>
<div v-yeah-loading='loadingZone'>
    <div class="box">
        <div class="box-header"  v-box-action-resize>
            <h2>KPI Setting</h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container" ref="kpi_settings_wrapper">
            <div class="box-content form-horizontal frm-entity frm-detail kpi_setting_form">
                <div>
                    <form class="form-horizontal frm-entity frm-detail " ref="kpiForm" @submit.prevent="onAddKPIForm">
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">KPI</label>
                            <div class="controls col-md-10 ">
                                <select class="form-control col-md-4" name="kpis[type]" v-model="kpi_name">
                                    <option 
                                        v-for='kpi in kpiNameList' 
                                        :key="kpi.value"
                                        :value="kpi.value"
                                    >{{ kpi.label}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group form-group" v-if="kpi_name == 'click_hijacking'">
                            <label class="control-label col-md-2">Maximum CTIT</label>
                            <div class="controls col-md-10 ">
                                <input type="text" name="kpis[event_param]" value="10" required="" class="form-control col-md-4" disabled> s
                            </div>
                        </div>
                        <div class="control-group form-group" v-if="kpi_name == 'click_flood'">
                            <label class="control-label col-md-2">Minimum CTIT</label>
                            <div class="controls col-md-10 ">
                                <input type="text" name="kpis[event_param]" value="3600" required="" class="form-control col-md-4" disabled> s
                            </div>
                        </div>
                        <div class="control-group form-group" v-if="kpi_name == 'retention'">
                            <label class="control-label col-md-2">Day</label>
                            <div class="controls col-md-10 ">
                                <select class="form-control col-md-4" name="kpis[event_param]">
                                    <option :value="i.key" v-for="i in kpiNameList.retention.days">{{ i.label }}</option>

                                    <!-- <option value="1">Day 1</option>
                                    <option value="2">Day 2</option>
                                    <option value="3">Day 3</option>
                                    <option value="4">Day 4</option>
                                    <option value="5">Day 5</option>
                                    <option value="6">Day 6</option>
                                    <option value="7">Day 7</option>
                                    <option value="30">Day 30</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">KPI Index</label>
                            <div class="controls col-md-10 ">
                                <input type="number" step='0.01' name="kpis[quality]" required="" class="form-control col-md-4" placeholder="kpi index (between 0 and 100)" pattern="^(?!0+(?:\.0+)?$)\d?\d(?:\.\d\d?)?$"> %
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-2">KPI Weighting</label>
                            <div class="controls col-md-offset-2 col-md-10 ">
                                <input type="text" name="kpis[wighting]" required="" class="form-control col-md-4" placeholder="kpi weighting (between 0 and 1)" pattern="^(0(\.\d+)?|1(\.0+)?)$"> 
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <div class="controls col-md-offset-2 col-md-4">
                                <button type="submit" class="btn btn-primary"  >Add</button>
                            </div>
                        </div>
                    </form>
                    <div class="col-md-10 col-md-offset-2">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td>KPI</td>
                                    <td>KPI Index</td>
                                    <td>KPI Weighting</td>
                                    <td>Monitor</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in kpi_settings" :class="editIndex === index ? 'highlight' : ''">
                                    <td v-html="transType(item.type, item.event_param)"></td>
                                    <!-- <td v-html="transType(kpiNameList[item.type].label)"></td> -->
                                    <td>{{(item.quality*100).toFixed(2)}} %</td>
                                    <td>{{item.wighting}}</td>
                                    <td>
                                        <!-- <el-common-switch
                                        v-model="item.is_monitor"
                                        active-value="1"
                                        inactive-value="0"
                                        active-color="#f70"
                                        inactive-color="#e6e6e6">
                                        </el-common-switch> 
                                        -->
                                        <i-switch v-model="item.is_monitor" true-value="1" false-value="0" />
                                    </td>
                                    <td> 
                                        <button type="button" class="btn btn-primary" @click="editKPIItem(item,index)">Edit</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button type="button" class="btn btn-primary" @click="delKPIItem(item.id,index)">Delete</button>    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
               
                <div class="">
                    <div class="col-md-10 col-md-offset-2 ">
                        <button type="submit" class="btn btn-primary" @click="onClickSaveBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

   <!--  <editKPISettingModal :modalState="modalState" :hideModal="hideModal" :showAlert="showAlert" :kpiItem="kpiItem"  :onConfirm="saveKPI"></editKPISettingModal> -->
   <edit-kpi-setting-modal
        :modalState.sync="modalState"
        :showAlert="showAlert"
        :kpiItem="kpiItem"
        :onConfirm="saveKPI"
        :dialogName="'modalState'"
    ></edit-kpi-setting-modal>


</div>
</template>

<script>
import Vue from "vue"
import mixin_modal from '@/mixins/modal'
import StringUtil from '@/util/stringUtil'
import { defaultKpiNameList, mergeKpiSettingName } from '../../config/config'

const EditKpiSettingModal = () => import(
/* webpackChunkName: "EditKpiSettingModal" */ '../../components/edit-kpi-setting-modal/');

export default {
    data() {
        return {
            id:this.$route.query.id,
            currentFormStatus:"add",
            setting_switch:false,
            kpi_settings:[],
            kpiItem:{},
            loadingZone: false,
            editIndex:-1,
            kpi_name:"cr",
            defaultKpiNameList: {},
            renderOffer:false
        }
    },
    props:{
        ocpaData:{
            default:{}
        },
        showAlert:{},
        offerKpiSettingEvents: {
            type: Array,
            datault: []
        }
    },
    computed: {
        kpiNameList() {
            return mergeKpiSettingName(this.defaultKpiNameList, this.offerKpiSettingEvents)
        }
    },
    watch: {
      ocpaData() {
        let tmpArr = (this.ocpaData && this.ocpaData.kpis) ?  this.ocpaData.kpis : []
        this.kpi_settings = _.cloneDeep(tmpArr)
      },
        setOfferEditAuth:{}
    },
    mixins:[mixin_modal],
    components:{EditKpiSettingModal},
    methods:{
        
        onAddKPIForm($event) {
            let that = this;
            let $form = $(this.$refs.kpiForm)
            let quality = $form.find("[name='kpis[quality]']").val()
            let wighting = $form.find("[name='kpis[wighting]']").val()
            let event_param = $form.find("[name='kpis[event_param]']").val() || 0
            let type = $form.find("[name='kpis[type]']").val()
            let is_monitor = 0

            if ( quality <= 0) {
                return this.showAlert("KPI index must be greater than 0")
            }

            if (wighting <= 0) {
                return this.showAlert("KPI weight must be greater than 0")
            }

            if(!this.isRepeat(type, event_param)) {
                let msg = this.kpiNameList[type].tmp 
                    ? (StringUtil.replaceTmp(this.kpiNameList[type].tmp, { event_param })).replace(/\<\/br\>/, '')
                    : this.kpiNameList[type].label
                
                return this.showAlert(`You have added the type ${msg}`, "info")
            }

            this.kpi_settings.push(
                {
                    type,
                    event_name: this.kpiNameList[type]['event_name'],
                    event_param,
                    wighting,
                    quality: quality *100 / 10000,
                    is_monitor
                }
            )
            $form[0].reset()
        },

        isRepeat(type, event_param) {
            return event_param 
              ? !_.find(this.kpi_settings, { type, event_param })
              : !_.find(this.kpi_settings, { type })
        },
        saveKPI(item) {
            let index = _.findIndex(this.kpi_settings, {type: item.type})
            /*this.kpi_settings.splice(index,1, item)*/
            this.kpi_settings[this.curentIndex] = item
            this.editIndex = this.curentIndex
            this.hideModal()
        },
        transType(key, event_param) {
            if(this.kpiNameList.hasOwnProperty(key)) {
                if(this.kpiNameList[key].tmp && event_param) {
                    return StringUtil.replaceTmp(this.kpiNameList[key].tmp, { event_param })
                }
                return this.kpiNameList[key].label
            }
            return key.replace(/\_/g, ' ').replace(/\b[a-z]/g, char => char.toUpperCase())
        },
        editKPIItem(item,index) {
            this.curentIndex = index
            this.editIndex = -1;
            this.kpiItem = _.clone(item);
            this.modalState = 'show'
        },

        isLargerThanOne(arr) {
            var count = 0
            var key = 0
            for(key in arr) {
                count += parseFloat(arr[key])
            }
            if(count > 1) return true
            else return false
        },
        isEqualWithOne(arr) {
            var count = 0
            var key = 0
            for(key in arr) {
                count += parseFloat(arr[key])
            }
            if(count === 1) return true
            else return false
        },
        switchQualityRating(newVal) {
            this.switch_quality_rating = !!newVal;
        },
        onClickSaveBtn() {
            this.getOfferStatus(this.saveOfferKPI)
        },

        getOfferStatus(callback) {
            let that = this;
            let params = {
                offer_id: that.id
            }
            Vue.http.get("Ocpa/datastatusofferocpakpi", {params:params}).then(response => {
                let data =  response.body && response.body.data
                if(data && data.status) {
                    callback && callback()
                } else {
                    return that.showAlert("Please wait, the kpi setting is saving.")
                }
            }, response => {
                // error callback
                this.setting_switch = false
                that.showAlert(response.body.msg);
            })

        },
        saveOfferKPI() {
            let that = this
            let arr = _.pluck(this.kpi_settings, "wighting") || []
            
            let params = {
                offer_id:this.id,
                kpis: []
            }
            
             var key;
             _.each(this.kpi_settings, function(item, key){
                  params.kpis.push({
                      type:item.type,
                      wighting:item.wighting,
                      quality:item.quality,
                      event_name: item.event_name,
                      event_param: item.event_param,
                      is_monitor: item.is_monitor
                  })
             })

             if (this.kpi_settings.length == 0) params.kpis = ''

            this.loadingZone = true
            Vue.http.post("Ocpa/addofferocpakpi", params).then(response => {
                let data =  response.body && response.body.data
                that.showAlert("Save Success!", "success")
                this.loadingZone = false
                this.setting_switch = false
            }, response => {
                // error callback
                this.loadingZone = false
                this.setting_switch = false
                that.showAlert(response.body.msg);
            })
        },
        delKPIItem: function(id,index){
            
            let that = this
            Vue.http.get("Blend/getConfig?offer_id="+ that.$route.query.id).then(response => {
                let result = response && response.body.data
                let kpi_ids = result ? (result.kpi_ids ? result.kpi_ids : []) : []
                if (kpi_ids.indexOf(id) !== -1){
                    that.showAlert('This KPI is being used！');
                }
                else {
                    this.kpi_settings.splice(index, 1)
                }
                
            }, response => {
                // error callback
                that.showAlert(response.body.msg);
            })  
        }
    },
    mounted(){
        let tmpArr = (this.ocpaData && this.ocpaData.kpis) ?  this.ocpaData.kpis : []
        this.kpi_settings = _.cloneDeep(tmpArr)
        this.renderOffer = true
    },
    created() {
        this.defaultKpiNameList = defaultKpiNameList
    }

}
</script>