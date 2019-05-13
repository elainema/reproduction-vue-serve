import Vue from 'vue'

// Register a global custom directive called v-focus
Vue.directive('conditionAttr', {
  // called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
  bind: function (el, binding) {
    // Focus the element
    console.log(binding)
    if(binding.value && binding.expression === "multiple_vue") {
        $(el).attr("multiple","multiple")
    }
    if(binding.value && binding.expression === "switch_disable") {
        $(el).prop("disabled",true)
    }



  }
})