
let mixin_modal  = {
  data(){
    return {
        modalState:"hide",
     }
  },
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    }
  }
}
export default mixin_modal = mixin_modal