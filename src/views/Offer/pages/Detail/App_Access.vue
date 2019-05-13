<template>
<div :class="{'box': true}" v-yeah-loading='loadingZone'>
    <div class="box-header"  v-box-action-resize>
        <h2>App Access<help-box :content="helpTips.app_access"></help-box></h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container" ref="app_access_wrapper">
        <div class="box-content form-horizontal frm-entity frm-detail" id="">
            <p class="mb40">
                <strong>Manage Publisher’s App access to this offer</strong>. Only approved App can access this offer and generate tracking links.
                <strong>Press SHIFT key and click to select multiple items</strong>.
            </p>
            <div class="">
                <div class="" id="">
                    <div class="select_block">
                        <label></label>
                        <chosen_container_offer :option0="option0" :chosenInfo="affAccessInfo" :chosenCallback="chosenCallback" :renderOffer="renderOffer" :chosenName="'publisher'"></chosen_container_offer>
                    </div>
                    <div id="">
                        <div class="ms-container row">
                            <div class="ms-selection col-md-4 pull-left">
                                <label for="">Approved App</label>
                                <select data-control-name="bt-select" multiple="multiple" class="ms-list  form-control" id="app_approved" v-model="app_approved">
                                    <option v-for="app in approvedApp" :value='app.id' @click.prevent="msOption('approvedApp', 'app_approved')">{{ publisherName(app) }} {{ app.name }}</option>
                                </select>
                            </div>
                            <div class="ms-selection col-md-4 pull-left">
                                <label for="">Unapproved App</label>
                                <select data-control-name="bt-select"  multiple="multiple" class="ms-list  form-control" id="app_unapproved"  v-model="app_unapproved">
                                    <option v-for="app in unapprovedApp || []" :value='app.id' @click.prevent="msOption('unapprovedApp', 'app_unapproved')">{{ publisherName(app) }} {{ app.name }}</option>
                                </select>
                            </div>
                            <div class="ms-selection col-md-4 pull-left"  v-model="app_approved">
                                <label for="">Blocked App</label>
                                <select data-control-name="bt-select"  multiple="multiple" class="ms-list  form-control" id="app_blocked" v-model="app_blocked">
                                    <option v-for="app in blockedApp || []" :value='app.id' @click.prevent="msOption('blockedApp', 'app_blocked')">{{ publisherName(app) }} {{ app.name }}</option>
                                </select>
                            </div>
                        </div>
                        </select>
                        <div id="app_access_action" class="text-center mt20 mb20">
                            <a href="#" class="btn btn-primary" data-control-name="bt-button" data-action="approve" data-target="#app_approved" @click.prevent="transferAppStatus('approve')" :disabled="disabled === 'approvedApp'">Approve</a>
                            <!-- <a href="#" class="btn btn-primary" data-control-name="bt-button" data-action="unapprove" data-target="#app_unapproved" @click.prevent="transferAppStatus('unapprove')"  :disabled="disabled === 'unapprovedApp'">Unapprove</a> -->
                            <a href="#" class="btn btn-primary"  data-control-name="bt-button" data-action="block" data-target="#app_blocked" @click.prevent="transferAppStatus('block')"   :disabled="disabled === 'blockedApp'">Block</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Vue from "vue"
import { mapActions } from 'vuex'
import offerAPI from '@/api/offer'
import { appAccessHelpTips } from '../../config/config'

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

export default {
    data() {
        return {
            loadingZone:true,
            option0:'- Select an Affiliate -',
            publisher_id:[],
            publisher_name:'',
            offer_id:this.$route.query.id,
            approvedApp:[],
            blockedApp:[],
            unapprovedApp:[],
            app_approved:[],
            app_unapproved:[],
            app_blocked:[],
            disabled: '',
            selectedOptions:[],
            ajax_loading:false,
            accessApps:[],
            app_list:[],
            arr:["app_approved","app_unapproved","app_blocked"],
            helpTips:{}
        }
    },
    props:{
      renderOffer:{default:false},
      offerInfo:{},
      showAlert:{},
      affAccessInfo:{},
      refresh_app_access:{},
      onAppAccessChanged:{},
      setOfferEditAuth:{}
    },
    computed: {
    },
    watch: {
        publisher_id(newVal, oldVal) {
            if (newVal) {
                let that = this

                this.getAppList(function(){
                    that.getAppAccessInfo()
                })
            }
        },
        renderOffer(newVal, oldVal){
            if (newVal) {
                this.getAppAccessInfo()
                this.loadingZone = false

                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.app_access_wrapper)
                })
            }
        },
        refresh_app_access(newVal, oldVal){
            if (newVal) {
                this.getAppAccessInfo()
            }
        },
        accessApps(newVal, oldVal){
            var accessApps = this.accessApps
            var app_list = ''
            if (this.app_list) {
                app_list = this.app_list.length > 0 ? this.app_list : _.union(accessApps.approve || [], accessApps.block || [])
            } else {
                app_list = undefined
            }
            this.renderAffSelectView(accessApps, app_list);
        },
    },
    components: {HelpBox },
    methods: {
        ...mapActions([
            'getAppAccess',
        ]),
        msOption(btn, select_type) {
            var that = this
            var arr = that.arr
            this.disabled = btn

            arr.map(function(val, index) {
                if (val == select_type) {
                    return
                }
                if (that[val].length > 0) that[val] = []
            })
        },
        removeAndAdd(app_arr, target, app, oldAppType) {
            var that = this
            _.each(app_arr, function(selectedID) {
                var selected = _.find(that[oldAppType], function(n) {
                    return n.id == selectedID;
                })
                that[oldAppType] = _.remove(that[oldAppType], function(n) {
                      return n.id  != selectedID;
                    });
                that[target].push(selected)
            })
        },
        transferAppStatus(action) {
            var that = this
            var app_arr = that.app_approved.concat(that.app_unapproved).concat(that.app_blocked)
            var target = ''
            var selected_length = app_arr.length;
            if (selected_length) {
                var param = {
                    "offer_id":that.offer_id,
                    "app_id": app_arr,
                    "type": action
                }
                var appAccessParam = {
                    offer_id: that.offer_id,
                }
                Vue.http.post('Offer2/saveAppAccess', param).then(response => {
                    //that.removeAndAdd(app_arr, action)
                    if (action === 'approve') {
                        target = 'approvedApp'
                    }
                    if (action === 'unapprove') {
                        target = 'unapprovedApp'
                    }
                    if (action === 'block') {
                        target = 'blockedApp'
                    }
                    if (that.app_approved.length > 0) {
                        that.removeAndAdd(app_arr, target, that.approvedApp, 'approvedApp')
                    }
                    if (that.app_unapproved.length > 0) {
                        that.removeAndAdd(app_arr, target, that.unapprovedApp, 'unapprovedApp')
                    }
                    if (that.app_blocked.length > 0) {
                        that.removeAndAdd(app_arr, target, that.blockedApp, 'blockedApp')
                    }
                    that.getAppAccess({appAccessParam, cb: function(data){}})
                }, response => {
                    // error callback
                    //cb(response.body)
                })
            }
        },
        renderAffSelectView(app_approved_blocked, app_list) {
            let that = this;
            that.approvedApp = [];
            that.blockedApp = [];
            that.unapprovedApp = [];
            app_approved_blocked.approve = app_approved_blocked.approve || []
            app_approved_blocked.block = app_approved_blocked.block || []
            _.each(app_list, function(app) {
                var b = { id: app.id}
                if (_.findIndex(app_approved_blocked.approve, {
                        id: app.id
                    }) !== -1 ) {
                    that.approvedApp.push(app);

                } else if (_.findIndex(app_approved_blocked.block, {
                        id: app.id
                    }) !== -1 ) {
                    that.blockedApp.push(app);
                } else {

                    that.unapprovedApp.push(app);
                }

            })
            that.ajax_loading = false
        },
        publisherName(app) {
            var publisher_name = this.publisher_name ? ("publisher " + this.publisher_name  + " - " ) : "";
            var name = app.firstName || app.lastName  ? ("publisher " + (app.firstName || "") + " " + (app.lastName || "") + " - " ) : publisher_name;
            return name
        },
        chosenCallback(val,text) {
            let that = this
            that.publisher_id = val;
            that.publisher_name = text;
        },
        getAppAccessInfo() {
            let that = this;
            var params = {
                offer_id: this.offer_id,
                include_block: 1
            }
            var query = {
                appAccessParam: params
            }
            that.ajax_loading = true;
            offerAPI.getAccessApps(query, function(o){
                o = o && o.data || {}
                o.approve = o.approve || []
                o.block = o.block || []
                that.accessApps = o
                that.ajax_loading = false
                var app_list = _.union(o.approve || [], o.block || [])
                //that.app_list = app_list;
                //that.renderAffSelectView(o, app_list);
           })
        },
        getAppList(callback) {
            let that = this
            var query = {
                publisher_id: that.publisher_id
            }
            offerAPI.getAppList(query, function(data){
                that.app_list = data && data.data || undefined
                callback && callback()
                //that.renderAffSelectView(that.accessApps, data.data);
            })
        },

        addAffiliatePayout() {
            var affiliatePayout = {
                aff_if:this.selectedOptionValue,
                value: this.selectedOptionText
            }
            this.affiliatePayouts.push(affiliatePayout)
        }
    },
    created() {
    },
    mounted() {
        this.helpTips = appAccessHelpTips
        console.log(this.switchInfoFetched)
    }
}
</script>

<style scoped>
.ms-container {
    min-width: 100%;
    margin: 0 auto;
    background: none;
}

.ms-container select {
    width: 100%;
}

.select_block {
    margin: 0 auto 20px;
    min-width: 100%;
    padding-left: 15px;
}

.ms-container option {
    border-bottom: 1px #eee solid;
    padding: 2px 10px;
    color: #555;
    font-size: 13px;
    height: 26px;
    line-height: 26px;
}
.ms-container option:hover {
    color: #fff;
}
.ms-container .ms-selection {
    background: transparent;
    width: 32%;
}
.ms-container .ms-selection:last-child{
    margin-left: 0;
}





</style>