import userAPI from '@/api/user'
import * as types from '../mutation-types'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
    loginIn({ commit, state }, payload) {
        userAPI.loginIn(payload.query, data => {
            if (data.flag === "success") {
                commit(types.USER_LOGINED, { email: payload.email, pass: payload.pass })
            }
            payload.cb && payload.cb(data)
        })
    }
}

// mutations
export const mutations = {

    [types.USER_LOGINED](state) {
        // clear cart
        state.logged_user = true;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
