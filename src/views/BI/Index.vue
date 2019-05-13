<template>
<div>
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">BI System</li>
        </ul>
    </div>

    <div class="box" style="margin-top:-20px;">
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <div class="">
                <div class="col-md-2 siderbar">
                    <form class="form-horizontal frm-entity frm-detail">
                        <div class="form-group">
                            <label class="" for="">Caregory</label>
                            <div class="">
                                <select class="form-control" v-model="caregory">
                                    <option value="profit">Profit</option>
                                    <option value="revenue">Revenue</option>
                                    <option value="conversion">Conversion</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="" for="">Diagram</label>
                            <div class="">
                                <select class="form-control" name="slice-list">
                                    <option v-for="item in allslices" v-if="caregory==item.category"  :value="item.id">{{item.name}}</option>
                                </select>
                                <button class="btn btn-primary mt10" @click.prevent="addSlice">Add</button>
                            </div>

                        </div>
                        <div class="control-group form-group">
                            <label v-for="(item,index) in slices" v-if="">
                                <span v-if="index < 2">
                                    <input type="checkbox" @click="toggleSlice($event,item)"  checked name="slices" :value="item.name" /> {{item.name | capitalizeAll}}
                                </span>
                                <span v-else>
                                    <input type="checkbox" @click="toggleSlice($event,item)"  name="slices" :value="item.name" /> {{item.name | capitalizeAll}}
                                </span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="col-md-10 mainer">

                  <div class="block row">

                    
                    <div class="theme col-md-12  mb20">
                        <a href="javascript:;" :class="current_theme === 'default' ? 'active': '' " @click="changeTheme('default')"><i class="fa fa-th" aria-hidden="true"></i></a>

                        <a href="javascript:;" @click="changeTheme('flat')" :class="current_theme === 'flat' ? 'active': '' "><i class="fa fa-align-justify" aria-hidden="true"></i></a>
                    </div>
                    <div class="chart_block clearfix">
                        <div v-if="current_theme === 'default'">
                            <draggable v-model="slices" @sort="onDragSort" :options="{draggable:'.item'}"   @end="onDragEnd">
                                <div class="col-md-6 item" v-for="item in slices_show">
                                    <div class="item_block">
                                        <div class="title">
                                            {{item.name | capitalizeAll}}
                                            <span class="pull-right">
                                                <i class="fa fa-arrows-alt" @click="fullScreenView(item)" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>
                                        <iframe :src="item.url"  frameborder='0' scrolling="no"  style="width:100%" class="loading" @load="hideLoading($event)">
                                        </iframe>

                                    </div>
                                </div>
                            </draggable>
                        </div>
                        <div v-else class="flat">
                            <draggable v-model="slices" @sort="onDragSort" :options="{draggable:'.item'}"   @end="onDragEnd">
                                <div class="item" v-for="item in slices_show">
                                    <div class="item_block">
                                        <div class="title">
                                            {{item.name | capitalizeAll}}
                                            <span class="pull-right">
                                                <i class="fa fa-arrows-alt" @click="fullScreenView(item)" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <iframe :src="item.url"  frameborder='0' scrolling="no"  style="width:100%" class="loading" @load="hideLoading($event)">
                                        </iframe>

                                    </div>
                                </div>
                            </draggable>

                        </div>


                    </div>

                  </div>

                </div>
                <biChartModal :resetItem="resetItem" :modalState="modalState" :item="fullScreen_item" :hideModal="hideModal"></biChartModal>


            </div>



        </div>
    </div>
</div>



</template>
<style scoped="">
    .siderbar {
        background: #fff;
        padding: 15px;
        margin: 20px 0;
    }
    .mainer {
      margin: 20px 0;
    }

    .mainer .block {
        min-height: 550px;
        background: #fff;
        padding: 15px;
        margin-left: 5px;
    }
    .chart_block .item {
        padding-right: 10px;
        margin-bottom: 30px;
    }
    .chart_block iframe {
        height: 480px;
    }
    .chart_block .item .item_block{
        height: 480px;
        border: 1px solid #efefef;
        position: relative;
    }
    .chart_block .flat .item {
        margin-bottom: 20px;
    }
    .chart_block .flat .item .item_block {
        height: 500px;
        border: 1px solid #efefef; 
    }
    .theme .fa {
        font-size: 20px;
    }
    .theme .active .fa {
        color: #ff8400
    }
    .item .title {
        text-align: center;
        font-size: 16px;
        padding: 5px;
        font-weight: bold;
    }
    .item .title:hover{
        cursor: move;
    }
    .item .title .fa {
        cursor: pointer;
    }


</style>
<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import mixin_modal from '@/mixins/modal'
//import eventProxy from '@/assets/js/eventproxy'

import { mapGetters, mapActions } from 'vuex'
import biChartModal from '@/components/BIChartModal.vue'
import draggable from 'vuedraggable'
//let ep = new eventProxy()
let EventProxy = require('eventproxy');
let ep = new EventProxy()

const AlertPop = () => import(
/* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

export default {
    data () {
        return {
            loadingZone:false,
            slices:[],
            slices_show:[],
            allslices:[],
            current_theme:localStorage.getItem("current_theme") || "default",
            fullScreen_item:{},
            caregory:"profit"
        }
    },
    components: {dateTimePicker_range, biChartModal, draggable,AlertPop},
    mixins: [mixin_alert_msg, mixin_modal],
    methods: {
        changeTheme(theme){
            this.current_theme = theme
            localStorage.setItem("current_theme", theme)
        },
        getBiSlices(callback){
            Vue.http.get('Bi/getSlices').then(response => {
                var data = response.body && response.body.data
                ep.emit("slices", data || [])
                callback && callback(data)
            }, response => {
                this.slices = [];
            })
        },
        getAllSlices(){
            Vue.http.get('Bi/getAllSlices').then(response => {
                var data = response.body && response.body.data 
                ep.emit("allslices", data || [])
            }, response => {
                this.all_slices = [];
            })
        },
        addSlice(){
            let that = this;
            var selected_slice = $("select[name=slice-list]").val()
            if(!selected_slice) return;
            //如果已经添加
            Vue.http.post('Bi/addSlice',{slice_id:selected_slice}).then(response => {
                var data = response.body && response.body.data 
                that.showAlert("add slice successfully!","success")
                that.getBiSlices(function(data){
                    that.slices = that.allowSliceForCurrent(data);
                })
            }, response => {
                that.showAlert(response.body.msg)
            })
        },
        hideLoading($event){
            $($event.target).removeClass("loading")
        },
        fullScreenView(item){
            this.fullScreen_item = item;
            this.modalState = "show"
        },
        toggleSlice($event, item) {
            let that = this;
            let index = _.findIndex(that.slices_show, {slice_id:item.slice_id})
            if($($event.target).is(":checked")) {
                if(index === -1) {
                    that.slices_show.unshift(item)
                }
            }else{
                if(index !== -1){
                that.slices_show.splice(index, 1)
                }
            }
        },
        onDragEnd(){
        },
        onDragSort(evt){
            console.log(evt)
            var newIndex = evt.newIndex + 1
            var oldIndex = evt.oldIndex + 1
            var str = newIndex + "," + this.slices[evt.newIndex].id  + "|" + oldIndex + "," +  this.slices[evt.oldIndex].id 
            this.setBiSlicesSort(str)
        },
        setBiSlicesSort(slice_position){
            Vue.http.post('Bi/saveSlicePosition', {slice_position:slice_position}).then(response => {
                var data = response.body && response.body.data
                this.showAlert("the new sort slice have been saved!","success")
            }, response => {
            })
        },

        resetItem(){
            this.fullScreen_item = {};
        },
        transItemId(ids){
            var arr = []
            if(ids.indexOf("member") !== -1) {
                arr.push("3")
            } 
            if(ids.indexOf("team_leader") !== -1) {
                arr.push("4")
            } 
            if(ids.indexOf("manager") !== -1) {
                arr.push("5")
            } 
            if(ids.indexOf("director") !== -1) {
                arr.push("6")
            } 
            return arr;
        },
        allowSlices(items){
            var arr = []
            let that = this;
            for (var i = items.length - 1; i >= 0; i--) {
                if(that.transItemId(items[i].allowed_entity_roles).indexOf(that.userInfo.item_role_id) !== -1 &&
                    items[i].allowed_role_ids.indexOf(that.userInfo.role_id) !== -1) {
                    arr.push(items[i])
                }
            }
            return arr;
        },
        allowSliceForCurrent(items) {
            var arr =  []
            let that = this;
            var ids = _.map(that.allslices, "id")
            for (var i = items.length - 1; i >= 0; i--) {
                if(ids.indexOf(items[i].slice_id) !== -1) {
                    arr.push(items[i])
                }
            }
            return arr;
        }
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
        startDate(){
            return moment().add(-1, "month").format("YYYY-MM-DD")
        },
        endDate(){
            return moment().format("YYYY-MM-DD")
        }
    },
    created () {
        let that = this
        ep.all("slices","allslices", function(slices, allslices){
                that.allslices = that.allowSlices(allslices)
                that.slices = that.allowSliceForCurrent(slices);
                console.log(that.slices)
                that.slices_show = _.slice(that.slices, 0 ,2)
                //this.slices = data && _.slice(data, 0, 2) || []
                //this.all_slices = slices

        })
        this.getBiSlices()
        this.getAllSlices()
    },
    mounted () {
    }
}
</script>