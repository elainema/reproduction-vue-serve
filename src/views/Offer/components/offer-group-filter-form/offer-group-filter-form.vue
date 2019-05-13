<template>
    <div ref="filters">
        <div class="filter-form well">
            <div class="row-fluid">
                <div class="col-md-6">
                    <input class="col-md-8 form-control " type="text" v-model="key" name="key" autocomplete="off" placeholder="Keywords of Offers" />
                    <button type="submit" class="btn btn-primary ml15" id="search_page" @click.prevent="search_page">Search</button>
                    <a href="p_offer_group" class="btn btn-default" id="reset_page">Reset</a>
                    <input type="hidden" name="group_id" :value="group" id="filter_group" ref="filter_group" />
                    <!--  <input type="hidden" name="limit" id="id_limit" value="20" /> -->
                    <div id="hidden_sort"></div>
                </div>
            </div>
            <div class="row-fluid" id="filter_by">
                <div class="col-md-12">
                    <span>Filter:</span>
                    <select class="form-control filter filter_by group-filter">
                        <option value="">-Group-</option>
                        <option v-for="n in groupChosen" :value="n.id">{{ n.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    //import datepicker from './AllOfferDateTimePicker.vue'
    import AllOfferDateTimePicker from '../all-offer-date-time-picker/'
    import editable_text_offer from '@/components/Editable_Text_Offer.vue'
    import config from '@/util/config'
    import offer_util from '@/util/offer'

    import { mapGetters, mapActions } from 'vuex'
    export default {
        props: {
            'list_offers':{},
            'groupChosen':{},
            'renderFilter':{},
            'renderCallback':{},
            'showModal':{},
            'showAlert':{},
            'product_remove_offer':{},
            'amChosen':{},
            sort_by_group:{},
        },
        data(){
            return {
                key: '',
                group: [],
                status: ['active', 'pending'],
                date_type: 'create_time',
                recommend: '2',
                importf:['0'],
                productInfo: '',
                traffics:[],
                isHideClosestTr : false,
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
            sort_by_group(newVal, oldVal) {
                this.group = newVal
            },
            renderFilter(newVal, oldVal) {
                let that = this
                if (newVal) {
                    this.startRender()
                }
            },
            "$route": function(newVal, oldVal){
                let that = this
                that.$nextTick(function() {
                    that.list_offers();
                })
            }

        },
        methods:{
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
                                _cls_group = _this.is('.group-filter'),
                                _txt = _this.val(),
                                _fuid = md5(_txt),
                                _label = false,
                                _dom;

                            if (_cls_group) {
                                _label = 'Group';
                                _dom = 'group';
                            }
                            that[_dom].pop();
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
                            that.renderCallback && that.renderCallback('', 1)
                            that.$nextTick(function() {
                                that.list_offers("")
                            })
                        })
                } ,100)
            },
            search_page() {
                this.list_offers()
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
                    } else if (i == 'group') {
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