/**
 * @author vincent
 * Date: 18/01/31
 */
import Vue from 'vue'

import Skeleton from './skeleton/index'

const components = [
  Skeleton
]

const install = function(Vue) {
  if (install.installed) return
  
  components.map(component => Vue.component(component.name, component))

}

if (typeof Vue !== 'undefined') {
  install(Vue)
}

export default {
  Skeleton
}
