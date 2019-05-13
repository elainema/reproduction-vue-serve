
let mixin_dialog  = {
  methods: {
    handleClose() {
      this.$emit(`update:${this.dialogName}`, false)
    },
  }
}
export default mixin_dialog = mixin_dialog