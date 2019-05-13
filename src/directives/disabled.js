import Vue from 'vue'

// Register a global custom directive called v-focus
Vue.directive('disabled', {
  // called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
  bind: function (el, binding) {
    // Focus the element
    if(binding.value ) {
        $(el).prop("disabled",true)
    }

  }
})