<template>
  <div ref="multipleInputRow">
    <div v-if="itemsArr.length === 1" >
      <div class="row-editable hide-normal"  ref="deleteRow" >
          <input class="form-control col-md-6" type="text" >
          <button class="btn btn-delete" @click.prevent="deleteRow($event)">Delete</button>
      </div>
      <div class="row-editable" ref="addRow" >
          <input class="form-control col-md-6" type="text"  :value="itemsArr[0]">
          <button class="btn btn-add" @click.prevent="addRow($event)" >Add</button>
      </div>
    </div>
    <div v-else>
      <div class="row-editable"   v-for="(item, index) in itemsArr" ref="deleteRow" >
          <input class="form-control col-md-6" type="text" :value="item">
          <button class="btn btn-delete" @click.prevent="deleteRow($event)" v-if="index !== itemsArr.length - 1 ">Delete</button>
          <button class="btn btn-add" @click.prevent="addRow($event)" v-else>Add</button>
      </div>
    </div>


  </div>
</template>
<script>
import Vue from "vue"
let $clone
export default {
  data(){
    return {  

    }
  },
  props: {
    items:{}
  },
  computed: {
     itemsArr(){
      return this.items && this.items.split("\n") || [""]
     }
  },
  components: { },
  methods: {
    deleteRow($event){
      $($event.target).parent(".row-editable").remove()
    },
    addRow($event){
      let that = this
      $clone = $clone && $clone.length ? $clone : $(this.$refs.deleteRow).clone().eq(0)
      $clone.removeClass("hide-normal")
      $clone.find("input").val("")
      $clone.on("click",".btn-delete",function(e){
        that.deleteRow(e)
      })
      $($event.target).parent(".row-editable").before($clone)
    }
  },
  watch:{
    items(newVal, oldVal){
      
    }
  },
  mounted () {
    let that = this;

  }
}
</script>
