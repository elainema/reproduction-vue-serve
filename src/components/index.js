/**
 * @author elaine
 * Date: 18/11/20
 */
const chosen_container_offer = () => import('./Chosen_Container_Offer.vue')
const allComponents = {
  install: function (Vue) {
    Vue.component('chosen_container_offer',chosen_container_offer)
  }
};

// 导出组件
export default allComponents