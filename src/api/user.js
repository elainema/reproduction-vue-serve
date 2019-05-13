/**
 * Mocking client-server processing
 */
import Vue from 'vue'

export default {
    loginIn(param, cb) {
            Vue.http.post('Session/login', param).then(response => {

                // get body data
                this.someData = response.body;
                console.log(this.someData)
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })

        },
        logOut(cb) {

            Vue.http.get('Session/logout').then(response => {

                // get body data
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })

        },
        getUserInfo(cb) {
            Vue.http.get('Session/getPassport').then(response => {

                // get body data
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })
        },
        getUserRole(cb) {
            Vue.http.get('Session/getRole').then(response => {

                // get body data
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })
        },
        getPmNotice(cb) {
            Vue.http.get('Pm/getPmNotice').then(response => {
                // get body data
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })
        },
        getCookieHash(cb){
            Vue.http.get('Session/getSessionId').then(response => {
                // get body data
                cb(response.body)
            }, response => {
                // error callback
                cb(response.body)
            })
        },
}
