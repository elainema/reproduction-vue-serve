<template>
<div id="" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Edit {{landing_name}}</h3>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" role="form">
                  <div class="control-group form-group">
                      <label class="control-label col-md-3">Name: </label>
                      <div class="controls col-md-9">
                          <input type="text" :value="landing_name" disabled=""></input>
                      </div>
                  </div>
                  <div class="control-group form-group">
                      <label class="control-label col-md-3">Url: </label>
                      <div class="controls col-md-9">
                          <input type="text" :value="track_url" ref="track_url"></input>
                      </div>
                  </div>
                  <div class="control-group form-group">
                      <label class="control-label col-md-3">Site: </label>
                      <div class="controls col-md-9"> 
                          <select v-model="site"> 
                            <option  v-for="(item, $index) in landing_site" :value="item"> {{item}}</option>
                          </select>
                      </div>
                  </div>

              </form>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirmBtn">Publish</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      site:"",
      track_url:''
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    landing_id:{},
    offer_id:{},
    landing_name:{},
    landing_url:{},
    landing_site:{},
    offer_url:{},
    tracking_url:{}
  },
  computed: {
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.hideModal();
        this.onConfirm(this.landing_name, $(this.$refs.track_url).val(), this.site, this.landing_id)
    },
    set_track_url() {
          if(this.tracking_url) {

             return this.tracking_url
          }
          let http_procol =  this.offer_url.indexOf("//") !== -1 ?  this.offer_url.substr(0, this.offer_url.indexOf("//") + 2) : "http://"
          let url = this.offer_url.indexOf("//") !== -1 ?  this.offer_url.substr(this.offer_url.indexOf("//")+2) : this.offer_url
          let url_end = url.indexOf("/") !== -1 ? url.substr(url.indexOf("/")) : ""
          if(this.site.match(/http/)) {
            return this.site + url_end

          } else {
            return http_procol + this.site + url_end

          }

      }


  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    },
    landing_site: function(val) {
      if(val) {
        this.site = this.landing_site[0]
      }
    }
  },
  mounted () {
    let that = this

    $(this.$refs.modal).on('shown.bs.modal', function () {

    })
    that.set_track_url()
  }
}
</script>