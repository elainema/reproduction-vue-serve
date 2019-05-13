import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import loginform from './modules/loginform'
import app from './modules/app'
import report_all_chosen from './modules/report_all_chosen'
import offer_create from './modules/offerCreate'
import offer_detail from './modules/offerDetail'

import logout from './modules/logout'

import plugins from './plugins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    actions,
    modules: {
        loginform,
        app,
        report_all_chosen,
        offer_create,
        offer_detail,
        logout,
    },
    strict: debug,
    plugins
})


if (module.hot) {
    module.hot.accept([
        './getters',
        './actions',
        './mutation-types',
        //'./modules/'
    ], () => {
        store.hotUpdate({
            getters: require('./getters'),
            actions: require('./actions'),
            mutations: require('./mutation-types'),
            //modules: require('./modules/')
        })
    })
}


export default store
