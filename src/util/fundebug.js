import Vue from 'vue'

fundebug.apikey = "3c273b824a930c642cb6e4812c2a22e1a754d49388aac0b962b636fb4acc0694";

const formatComponentName = vm => {
  if (vm.$root === vm) return 'root';

  let name = vm._isVue
    ? (vm.$options && vm.$options.name) ||
      (vm.$options && vm.$options._componentTag)
    : vm.name;

  return (
    (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options && vm.$options.__file
        ? ' at ' + (vm.$options && vm.$options.__file)
        : '')
  );
}

Vue.config.errorHandler = (err, vm, info) => {
  if(process.env.NODE_ENV !== 'production') {
    return
  }
  if (vm) {
    let componentName = formatComponentName(vm);
    let propsData = vm.$options && vm.$options.propsData;
    fundebug.notifyError(err, {
      metaData: {
          componentName: componentName,
          propsData: propsData,
          info: info
      }
    });
  } else {
    fundebug.notifyError(err);
  }
};
