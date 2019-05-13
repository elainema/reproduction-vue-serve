<template>
<div id="report_container">
    <div class="filter-bar" v-show="showBar">
        <groupByBar :checkModel="checkModel" :curTab="reportDataName[0]" :listOrder="listOrder" ref="groupBar"
        :tabIds="tabIds" @changeGroupByHandler="changeGroupBy" :getBarLength.sync="barLength"></groupByBar>
    </div>
    <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page.total"></pagination_report>
    <div class="overflow_scroll">
        <table class="list-table table table-hover tablesorter"  id="report_list">
            <thead>
                <tr>
                    <th v-if="showBar && barLength > 0"><input type="checkbox" v-model="checkAll" @change="changeCheckState"/></th>
                    <th v-for="(item,index ) in reportDataName" :class="item === 'advertiser_id' || item === 'offer_id' || item === 'aff_id' || item === 'click' || item === 'conversion' || item === 'cost' || item === 'revenue' || item === 'profit'|| item === 'acpa'|| item === 'rpc'|| item === 'cpc'|| item === 'arpa'|| item === 'CR(Gross)' || item === 'Gross Clicks'|| item === 'Unique Clicks'|| item === 'hour'|| item === 'year'|| item === 'month'|| item === 'week'|| item === 'date' || item === 'ctr'? '' : 'no_sort' " @click.stop.prevent="onClickThInner(item, $event)" >{{item | capitalize}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="reportData.length == 0"><td class="noRecord">{{ noRecord }}</td></tr>
                <template v-if="reportData.length > 0">
                    <tr v-for="(item,index) in reportData">
                        <td v-if="showBar && barLength > 0"><input type="checkbox" v-model="checkModel" :value="item" /></td>
                        <td v-for="(_item,_index ) in item"  >
                            <router-link style="color:#3a8bcc" :to="'p_manage_aff?id=' + _item" title="" target="_blank" v-if="reportDataName[_index] === 'aff_id'"> {{_item}} </router-link>
                            <router-link style="color:#3a8bcc"  :to="'p_manage_offer?id=' + _item" title="" target="_blank"  v-else-if="reportDataName[_index] === 'offer_id'"> {{_item}} </router-link>
                            <router-link style="color:#3a8bcc"  :to="'p_manage_aff?id=' + item[reportDataName.indexOf('aff_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'affiliate'"> {{_item}} </router-link>
                            <router-link style="color:#3a8bcc"  :to="'p_manage_offer?id=' + item[reportDataName.indexOf('offer_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'offer_name'"> {{_item}} </router-link>
                            <router-link style="color:#3a8bcc"  :to="'p_manage_adv?id=' + item[reportDataName.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'advertiser'"> {{_item}} </router-link>
                            <router-link style="color:#3a8bcc"  :to="'p_manage_adv?id=' + item[reportDataName.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'advertiser_id'"> {{_item}} </router-link>
                            <span v-else>{{_item}}</span>
                        </td>
                    </tr>
                </template>
                <tr class="font-bold" v-if="reportData.length" >
                    <td v-if="showBar && barLength > 0"></td>
                    <td data-nowrap="true">Page Total</td>
                    <td data-nowrap="true" v-for="(item,key,index ) in reportDataCal" v-text="item" v-if="index !== 0"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page.total"></pagination_report>
</div>
</template>
<script>
import Vue from 'vue'

import pagination_report from '@/components/Pagination_report.vue'
import groupByBar from './groupby-result.vue'

export default {
    data(){
        return {
            page:{},
            currentPage:1,
            checkModel:[],
            reportDataName:[],
            reportData:[],
            reportDataCal: {},
            noRecord:'',
            checkAll:false,
            reportCache: [],
            nameCache: [],
            pageCache: [],
            groupByMember:['advertiser_id','offer_id','aff_id','publisher_app_id'],
            barLength:'',
            curTab:''
        }
    },
    computed:{
        showBar(){
            let resultArr = this.getArrEqual(this.reportDataName,this.groupByMember)
            //有数据并且当前是online或者结果中两个及以上维度的非online才显示
            if ((resultArr.length === 1 || this.listOrder.length !=0 ) && this.reportData.length !=0){
                this.$refs.groupBar.getGroupByOption()
                return true
            } 
            else return false
        }
    },
    props:{
        orgReportData:{
            type: Object,
            default: function(){
                return {}
            }
        },
        renderChart:{
            type: Function
        },
        changeGroupByHandler:{
            type: Function
        },
        getMoreReportData:{
            type: Function
        },
        showAlert:{
            type: Function
        },
        listOrder: {
            type: Array,
            default: function(){
                return []
            }
        },
        tabIds:{
            type: Object,
            default(){
                return {}
            }
        },
        onClickTh:{
            type: Function
        }
    },
    components:{pagination_report,groupByBar},
    watch:{
        checkModel:function(val){
            if (val.length == 0 || val.length < this.reportData.length){
                this.checkAll = false
            }
            if (val.length == this.reportData.length && val.length != 0){
                this.checkAll = true
            }
        },
        orgReportData(val){
            this.clearOriginData(val)
            this.setReportCache(val)
            //真正得到数据时render
            if (val.render) this.renderReport(this.getReportFromCache())
        },
        deep:true
    },
    methods: {
        onClickThInner(name, $event){
            this.$emit('onClickTh',name, $event)
        },
        clearOriginData(data){
            if (data.flag){
                this.reportCache = []
                this.nameCache = []
                this.pageCache = []
                this.currentPage = 1
                this.checkModel = []
                this.reportDataName = []
                this.reportData = []
                this.reportDataCal = {}
                this.page = {}
            }
        },
        setReportCache(data){
            let _name = data.data ? data.data[0] : [];
            let _page = data.data ? data.page : []
            let _data  = data.data ? data.data.slice(1,data.data.length+1) : [];
            this.reportCache = data.flag ? _data : this.reportCache.concat(_data);
            this.nameCache = _name;
            this.pageCache = _page
        },
        getArrEqual(arr1, arr2) {
        let newArr = [];
            for (let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < arr1.length; j++) {
                    if(arr1[j] === arr2[i]){
                        newArr.push(arr1[j]);
                    }
                }
            }
            return newArr;
        },
        renderReport(data){
            this.$emit('renderChart',data)
            let nameArr = data.data[0]
            let dataArr = data.data.slice(1,data.data.length + 1)
            //if(dataArr.length ===0) return this.showAlert("no result.",'info')

            let is_aff_detail_url = nameArr.indexOf("aff_detail_url") !== -1 ;
            let is_adv_detail_url = nameArr.indexOf("adv_detail_url") !== -1 ;
            let isEcpm = $("input[name='calcus[ecpm]']:checked").length
            if(is_aff_detail_url) {
                nameArr.splice(nameArr.indexOf("aff_detail_url"),1)
            }
            if(is_adv_detail_url) {
                nameArr.splice(nameArr.indexOf("adv_detail_url"),1)
            }
            if (isEcpm){
                nameArr.push('ecpm')
            }

            if(nameArr.indexOf("revenue") !== -1 && nameArr.indexOf("profit") !== -1 ) {
                let _index = _.max([nameArr.indexOf("revenue"), nameArr.indexOf("profit")])
                if(nameArr.indexOf("profit %") === -1) {
                    nameArr.splice(_index+1, 0, 'profit %')
                    for (var i = 0; i < dataArr.length ; i++) {
                        let profit = dataArr[i][nameArr.indexOf("profit")];
                        let revenue = dataArr[i][nameArr.indexOf("revenue")];
                        profit = parseFloat(profit.substr(1));
                        revenue = parseFloat(revenue.substr(1));
                        if (revenue == 0){
                            dataArr[i].splice(_index+1, 0 , "N/A")
                        }
                        else {
                            dataArr[i].splice(_index+1, 0 , _.isNaN(profit / revenue)  ?  "0.00%" :  ((profit / revenue)*100).toFixed(2) + "%")
                        }
                    }
                }
            }
            let that= this
            let eValue,eRevenue,eImpressions
            $.each(dataArr, function(i, v){
                $.each(v, function(_i, _v){
                    dataArr[i][_i] = _.isString(_v)&&_v.indexOf("$") === 0 ?  "$" + parseFloat(_v.substr(1)).toFixed(3) : _v
                })
                if(is_adv_detail_url) {
                    dataArr[i].splice(nameArr.indexOf("adv_detail_url"),1)
                }
                if(is_aff_detail_url) {
                    dataArr[i].splice(nameArr.indexOf("aff_detail_url"),1)
                }
                if (isEcpm){
                    eRevenue = dataArr[i][nameArr.indexOf("revenue")].replace('$','')
                    eImpressions = dataArr[i][nameArr.indexOf("impressions")]
                    eValue = eImpressions == 0 ? 'N/A' : (eRevenue*1000/eImpressions).toFixed(4)
                    dataArr[i].push(eValue)
                }
            })


            this.reportDataName = this.convertItemText(nameArr)
            this.reportData = dataArr;
            this.reportDataCal = this.setReportDataCal(nameArr, dataArr);
            this.page =  data.page
            $.scrollToDom($("#report_result_block"))
        },
        setReportDataCal(nameArr, dataArr){
            let obj = {}
            //remove first element for page display
            for (let i = 0; i < nameArr.length ; i++) {
                let cal = this.getReportCal(nameArr[i], nameArr, dataArr);
                obj[nameArr[i]] = cal
                //console.log(obj)
                if(nameArr[i] === "cr") obj.cr =  !obj.click ? "0.00%" : ((obj.conversion / obj.click) * 100).toFixed(2) + "%";
                if(nameArr[i] === "ctr") obj.ctr =  !obj.impressions ? "0.00%" : ((obj.click / obj.impressions) * 100).toFixed(2) + "%";

                if(nameArr[i] === "profit %") obj['profit %'] = (!obj.revenue ||  obj.revenue==='$0.000') ? "0.00%" : ((parseFloat(obj.profit.substr(1)) / parseFloat(obj.revenue.substr(1))) * 100).toFixed(2) + "%";

                if(nameArr[i] === "rpc") obj.rpc = "$" +  ((!obj.revenue || obj.revenue==='$0.000' )? "0.000" :  (parseFloat(obj.revenue.substr(1)) / obj.click).toFixed(3)) ;
                if(nameArr[i] === "cpc") obj.cpc = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.000" : (parseFloat(obj.cost.substr(1)) / obj.click).toFixed(3)) ;
                if(nameArr[i] === "acpa") obj.acpa = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.00" : (parseFloat(obj.cost.substr(1)) / obj.conversion).toFixed(2)) ;
                if(nameArr[i] === "arpa") obj.arpa = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.00" : (parseFloat(obj.revenue.substr(1)) / obj.conversion).toFixed(2)) ;
                if(nameArr[i] === "ecpm") obj.ecpm = (!obj.revenue ||  obj.revenue==='$0.000') ? "0.00%" : ((parseFloat(obj.revenue.substr(1))*1000 / parseFloat(obj.impressions))).toFixed(4);
            }
            return obj
        },
        getReportCal(name, nameArr, dataArr){
            let cal_name = ['click','unique_click','conversion','cost','revenue','profit','cr','cpc','cpa','rpc','rpa','acpa','arpa','impressions','ctr']
            let index = nameArr.indexOf(name)
            let report_length = dataArr.length
            let cal = 0;
            let is_dollar;
            let is_percent;
            if(cal_name.indexOf(name) !== -1 ) {
                for (let i = 0; i < report_length; i++) {
                    let _num = dataArr[i][index].toString();
                    is_dollar = _num.match(/^\$/);
                    is_percent = _num.match(/%$/);
                    _num = _num.match(/^\$/) ? _num.substr(1) : _num;
                    _num = parseFloat(_num);
                    cal += _num

                }
                if(is_dollar) cal = "$" + cal.toFixed(3);
                if(is_percent) cal = (cal/report_length).toFixed(2) + "%"
                return cal
            }else return ""
        },
        convertItemText(nameArr){
            let arr = []
            let item = { "click": "Gross Clicks", "cr": "CR(Gross)", "state": "area", "unique_click": "Unique Clicks" };
            $.each(nameArr, function(i,v){
                if(item[v]) {
                    arr.push(item[v])
                }else{
                    arr.push(v)
                }
            })
            return arr
        },
        onChangePage(page){
            let that = this;
            this.currentPage = page;
            if(page % 3 === 0 && (page / 3 - 1  === this.pageCache.pagenumber)) {
                that.renderReport(that.getReportFromCache())
                this.$nextTick(function(){
                    this.$emit('getMoreReportData',{page: this.currentPage+1})
                })
            }else {
                this.loadingZone = true
                setTimeout(function(){
                    that.renderReport(that.getReportFromCache())
                    that.loadingZone = ""
                },500)
            }
        },
        getReportFromCache(){
            let obj = {
                page: this.pageCache
            }
            obj.data = [this.nameCache];
            obj.data = obj.data.concat(this.reportCache.slice((this.currentPage - 1)*50, (this.currentPage - 1)*50 + 50))
            return _.cloneDeep(obj)
        },
        changeGroupBy(type){
            let checkObjArr = []
            this.checkModel.forEach((item,index)=>{
                if (this.reportDataName[0] == 'aff_id'){
                    checkObjArr.push({id:item[0],first_name:item[1],last_name:''})
                }
                else {
                    checkObjArr.push({id:item[0],name:item[1]})
                }
            })
            this.$emit('changeGroupByHandler',type,this.reportDataName[0],checkObjArr)
        },
        changeCheckState(){
            this.checkModel = []
            if (this.checkAll){
                this.reportData.forEach((item, index) => {
                    this.checkModel.push(item)
                })
            }
        },
    },
    mounted(){

    }
}
</script>

