import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'

import filter from './filter'
import router from './router'
import store from './store'
import directives from './directives/'
import http from './util/http';
import * as _ from 'lodash'

import lodash_extend from './util/lodash_extend';
import jquery_extend from './util/jquery_extend';
import private_mode_warning from './util/private_mode_warning'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import VUE_UI from './packages/index'
import commonComponents from '@/components/index'

import '@/assets/css/index.less';
import '@/assets/css/base.less';

Vue.config.productionTip = false

Vue.use(require('vue-script2'))
Vue.use(ElementUI, { locale })
Vue.use(VUE_UI)
Vue.use(commonComponents)

if(process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
      id: ['UA-107694067-1'],
      router,
      autoTracking: {
        exception: true
      }
    })
}


new Vue({
    el: '#app',
    store,
    router,
    http,
    render: h => h(App)
})
