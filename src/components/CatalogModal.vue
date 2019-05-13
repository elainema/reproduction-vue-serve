<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
          <h3>Manage Catalog</h3>
        </div>
        <div class="modal-body">
          <div class="well" role="form">
            <form class="form-inline form-horizontal" fef-submit="submitForm" @submit.prevent="onAdd(catalog_title);catalog_title=''">

              <div class="form-group form-group-block ">
                <div class="col-md-8">
                  <label for="keyWordsOfPageTitle" class="hide"></label>
                  <input type="text" maxlength="50" required class="form-control col-md-12" id="" data-fv-notempty="true" data-fv-notempty-message="The catalog_title is required and cannot be empty" name="catalog_title" v-model="catalog_title" placeholder="Catalog Title">
                </div>
                <div class="col-md-4 nml20">
                  <button type="submit" class="btn btn-primary col-md-10 ">Add Catalog</button>
                </div>

              </div>
            </form>

          </div>
          <div class="catalog_table_container customScrollBar">
            <table class=" table  table-hover" id="diagnosis_list">
              <thead class="">
                <tr>
                  <th data-nowrap="true">Order</th>
                  <th>Catalog Title</th>
                  <th data-nowrap="true">Child Pages</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in categories">
                  <td>{{index+1}}</td>
                  <td v-if="categoryState[item.id] =='read' " @click="toggleState(item.id)"> 
                    <span > {{item.name}}</span>
                  </td>
                  <td v-else>
                      <input  type="text" name="" autofocus="" @blur.stop.prevent="onEdit(item.id, $event.target.value)" :value="item.name">
                  </td>
                  <td>{{item.count}}</td>
                  <td @click="onRemove(item.id)"><i v-if="item.count === '0'" class="fa fa-remove" ></i></td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
  data(){
    return {
      catalog_title:""
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    categories:{},
    onRemove:{},
    onAdd:{},
    onEdit:{},
    categoryState:{}
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    toggleState(id) {
      this.categoryState[id] = this.categoryState[id] === "edit" ? "read" : "edit"
      console.log(this.categoryState)
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    }
  },
  mounted () {
    let that = this
    $(this.$refs.modal).on('hidden.bs.modal', function () {
      that.hideModal()
    })

  }
}
</script>
<style scoped>
.catalog_table_container .fa-remove {
  display: none;
}
.catalog_table_container tr:hover .fa-remove {
  display: block;
}

</style>