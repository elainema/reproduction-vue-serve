import directive from './src/directive';
import service from './src/index';
import Vue from 'vue';

const install = Vue => {
  Vue.use(directive);
  Vue.prototype.$yeahloading = service;
}

install(Vue)

export default {
  install,
  directive,
  service
};
