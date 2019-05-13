/**
 * Mocking client-server processing
 */
import Vue from 'vue'

export default {

    getOfferInfo(param, cb) {
        Vue.http.get('Offer2/getById?id=' + param.id).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getOCPAInfo(param, cb) {
        Vue.http.get('Ocpa/getofferocpakpi',{params: param.ocpaParam}).then(response => {
            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAffAccess(param, cb) {
        Vue.http.get('Offer2/getAffAccess', {params: param.affAccessParam}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getActiveUser(param, cb) {
        Vue.http.get('Publisher/getActiveUser').then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAppList(param, cb) {
        Vue.http.get('Publisher/getAppList', {params: param}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAccessApps(param, cb) {
        Vue.http.get('Offer2/getAccessApps',  {params: param.appAccessParam}).then(response => {
            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    saveAppAccess(param, cb) {
        Vue.http.get('Offer2/saveAppAccess', {params: param}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getCurrentTrackLink(param, cb) {
        Vue.http.get('Union/getCurrentTrackLink').then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getPayoutAndCapsByOfferId(param, cb) {
        Vue.http.get('Offer2/getPayoutAndCapsByOfferId?offer_id=' + param.id).then(response => {

            // get body data
            cb(response.body && response.body.data && response.body.data.list)
        }, response => {
            // error callback
            cb(response.body)
        })
    },

    getAppPayoutAndCaps(param, cb) {
        Vue.http.get('Offer2/getAppPayoutAndCaps?offer_id=' + param.id).then(response => {

            // get body data
            cb(response.body && response.body.data || [])
        }, response => {
            // error callback
            cb(response.body)
        })
    },


    getExchangeRateFromEURToUSD(param, cb) {
        Vue.http.get('Invoice/getExchangeRateFromEURToUSD').then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getExchangeRateFromGBPToUSD(param, cb) {
        Vue.http.get('Invoice/getExchangeRateFromGBPToUSD').then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getExpirationAction(param, cb) {
        Vue.http.get('Offer2/getExpirationAction?offer_id=' + param.id).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    
    getOfferKpiSetting(param, cb) {
        Vue.http.get('Offer2/getOfferKpiSetting?id=' + param.id).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            // cb(response.body)
            cb(null)
            console.error(response.body)
        })
    }

}
