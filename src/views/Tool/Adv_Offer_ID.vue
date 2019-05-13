<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link> </li>
            <li>Advertiser Offer Query</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Advertiser Offer Query</h2>
            <div class="box-action" v-box-action-full-small>
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            
                <div class="box-content">
                    <div class="control-group">
                        <label class="control-label col-md-2"> </label>
                        <div class="controls">
                            <label><input type="radio" value="1" :checked="isID"  name="offertype" @click="isCheck" />&nbsp;Source Offer Id</label>&nbsp;&nbsp;
                            <label><input type="radio" value="2" :checked="!isID" name="offertype" @click="isCheck" />&nbsp;Internal Offer Id</label>
                        </div>
                    </div>
                    <div class="box-content">
                    <form class="form-horizontal frm-entity"  ref="form" action="" method="post" id="cc_add" @submit.stop.prevent="submitForm">
                        <div class="control-group" style="height:100px" v-if="isID=='checked'">
                            <label class="control-label col-md-2" for="source_offer_id"> Source Offer Ids</label>
                            <div class="controls">
                                <textarea v-model="source_offer_id" class="col-md-6  form-control" cols="50" name="source_offer_id" id="source_offer_id" required></textarea>
                            </div>
                        </div>
                        <div class="control-group" style="height:100px" v-else>
                            <label class="control-label col-md-2" for="internal_offer_id"> Internal Offer Ids</label>
                            <div class="controls">
                                <textarea v-model="internal_offer_id" class="col-md-6  form-control" cols="50" name="internal_offer_id" id="internal_offer_id" required></textarea>
                            </div>
                        </div>
                        <div class="control-group" >
                        <div class="col-md-offset-2">
                            <button type="submit" class="btn btn-primary">Query</button>
                            <button type="reset" class="btn btn-default">Cancel</button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>


        </div>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Result</h2>
            <div class="box-action" v-box-action-full-small>
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            </div>
        </div>
        <div class="box-content overflow_scroll">
            
            <table class="table table-hover tablesorter" id="title_list">

                <thead>
                    <tr>
                        <th>Source Offer ID</th>
                        <th>Offer ID</th>
                        <th>Adv Name</th>
                        <th>Offer Name</th>
                    </tr>
                </thead>
                <tbody id="cp_list">
                    <tr v-for="item in renderData">
                        <td class="no-wrap">{{ item.source_offer_id }}</td>
                        <td><router-link :to="'p_manage_offer?id='+ item.internal_offer_id" target="_blank">{{ item.internal_offer_id }}</router-link></td>
                        <td>{{ item.adv_source }}</td>
                        <td><router-link :to="'p_manage_offer?id='+ item.internal_offer_id" target="_blank">{{ item.offer_name }}</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>        
    </div>
</div>
</template>

<script>
import Vue from "vue";
import mixin_alert_msg from "@/mixins/alert_msg";
import AlertPop from "@/components/common/alert-pop/";
export default {
  data() {
    return {
      ajax_loading: false,
      renderData: [],
      source_offer_id: "",
      internal_offer_id: "",
      isID: "checked"
    };
  },
  mixins: [mixin_alert_msg],
  watch: {},
  computed: {},
  components: { AlertPop },
  methods: {
    isCheck: function(e) {
      if (e.target.value == 1) {
        this.isID = "checked";
      } else if (e.target.value == 2) {
        this.isID = "";
      }
    },
    submitForm() {
      let that = this;
      var search_query = $(that.$refs.form).getFormQuery();
      that.ajax_loading = true;
      Vue.http.get("Am/getImportedOfferId", { params: search_query }).then(
        response => {
          var o = response.body && response.body.data;
          that.renderData = o || [];
          that.ajax_loading = false;
        },
        response => {
          that.showAlert(response.body.msg, "info");
          that.ajax_loading = false;
        }
      );
    }
  },
  created() {
    let that = this;
  },
  mounted() {
    let that = this;
  }
};
</script>