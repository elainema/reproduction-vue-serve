<template>
<div id="automaticBlendTraffic"  v-yeah-loading='loadingZone'>
  <div class="control-group form-group">
    <label class="control-label col-md-2">Affiliates<span class="red">*</span></label>
    <div class="col-md-10">
      <div class="control-group form-group">
        <label class="control-label col-md-2">Shadow Affiliate</label>
        <div class="col-md-10">
          <el-select 
            v-model="shadow_aff_id" 
            filterable 
            :disabled="autoStart"
            :placeholder="option0" 
            no-match-text="No Result">
            <el-option-group 
                v-for="group in allShadowAffiliatesAuto"
                :key="group.value"
                :label="''">
                <el-option 
                    v-for="item in group.options"
                    :key="item.value" 
                    :label="item.text" 
                    :value="item.value">
                </el-option>
            </el-option-group>
          </el-select>
        </div>
      </div>
      <div class="control-group form-group">
        <label class="control-label col-md-2">KPI</label>
        <div class="col-md-10">
          <el-select 
            :disabled="autoStart"
            ref="selectProvince"
            v-model="kpi_ids" 
            multiple
            filterable 
            :placeholder="option1" 
            no-match-text="No Result" >
            <el-option
              v-for="item in mutipleChosenKpis"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="control-group form-group">
        <label class="control-label col-md-2">Affiliate</label>
        <div class="col-md-10">
          <el-select 
            :disabled="autoStart"
            v-model="aff_id" 
            filterable 
            :placeholder="option2" 
            no-match-text="No Result">
            <el-option 
                v-for="item in accessInfoId"
                :key="item" 
                :label="item" 
                :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="control-group form-group middle">
        <label class="control-label col-md-2">Tech Affiliate</label>
        <div class="col-md-10">
          <el-select 
            :disabled="autoStart"
            v-model="tech_aff_id" 
            filterable 
            :placeholder="option3" 
            no-match-text="No Result">
            <el-option 
                v-for="item in techAffs"
                :key="item" 
                :label="item" 
                :value="item">
            </el-option>
          </el-select>
          <a href="#" class="btn btn-primary btn_add_payout ml20" data-control-name='bt-button' @click.prevent="addShadowAffiliate" :disabled="disabledBtn" v-yeah-loading='adding'>Add</a>
        </div>
      </div>
    </div>
  </div>
  <div class="control-group form-group">
    <label class="control-label col-md-2"></label>
    <div class="col-md-10">
      <el-table
        :data="automaticData"
        empty-text="There is no data."
        border
        fit
        style="width: 100%;"
        key='automatic'>
        <el-table-column
          prop="shadow_aff_id"
          label="Shadow Affiliate"
          width="130">
        </el-table-column>
        <el-table-column
            prop="kpi_ids"
            label="KPI">
            <template slot-scope="scope"> 
              {{getKpiNames(scope.row.kpi_ids)}}
            </template>
        </el-table-column>
        <el-table-column
            prop="aff_id"
            label="Affiliate">
        </el-table-column>
        <el-table-column
            prop="tech_aff_id"
            label="Tech Affiliate">
        </el-table-column>
        <el-table-column
            prop="status"
            width="120"
            label="Status">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" @change="editAutoBlendTraffic(scope.row)" :disabled="autoStart || checkStatusIfDisabled(scope.row.status)">
                <el-option  
                  v-for="item in statusList"
                  :key="item.value"
                  :disabled="disableOption(item,scope.row.status)"
                  :label="item.text" 
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <a href="#" class="btn" data-control-name="bt-button" @click.prevent="showModal(scope.row)" :disabled="autoStart">
              <i class="fa fa-remove icon-white"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div class="control-group">
      <div class="col-md-10 col-md-offset-2 blend_traffic">
          <button class="btn btn-primary" :disabled="automaticData.length == 0"  @click="switchCallBackAutomatic" v-yeah-loading='loadingBtn'>{{autoText}}</button>  
      </div>
  </div>
  
  <modal 
    :dialogVisible.sync="showConfirmModal"
    :title="title"
    :dialogBody="dialogBody"
    :dialogFooter="true"
    :dialogWidth="'700px'">
    <template slot="dialogFooter">
      <div>
        <button type="button" class="el-button el-button--primary" @click.prevent="removeAutoBlendTraffic(0)">Confirm Keep Tech affiliate approved</button> 
        <button type="button" class="el-button el-button--primary" @click.prevent="removeAutoBlendTraffic(1)">Confirm&Block tech affiliate</button>
        <button type="button" class="el-button el-button--default" @click.prevent="HideConfirmModal"><span>Cancel</span></button>
      </div>
    </template>
  </modal>
</div>
</template>


<script>
import Vue from "vue";
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

export default {
  name: 'AutomaticBlendTraffic',
  data(){
    return {
      offer_id: this.$route.query.id,
      option0:'- Select a shadow affiliate -',
      option1:'- Please select kpi -',
      option2:'- Please select an affiliate -',
      option3:'- Please select a tech affiliate -',
      currentShadowAffiliate:'',
      selectedOptionValue:'',
      showConfirmModal:false,
      title:'Confirm?',
      dialogBody:'Confirm edit ?',
      techAffs:[],
      automaticData:[],
      isToBeDeletedId:'',
      aff_id:'',
      tech_aff_id:'',
      shadow_aff_id:'',
      kpi_ids:[],
      disabledBtn:true,
      kpi_names:'',
      statusList:[
        {
          value:'active',
          text:'Active'
        },
        {
          value:'paused',
          text:'Paused'
        },
        {
          value:'stopped',
          text:'Stopped'
        },
      ],
      is_manual_blend:0, //是否是人工参量
      adding:false,
      accessInfoId:[],
      loadingZone:true,
    }
  },
  watch:{
    aff_id(){
      this.checkIfDisabled()
    },
    tech_aff_id(){
      this.checkIfDisabled()
    },
    shadow_aff_id(){
      this.checkIfDisabled()
    },
    kpi_ids(){
      this.checkIfDisabled()
    },
    accessInfoIdOnly() {
      this.removeTechAffFromTrueAff()
    }
  },
  props:{
    switchCallBackAutomatic:{
      type:Function,
      required:true
    },
    autoText:{
      type:String,
      required:true
    },
    loadingBtn:{
      type:Boolean,
      required:true
    },
    showAlert:{
      type:Function,
      required:true
    },
    allShadowAffiliatesAuto:{
      type:Array,
      required:true
    },
    mutipleChosenKpis:{
      type:Array,
      required:true
    },
    accessInfoIdOnly:{
      type:Array,
      required:true
    },
    autoStart:{
      type:Boolean,
      required:true
    },
  },
  components: {Modal},
  methods:{
    disableOption(item,current) {
      if (current != 'stopped') {
        return true
      } else {
        if (item.value != 'active') {
          return true
        } else {
          return false
        }
      }
    },
    removeTechAffFromTrueAff() {
      this.loadingZone = true
      let techAffs = this.techAffs
      let accessInfoIdOnly = this.accessInfoIdOnly
      this.accessInfoId = _.difference(accessInfoIdOnly, techAffs);
      this.loadingZone = false
    },
    HideConfirmModal(){
      this.showConfirmModal = false
    },
    checkIfCanEdit(status) {
      if (status == 'stopped' && !this.is_manual_blend) {
        return true
      } else {
        return false
      }
    },
    checkIfDisabled(){
      if (this.aff_id != '' && this.tech_aff_id != '' && this.shadow_aff_id != '' && this.kpi_ids.length > 0) {
        this.disabledBtn = false
      } else {
        this.disabledBtn = true
      }
    },
    checkStatusIfDisabled(status) {
      if (status == 'paused' || status == 'active') {
        return true
      } else {
        return false
      }
    },
    showModal(scoped) {
      this.isToBeDeletedId = scoped && scoped.id
      this.showConfirmModal = true
    },
    getKpiNames(kpi_ids){
      let that = this
      if (!kpi_ids) return ''
      if (Object.prototype.toString.call(kpi_ids) == "[object String]") {
        kpi_ids = kpi_ids.split(",")
      }
      if (Object.prototype.toString.call(kpi_ids) == "[object Array]") {
        let kpi_names = []
        for (let item of kpi_ids) {
          let selectedId = item
          let selected = _.find(that.mutipleChosenKpis, function(o) { return o.id == selectedId; })
          if (selected) {
            let _name = selected.label || ''
            kpi_names.push(_name)
          }
        }
        return kpi_names.join(",")
      }
    },
    // 创建自动参量
    addShadowAffiliate() {
        this.adding = true
        let vm = this
        let isAdded = _.findIndex(this.automaticData, function(o) { return o.shadow_aff_id == vm.shadow_aff_id; });
        //if (isAdded >= 0) return
        let offer_id = this.offer_id
        let aff_id = this.aff_id
        let tech_aff_id = this.tech_aff_id.toString()
        let shadow_aff_id = this.shadow_aff_id.toString()
        let kpi_ids = this.kpi_ids.toString()
        let query = {
          offer_id,
          aff_id,
          tech_aff_id,
          shadow_aff_id,
          kpi_ids
        }
        Vue.http.post("Blend/createAff",query).then(response => {
          vm.getAutoBlendTrafficList()
          this.aff_id = this.tech_aff_id = this.shadow_aff_id = '' 
          this.kpi_ids = []
          this.adding = false
        }, response => {
          this.adding = false
          vm.showAlert(response.body.msg);
        })
    },
    // 获取黑科技渠道列表
    getTechAffs() {
      let that = this
      Vue.http.get("Blend/getTechAffs").then(response => {
        let result = response && response.body.data || []
        that.techAffs = result
        that.removeTechAffFromTrueAff()
      }, response => {
        that.showAlert(response.body.msg);
      })  
    },
    // 获取自动混量列表
    getAutoBlendTrafficList() {
      let offer_id = this.offer_id
      let that = this
      Vue.http.get("Blend/getAffs?offer_id="+ offer_id).then(response => {
        let result = response && response.body.data || []
        that.automaticData = result
      }, response => {
        that.showAlert(response.body.msg);
      }) 
    },
    // 编辑自动参量的  目前只支持激活(active)操作
    editAutoBlendTraffic(row) {
      let query = {
        id:row.id,
        status:'active'
      }
      Vue.http.post("Blend/editAff",query).then(response => {
          this.getAutoBlendTrafficList()
      }, response => {
          that.showAlert(response.body.msg);
      })
    },

    // 删除自动混量组合
    removeAutoBlendTraffic(block_tech_aff) {
        this.loadingZone = true 
        let that = this;
        let query = {
          id:this.isToBeDeletedId,
          block_tech_aff: block_tech_aff
        }
        Vue.http.post("Blend/delAff",query).then(response => {
            this.loadingZone = false 
            this.getAutoBlendTrafficList()
        }, response => {
            // error callback
            this.loadingZone = false 
            that.showAlert(response.body.msg);
        })
        this.HideConfirmModal()
    },
  },
  created () {
    this.getTechAffs()
    this.getAutoBlendTrafficList()
  }
}
</script>
<style lang="less">
#automaticBlendTraffic{
  .el-select__tags{ 
    input[type=text]{
      margin-left: 0;
      padding-left: 0;
      border-radius: 0;
      float: none;
      display: inline-block;
      width: auto;
      max-width: auto;
      height: auto;
      padding: 0;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color:transparent;
      background-image: none;
      border: none;
      min-height: 26px;
      &:focus{
        border: 0;
        outline: 0;
        box-shadow: none;
      }
    }
  }
  .el-dialog__footer .el-button--primary, .el-dialog__footer .el-button {
    padding: 7px 5px;
  }
  .el-button+.el-button{
    margin-left: 5px;
  }
}
</style>