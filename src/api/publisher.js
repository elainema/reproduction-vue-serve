
import Vue from 'vue'

export default {
    getBasic(param, cb) {
        Vue.http.get('Affiliate/getBasic', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getContact(param, cb) {
        Vue.http.get('Affiliate/getContact', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getSettings(param, cb) {
        Vue.http.get('Affiliate/getSettings', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getCurrentTrackLink(param, cb) {
        Vue.http.get('Union/getCurrentTrackLink', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAffiliateList(cb, opts){
        Vue.http.get('Affiliate/getAffList').then(response => {
            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getBlockedAdvsByAff(param, cb) {
        Vue.http.get('Affiliate/getBlockedAdvsByAff', {params:{aff_id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getBlockedAffsByAdv(param, cb) { //BlackList
        Vue.http.get('Advertiser/getBlockedAffsByAdv', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getWhiteListByAdv(param, cb) { //WhiteList
        Vue.http.get('Advertiser/getAffiliateWhiteList', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getSubAffBlackList(param, cb) {
        Vue.http.get('Affiliate/getSubAffBlackList', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getProductInfo(params, cb) {
        Vue.http.get('Publisher/getProductInfo', {params:params}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getPaymentInfoById(param, cb) {
        Vue.http.get('Payment/getPaymentInfoById', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getCategoryList(param, cb) {
        Vue.http.get('Publisher/getCategoryList', {params:{type:param.type}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getRemark(param, cb) {
        Vue.http.get('Affiliate/getRemark', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getQuestions(param, cb) {
        Vue.http.get('Affiliate/getQuestions', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getStatistic(param, cb) {
        Vue.http.get('Employee/getStatistics', {params:{passport_id:param.id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAppList(param, cb) {
        Vue.http.get('Publisher/getAppList', {params:{publisher_id:param.id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getSlotList(param, cb) {
        Vue.http.get('Publisher/getSlotList', {params:{publisher_id:param.publisher_id, devapp_id: param.app_id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getAllTemplates(param, cb) {
        Vue.http.get('Publisher/getAllTemplates', {params:{publisher_id:param.id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    getOfferPreference(param, cb) {
        Vue.http.get('Publisher/getOfferPreference', {params:{app_id:param.app_id}}).then(response => {

            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body)
        })
    },
    provePayment(param, cb) {
        Vue.http.get('Payment/provePayment', {params:{id:param.id}}).then(response => {

            // get body data
            cb(response.body)
        }, response => {
            // error callback
            cb(response.body)
        })
    }
}
