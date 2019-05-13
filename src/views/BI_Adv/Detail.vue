<template>
    <div>
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li>
                    <router-link to="./">Home</router-link>
                </li>
                <li>
                    <router-link to="/bi_adv">Ad leader</router-link>
                </li>
                <li class="active">Advertiser BI number</li>
            </ul>
        </div>

        <div class="box">
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg"
                           :alertType="alertType"></alert-pop>
            <transition name="fade" mode="out-in">
                <mainSkeleton v-if="!init">
                </mainSkeleton>
                <div v-else class="box-content row">
                    <ul id="myVTab" class="nav nav-stacked col-md-3">
                        <li class="active" v-if="productData"><a href="#product" id="productli" data-toggle="tab"
                                                                 aria-expanded="false">
                            <i class="f-left fa fa-cube"></i>
                            <h2>Summary</h2><i class="f-right fa fa-eye" @click.prevent="onConfirm('product')"></i></a>
                        </li>
                        <li class="" v-if="affiliateData"><a href="#affiliate" id="affiliateli" data-toggle="tab"
                                                             aria-expanded="true">
                            <i class="f-left fa fa-users"></i>
                            <h2>Affillate</h2><i class="f-right fa fa-eye" @click.prevent="onConfirm('affiliate')"></i></a>
                        </li>
                        <li class="" v-if="countryData"><a href="#country" id="countryli" data-toggle="tab"
                                                           aria-expanded="true">
                            <i class="f-left fa fa-globe"></i>
                            <h2>Country</h2><i class="f-right fa fa-eye" @click.prevent="onConfirm('country')"></i></a>
                        </li>
                        <li class="" v-if="platformData"><a href="#platform" id="platformli" data-toggle="tab"
                                                            aria-expanded="false">
                            <i class="f-left fa fa-desktop"></i>
                            <h2>Platform</h2><i class="f-right fa fa-eye"
                                                @click.prevent="onConfirm('platform')"></i></a>
                        </li>
                        <li class="" v-if="os_androidData"><a href="#os_android" id="os_androidli" data-toggle="tab"
                                                              aria-expanded="false">
                            <i class="f-left fa fa-android"></i>
                            <h2>OS-Android</h2><i class="f-right fa fa-eye"
                                                  @click.prevent="onConfirm('os_android')"></i></a>
                        </li>
                        <li class="" v-if="os_iosData"><a href="#os_ios" id="os_iosli" data-toggle="tab"
                                                          aria-expanded="false">
                            <i class="f-left fa fa-mobile"></i>
                            <h2>OS-IOS</h2><i class="f-right fa fa-eye" @click.prevent="onConfirm('os_ios')"></i></a>
                        </li>
                        <li class="" v-if="brandData"><a href="#brand" id="brandli" data-toggle="tab"
                                                         aria-expanded="false">
                            <i class="f-left fa fa-tablet"></i>
                            <h2>Device Brand</h2><i class="f-right fa fa-eye"
                                                    @click.prevent="onConfirm('brand')"></i></a>
                        </li>
                        <li class="" v-if="qualityData"><a href="#quality" id="qualityli" data-toggle="tab"
                                                           aria-expanded="false">
                            <i class="f-left fa fa-sticky-note"></i>
                            <h2>Quality Report</h2><i class="f-right fa fa-eye"
                                                      @click.prevent="onConfirm('quality')"></i></a>
                        </li>
                    </ul>

                    <div class="tab-content col-md-9" id="myVTabContent">
                        <div class="tab-pane fade active in" id="product" role="tabpanel" v-if="productData">
                            <tabChart :summary_data="report_list.product" map_type="product"
                                      :total_data="report_list.total"></tabChart>
                        </div>
                        <div class="tab-pane fade " id="country" role="tabpanel" v-if="countryData">
                            <tabChart :summary_data="report_list.country" map_type="country"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="affiliate" role="tabpanel" v-if="affiliateData">
                            <tabChart :summary_data="report_list.affiliate" map_type="affiliate"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="os_android" role="tabpanel" v-if="os_androidData">
                            <tabChart :summary_data="report_list.os_android" map_type="os_android"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="os_ios" role="tabpanel" v-if="os_iosData">
                            <tabChart :summary_data="report_list.os_ios" map_type="os_ios"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="platform" role="tabpanel" v-if="platformData">
                            <tabChart :summary_data="report_list.platform" map_type="platform"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="brand" role="tabpanel" v-if="brandData">
                            <tabChart :summary_data="report_list.brand" map_type="brand"></tabChart>
                        </div>
                        <div class="tab-pane fade" id="quality" role="tabpanel" v-if="qualityData">
                            <tabChart :summary_data="report_list.quality" map_type="quality"></tabChart>
                        </div>
                    </div>
                </div>
            </transition>
                <confirmModal ref="emailComfirm" :modalState="modalState" :hideModal="hideModal"
                              :onConfirm="recountThis" :editable_modal_body="editable_modal_body"></confirmModal>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.diagram_block {
  padding: 20px;
  position: relative;
  h2 {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
  .action {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 999;
  }
}

.box-content {
  padding-top: 0;
  padding-bottom: 0;
}

#myVTab {
  background: #edeef5;
  padding: 0;
  min-height: 600px;
  margin-bottom: -99999px;
  padding-bottom: 99999px;
}

#myVTab .f-left {
  width: 20%;
  text-align: center;
}

#myVTab .f-right {
  width: 10%;
  text-align: right;
  cursor: pointer;
}

#myVTab h2 {
  display: inline-block;
  width: 60%;
}

#myVTabContent {
  background: #fff;
  padding: 5px 20px;
}

.row {
  overflow: hidden;
}
</style>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import tabChart from "./Chart_Tab_Page.vue";
import AlertPop from "@/components/common/alert-pop/";
import mixin_alert_msg from "@/mixins/alert_msg";
import confirmModal from "@/components/ConfirmModal.vue";
import mainSkeleton from "@/components/TheAdvertiserBIMainSkeleton.vue";

export default {
  data() {
    return {
      isClose: false, //是否点击了闭眼
      modalState: "hide", //确认框默认隐藏
      report_list: "", //报表数据
      countryData: "",
      os_androidData: "",
      os_iosData: "",
      platformData: "",
      productData: "",
      brandData: "",
      qualityData: "",
      affiliateData: "",
      loadingZone: false,
      initOptions: {
        renderer: "canvas"
      },
      osAndroid_data: [],
      summary_state: "",
      modalState: "hide",
      showConfirmModal: { default: true },
      editable_modal_body:
        "Are you sure to delete this data？\n" +
        "you can get this data back by recounting the whole report\n",
      targetTab: "",
      init: false
    };
  },
  components: { tabChart, AlertPop, confirmModal, mainSkeleton },
  mixins: [mixin_alert_msg],
  methods: {
    getRepData() {
      Vue.http.get("Bi/getBiReportDetails?id=" + this.$route.query.id).then(
        response => {
          let data = response.body.data;
          this.report_list = (data && data.data) || [];

          if (this.report_list != "") {
            this.countryData = this.report_list.country
              ? this.report_list.country.data
              : "";
            this.os_androidData = this.report_list.os_android
              ? this.report_list.os_android.data
              : "";
            this.os_iosData = this.report_list.os_ios
              ? this.report_list.os_ios.data
              : "";
            this.platformData = this.report_list.platform
              ? this.report_list.platform.data
              : "";
            this.productData = this.report_list.product
              ? this.report_list.product.data
              : "";
            this.affiliateData = this.report_list.affiliate
              ? this.report_list.affiliate.data
              : "";
            this.brandData = this.report_list.brand
              ? this.report_list.brand.data
              : "";
            this.qualityData = this.report_list.quality
              ? this.report_list.quality.data
              : "";
            this.init = true;
            this.selectTab();
          }
        },
        response => {
          this.showAlert(response.body.msg);
        }
      );
    },
    onConfirm(target) {
      if (this.showConfirmModal) {
        this.modalState = "show";
        this.targetTab = target;
      } else {
        this.onConfirm && this.onConfirm();
      }
    },
    hideModal: function() {
      this.modalState = "hide";
    },
    recountThis() {
      var obj = $(this.$refs.form).getFormQuery();
      delete obj.comment;
      let para = {
        id: this.$route.query.id,
        report_type: this.targetTab,
        data: "",
        comment: "",
        is_close: 1
      };
      Vue.http.post("Bi/editBiReport", para).then(
        response => {
          this[para.report_type + "Data"] = "";
          this.report_list[para.report_type].data = "";
          this.selectTab();
        },
        response => {
          this.showAlert(response.body.msg);
        }
      );
      //debug用
      /*let para = {
                    id:this.$route.query.id,
                    report_type: 'os_android',
                    data: JSON.stringify({"Android 7.0":"23.90%","Android 6.0.1":"12.27%","Android 6.0":"11.89%","Android 4.4.2":"9.51%","Android 5.1":"9.14%","Android 5.1.1":"7.01%","Android 7.1.1":"3.88%","Android 4.0.4":"3.25%","other":"19.15%"}),
                }
                Vue.http.post('Bi/editBiReport',para).then(response => {
                    $('#myVTab > li').removeClass("active");
                    $('#myVTab > li:first-child').addClass("active");
                }, response => {
                    this.showAlert(response.body.msg)
                })*/
    },
    selectTab() {
      var myObject = new Map(); //使对象数据按预定顺序排序，涉及给谁active
      myObject.set("product", this.report_list.product);
      myObject.set("affiliate", this.report_list.affiliate);
      myObject.set("country", this.report_list.country);
      myObject.set("platform", this.report_list.platform);
      myObject.set("os_android", this.report_list.os_android);
      myObject.set("os_ios", this.report_list.os_ios);

      for (var [key, value] of myObject) {
        if (value.data !== "") {
          this.$nextTick(function() {
            if (document.getElementById(key + "li")){
              document.getElementById(key + "li").click();
            }
          });
          return false;
        }
      }
    }
    /*closeData(num) {   //:class="closeData(0)"
                switch (num) {
                    case 0 :
                        return {'fa-eye': this.isOpen, 'fa-eye-slash': !this.isOpen};
                    case 1 :
                        return {'fa-eye': this.isOpen, 'fa-eye-slash': !this.isOpen};
                    default :
                        return false;
                }
            }*/
  },
  computed: {
    startDate() {
      return moment()
        .add(-1, "month")
        .format("YYYY-MM-DD");
    },
    endDate() {
      return moment().format("YYYY-MM-DD");
    }
  },
  created() {
    this.getRepData();
  },
  mounted() {}
};
</script>
