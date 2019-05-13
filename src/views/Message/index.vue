<template>
<div>
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">Message</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header">
            <h2>Message</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container ">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content" id="tab">
                <ul class="nav nav-tabs" id="navTab">
                    <li v-for="(item, key, index) in models" :data-id="index" :class="checkActive(item.id) ? 'active' : ''" @click="onClickType(key)">
                        <a data-toggle="tab" :href="'#' + (key && key.toLowerCase() == 'cr notify' ? 'cr_notify' : item.id)">{{ item.name }}</a>
                        <span class="bg_light_red"></span>
                    </li>
                </ul>
                <div class="search-zones" id="searchZone">
                    <form class="filter-form well" ref="form" @submit.prevent="onSubmit">
                        <dateTimePicker_range :no_hour="true" :classList="'col-md-5'" :start_class="'start_time'" :end_class="'end_time'" :show_date_shortcut="false" :from_date="'lmonth_minus'"></dateTimePicker_range>
                        <div class="mt15">
                            <input class="col-md-6 pull-left mr15" style="margin: 0;" type="text" name="key" v-model="key" autocomplete="off" placeholder="Please Input Keywords" />
                            <input type="hidden" name="type" v-model="type">
                            <input type="hidden" name="module" v-model="module">
                            <input type="hidden" name="page" v-model="currentPage">
                            <input type="hidden" name="limit" v-model="currentLimit">


                            <button type="submit" class="btn btn-primary" id="searchBtn">Search</button>
                        </div>
                    </form>
                </div>
                <message-list
                  v-if="ctx == 'list'" 
                  ref='list'
                  :messageList = 'messageList'
                  :messagePage = 'messagePage'
                  @onChangePage = 'onChangePage'
                  :currentPage = 'currentPage'
                  @onClickType = 'onClickType'
                  @handleMsgItemClick = 'handleMsgItemClick'
                  @markUnread = 'markUnread'>
                </message-list>
                <message-detail
                  v-else
                  :msgData = 'msgData'
                  :model="models[type]"
                  @toggleCtxModule = 'toggleCtxModule'>
                </message-detail>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import MessageDetail from './components/detail.vue'
import MessageList from './components/list.vue'

export default {
    data(){
        return {
            ctx: 'list', // 当前内容 list为列表，detail为详情
            loadingZone:'',
            notReadCount:[],
            messageList:[],
            messagePage:"",
            type:"quality",
            module:"",
            key:"",
            currentPage:1,
            query_opts:"",
            currentLimit:10,
            msgData: {},
            models: {
                "quality": {
                    name: "Quality",
                    id: "quality",
                    showPenetrate:true,
                },
                "caps": {
                    name: "Caps",
                    id: "caps",
                    showPenetrate:true,
                },
                "automation":{
                    name: "AUTOMATION",
                    id: "automation",
                    showPenetrate:false,
                },
                "Autoblend":{
                    name: "Auto Blend",
                    id: "Autoblend",
                    showPenetrate:false,
                }
            },
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
        msgStoreData(newVal, oldVal) {
            if(newVal.msgStoreData == oldVal.msgStoreData) {
                return
            }
            this.msgData = newVal.msgStoreData

            this.ctx = 'detail'
            this.type = this.msgData.type
            
            this.markUnread(this.msgData)
            this.getQueryUrl() 
        },
        // msgData(){
        //     debugger
        //    this.getQueryUrl() 
        // },
    },
    computed: {
        ...mapGetters({
            msgStoreData:"msgStoreData",
        }),
    },
    components: { 
      AlertPop,
      dateTimePicker_range, 
      MessageDetail,
      MessageList
    },

    created () {
        let types = _.keys(this.models)
        this.onClickType(types[0])
        this.getQueryUrl()
    },
    mounted () {
      let _this = this;
      setInterval(getNewMsg, 1000 * 60 * 10)

      function getNewMsg() {
        _this.getMessageList()
      }
    },

    methods: {
        checkActive(item) {
            let msgKey = item.toLowerCase().replace(/\_/g, '')
            let type  = this.type.toLowerCase().replace(/\_/g, '')
            if (msgKey == type) {
                return true
            } else {
                return false
            }
        },
        getQueryUrl() {
            let { ctx, msgData } = this.$route.params
            if(ctx) {
                this.ctx = ctx
                this.msgData = msgData
                this.type = msgData.type
                this.markUnread(msgData)
            }
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
              let opt = this.query_opts
              opt.page = page
              this.getMessageList(opt)
            })
        },
        getMessageCount() {
            let that = this
            Vue.http.get('Message/getMessageCount').then(response => {
                var notReadCount = response.body && response.body.data && response.body.data.notReadCount || []
                that.notReadCount = notReadCount
                let notReadCountArr = _.map(that.notReadCount, "count")
                let count = 0
                _.each(notReadCountArr, function(val) {
                    count += parseInt(val)
                })
                this.$store.dispatch("setUnreadMessageCount", {count:count})
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        
        getMessageList(opts) {
            this.query_opts = opts 
            this.loadingZone = true
            Vue.http.get('Message/list', {params:opts || {}}).then(response => {
                this.messageList = response.body.data.list
                this.messagePage = response.body.data.paginator
                this.loadingZone = ""
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg);
            })
        },
        editNewestMessage() {
            Vue.http.get('Message/EditNewestMessage', {params:{}}).then(response => {
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        onClickModule(module) {
            let that = this
            if(module) {
                this.module = _.snakeCase(module)
            }
            let _module = _.snakeCase(module || this.module)
            this.currentPage = 1
            this.$nextTick(function(){
                this.getMessageList({type:_.snakeCase(this.type),module: _module, page:1,limit:10})
            })
            this.getMessageCount()
        },
        onSubmit(){
            this.ctx = 'list'
            this.currentPage = 1
            this.$nextTick(function(){
                this.getMessageList($(this.$refs.form).getFormQuery())
            })
        },
        onClickType(type){
            let that = this
            if(type) {
                this.type = _.snakeCase(type)
            }
            this.ctx = 'list'
            let _type = _.snakeCase(type || this.type)
            this.currentPage = 1
            this.module = ""
            this.$nextTick(function(){
                this.getMessageList({type:_type,page:1,limit:10})
            })
            this.getMessageCount()
            this.editNewestMessage()
            this.key = ""
        },

        handleMsgItemClick(msgData) {
          this.msgData = msgData
          this.toggleCtxModule('detail')
        },

        toggleCtxModule(ctx) {
          this.ctx = ctx
        },

        markUnread(msgData) {
            this.$emit('markUnread', msgData);
            let that = this
            Vue.http.get('Message/mark?ids=' + msgData.message_id).then(response => {
                this.onClickType();
                this.handleMsgItemClick(msgData)
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
    },
    
}
</script>

<style scoped>
.tab-pane {
    margin-bottom: -10px;
    overflow: auto;
}
.tab-pane .btn {
    position: relative;
    margin: 4px;
}
.tab-pane .btn span {
    position: absolute;
    right: -6px;
    top: 0px;
    color: #ffffff;
    font-weight: normal;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    text-shadow: none;
    border-radius: 12px;
    padding: 0 6px;
}
.tab-pane .btn.active, .tab-pane .btn:active, .tab-pane .btn.active {
    background-color: #E1E1E1;
    box-shadow: none;
}
.filter-form.well {
    margin: 20px 0;
}
.panel {
    min-height: 600px;
}
.date {
    text-align: right;
    font-style: italic;
    color: #c1cbd0;
}
.feeds {
    margin: 20px 0;
}
.feeds li {
    list-style-type: none;
    line-height: 26px;
    font-size: 13px;
    border-bottom: 1px dashed #eaeaea;
    padding: 12px;
}
.feeds li.unread {
    background: #eaeaea;
    font-weight: bold;
    border-bottom: 1px dashed #D7D7D7;
}
.feeds li .col-md-4 {
    word-wrap: break-word;
}
.feeds li:hover {
    background: #efefef;
}
.feeds li span {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
span.icon_mark_read {
    visibility: hidden;
    cursor: pointer;
    font-size: 18px;
    color: #999;
}
.feeds li .col-md-1 a {
    color: #08c;
}
.feeds li .col-md-1 span {
    display: inline-block;
}
.feeds li.unread:hover span.icon_mark_read {
    visibility: visible;
}
.offer_limit[name="page_limit"], .pager_foot [name="go_page"], .pager_foot [name="go_btn"], .pager_foot [name="page_limit"] {
    display: none;
}
.box-content {
    overflow: hidden;
}
.nav-tabs li {
    position: relative;
}
.nav-tabs li span {
    position: absolute;
    right: 0px;
    top: -7px;
    border-radius: 12px;
    padding: 0 6px;
    color: #fff;
    font-size: 12px;
}


</style>