<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/offer_audit_log">Tools</router-link> </li>
            <li class="active">Offer Audit Log</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Offer Audit Log</h2>
            <div class="box-action">
                <!-- 
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>

        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">
                <ul id="tabListView" class="nav nav-tabs ">
                    <li class="active" data-name='historical_value'><a href="#historical_value" data-toggle="tab">Historical Value</a>
                    </li>
                    <li class="" data-name='operation_log'><a href="#operation_log" data-toggle="tab">Operation Log</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active historical_value" id="historical_value">
                        <div id="search_historical">
                            
                            <div class="well" id="">
                                <form class="form-horizontal frm-entity frm-detail form-report" ref="historical_form" @submit.prevent="onHisFormSubmit">

                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Offer ID</label>
                                        <div class="controls col-md-3 nomargin">
                                            <input class="form-control" name="offer_id" v-model="offer_id"  type="text" >
                                        </div>

                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Affiliate ID</label>
                                        <div class="controls col-md-3 nomargin">
                                            <input class="form-control" name="aff_id" type="text" v-model="aff_id" ref="aff_id" @change="onChangeAff">
                                        </div>

                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Time</label>
                                        <div class="controls nomargin col-md-10">
                                           <!--  <dateTimePicker class="col-md-2 nopadding mr10"  :fromDate="'today'"></dateTimePicker> -->
                                            <date-picker-single :classList="classList" :defaultDate=""></date-picker-single>
                                            <select class=" form-control hour_sel col-md-1" id="endHourSelect"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option></select>
                                            :
                                            <select class=" form-control minute_sel col-md-1" id="endMinuteSelect"><option value="00">00</option><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option></select>
                                        </div>

                                    </div>

                                    <div class="control-group form-group">
                                        <label class="control-label pull-left  col-md-2" for="start">Item</label>
                                        <div class="controls nomargin  col-md-10">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_status"> Offer Status
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_status" > Affiliate Status</input>
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_permission"> Offer Permission
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_access"> Affiliate Access
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_level"> Affiliate Level
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_cap"> Offer Cap
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_cap"> Affiliate Cap
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="geo"> GEO
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="device_os"> Device OS
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="device_model"> Device Model
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="platform"> Platform
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="redirect_offer"> Redirect Offer
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_redirect_offer"> Affiliate Redirect Offer
                                            </label>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <div class="btns-group col-md-offset-2 col-md-10">
                                            <button type="submit" data-name='searchHistoryValue' class="btn btn-primary">Search</button>
                                            <a href="javascript:;" class="btn btn-default resetPage">Reset</a>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div id="result_historical" v-show="renderTable" class="overflow_scroll">
                            <table class="table table-hover tablesorter tbl-fixed table-historical" id="">
                                <colgroup>
                                    <col width="250">
                                    <col width="600">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody id="">
                                    <tr v-for="(val, key) in history_list">
                                        <td>{{formatKey(key)}} <span v-if="key==='aff_access'" class="red">(for reference only) </span></td>
                                        <td v-html='formatVal(val, key, {converted:false})'></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div class="tab-pane operation_log" id="operation_log">
                        <div id="search_operation">
                            
                            <div class="well" id="">
                                <form class="form-horizontal frm-entity frm-detail form-report" ref="operation_form" @submit.prevent="onOperationFormSubmit">

                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Offer ID</label>
                                        <div class="controls col-md-3 nomargin">
                                            <input class="form-control" name="offer_id" v-model="offer_id_op"  type="text" >
                                        </div>

                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Affiliate ID</label>
                                        <div class="controls col-md-3 nomargin">
                                            <input class="form-control" name="aff_id" type="text" v-model="aff_id_op" ref="aff_id" @change="onChangeOpAff">
                                        </div>

                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label pull-left col-md-2" for="start">Date Range</label>
                                        <div class="controls nomargin col-md-10">
                                            <dateTimePicker_range   :show_date_shortcut=false class="col-md-12" :from_date="'week'" :no_hour=true :start_class="'from'" :end_class="'to'"></dateTimePicker_range>
                                        </div>

                                    </div>

                                    <div class="control-group form-group">
                                        <label class="control-label pull-left  col-md-2" for="start">Item</label>
                                        <div class="controls nomargin  col-md-10">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_status"> Offer Status
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_status" > Affiliate Status</input>
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_permission"> Offer Permission
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_access"> Affiliate Access
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_level"> Affiliate Level
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="offer_cap"> Offer Cap
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_cap"> Affiliate Cap
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="geo"> GEO
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="device_os"> Device OS
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="device_model"> Device Model
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="platform"> Platform
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="redirect_offer"> Redirect Offer
                                            </label>
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="aff_redirect_offer"> Affiliate Redirect Offer
                                            </label>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <div class="btns-group col-md-offset-2 col-md-10">
                                            <button type="submit" data-name='searchHistoryValue' class="btn btn-primary">Search</button>
                                            <a href="javascript:;" class="btn btn-default resetPage">Reset</a>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div id="result_operation" v-show="renderTable" class="overflow_scroll">
                            <table class="table table-hover tablesorter tbl-fixed table-historical table_operation_list" id="">
                                <colgroup>
                                        <col width="150">
                                        <col width="150">
                                        <col width="150">
                                        <col width="400">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>User</th>
                                        <th>Item</th>
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                                <tbody id="">
                                    <tr v-for="item in operation_list">
                                            <td>{{item.create_time}}</td>
                                            <td>{{item.passport}}</td>
                                            <td>{{item.type}}</td>
                                            <td>
                                                <ul>
                                                    <li>
                                                        <span class="item">Before:</span>
                                                        <span v-html='formatVal(item.before_info, item.type)'></span>
                                                    </li>
                                                    <li>
                                                        <span class="item" >After:</span>
                                                        <span v-html='formatVal(item.after_info, item.type)'></span>
                                                    </li>
                                                        <li v-if="item.type === 'aff_level' "><span class="item">Note:</span>
                                                            <span v-html='formatAffLevelNote(item)'></span>
                                                        </li>
                                                        <li v-else-if="item.type === 'aff_access'"><span class="item">Action:</span>
                                                            <ul style="">
                                                                <li>
                                                                    {{item.oper==="specify" ? "Manual Move" : "Offer Application"}}
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li v-else-if="item.type === 'offer_permission'"><span class="item">Note:</span>
                                                            <span v-html='getOfferPermission(item.after_info)'></span>
                                                       </li>
                                                </ul>
                                            </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="btn-group pager_foot" id="pager_foot_operation"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>



</div>
</template>
<style >
    .table-historical th,.table-historical td {
        padding-left: 10%
    }
    .table_operation_list li {
        overflow: hidden;
    }
    .table_operation_list ul ul{
        color: #666;display: block;margin-left: 50px;
    }
    .table_operation_list ul span.item {
        float: left;
        color: #000;
    }
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import chosen from '@/components/Chosen.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'
import commonDataAPI from '@/api/commonData'

import pagination from '@/components/Pagination.vue'
//import dateTimePicker  from '@/components/DateTimePicker.vue'
const DatePickerSingle = () => import(
/* webpackChunkName: "DatePickerSingle" */ '@/components/common/date-picker-single/'
);
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import mixin_modal from "@/mixins/modal"

export default {
  data(){
    return {
            aff_id:"",
            offer_id:"",
            aff_id_op:"",
            offer_id_op:"",
            loadingZone:"",
            amChosen:"",
            history_list:{},
            operation_list:{},
            renderTable:false,
            feedback_page:false,
            currentPage:1,
            currentLimit:20,
            sort_field:"",
            sort_type:"",
            classList:'col-md-2 nopadding mr10',

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{pagination, chosen, AlertPop, dateTimePicker_range, DatePickerSingle},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    formatKey(key){
        let str = ""
        key = key.split("_")
        for(let i = 0; i < key.length ; i++) {
            str += _.capitalize(key[i]) + " "
        }
        return str
    },
    formatVal(data, item, options) {
        let desc = ""

        if (typeof data === "string") {
            data = data.replace(/['"]+/g, '');
            desc += '<ul><li>';
            if (item === "aff_level" && !(options && options.converted === false) ) {
                desc += data
            } else if(item === "aff_redirect_offer"){
                switch(data){
                    case "-1":
                        desc += "No redirect Offer";
                        break;
                    case "0":
                        desc += "Use default" 
                        break;
                    case "":
                        desc += "Use default"
                        break;
                    default:
                        desc += data;
                        break;
                }
            } else if(item === "redirect_offer"){
                switch(data){
                    case "":
                        desc += "Empty"
                        break;
                    case "0":
                        desc += "Empty"
                        break;
                    default:
                        desc += data;
                        break;
                }
            } else {
                desc += data
            }
            desc += '</li></ul>'
        } else if (_.isArray(data)) {
            desc += '<ul>'

            if(data.length === 0){
                desc += "Empty";
            }else{
                if(item === "geo"){
                    desc += "<li>Enforce On : </li>";
                }

                var data_is_empty;
                for (var m = 0; m < data.length; m++) {
                    if(data[m] !== ""){
                        data_is_empty = false
                        desc += '<li>'
                        desc += _.isObject(data[m]) ? _.values(data[m] || []).join("") : data[m]
                        desc += m === data.length - 1 ? "" : ", "
                        desc += '</li>'
                    }else{
                        data_is_empty = true
                    }
                }
                if(data_is_empty){
                    desc += "All"
                }
            }
            desc += '</ul>'
        } else if (_.isObject(data)) {
            desc += '<ul class="dblock">'
            var mm;
            if(item === "offer_cap" && (data.is_caps =="0" || data.is_caps ==="") || item === "aff_cap" && (data.is_caps =="0" || data.is_caps ==="")){
                desc += '<li>caps:no</li>'
            }else{
                if(item === "offer_cap" || item === "aff_cap"  ){
                    desc += 'caps:yes'
                }

                for (mm in data) {
                    desc += '<li>';
                    if(item === "offer_cap" && mm === "is_caps" || item === "aff_cap" && mm === "is_caps"){
                        desc += '';
                    }else if(item === "offer_permission" && mm !== "is_require_approval"){
                        desc += data[mm]
                    }else if(item === "offer_permission" && mm === "is_require_approval"){
                        desc += ""
                    }else if(mm === "monthly_conversions"){
                        desc += mm + ':' + (data[mm] || "0")
                    }else if(mm === "daily_payout" || mm === "monthly_payout" || mm === "daily_revenue" || mm === "monthly_revenue"){
                        desc += mm + ':' + (data[mm] || "0.00")
                    }else if(mm === "monthly_alarm" || mm === "daily_alarm"){
                        desc += mm + ':' + data[mm] + "%"
                    }else{
                        desc += mm + ':' + data[mm]
                    }
                    desc += '</li>'
                }
            }

            desc += '</ul>'
        }
        return desc;

    },
    formatAffLevelNote(data){
        var str = _.isObject(data) ? data.after_info : data + "";
        return this.getAffLevelDesc(str)
    },
    getAffLevelDesc(data){
        var desc = ""
        switch (data.replace(/['"]+/g, '')) {
            case "1":
                desc += "<ul class='affLevel'>" + "<li>Public offer without approval:approved</li>" + "<li>Public offer need approval:unapproved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "2":
                desc += "<ul class='affLevel'>" + "<li>Public offer:approved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "3":
                desc += "<ul class='affLevel'>" + "<li>All offers:approved</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
        }
        return desc
    },
    getOfferPermission(data) {
        var desc = ""
        switch (data) {
            case "Need approval on":
                desc += "<ul class='offer_permission'>" + "<li>Level 1 affiliates blocked.</li>" + "<li>Level 2 & 3 affiliates approved.</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "Need approval off":
                desc += "<ul class='offer_permission'>" + "<li>Level 1, 2 & 3 affiliates approved.</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "private offer":
                desc += "<ul class='offer_permission'>" + "<li>Level 1 & 2 affiliates blocked. All application info is removed.</li>"+ "<li>Level 3 affiliates approved.</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "public offer":
                desc += "<ul class='offer_permission'>" + "<li>Level 1, 2 & 3 affiliates approved.</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
        }
        return desc
    },
    onHisFormSubmit(){
        let query = {};
        let $form = $(this.$refs.historical_form)
        query['offer_id'] = this.offer_id;
        query['aff_id'] = this.aff_id
        query['search_time'] = $form.find(".datepicker input").trimVal() + " " + $form.find("#endHourSelect").trimVal() + ":" + $form.find("#endMinuteSelect").trimVal();
        query.type = [];
        $form.find("input[type='checkbox']:checked").each(function(index, item) {
            query.type.push($(item).data("name"))
        })
        if(!query.offer_id)  return this.showAlert("Offer ID can not be empty.")
        if(!query.type.length) return this.showAlert("Offer Item can not be empty.")

        this.loadingZone = "ajax_loading"
        Vue.http.get('Offer2/getHistoryValue',{params:query}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.history_list = data || {}
            this.renderTable = true;
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    onOperationFormSubmit(){
        let query = {};
        let $form = $(this.$refs.operation_form)
        query['offer_id'] = this.offer_id_op;
        query['aff_id'] = this.aff_id_op
        query['start_time'] = $form.find("[name=from]").trimVal() + " 00:00:00"
        query['end_time'] = $form.find("[name=to]").trimVal() + " 00:00:00"
        query.type = [];
        $form.find("input[type='checkbox']:checked").each(function(index, item) {
            query.type.push($(item).data("name"))
        })
        if(!query.offer_id)  return this.showAlert("Offer ID can not be empty.")
        if(!query.type.length) return this.showAlert("Offer Item can not be empty.")

        this.loadingZone = "ajax_loading"
        Vue.http.get('Offer2/getOperationLog',{params:query}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.operation_list = data || {}
            this.renderTable = true;
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    onChangeAff($event){
        let that = this;
        let $form = $($event.target).closest("form")
        this.setCheckboxStatus($form, that.aff_id)
    },
    onChangeOpAff($event){
        let that = this;
        let $form = $($event.target).closest("form")
        this.setCheckboxStatus($form, that.aff_id_op)
    },
    setCheckboxStatus($form, flag){
        $form.find("[data-name^=aff]").each(function(){
            if(flag) {
                $(this).prop("disabled", false)
            }else {
                $(this).prop("disabled", true).prop("checked",false)
            }
        })
    },
    formatCreateDate(time) {
        return moment(time).fromNow(); 
    },
    onChangeLimit(limit){
        this.currentLimit = limit;
        this.currentPage = 1;
        this.$nextTick(function(){
          this.onSubmit()
        })
    },
    onChangePage(page){
        this.currentPage = page;
        this.$nextTick(function(){
          this.onSubmit()
        })
    },
  },
  created () {

  },
  mounted() {


    this.setCheckboxStatus($(this.$refs.historical_form), false)
    this.setCheckboxStatus($(this.$refs.operation_form), false)
  }
}
</script>