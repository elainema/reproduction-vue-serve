import * as types from '../mutation-types'

const state = {
  billingLogoutUrl:""
}

// getters
const getters = {
  billingLogoutUrl:state => state.billingLogoutUrl
}
// actions
const actions = {

}
// mutations
const mutations = {

  [types.BILLING_LOGOUT] (state, data) {
    // clear cart
    state.billingLogoutUrl = data

  }

}
export default {
  state,
  getters,
  actions,
  mutations
}
