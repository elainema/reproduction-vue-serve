<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :confirmText="confirmText"
        :cancelText="cancelText"
        :onConfirm="onConfirmBtn"
        :dialogWidth="'900px'"
        :clickOnCancel="resetData"
        :cancelOnLeft="true"
        :onCancel="handleClose">
        <template slot="dialogBody">
            <form class="form-horizontal" ref="form" id="editBlendTraffic">
                <div class="control-group form-group">
                    <p class="mb10">Please chose Publisher and set percent for blend traffic (refer to yesterday's data)</p>
                    <div class="col-md-4">
                        <el-select v-model="aff_id" filterable clearable placeholder="-Publisher ID-" no-data-text="No Result" style="width:280px">
                            <el-option
                            v-for="item in accessInfo"
                            :key="item.id"
                            :label="item.id + ' ' + item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-primary" @click.prevent="addData">Add</button>
                    </div>
                </div>
                <div class="control-group form-group">
                    <div class="col-md-12">
                        <el-table
                            :data="searchData"
                            empty-text="There is no data."
                            border
                            :span-method="objectSpanMethod"
                            style="width: 100%; margin-top: 20px">
                            <el-table-column
                                prop="aff_id"
                                label="Publisher Id">
                            </el-table-column>
                            <el-table-column
                                prop="affiliate"
                                label="Publisher Name">
                            </el-table-column>
                            <el-table-column
                                prop="click"
                                label="Click">
                            </el-table-column>
                            <el-table-column
                                prop="conversion"
                                label="Conversion">
                            </el-table-column>
                            <el-table-column
                                label="Shadow Affiliate Id"
                                width="210">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.shadow_aff_id" filterable placeholder="- -" no-match-text="No Result" @change="caculateRate(scope.row,scope.$index,'sid')" @focus="setOldShadowId">
                                        <el-option-group 
                                            v-for="group in shadowChosen"
                                            :key="group.value"
                                            :label="''">
                                            <el-option 
                                                v-for="item in group.options"
                                                :disabled="false"
                                                :key="item.value" 
                                                :label="item.text" 
                                                :value="item.value">
                                            </el-option>
                                        </el-option-group>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Percent"
                                width="150">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.rate" placeholder="- -" no-match-text="No Result" @change="caculateRate(scope.row,scope.$index,'rate')" @focus="setOldRate" >
                                        <el-option
                                        v-for="o in rateChosen"
                                        :key="o.value"
                                        :label="o.label"
                                        :value="o.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </form>
        </template>
    </modal>
</div>
</template>

<script>
import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
export default{
    name:'EditBlendTrafficModal',
    data() {
        return {
            confirmText:'Save',
            cancelText:'Reset',
            title:'Edit Blend Traffic',
            visible:false,
            resultData:[],
            tplData:[],
            searchData:[],
            loadingZone: true,
            aff_id: "",
            spanArr:[],
            rateChosen: [
                { value: 0.1,label: '10%'},
                { value: 0.2,label: '20%'},
                { value: 0.3,label: '30%'},
                { value: 0.4,label: '40%'},
                { value: 0.5,label: '50%'},
                { value: 0.6,label: '60%'},
                { value: 0.7,label: '70%'},
                { value: 0.8,label: '80%'},
                { value: 0.9,label: '90%'},
                { value: 1,label: '100%'},
            ],
            oldRate: 1,
            oldShadowId: ""
        }
    },
    computed:{
        // 包括正常渠道和影子渠道
        shadowChosen() {
            return this.shadowAffiliate || []
        }
    },
    mixins:[mixin_dialog],
    props: {
        modalState: {
          type: [Boolean,String],
          required: true,
          default: false
        },
        dialogName: {
          type: String,
          required: true,
        },
        showAlert: {
          type: Function,
          required: true
        },
        lastDayData: {
            type: Array,
            default: ()=>{}
        },
        onConfirm: {
          type: Function,
          required: true
        },
        showAlert:{
          type: Function,
          required: true
        },
        accessInfo:{
          type: Array,
          required: true
        },
        shadowAffiliate:{
          type: Array,
          required: true
        }
    },
    components: {
        Modal
    },
    methods: {
        onConfirmBtn: function() {
          this.onConfirm({
            saveData: _.filter(this.searchData, function(o) {
                return (parseInt(o.shadow_aff_id) > 0) && (parseFloat(o.rate) !=0)
            })
          });
          this.handleClose();
        },
        setOldRate(e){
            this.oldRate = parseFloat((e.target.value.replace('%','')/100).toFixed(2))
        },
        setOldShadowId(e){
            this.oldShadowId = e.target.value
        },
        //计算rate及分配
        caculateRate(o,index,type){
            /*为空计算总数是否为1
                为1：都有sid不动，没有sid则删掉没的那个；为 < 1: 都有sid 就拆，有没有sid的就给其匀值； 为 > 1: 有sid的删掉sid修正自己的rate，没sid的修正自己的rate
            */
            //计算总和
            //拆分前aff对象个数
            let len = this.searchData.length
            let allRate = 0
            let emptyShadowObj = []
            let emptyShadowIndex = []
            let lastAffiliateIndex = []
            let sameAffiliateObj = []
            let sameAffiliateIndex = []
            let tmpArr = _.filter(this.searchData, (row,rowIndex)=>{
                if (row.aff_id == o.aff_id && row.shadow_aff_id == ''){
                    emptyShadowObj.push(row)
                    emptyShadowIndex.push(rowIndex)
                }
                if (row.aff_id == o.aff_id && o.shadow_aff_id == row.shadow_aff_id){
                    sameAffiliateObj.push(row)
                    sameAffiliateIndex.push(rowIndex)
                }
                if (row.aff_id == o.aff_id && row.shadow_aff_id != ''){
                    lastAffiliateIndex.push(rowIndex)
                    return true
                }
            })
            //如果shadow_id已选，则合并
            if (type == 'sid'){
                if (emptyShadowObj.length > 1){
                    let emptyAllRate = 0
                    for (let eItem of emptyShadowObj){
                        emptyAllRate += parseFloat(eItem.rate)
                    }
                    emptyAllRate = parseFloat(emptyAllRate.toFixed(2))
                    this.searchData[emptyShadowIndex[0]].rate = emptyAllRate
                    this.searchData.splice(emptyShadowIndex[1],1)
                    this.resetFormat(this.searchData)
                    return
                }
                if (sameAffiliateObj.length >1){
                    let affAllRate = 0
                    for (let aItem of sameAffiliateObj){
                        affAllRate += parseFloat(aItem.rate)
                    }
                    affAllRate = parseFloat(affAllRate.toFixed(2)) 
                    this.searchData[sameAffiliateIndex[0]].rate = affAllRate
                    this.searchData.splice(sameAffiliateIndex[1],1)
                    this.resetFormat(this.searchData)
                    return
                }
            }

            //算rate的和
            for (let v of tmpArr) {
                allRate += parseFloat(v.rate) 
            }
            allRate = parseFloat(allRate.toFixed(2)) 
            if (allRate < 1 && allRate > 0){
                if (emptyShadowObj.length == 0){
                    //拆分
                    this.searchData.splice(index+1,0,{
                        "offer_id": this.$route.query.id,
                        "aff_id": o.aff_id,
                        "shadow_aff_id": "",
                        "click": o.click,
                        "conversion" : o.conversion, 
                        "rate": parseFloat((1 - allRate).toFixed(2)), 
                        "affiliate": o.affiliate
                    })
                }
                else { //给没sid的匀值
                    this.searchData[emptyShadowIndex[0]]['rate'] = parseFloat((1 - allRate).toFixed(2)) //剩下的那个值
                }
            }
            else if (allRate > 1) {
                if (emptyShadowObj.length == 0){
                    o.rate = parseFloat((o.rate - (allRate - 1)).toFixed(2))
                    this.showAlert("Rate should not exceed 1","info");
                    return false
                }
                else { //多的分给没sid  
                    this.showAlert("Rate should not exceed 1","info");
                    o.rate = this.oldRate
                }
            }
            else if (allRate == 1){
                if (emptyShadowObj.length > 0){
                    this.searchData.splice(emptyShadowIndex[0],1)
                }
            }
            this.resetFormat(this.searchData)
        },
        resetFormat(data){
            this.spanArr = []
            this.getSpanArr(data)
        },
        getLastDayAffDataByOffer(){
            let that = this
            Vue.http.get("Report/getLastDayAffDataByOffer?offer_id="+ that.$route.query.id).then(response => {
                this.loadingZone = false 
                let result = response && response.body.data
                that.tplData = result || []
                that.resultData = this.mergeData()
                
                that.searchData = _.cloneDeep(that.resultData)
                that.resetFormat(that.searchData)
            }, response => {
                // error callback
                that.showAlert(response.body.msg);
            }) 
        },
        resetData(){
          this.aff_id = ''
          this.searchData = _.cloneDeep(this.tplData)
          this.resetFormat(this.searchData)
        },
        //计算参量是否为100%，给不满100%的展示剩余的量
        countAndSetRemaining(lastDayKey,resultArray) {
          let that = this;
          let aff_ids = _.sortedUniq(lastDayKey);
          let offer_id = ''
          for (let id of aff_ids) {
            let rate = 1
            let currentItems = _.filter(that.lastDayData, function(o) {
              return o.aff_id == id; 
            });
            _.forEach(currentItems, (v) => {
              offer_id = v.offer_id
              rate -= v.rate
            })
            rate = rate.toFixed(2)
            if (rate > 0) {
              let index = _.findLastIndex(resultArray, function(o) { return o.aff_id == id; });
              let item = {
                offer_id:offer_id,
                aff_id:id,
                shadow_aff_id:'',
                rate:rate,
                update:'',
                affiliate:'unknow',
              }
              resultArray.splice(index + 1, 0, item);
            }
          }
          return resultArray
        },
        mergeData(){
          let that = this
          let resultArray = _.cloneDeep(that.lastDayData)
          let lastDayKey = []
          _.forEach(that.lastDayData,function(item){
              lastDayKey.push(item.aff_id)
          })
          _.forEach(that.tplData,function(item2,key){
              
              if (item2.rate == undefined){
                  item2.rate = 1
              }
              if (item2.shadow_aff_id == undefined){
                  item2.shadow_aff_id = ""
              }
              if (lastDayKey.indexOf(item2.aff_id) == -1){
                  resultArray.push(item2)
              }
          })

          resultArray = this.countAndSetRemaining(lastDayKey,resultArray)

          _.forEach(resultArray,function(v,k){
              v.rate = parseFloat(v.rate)
          })
          return resultArray;
        },
        addData(){
            if (this.aff_id == ''){
                this.showAlert("Publisher ID can not be empty!");
                return
            }
            if (_.filter(this.searchData,{'aff_id': this.aff_id.toString()}).length > 0){
                this.showAlert("Publisher ID already exists!","info");
                return
            }
          let chosenObj = _.filter(this.accessInfo, {'id': this.aff_id})
          let obj = {
              "offer_id": this.$route.query.id,
              "aff_id": this.aff_id,
              "shadow_aff_id": "", 
              "click": "",
              "conversion": "",
              "rate": 1, 
              "affiliate": chosenObj[0].name
          }
          this.searchData.push(obj)
          this.resetFormat(this.searchData)
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
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex < 4) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        /*setPubliserToShadowAffs() {
            this.shadowChosen = []
            let pub = {
                label: 'pub',
                options:[{'value': '', 'text': '- -'}]
            }
            for (let item of this.accessInfo){
                pub.options.push({'value': item.id, 'text': item.id})
            }
            this.shadowChosen.push(pub)
        },
        getInitData() {
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
            that.shadowChosen.push(shadowChosen)

            this.getLastDayAffDataByOffer();
        }*/
    },
    watch: {
        modalState (val) {
            this.visible = this.modalState
            if (val){
              this.resultData = this.mergeData()
              if (this.resultData){
                this.searchData = _.cloneDeep(this.resultData)
                this.resetFormat(this.searchData)
              }
              this.aff_id = ""
            }
        },
        /*accessInfo: {
            handler() {
                this.getInitData()
            },
            immediate: true
        }*/
    },
    created() {
       this.getLastDayAffDataByOffer();
    },
    mounted () {
    }
}
</script>

<style lang="less">
#editBlendTraffic{
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
    }
}
</style>