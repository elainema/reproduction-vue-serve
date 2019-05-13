<template>
    <div ref="filters">
        <div class="well" :class="product_id ? 'show': 'hide'">
            <div class="offer_product_list">
                <span v-if="productInfo && id == 'icon_url'" v-for="(val, id) in productInfo" data-product="icon_url">
                    <a v-if="productInfo.primary_category != 'Mobile Content' &&  productInfo.secondary_category != 'Online DDL'" href="javascript:;">
                        <img :src="productInfo.icon_url ? productInfo.icon_url : defaultProductInfoImg" class="thumbs"  target="_blank" />
                    </a>
                    <span v-else>
                        <img :src="productInfo.icon_url ? productInfo.icon_url : defaultProductInfoImg" class="thumbs"  target="_blank" />
                        <a :id="'upload_btn' + id" class="upload_product_icon  swfu-upload-btn" @click.prevent="upload_logo(id, 'product')">Update Icon</a>
                    </span>
                    <span :ishideClosestTr="hideClosestTr(id)"></span>
                </span>
                <table class="tbl-fixed">
                    <tbody>
                        <tr :class="isHideClosestTr ? 'hide' : ''">
                            <td class="table_label">Product name:</td>
                            <td>
                                <editable_text_offer :offer_name="'name'" :offer_val="productInfo.name" :renderOffer="productInfo" :editable_disable="productInfo.primary_category !== 'Mobile Content'" :offer_api="'Offer/updateProduct'" :query_id="product_id" :showAlert="showAlert" :showConfirmModal="false"></editable_text_offer>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_label">Product category:</td>
                            <td><span data-product="primary_category"></span>{{ productInfo.primary_category }}</td>
                        </tr>
                        <tr>
                            <td class="table_label">Product category secondary:</td>
                            <td><span data-product="secondary_category"></span>{{ productInfo.secondary_category }}</td>
                        </tr>
                        <tr>
                            <td class="table_label">APP category:</td>
                            <td><span data-product="store_primary_category">{{ productInfo.store_primary_category }}</span></td>
                        </tr>
                        <tr>
                            <td class="table_label">APP description:</td>
                            <td><span data-product="app_description">{{ productInfo.app_description }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="filter-form well">
            <div class="row-fluid">
                <div class="col-md-6">
                    <input class="col-md-8 form-control offer_id" type="text"  autocomplete="off" placeholder="offer id" />
                    <button type="button" class="btn btn-primary ml15" id="search_offer" ref="search_offer" @click.prevent="search_offer">Search</button>
                </div>
            </div>
            <div class="row-fluid">
                <div class="col-md-6">
                    <input class="col-md-8 form-control " type="text" v-model="q" name="q" autocomplete="off" placeholder="Keywords of Offers"  @keyup.enter="search_page" />
                    <button type="submit" class="btn btn-primary ml15" id="search_page" @click.prevent="search_page">Search</button>
                    <a href="p_offers" class="btn btn-default" id="reset_page">Reset</a>
                    <input type="hidden" name="advertiser" :value="advertiser" id="filter_advertiser" ref="filter_advertiser" />
                    <input type="hidden" name="am" :value="am" id="filter_am" ref="filter_am" />
                    <input type="hidden" name="category" :value="category" id="filter_category" />
                    <input type="hidden" name="geo" :value="geo" id="filter_geo" />
                    <input type="hidden" name="device" :value="device" id="filter_device" />
                    <input type="hidden" name="traffic" :value="traffic" id="filter_traffic" />
                    <input type="hidden" name="offer_product_id" :value="product_id"/>
                   <!--  <input type="hidden" name="limit" id="id_limit" value="20" /> -->
                    <div id="hidden_sort"></div>
                    <div class="form-inline mt10">
                        Status:
                        <label class="checkbox">
                            <input type="checkbox" v-model="status" name="status[]" value="active" /> Active
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" v-model="status" name="status[]" value="pending" /> Pending
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" v-model="status" name="status[]" value="paused" /> Paused
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" v-model="status" name="status[]" value="suspended" /> Suspended
                        </label>
                    </div>
                </div>
                <div class="col-md-6 form-inline view_data">
                    <all-offer-date-time-picker :start="startdate" :end="enddate"></all-offer-date-time-picker>
                </div>
            </div>
            <div v-if="product_id === undefined || product_id === ''">
                <div class="row-fluid">
                    <div class="form-inline col-md-12">
                        Source:
                        <label class="checkbox">
                            <input type="checkbox" v-model="importf" name="import[]" value="0" /> Yeahmobi
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" v-model="importf" name="import[]" value="1"  /> 3rd Party from API
                        </label>
                    </div>
                </div>
            </div>
            <div class="row-fluid" id="filter_by">
                <div class="col-md-12">
                    <span>Filter:</span>
                    <select class="form-control filter filter_by adv-filter">
                      <option value="">-Advertiser-</option>
                      <option v-for="n in advChosen" :value="n.id">{{ n.name }}</option>
                   </select>
                    <select class="form-control filter filter_by am-filter">
                      <option value="">-Am-</option>
                      <option v-for="n in amChosen" :value="n.id">{{n.id}} - {{ n.name }}</option>
                   </select>

                   <select class="form-control filter filter_by cat-filter">
                      <option value="">Category</option>
                      <option v-for="n in catChosen " :value="n.name">{{ n.name }}</option>
                   </select>
                   <select class="form-control filter filter_by geo-filter">
                      <option value="">-Geo-</option>
                      <option v-for="n in geoChosen" :value="n.code">{{ n.code }} - {{ n.name }} </option>
                   </select>
                   <select class="form-control filter filter_by dev-filter">
                      <option value="">-Platform-</option>
                      <option v-for="n in platChosen" :value="n.device_names">{{ n.device_names }}</option>
                   </select>
                   <select class="form-control filter filter_by traffic-filter">
                      <option value="">-Traffic-</option>
                      <option v-for="n in trafficChosen" :value="n.id">{{ n.name }}</option>
                   </select>&nbsp;&nbsp;&nbsp;&nbsp;
                   <span>Whether Recommend:</span>
                   <select id="whether_recommend" name="recommend" class="form-control" v-model="recommend">
                     <option value="2">All</option>
                     <option value="1">Yes</option>
                     <option value="0">No</option>
                   </select>
                    <span class="product_action_zone" v-show="productInfo.primary_category === 'Mobile Content'">
                      <button type="button" class="btn btn-primary" id="product_add_offer" @click="showModal">Add Offer</button>
                      <button type="button" class="btn btn-primary" id="product_remove_offer" @click="product_remove_offer">Removed Offer</button>
                    </span>
                </div>
            </div>
            <div class="row-fluid" v-show="isShowFilterLabelContainer">
               <div class="col-md-1">Filters:</div>
               <div class="col-md-11" id="filter_label_container">
                   <span v-if="advertiser && i != ''" v-for="i in advertiser" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i)">Advertiser: {{ i }}<i @click="removeLabel(i, 'advertiser')" class="fa fa-remove"></i></span>

                   <span v-if="am && i != ''" v-for="i in am" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i)">Am: {{ i }}<i @click="removeLabel(i, 'am')" class="fa fa-remove"></i></span>

                   <span v-if="category && i != ''" v-for="i in category" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i)">Category: {{ i }}<i @click="removeLabel(i, 'category')" class="fa fa-remove"></i></span>

                   <span v-if="geo && i != ''" v-for="i in geo" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i)">Geo: {{ i }}<i @click="removeLabel(i, 'geo')" class="fa fa-remove"></i></span>

                   <span v-if="device && i != ''" v-for="i in device" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i)">PlatForm: {{ i }}<i @click="removeLabel(i, 'device')" class="fa fa-remove"></i></span>

                   <span v-if="traffics" v-for="i in traffics" class="label label-orange label-filter" :data-dom="i" :data-txt="i" :id="'fuid_' + filter_span_id(i.id)">Traffic: {{ i.name }}<i @click="removeLabel(i, 'traffic')" class="fa fa-remove"></i></span>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
import AllOfferDateTimePicker from '../all-offer-date-time-picker/'
import editable_text_offer from '@/components/Editable_Text_Offer.vue'
import config from '@/util/config'
import offer_util from '@/util/offer'

import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
        'list_offers':{},
        'advChosen':{},
        'catChosen':{},
        'geoChosen':{},
        'platChosen':{},
        'trafficChosen':{},
        'renderFilter':{},
        'renderCallback':{},
        'showModal':{},
        'showAlert':{},
        'product_remove_offer':{},
        'amChosen':{},
        'sort_by_advertiser':{},
        sort_by_category:{},
        sort_by_country:{},
        sort_by_device:{},
        sort_by_traffic:{},
        getIsThird:''
    },
    data(){
        return {
            q: '',
            advertiser:[],
            category: [],
            geo: [],
            device: [],
            traffic: [],
            am:[],
            status: ['active', 'pending'],
            date_type: 'create_time',
            recommend: '2',
            importf:['0'],
            productInfo: '',
            traffics:[],
            isHideClosestTr : false,
            isShowFilterLabelContainer:false,
            product_id:this.$route.query.product_id,
            startdate:'',
            enddate:'',
        }
    },
    components: {
        AllOfferDateTimePicker,editable_text_offer
    },
    computed: {
        defaultProductInfoImg() {
            return config.defaultProductInfoImg
        },
    },
    watch: {
        sort_by_advertiser(newVal, oldVal) {
            this.advertiser = newVal
        },
        sort_by_category(newVal, oldVal) {
            this.category = newVal
        },
        sort_by_country(newVal, oldVal) {
            this.geo = newVal
        },
        sort_by_device(newVal, oldVal) {
            this.device = newVal
        },
        sort_by_traffic(newVal, oldVal) {
            this.traffic = newVal
        },
        renderFilter(newVal, oldVal) {
            let that = this
            if (newVal) {
                this.startRender()
            }
        },
        advertiser(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        am(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        category(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        geo(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        device(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        traffic(newVal, oldVal) {
            if (newVal) {
                this.calcuFilterLabelContainer()
            }
        },
        "$route": function(newVal, oldVal){
            let that = this
            this.product_id = newVal.query.product_id
            if (typeof this.$route.query.product_id !== "undefined") {
                this.getProductInfo();
            }
            that.$nextTick(function() {
                that.list_offers();
            })
        },
    },
    methods:{
        hideClosestTr(id) {
            if (this.productInfo.primary_category === "Mobile Content" && (id === "app_description" || id === "store_primary_category")) {
                this.isHideClosestTr = true
            }
        },
        startRender(){
            let that = this
            that.assignSearchFrom()
            that.$nextTick(function() {
                that.list_offers("init");
            })
            setTimeout(function() {
                $('.filter_by', '#filter_by')
                    .chosen({width:'120px'})
                    .change(function(e, val) {
                        var _this = $(this),
                            _cls_adv = _this.is('.adv-filter'),
                            _cls_cat = _this.is('.cat-filter'),
                            _cls_geo = _this.is('.geo-filter'),
                            _cls_dev = _this.is('.dev-filter'),
                            _cls_traffic = _this.is('.traffic-filter'),
                            _cls_am = _this.is('.am-filter'),
                            _txt = _this.val(),
                            _fuid = md5(_txt),
                            _label = false,
                            _fuid = md5(_txt),
                            _dom;
                        if (_this.val() == '') {
                            return
                        }
                        if (_cls_adv) {
                            _label = 'Advertiser: ';
                            _dom = 'advertiser';
                        }
                        if (_cls_cat) {
                            _label = 'Category: ';
                            _dom = 'category';
                        }
                        if (_cls_geo) {
                            _label = 'Geo: ';
                            _dom = 'geo';
                        }
                        if (_cls_dev) {
                            _label = 'Platform: ';
                            _dom = 'device';
                        }
                        if (_cls_traffic) {
                            _label = 'Traffic: ';
                            _dom = 'traffic';
                        }

                        if (_cls_am) {
                            _label = 'Am: ';
                            _dom = 'am';
                        }

                        if (!_label) {
                            return;
                        }
                        if ($('#fuid_' + _fuid).length == 1) {
                            return;
                        }

                        var filter_arr = that[_dom]
                        filter_arr.push(_txt);
                        /*if (_cls_traffic) {
                            var _new_txt = that.getTrafficId(_txt)
                            that.traffics.push(_new_txt)
                        }*/
                        that[_dom] = filter_arr
                        _this.val('');
                        _this.trigger("chosen:updated");
                        that.renderCallback && that.renderCallback('', 1)
                        that.$nextTick(function() {
                            that.list_offers("")
                        })
                    })
            } ,100)
        },
        calcuFilterLabelContainer() {
            let that = this
            var advertiser = this.advertiser;
            var category = this.category;
            var geo = this.geo;
            var device = this.device;
            var traffic = this.traffic;
            var am = this.am
           if ((advertiser && advertiser.length > 0) || (am && am.length > 0) || (category && category.length > 0) || (geo && geo.length > 0) || (device && device.length > 0) || (traffic && traffic.length > 0)) {
                that.isShowFilterLabelContainer = true
           } else {
                that.isShowFilterLabelContainer = false
           }
        },
        removeLabel(item, tag) {
            var that = this
            var value = this[tag];
            if (tag === 'traffic') {
                that.traffics =  _.filter(that.traffics, function(n) {
                    return item.name != n.name
                });
                that.traffic =  _.filter(value, function(n) {
                    return item.id != n
                });
            } else {
                that[tag] =  _.filter(value, function(n) {
                    return item != n
                });
            }
            that.$nextTick(function() {
                that.list_offers();
            })
        },
        filter_span_id(txt) {
            return md5(txt)
        },
        search_page() {
            this.list_offers()
        },
        search_offer() {
            this.list_offers("search_offer")
        },
        getProductInfo() {
            var _query_str = this.$route.query.product_id
            if (_query_str) {
                this.product_id = _query_str
                this.$http.get('Offer/getProductById?id=' + _query_str)
                    .then(response => {
                        this.loadingZone = ""
                        if(!response.body.data){
                            return;
                        }
                        this.productInfo = response.body.data;

                }, response => {
                    that.loadingZone = ""
                    // error callback
                    alert_pop_http.setAlertPop(this, "show", "error", response.body.msg)
                })
            }
        },
        getTrafficId(_id) {
            let that = this
            var _id = _id;
            var _name;
            _.each(that.trafficChosen, function(traffic) {
                if (_id == traffic.name) {
                    _id = traffic.id
                }
                if (_id == traffic.id) {
                    _name = traffic.name
                }
            })
            return {
                id:_id,
                name:_name
            }
        },
        assignSearchFrom() {
            let that = this;
            var filtersOptions = $.query.load(window.location.href).keys;
            var page_limit = '';
            var current_page = 1;
            that.traffics = []
            $.each(filtersOptions, function(i, v){
                if (i == 'limit') {
                    page_limit = v
                } else if (i == 'page') {
                    current_page = v
                } else if (i == 'advertiser' || i == 'category' || i == 'geo' || i == 'device' || i == 'traffic' || i == 'am') {
                    if (v !== true) {
                        var n = v.toString().split(',');
                        if (i == 'traffic') {
                            that.traffic = n
                            $.each(n, function(index, node) {
                                that.traffics.push(that.getTrafficId(node))
                            })
                        } else {
                            that[i] = n
                        }
                    }
                } else if (i == 'import') {
                    that.importf = v
                } else {
                    that[i] = offer_util.convertQueryStr(i, v)
                }

            })
            that.renderCallback && that.renderCallback(page_limit, current_page)
            /*that.$nextTick(function() {
                that.list_offers(type);
            })*/
        },
        fromDate() {
            this.startdate = offer_util.convertQueryStr('from', $.query.load(window.location.href).keys.from)
        },
        toDate() {
            this.enddate = offer_util.convertQueryStr('to', $.query.load(window.location.href).keys.to)
        },
    },
    created () {

        this.fromDate()
        this.toDate()
    },
    mounted () {
        var that = this
        $(window).on('hashchange', function() {
            that.assignSearchFrom()
        })
        console.log(this.$route.query.product_id)
        if (typeof this.$route.query.product_id !== "undefined") {
            this.getProductInfo()
        }
        if(that.renderFilter) {
            that.startRender()
        }
    }
}
</script>
<style scoped>

.tbl-fixed {
    width: 100%;
    table-layout: fixed;
    word-break: break-all;
}
table td.table_label{
    width: 30% !important;
}
#whether_recommend {
    width: 120px;
}
.filter_by {
    width: 120px;
}
.view_data{
    text-align: right;
}
@media (max-width: 767px){
    .view_data {
        text-align: left;
    }
}
.select_date {
    width: 140px;
}
.offer_product_list {
    line-height: 26px;
    width: 75%;
    min-height: 250px;
    line-height: 26px;
    min-height: 250px;
}
.offer_product_list img {
    max-height: 200px;
    min-width: 100px;
    max-width: 200px;
    min-height: 100px;
    border-radius: 5px;
}
.offer_product_list [data-product="icon_url"] {
    position: absolute;
    right: 50px;
    top: 50px;
}
.offer_product_list .table_label {
    text-align: right;
    white-space: nowrap;
    padding-right: 8px;
    vertical-align: top;
}
</style>