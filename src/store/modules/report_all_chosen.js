import * as types from '../mutation-types'
import commonDataAPI from '@/api/commonData'
/*import eventProxy from '../../../asset/js/eventproxy'
const ep = new eventProxy()*/
let EventProxy = require('eventproxy');
let ep = new EventProxy()
const state = {
    chosens: []
}

// getters
const getters = {
        chosens:state => state.chosens
    }
    // actions
const actions = {
        getChosen({ commit, state }, payload) {
            ep.all('categories', 'geos', 'platforms', 'traffics', 'advertisers', 'browsers', 'devices', 'ams', 'pms', 'company', function(categories, geos, platforms, traffics, advertisers, browsers, devices, ams, pms, company) { // or ep.all(['tpl', 'data'], function (tpl, data) {})
                // 在所有指定的事件触发后，将会被调用执行
                // 参数对应各自的事件名
                commit(types.GET_CHOSEN, {
                    chosens: [
                        { name: "cat", trans_name:"category", full_name: "categories", data: categories },
                        { name: "geo", trans_name:"country",  full_name: "geos", data: geos },
                        { name: "dev", trans_name:"platform",  full_name: "platforms", data: platforms },
                        { name: "traffic", trans_name:"traffic",  full_name: "traffics", data: traffics },
                        { name: "adv", trans_name:"advertiser_id",  full_name: "advertiser", data: advertisers },
                        { name: "browser", trans_name:"browser",  full_name: "browsers", data: browsers },
                        { name: "device", trans_name:"device_type",  full_name: "devices", data: devices },
                        { name: "am", trans_name:"advertiser_manager_id",  full_name: "AM", data: ams },
                        { name: "pm", trans_name:"affiliate_manager_id",  full_name: "PM", data: pms },
                        { name: "company", trans_name:"company",  full_name: "company", data: company }
                    ]
                })

            });

            commonDataAPI.getDevices(function(data) {
                ep.emit("devices", data)
            })
            commonDataAPI.getCategories(function(data) {
                ep.emit("categories", data)
            })
            commonDataAPI.getGeos(function(data) {
                ep.emit("geos", data)
            })
            commonDataAPI.getPlatforms(function(data) {
                ep.emit("platforms", data)
            })
            commonDataAPI.getTraffics(function(data) {
                ep.emit("traffics", data)
            })
            commonDataAPI.getAdvertisers(function(data) {
                ep.emit("advertisers", data)
            })
            commonDataAPI.getBrowsers(function(data) {
                ep.emit("browsers", data)
            })
            commonDataAPI.getAMs(function(data) {
                ep.emit("ams", data)
            })
            commonDataAPI.getPMs(function(data) {
                ep.emit("pms", data)
            })
            commonDataAPI.getCompany(function(data) {
                ep.emit("company", data)
            })

        }
    }
    // mutations
const mutations = {

    [types.GET_CHOSEN](state, { chosens }) {
        // clear cart
        state.chosens = chosens;
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}