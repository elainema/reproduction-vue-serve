import * as types from '../mutation-types'
import auth from '@/util/auth'

const state = {
  logged:auth.loggedIn(),
  userInfo:{},
  userRole:{},
  pmNotice:{},
  cookieHash:{},
  unreadMessageCount:0,
  switchInfo:{
    use_advanced_pixel:0,
    is_private:0,
    is_require_approval:0,
    is_exclusive:0,
    is_incentive:0,
    is_quality:0,
    is_fraud_allowed:0,
    caps_subscription:0,
    is_blend:0,
    is_exclude_from_mana:0,
    is_dynamic_revenue:0,
    is_dynamic_hide_conv:0,
    is_geo_targeting:0,
    is_device_targeting:0,
    is_device_os_targeting:0,
    is_device_model_targeting:0,
    is_carriers_targeting:0,
    use_advanced_pixel_aff:0,
    is_active:0,
    "profile[redirect_200]":0,
    report_api_info:0,
    disable_internal_tuning:0,
    disable_caps_retro:0,
    weekly:0,
    monthly:0,
    quarterly:0,
    yearly:0,
    is_pay_fee:0,
    use_advanced_pixel_pub:0,
    "profile[is_manual_hide_conv]":0,
    cps_api:0,
    dsp:0,
    offline_api:0,
    realtime_api:0,
    sdk:0,
    affiliate:0,
    is_3rd:0,
    collection_cycle_settype:0,
    collection_begin_type:0
  },
  msgStoreData: {},
  dashboardCacheId: null,
  dashboardMonthState: 'monthly'
}

// getters
const getters = {
  loggedIn: state => state.logged,
  userInfo:state => state.userInfo,
  userRole:state => state.userRole,
  pmNotice:state => state.pmNotice,
  cookieHash: state => state.cookieHash,
  unreadMessageCount: state => state.unreadMessageCount,
  switchInfo:state => state.switchInfo,
  msgStoreData: state => state.msgStoreData,
  dashboardCacheId: state => state.dashboardCacheId,
  dashboardMonthState: state => state.dashboardMonthState
}
// actions
const actions = {

}
// mutations
const mutations = {

  [types.USER_LOGOUT] (state) {
    // clear cart
    state.logged = false;
    state.userInfo = {}
    state.userRole = {}

  },
  [types.USER_LOGINED] (state) {
    // clear cart
    state.logged = true;
  },
  [types.USER_INFO_FETCHED] (state,  data) {
    // clear cart
    state.userInfo = data;
  },
  [types.USER_INFO_UPDATED] (state,  data) {
    // clear cart
    _.map(data, function(v,k){
      if(k === 'profile[phone]') k = 'phone'
      state.userInfo[''+k] = v;
    })
    console.log(state.userInfo)
  },


  [types.USER_ROLE_FETCHED] (state,  data) {
    // clear cart
    state.userRole = data.role;
  },
  [types.PM_NOTICE_FETCHED] (state,  data) {
    // clear cart
    state.pmNotice = data;
  },
  [types.GET_COOKIE_HASH] (state,  data) {
    state.cookieHash = data;
  },
  [types.GET_UNREAD_MESSAGE] (state,  data) {
    state.unreadMessageCount = data;
  },
  [types.SWITCH_INFO_UPDATED] (state, data) {
    _.map(data, function(v,k){
      if (v) {
        v = 1
      } else {
        v = 0
      }
      state.switchInfo[''+k] = v;
    })
  },
  [types.GET_MSG_DATA] (state,  data) {
    state.msgStoreData = data;
  },

  [types.SET_DASHBOARD_CACHE_ID] (state,  data) {
    state.dashboardCacheId = data;
  },
  [types.SET_DASHBOARD_MONTH_STATE] (state, data) {
    state.dashboardMonthState = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
