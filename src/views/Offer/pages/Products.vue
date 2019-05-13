<template>
<div  :class="loadingZone ? 'ajax_loading' : '' ">
<div class="box">
    <div class="box-header" v-box-action-resize>
        <h2>All Products</h2>
        <div class="box-action">
            <i class="icon-resize-full fa fa-expand" title="Max"></i>
            <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content">
            <div class="filter-form well" id="qf_offer">
                <form class="form-inline" ref="product_form" @submit.stop.prevent="submitForm">
                    <div class="row-fluid">
                        <div class="col-md-6">
                            <input class="col-md-8 form-control" type="text" name="keywords" autocomplete="off" placeholder="Keywords of Product" :value="keywords" />
                            <button type="submit" class="btn btn-primary" id="search_page">Search</button>
                            <a href="p_products" class="btn btn-default" id="reset_page">Reset</a>
                            <input :value="primary_category_id" type="hidden" name="primary_category_id" id="filter_primary_category_id" />
                            <input :value="secondary_category_id" type="hidden" name="secondary_category_id" id="filter_secondary_category_id" />
                            <input :value="app_category_id" type="hidden" name="app_category" id="filter_app_category" />
                            <input :value="app_category_name" type="hidden" name="app_category_name" id="filter_app_category_name" />
                            <input type="hidden" name="limit" id="id_limit" :value="id_limit" />
                            <input type="hidden" name="page" id="" :value="currentPage" />
                        </div>


                    </div>
                    <div class="row-fluid" id="filter_by">
                        <br />
                        <span>Filter:</span>&nbsp;&nbsp;
                        <select class="form-control filter filter_by product-category-filter">
                            <option value="">- Product category -</option>
                            <option :value="i.id" v-for="i in product_category" data-name="primary_category_filter"> {{ i.name }}</option>
                        </select>
                        <select class="form-control filter filter_by secondary-product-category-filter" :disabled="secondary_product_disabled" ref="secondary_product_category">
                            <option value="">- Product category secondary -</option>
                            <option :value="i.id" v-for="i in secondary_category" data-name="secondary_category_filter" :data-type="i.type"> {{ i.name }}</option>
                        </select>
                        <select class=" form-control filter filter_by app-category-filter" :disabled="app_product_disabled" ref="app_category_filter">
                            <option value="">- APP Category -</option>
                            <option :value="i.id" v-for="i in app_category" data-name="app_category_filter"> {{ i.name }}</option>
                        </select>
                    </div>
                    <br />

                </form>
            </div>
            <div class="row-fluid" v-show="show_filter_label_container">
                <div class="col-md-1">Filters:</div>
                <div class="col-md-11" id="filter_label_container">
                    <span v-if="!is_empty(primary_category_filter)" class="label label-orange label-filter" data-txt="1" :id="primary_category_filter.id">Product Category:  {{ primary_category_filter.name }}<i class="fa fa-remove" @click.prevent="removelLabel('primary')"></i>
                    </span>
                    <span v-if="!is_empty(secondary_category_filter)" class="label label-orange label-filter" data-txt="1" :id="secondary_category_filter.id">Product category secondary:  {{ secondary_category_filter.name }}<i class="fa fa-remove" @click.prevent="removelLabel('secondary')"></i>
                    </span>
                    <span v-if="!is_empty(app_category_filter)" class="label label-orange label-filter" data-txt="1" :id="app_category_filter.id">APP category:  {{ app_category_filter.name }}<i class="fa fa-remove" @click.prevent="removelLabel('app')"></i>
                    </span>
                </div>
            </div>
            <pagination  :pageLimit="id_limit" :page="pageData" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
            <div class="overflow_scroll">
                <table class="table table-hover tablesorter tbl-fixed list-table" id="offers_list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ICON</th>
                            <th>Product name</th>
                            <th data-nowrap="true">Product category</th>
                            <th data-nowrap="true">Product category secondary</th>
                            <th data-nowrap="true">APP Category</th>
                            <th data-nowrap="true">Source</th>
                            <th data-nowrap="true">Active#</th>
                            <th data-nowrap="true">Revenue</th>
                        </tr>
                    </thead>
                    <tbody id="cp_list">
                        <tr v-if="renderData && renderData.length == 0">
                            <td colspan="9"><strong>No Results Found.</strong></td>
                        </tr>
                        <tr v-for="product in renderData">
                            <td class="no-wrap"><a :href="'p_offers?product_id=' + product.id">{{ product.id }}</a>
                            </td>
                            <td data-hided="true">
                                <div class="relative">
                                    <div :id="'logo_' + product.id" v-html="is_img_change(product)"></div>
                                </div>
                               </td>
                            <td>
                                <router-link :to="'p_offers?product_id=' + product.id">{{ product.name }}</router-link>
                            </td>
                            <td class="no-wrap">
                                <span @click="sortBy('primary', product.id, product.primary_category)" class="offer_wrap  filter product-category-filter" :title="product.primary_category">{{ product.primary_category }}</span>
                            </td>
                            <td class="no-wrap">
                                <span  @click="sortBy('secondary', product.id, product.secondary_category)" class="offer_wrap  filter secondary-product-category-filter" :title="product.secondary_category"> {{product.secondary_category }}</span>
                            </td>
                            <td class="no-wrap"> {{ product.store_primary_category }} </td>
                            <td class="no-wrap" v-html="beautify_source(product.sources)"> {{ product.id }} </td>
                            <td class="no-wrap"> {{ product.offer_status_count }} </td>
                            <td class="no-wrap"> {{ product.offer_revenue_range }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pagination  :pageLimit="id_limit" :page="pageData" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
        </div>
    </div>
</div>
</div>
</template>

<script>
import Vue from "vue"
import { mapGetters, mapActions } from 'vuex'
//import eventProxy from '@/assets/js/eventproxy'
import pagination from '@/components/Pagination.vue'

//let ep = new eventProxy()

let EventProxy = require('eventproxy');
let ep = new EventProxy()

export default {
    data () {
        return {
            loadingZone:false,
            renderData:[],
            pageData:{},
            id_limit:20,
            currentPage:1,
            keywords:'',
            product_category: [{ id: '1', name: "App Download" }, { id: '6', name: "Mobile Content" }],
            secondary_category: [{ id: '2', name: "Google Play", type: "android" }, { id: '3', name: "Itune", type: "ios" }, { id: '4', name: "Online DDL", type: "ddi" }, { id: '5', name: "Other", type: "others" }],
            primary_category_id:'',
            secondary_category_id:'',
            app_category_id:'',
            app_category:[],

            app_category_name:'',

            show_filter_label_container:false,
            secondary_product_disabled:false,
            app_product_disabled:false,

            primary_category_filter: {},
            secondary_category_filter:{},
            app_category_filter:{},
            type:'',
            query_str: $.query.keys,

        }
    },
    components: {pagination},
    methods: {
        ...mapActions([]),
        sortBy(type, id, text) {
            var _dom = type + '_category_id';
            var _id_val = this.plurkCategoryName(text, _dom, {}, "id");
            this[type + '_category_filter'] = {
                id:_id_val,
                name:text
            }
            this[type + '_category_id'] = _id_val;
            this.$nextTick(function() {
                this.submitForm()
            })
        },
        getProductList() {
            let that = this;
            var param = $(this.$refs.product_form).getFormQuery();
            that.loadingZone = true
            Vue.http.get('Offer/getProductList', {params: param}).then(response => {
                var data = response && response.body && response.body.data
                that.renderData = data.list
                that.pageData = data.paginator
                that.loadingZone = false
            }, response => {
                // error callback
                that.loadingZone = false
            })
        },
        is_empty(data) {
            return _.isEmpty(data);
        },
        submitForm(){
           window.location.hash = $(this.$refs.product_form).serialize();
           this.getProductList();
        },
        removelLabel(type){
            this[type + '_category_filter'] = {}
            this[type + '_category_id'] = '';
            window.location.hash = $(this.$refs.product_form).serialize();
            this.$nextTick(function() {
                this.getProductList();
            })
        },
        is_img_change(product){
            var img = '<img src="' + product.icon_url + '" class="thumbs" width="100" height="50" target="_blank" />';
            if (this.userInfo.role_id == 14 || (product.primary_category !== "Mobile Content" && product.secondary_category !== "Online DDL")) {
                var logo = img;
            } else {
                var logo = '<a href="' + product.icon_url + '" target="_blank">' + img + '</a>' + '<a href="javascript:upload_logo(' + product.id + ')" id="upload_btn' + product.id + '" class="hide btn swfu-upload-btn"><span class="icon-expand-alt"></span></a>';
            }
            return logo;
        },
        beautify_source(sources) {
            sources = sources || []
            var html = ""
            _.each(sources, function(val, index) {
                html += "<div>" + val + "</div>"
            })
            return html;
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
                this.getProductList()
            })
        },
        onChangeLimit(limit){
            this.pageLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
                this.getProductList()
            })
        },
        plurkCategoryName(node, i, _query_str, attr) {
            var obj = {}
            var attr = attr || "name"
            var that = this;
            var product_category = that.product_category
            var secondary_category = that.secondary_category
            var app_category = that.app_category
            if (i === 'primary_category_id') {
                var obj = _.filter(product_category, function(n) {
                  return (n.id == node || n.name == node);
                });
                return obj && obj[0] && obj[0][attr] || ""
            } else if (i === 'secondary_category_id') {
                var obj = _.filter(secondary_category, function(n) {
                  return (n.id == node || n.name == node);
                });
                return obj && obj[0] && obj[0][attr] || ""
            } else {
                var obj = _.filter(app_category, function(n) {
                  return (n.id == node || n.name == node);
                });
                return obj && obj[0] && obj[0][attr] || ""
            }
        },
        assignSearchForm(callback){
            let that = this;
            let _query_str = that.query_str
            $.each(_query_str, function(i, n) {
                var val = (n === true) ? '' : n;
                if (i != 'page') {
                    if (i == 'keywords') {
                        that.keywords = val
                    } else if (i == 'limit') {
                        that.pageLimit = val
                    } else if (i == 'primary_category_id' || i == 'secondary_category_id' || i == 'app_category') {
                        if (n !== true) {
                            n = n.toString();
                            that['#filter_' + i] = n;
                            var n = n.split(',');
                            $.each(n, function(index, node) {
                                var text = that.plurkCategoryName(node, i, _query_str)
                                var filter = {
                                    id: md5($.trim(text)),
                                    name:text,
                                }
                                if (i == 'primary_category_id') {
                                    that.primary_category_filter = filter
                                    that.primary_category_id = val
                                } else if (i == 'secondary_category_id') {
                                    that.secondary_category_filter = filter
                                    that.secondary_category_id = val
                                } else {
                                    that.app_category_id = val
                                }
                            })
                        }
                    } else if (i == 'app_category_name') {
                        if (n !== true) {
                            var filter = {
                                id: md5($.trim(val)),
                                name:val,
                            }
                            that.app_category_name = val
                            that.app_category_filter = filter
                        }
                    } else {
                        that['id_' + i] = val
                    }
                }
            })
            that.$nextTick(function() {
                callback && callback()
            })
        },
        is_show_filter_label_container(){
            if (!_.isEmpty(this.primary_category_filter) || !_.isEmpty(this.secondary_category_filter) || !_.isEmpty(this.app_category_filter)) {
                this.show_filter_label_container = true;
            }
        },
        toggleDisabledProductFilter(product_type) {
            let that = this;
            if (parseInt(product_type) === 6) {
                that.secondary_product_disabled = true;
            } else {
                that.secondary_product_disabled = false;
            }

            that.$nextTick(function() {
                $(that.$refs.secondary_product_category).trigger("chosen:updated");
            })
        },
        toggleDisableAppilter(product_type, secondary_category_type) {
            let that = this;
            if (parseInt(product_type) === 6 || parseInt(secondary_category_type) === 5) {
                that.app_product_disabled = true
            } else {
                that.app_product_disabled = false
            }
            that.$nextTick(function() {
                $(that.$refs.app_category_filter).trigger("chosen:updated");
            })
        },
        getAppCategory() {
            let that = this;
            Vue.http.get('Publisher/getCategoryList', {params: {type: that.type}}).then(response => {
                var data = response && response.body && response.body.data
                this.app_category = data
                that.$nextTick(function() {
                    $(that.$refs.app_category_filter).trigger("chosen:updated");
                    that.toggleDisableAppilter("", that.secondary_category_id)
                })
            }, response => {
                // error callback
            })
        },
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    created () {
        let that = this
    },
    watch:{
        primary_category_filter(newVal, oldVal) {
            if (newVal) {
                this.is_show_filter_label_container()
            }
        },
        secondary_category_filter(newVal, oldVal) {
            if (newVal) {
                this.is_show_filter_label_container()
                this.getAppCategory()
            }
        },
        app_category_filter(newVal, oldVal) {
            if (newVal) {
                this.is_show_filter_label_container()
            }
        },
    },
    mounted () {
        let that = this
        that.assignSearchForm(function(){
            that.getProductList();
        })
        $('.filter_by', '#filter_by')
            .chosen({ width: 200 })
            .on('change', function(e) {
                var name = $(e.target).find("option:selected").attr("data-name");
                var text = $(e.target).find("option:selected").text();
                var value = e.target.value
                if (name === "primary_category_filter") {
                    that.primary_category_id = value;
                    that.toggleDisabledProductFilter(value)
                    that.toggleDisableAppilter(value, "")
                } else if (name === "secondary_category_filter") {
                    var type = $(e.target).find("option:selected").attr("data-type")
                    that.secondary_category_id = value;
                    that.type = type;
                } else {
                    that.app_category_id = value;
                    that.app_category_name = text
                }
                that[name] = {
                    id: md5($.trim(text)),
                    name:text
                }
                that.$nextTick(function() {
                    window.location.hash = $(that.$refs.product_form).serialize();
                    that.getProductList();
                })
            })

    }
}
</script>


<style scoped>
table.list-table img.thumbs {
    width: 50px;
    max-width: 50px;
    height: 50px;
    display: block;
    outline: 1px solid #ddd;
}
</style>