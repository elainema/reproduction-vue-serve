import * as types from '../mutation-types'

const state = {
  offerInfo:{},
  refresh_app_access:false,
  refresh_aff_access:"",
  affAccessInfo:{},
  appAccessInfo:{},
  activeUserInfo:{},
  ocpaData:{},
  payoutAndCapsInfo:{},
  AppPayoutAndCaps:{}
}

// getters
const getters = {
  offerInfo:state => state.offerInfo,

  refresh_app_access: state => state.refresh_app_access,
  refresh_aff_access: state => state.refresh_aff_access,
  affAccessInfo:state => state.affAccessInfo,
  getActiveUserInfo: state => state.activeUserInfo,
  appAccessInfo: state => state.appAccessInfo,
  ocpaData:state => state.ocpaData,
  payoutAndCapsInfo:state => state.payoutAndCapsInfo,
  AppPayoutAndCaps:state => state.AppPayoutAndCaps
}
// actions
const actions = {
    switchImpactFetched({ commit, state }, data) {
        commit(types.SWICTH_INACT_FETCHED, data)
    },
    offerInfoUpdate({ commit, state }, data) {
        commit(types.OFFER_INFO_UPDATED, data)
    },
    refreshAppAccess({ commit, state }, data) {
        commit(types.REFRESH_APP_ACCESS, data)
    },
    refreshAffAccess({ commit, state }, data) {
        commit(types.REFRESH_AFF_ACCESS, data)
    },
    OCPAInfoUpdate({ commit, state }, data) {
        commit(types.OCPA_INFO_UPDATED, data)
    },
    AppPayoutAndCapsUpdate({ commit, state }, data) {
        commit(types.APP_PAYOUT_AND_CAPS_UPDATED, data)
    },
    payoutAndCapsInfoUpdate({ commit, state }, data) {
        commit(types.PAYOUT_AND_CAPS_UPDATED, data)
    },

}
// mutations
const mutations = {

  [types.OFFER_INFO_FETCHED] (state, data) {
    data.alert_status = data.alert_status || "";
    data.alert_status_time = data.alert_status_time || "";
    data.alert_revenue = data.alert_revenue || "";
    data.alert_revenue_time = data.alert_revenue_time || "";

    
    state.offerInfo = data;

  },
  [types.OFFER_INFO_UPDATED] (state, data) {
    _.map(data, function(v,k){
      state.offerInfo[''+k] = v;
    })
  },
  [types.REFRESH_APP_ACCESS] (state, data) {
    _.map(data, function(v,k){
      state.refresh_app_access = v
    })
  },
  [types.REFRESH_AFF_ACCESS] (state, data) {
    state.refresh_aff_access = data
  },
  [types.SWICTH_INACT_FETCHED] (state, data) {
    _.map(data, function(v,k){
      state.switchInfo[''+ k] = v;
    })
  },
  [types.AFFACCESS_INFO_FETCHED] (state, data) {
    state.affAccessInfo = data;
  },
  [types.ACTIVE_USER_INFO_FETCHED] (state, data) {
    state.activeUserInfo = data;
  },
  [types.APP_INFO_FETCHED] (state, data) {
    var data = data && data.data || []
    if (data) {
        state.appAccessInfo  = data
    }
  },

  [types.OCPA_INFO_FETCHED] (state, data) {
    state.ocpaData = data;
  },
  [types.OCPA_INFO_UPDATED] (state, data) {
    _.map(data, function(v,k){
      state.ocpaData[''+k] = v;
    })
  },

  [types.PAYOUT_AND_CAPS_FETCHED] (state, data) {
    state.payoutAndCapsInfo = data;
  },
  [types.PAYOUT_AND_CAPS_UPDATED] (state, data) {
    state.payoutAndCapsInfo = data;
  },
  [types.APP_PAYOUT_AND_CAPS_FETCHED] (state, data) {
    state.AppPayoutAndCaps = data;
  },
  [types.APP_PAYOUT_AND_CAPS_UPDATED] (state, data) {
    state.AppPayoutAndCaps = data;
  },




}
export default {
  state,
  getters,
  actions,
  mutations
}
