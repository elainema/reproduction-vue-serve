/**
 * @author vincent
 * Date: 18/01/31
 */
import Skeleton from './src/skeleton.vue'

Skeleton.install = function(Vue) {
  Vue.component(Skeleton.name, Skeleton)
}

export default Skeleton
