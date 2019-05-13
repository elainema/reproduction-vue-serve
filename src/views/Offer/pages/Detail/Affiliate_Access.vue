<template>
    <div v-yeah-loading='loadingZone'>

        <div class="box" ref="aff_access_wrapper">
            <div class="box-header" v-box-action-resize>
                <h2>Affiliate Access<help-box :content="helpTips.affiliate_access"></help-box></h2>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div>
            <div class="box-container">
                <div class="box-content form-horizontal frm-entity frm-detail" id="aff_access" ref="aff_access">
                    <p>
                        Manage affiliate access to this offer. Only approved affiliates can access this offer and generate tracking links. Approve affiliates to grant them access or remove access by unapproving them.<strong>Press SHIFT key and click to select multiple items.</strong>
                    </p>

                    <div class="row">
                    <div class="control-group form-group col-md-4">
                        <label class="">Approved</label>
                        <div class="controls col-md-12 nopadding nomargin">
                            <input v-model="searchApproved" @keyup="searchOnKeyup" data-value="approved" type="text" data-control-name="bt-text" class="sel-search form-control form-control-inline " placeholder="Keywords of Affiliate" /><span class="tips">search maximum show 50 search results, down to drag the scroll bar will show more results</span>
                            <ul class="sel-search-list approved">
                                 <!-- v-show="search_approved.length > 0" -->
                                <li :data-opt-value="i.id" data-opt-index="0" v-for="i in search_approved" @click.prevent="setHightlight(i, 'approved')" v-html="_replaced_text(i)"></li>
                            </ul>
                            <select data-control-name="bt-select" multiple="multiple" class="" id="aff_approved" data-value="approved" @click.stop.prevent="onSelecting('approved')" v-model="select_approved">
                                <option :class="approvedApp.is_selected ? 'highlight' : ''" :value="approvedApp.id" v-for="approvedApp in approved" v-if="approved && approved.length > 0" data-name="select_approved" @click.prevent="selecting"> {{ approvedApp.id }} - {{ approvedApp.first_name }}  {{  approvedApp.last_name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group col-md-4" id="unapproved_mode" v-show="(offerInfo.is_private == '0' && offerInfo.is_require_approval == '1')">
                        <label class="">Unapproved</label>
                        <div class="controls col-md-12 nopadding nomargin">
                            <input v-model="searchUnapproved" type="text" @keyup="searchOnKeyup" data-value="unapproved" data-control-name="bt-text" class="sel-search form-control form-control-inline " placeholder="Keywords of Affiliate" /><span class="tips">search maximum show 50 search results, down to drag the scroll bar will show more results</span>
                            <ul class="sel-search-list unapproved">
                                 <!--  v-show="search_unapproved.length > 0" -->
                                <li :data-opt-value="i.id" data-opt-index="0" v-for="i in search_unapproved" @click.prevent="setHightlight(i, 'unapproved')" v-html="_replaced_text(i)"></li>
                            </ul>
                            <select  data-control-name="bt-select"  multiple="multiple" class="" id="aff_unapproved" data-value="unapproved"  @click.stop.prevent="onSelecting('unapproved')" v-model="select_unapproved">
                                <option :value="unapprovedApp.id" v-for="unapprovedApp in unapproved" v-if="unapproved && unapproved.length > 0" data-name="select_unapproved" @click.prevent="selecting"> {{ unapprovedApp.id }} - {{ unapprovedApp.first_name }}  {{  unapprovedApp.last_name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group col-md-4">
                        <label class="">Blocked</label>
                        <div class="controls col-md-12 nopadding nomargin">
                            <input type="text" v-model="searchBlocked"  @keyup="searchOnKeyup" data-value="blocked" data-control-name="bt-text" class="sel-search form-control form-control-inline " placeholder="Keywords of Affiliate" /><span class="tips">search maximum show 50 search results, down to drag the scroll bar will show more results</span>
                                 <!--   v-show="search_blocked.length > 0" -->
                            <ul class="sel-search-list blocked">
                                <li :data-opt-value="i.id" data-opt-index="0" v-for="i in search_blocked" @click.prevent="setHightlight(i, 'blocked')" v-html="_replaced_text(i)"></li>
                            </ul>
                            <select  data-control-name="bt-select"  multiple="multiple" class="" id="aff_blocked" data-value="blocked" @click.stop.prevent="onSelecting('blocked')" v-model="select_blocked">
                                <option :value="blockedApp.id" v-for="blockedApp in blocked" v-if="blocked && blocked.length > 0"  data-name="select_blocked" @click.prevent="selecting"> {{ blockedApp.id }} - {{ blockedApp.first_name }}  {{  blockedApp.last_name }}</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div class="control-group form-group">
                        <div class="text-center mt20 mb20">
                            <a href="#" class="btn btn-primary  btn-approve-aff" data-control-name="bt-button" :disabled="btn_approve_aff" @click.prevent="transferAppStatus('approved')" id="btn_approved">Approve</a>
                            <a href="#" class="btn btn-primary  btn-block-aff" data-control-name="bt-button" :disabled="btn_block_aff"  @click.prevent="transferAppStatus('blocked')"  id="btn_blocked" >Block</a>
                            <a href="#" class="btn btn-primary  btn-unapprove-aff" data-control-name="bt-button"  v-show="offerInfo.is_private == 0 && offerInfo.is_require_approval == 1" id="btn_unapproved"  :disabled="btn_unapprove_aff"  @click.prevent="transferAppStatus('unapproved')">Unapprove</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import offerAPI from '@/api/offer'
import {setReadOnlyFactory, setReadOnly} from '@/util/offerDetail'
import Vue from "vue"
import { mapActions } from 'vuex'

import { affiliateAccessHelpTips } from '../../config/config'

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

export default {
    data() {
        return {
            load_search:false,
            searchStatus: "all",
            offset: 0,
            searchOffset: 0,
            offsetData:0,
            limit:50,
            first_load: true,
            id:this.$route.query.id,
            keyword:'',
            _li: "",
            selectMultiple: $("#aff_access select[multiple='multiple']"),
            approved: [],
            blocked: [],
            unapproved: [],
            scrollOffset: {
                approved:0,
                blocked:0,
                unapproved:0
            },
            btn_approve_aff:true,
            btn_unapprove_aff:true,
            btn_block_aff:true,
            select_approved:[],
            select_unapproved:[],
            select_blocked:[],
            before_status:'',
            offer_id:this.$route.query.id,
            search:'',
            searchBlocked:'',
            searchUnapproved:'',
            searchApproved:'',
            _input:'',
            li:'',
            loadingZone:'',
            action:'',
            app_arr:[],
            search_approved:[],
            search_unapproved:[],
            search_blocked:[],
            search_scroll:false,
            arr:["approved","unapproved","blocked"],
            helpTips:{}

        }
    },
    props:{
      renderOffer:{default:false},
      refresh_aff_access:{},
      offerInfo:{},
      showAlert:{},
      setOfferEditAuth:{},
    },
    components: {HelpBox},
    methods: {
        ...mapActions([
            'getAffAccess',
        ]),
        bindSearchScroll(_input, o, status) {
            let that = this
            that.search_scroll = true
            $("ul.sel-search-list").scroll(function(){
                that.onSearch(that.keyword)
            });
            if (status != "all" && o[status] && o[status].length == 0) {
                $("ul.sel-search-list").unbind("scroll");
            }
        },
        initSearch(searchStatus) {
            let that = this
            that.search_scroll = false
            that.offsetData = 0
            that.scrollOffset[searchStatus] = 0
            that["search_" + searchStatus] = []
            $("ul.sel-search-list").hide()
        },
        setHightlight(_selected,_type) {
            let that = this
            that.app_arr = []
            that[_type].unshift(_selected)
            that[_type] = that.removeRepeat(that[_type])
            that.app_arr.push(_selected.id);
            that["search_" + _type] = []
            that.$nextTick(function () {
                $(that.$refs.aff_access).find("option[value='" + _selected.id + "']").trigger("click")
            })
            $("." + _type).hide()
        },
        _replaced_text(node) {
            if (node.last_name) {
                var _opt_search_text = node.id + ' - ' + node.first_name + ' ' + node.last_name;
            } else {
                var _opt_search_text = node.id + ' - ' + node.first_name;
            }
            var keyword = this.keyword
            var _regexKey = new RegExp(keyword, 'igm');
            if (_opt_search_text.indexOf(keyword) != -1) {
                var _replaced_text = _opt_search_text.replace(_regexKey, function(){
                    return '<strong>'+ arguments[0] +'</strong>';
                })
                return _replaced_text
            }
        },
        addToSelected(val, _type, newOptions) {
            $('#btn_' + _type).attr('disabled', true).siblings().attr('disabled', false)
            var name = _type
            var value = val
            var exist = _.findIndex(this[name], function(elem) {
                return elem == value;
            });
            if (exist == -1) {
                this["select_" + _type].push(value)
                this.app_arr.push(value)
            }
            this.before_status = _type
            if(newOptions) {
                this[this.before_status] = newOptions
            }
        },
        selecting(e) {
            var name = $(e.target).attr("data-name")
            var value = e.target.value;
            var exist = _.findIndex(this[name], function(elem) {
                return elem == value;
            });
            if (exist == -1) {
                this[name].push(value)
            }
            this.app_arr.push(value)
            $("#aff_access select").find("option[value='" + value + "']").prop("selected", true)
        },
        onSelecting(data_value, val){
            let that = this
            that.before_status = data_value
            var arr = that.arr
            switch (data_value) {
                case 'approved':
                    that.btn_approve_aff = true
                    that.btn_unapprove_aff = false
                    that.btn_block_aff = false
                    break;
                case 'unapproved':
                    that.btn_unapprove_aff = true
                    that.btn_approve_aff = false
                    that.btn_block_aff = false
                    break;
                case 'blocked':
                    that.btn_block_aff = true
                    that.btn_approve_aff = false
                    that.btn_unapprove_aff = false
                    break;
                default:
                    break;
            }
            arr.map(function(val, index) {
                if (val == data_value) {
                    return
                }
                if (that["select_" + val].length > 0) that["select_" + val] = []
            })
        },
        new_params(type) {
            let that = this
            if (that.action) {
                that.searchStatus = 'all'
                that.offsetData = 0
                that.keyword = ''
            }
            if (that.searchStatus != 'all') {
                if (that.load_search && !that.search_scroll) {
                    that.scrollOffset[that.searchStatus] = 0
                } else {
                    that.scrollOffset[that.searchStatus] = ++that.scrollOffset[that.searchStatus];
                }
                that.offsetData = that.scrollOffset[that.searchStatus]  * that.limit;
            }
            var new_params = {
                offer_id: that.id,
                keyword : that.keyword,
                limit:that.limit || 50,
                offset:that.offsetData,
                status:that.searchStatus
            }
            return new_params
        },
        removeSeleted() {
            this.select_blocked = []
            this.select_approved = []
            this.select_unapproved = []
            this.app_arr = []
            this.btn_approve_aff = true
            this.btn_unapprove_aff = true
            this.btn_block_aff = true
        },
        transferAppStatus(action) {
            var that = this
            var app_arr = []
            that.action = action
            if (that.select_approved.length > 0) {
                app_arr = that.select_approved
            }
            if (that.select_unapproved.length > 0) {
                app_arr = that.select_unapproved
            }
            if (that.select_blocked.length > 0) {
                app_arr = that.select_blocked
            }

            var selected_length = app_arr.length;
            that.app_arr = app_arr;
            if (selected_length) {
                var param = {
                    "offer_id":that.offer_id,
                    "aff_id": app_arr,
                    "status": action,
                    "before_status": that.before_status
                }

                that.loadingZone = true
                Vue.http.post('Offer2/saveAffAccess', param).then(response => {
                    let affAccessParam = {offer_id:that.$route.query.id};
                    that.showAlert(response.body.msg, 'success')
                    that.getAffAccessInfo();
                    that.getAffAccess({affAccessParam, cb: function(data){}})
                    that.loadingZone = false
                }, response => {
                    that.showAlert(response.body &&　response.body.msg)
                    that.loadingZone = false
                })
            }
        },
        searchOnKeyup (e) {
            var searchStatus = e.target.getAttribute('data-value')
            this._input = $(e.target)
        },
        getSelectedElems() {
            var that = this
            var serach_from = that[that.before_status];
            var selectedElems = []
            var app_arr = that.app_arr
            if (app_arr.length != 0) {
                app_arr.map(function(val, index) {
                    _.filter(serach_from, function(n) {
                        if(n.id == val){
                            var ele = $.extend(n, {is_selected:true});
                            selectedElems.push(ele)
                        }
                    });
                })
            }
            return selectedElems
        },
        affAccessInfoHandler(data) {
            var that = this,
                status = that.action ? 'all': that.searchStatus,
                searchStatus = that.searchStatus,
                _input = that._input,
                action = that.action,
                data = data && data.data,
                approved = data && data.approved,
                blocked = data && data.blocked,
                unapproved = data && data.unapproved,
                selectedElems = that.getSelectedElems();
            if (status != "all" && data[status] && data[status].length == 0) {
                $("select[data-value='" + status + "']").unbind("scroll");
            }
            if (!that.load_search) {
                if (status == 'all') {
                    if (approved) {
                        that.approved = approved
                    }
                    if (blocked) {
                        that.blocked = blocked
                    }
                    if (unapproved) {
                        that.unapproved = unapproved
                    }
                } else {
                    that[status] = that[status].concat(data && data[status])
                    /*if (approved) {
                        that.approved = that.approved.concat(approved)
                    }
                    if (blocked) {
                        that.blocked = that.blocked.concat(blocked)
                    }
                    if (unapproved) {
                        that.unapproved = that.unapproved.concat(unapproved)
                    }*/
                }
            }
            if (that.load_search) {
                var o = data
                var searchOffset = that.searchOffset
                if (o && o[searchStatus] && o[searchStatus].length > 0) {
                    that["search_" + searchStatus] = o && o[searchStatus].concat(that["search_" + searchStatus])
                    that.bindSearchScroll(_input, o, searchStatus)
                    $("." + searchStatus).show()
                    that.load_search = false
                }
            }

            if(selectedElems.length > 0) {
                if (action) {
                    $("#aff_" + action ).scrollTop(0);
                    var oldVal = selectedElems.concat(that[action])
                    that[action] = that.removeRepeat(oldVal)
                }
            }
            that.action = ''
            that.removeSeleted()
        },
        getAffAccessInfo: function(){

            let that = this;
            let t = _.debounce(function () {
                var query = {
                    affAccessParam: that.new_params()
                }
                offerAPI.getAffAccess(query, function(data){
                    that.affAccessInfoHandler(data)
                    that.loadingZone = false
                })
            },500)
            t()
        },
        removeRepeat(data) {
            var data = data || []
            var that = this
            var res = data && data[0] ? [data && data[0]]:[]
            for (var i = 1; i < data.length; i++) {
                var repeat = false;
                for (var j = 0; j < res.length; j++) {
                    if (data[i].id == res[j].id) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
                    res.push(data[i]);
                }
            }
            return res
        },
        onSearch: _.debounce(function (newSearch) {
            let that = this
            var _input_len = newSearch.length;
            var event_type = 'scroll'
            if (_input_len > 1) {
                that.load_search = true;
                that.keyword = newSearch;
                that.searchOffset = event_type === "scroll" ? that.searchOffset + 1 : 0;
                that.getAffAccessInfo()
            }
        },500),
    },
    watch:{
        refresh_aff_access(newVal, oldVal){
            let that = this
            that.loadingZone = true
            setTimeout(function(){
                that.getAffAccessInfo(function(){
                })
            },1000)
        },
        renderOffer(newVal, oldVal) {
            let that = this
            if (newVal) {
                that.getAffAccessInfo()
                $("#aff_access select[multiple='multiple']").on('scroll', function() {
                    that.load_search = false;
                    that.searchStatus = $(this).attr("data-value");
                });

                $("#aff_access select[multiple='multiple']").on('scroll', _.debounce(that.getAffAccessInfo, 500));

               if(that.offerInfo.is_import_offer === "1"){
                    setReadOnly($(that.$refs.aff_access_wrapper).find(".editable"), 500)
                    setReadOnlyFactory(['button', 'switch', 'checkbox', 'select', 'text', ' textarea'],$(that.$refs.aff_access_wrapper) )
                }

                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.aff_access_wrapper)
                })
            }
        },
        searchApproved: function (newSearch, oldSearch) {
            this.searchStatus = 'approved'
            this.initSearch('approved')
            if (newSearch) {
                this.onSearch(newSearch)
            }
        },
        searchUnapproved: function (newSearch, oldSearch) {
            this.searchStatus = 'unapproved'
            this.initSearch('unapproved')
            if (newSearch) {
                this.onSearch(newSearch)
            }
        },
        searchBlocked: function (newSearch, oldSearch) {
            this.searchStatus = 'blocked'
            this.initSearch('blocked')
            if (newSearch) {
                this.onSearch(newSearch)
            }
        },
    },
    created() {
        this.helpTips = affiliateAccessHelpTips
    },
    mounted() {
        $("body").click(function() {
            $("ul.sel-search-list").hide()
        })
    },
}
</script>
<style scoped>
.highlight{
    color: red;
    font-weight: 700
}
.sel-search-list{
    top: 35px;
}
.btn-primary.active, .btn-primary:active, .btn-primary:focus, .btn-primary:hover, .open .dropdown-toggle.btn-primary {
    background-color: #f6cda8!important;
    border-color: #f6cda8!important;
    box-shadow: none;
}
</style>