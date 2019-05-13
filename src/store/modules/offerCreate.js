import * as types from '../mutation-types'
// initial state
const state = {
    add_adv:"",
}
// getters are functions
const getters = {
    add_adv:state => state.add_adv
}
// actions
const actions = {
}

// mutations
export const mutations = {
    [types.ADV_INFO_UPDATED] (state, data) {
        // clear cart
        state.add_adv = data

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
