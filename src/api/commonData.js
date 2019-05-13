/**
 * Mocking client-server processing
 */
import Vue from 'vue'

export default {
    getCategories(cb, opts) {
        Vue.http.get('Category/getCategoryIdAndName').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getGeos(cb, opts) {
        Vue.http.get('Info/getCountryIdAndName', { ttl: 10 }).then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getGeoCountryList(cb, opts) {
        Vue.http.get('Info/getGeoCountryList').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getGeoStateList(cb, opts) {
        Vue.http.get('Info/getGeoStateList').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getDevices(cb, opts) {
        Vue.http.get('Info/getDeviceType', { ttl: 10 }).then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },


    getPlatforms(cb, opts) {
        Vue.http.get('Info/getDeviceIdAndName').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getDeviceOsTargeting(cb, opts) {
        Vue.http.get('Info/getDeviceOsTargeting').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getDeviceBrandTargeting(cb, opts) {
        Vue.http.get('Info/getDeviceBrandTargeting', { ttl: 10 }).then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getTraffics(cb, opts) {
        Vue.http.get('Info/getChannelIdAndName').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getConversionFlow(cb, opts) {
        Vue.http.get('Info/getConversionFlow').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getAdvertisers(cb, opts) {
        Vue.http.get('Advertiser/getIdAndName').then(response => {
            // get body data
           // cb(response.body.data.list)
            var adv_data = _.sortBy(response.body.data.list, function(each){ return each.name.toLowerCase()})
            cb(adv_data)
        }, response => {
            // error callbackcb
            cb(response.body.data)
        });
    },

    getBrowsers(cb, opts) {
        Vue.http.get('Info/getBrowserIdAndName', { ttl: 10 }).then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getCarriers(cb, opts) {
        Vue.http.get('Info/getCarrierIdAndName', { ttl: 10 }).then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },

    getAMs(cb, opts) {
        Vue.http.get('Employee/getManager').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getPMs(cb, opts) {
        Vue.http.get('Affiliate/getManager').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getAMList(cb, opts) {
        Vue.http.get('Am/getAmList').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getManagerList(cb, opts) {
        Vue.http.get('Affiliate/getManagerList').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getCompany(cb, opts) {
        Vue.http.get('Info/getCompany').then(response => {
            // get body data
            cb(response.body.data.list)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
    getRotateGroup(cb, opts) {
        Vue.http.get('Offer2/getAllGroups').then(response => {
            // get body data
            cb(response.body.data)
        }, response => {
            // error callback
            cb(response.body.data)
        });
    },
}
