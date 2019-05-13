<template>
<div>
    <div id="choose_citys_dailog" ref="choose_citys_dailog" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a class="close" @click.prevent="hideModal">&times;</a>
                    <h3>{{ title.title }}</h3>
                </div>
                <div class="modal-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="select_aff">
                            <form class="form-horizontal frm-entity">
                                <div class="tab-content">
                                    <div class="tab-pane active" v-show="title.subTitle1 !== ''">
                                        <label :class="classList"><strong>{{ title.subTitle1 }}</strong></label>
                                        <chosen_container_offer :renderOffer="renderOffer" :chosenInfo="source" :chosenCallback="chosenCallback" id="geo_country"></chosen_container_offer>
                                    </div>

                                    <div class="tab-pane active mt15" v-show="title.subTitle2 !== ''">
                                        <label :class="classList"><strong>{{title.subTitle2 }}</strong></label>

                                        <chosen_container_offer v-if="modalType === 'geoTargeing'" :option0="option0" :renderOffer="renderOffer" :chosenInfo="geo_state_data" :chosenCallback="chosenCallbackGeoState" id="geo_state"></chosen_container_offer>

                                        <chosen_container_offer v-if="modalType === 'deviceModel'" :option0="option0" :renderOffer="renderOffer" :chosenInfo="source" :chosenCallback="chosenCallbackDeviceModel" id="geo_state"></chosen_container_offer>

                                        <a class="btn btn-primary" id="get_geo_city" :disabled="isDisabledBtn" @click.prevent="getData">{{ btnName }}</a>
                                    </div>
                                </div>
                            </form>

                            <div class="preselect_affs mt15" v-show="title.subTitle3">
                                <p><strong>{{ title.subTitle3 }}</strong></p>
                                <select multiple id="420multiselect" class="multiselect" v-if="modalType === 'geoTargeing'">
                                    <option :value="n" v-for="n in geo_city_data"> {{ n }}</option>
                                </select>
                                <select multiple id="420multiselect" class="multiselect" v-if="modalType === 'deviceModel' && data_slice">
                                    <option :value="device" v-for="device in geo_city_data"> {{ brand }} {{ device }}</option>
                                </select>
                                <select multiple id="420multiselect" class="multiselect" v-if="modalType === 'deviceModel' && !data_slice">
                                    <option :value="device" v-for="(key, device) in geo_city_data"> {{ brand }} {{ key }}</option>
                                </select>
                                <br />
                                <div id="preselect_action" class="preselect_action">
                                    <a href="javascript:;" class="btn btn-primary" data-action="select_all" @click.prevent="preselect_action('select_all')">Select All</a>
                                    <a href="javascript:;" class="btn btn-primary" data-action="deselect_all" @click.prevent="preselect_action('deselect_all')">De-select All</a> |
                                    <a href="javascript:;" class="btn btn-primary" data-action="save"  @click="hideModal">Save</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

const chosen_container_offer = () => import(
/* webpackChunkName: "chosen_container_offer2" */ './Chosen_Container_Offer.vue'
);
import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
        modalState:{},
        hideModal:{},
        states:{},
        country:{},
        renderOffer:{},
        source:{},
        title:{},
        modalType:{},
        btnName:{},
        classList:{},
    },
    data(){
        return {
            type: 'country',
            option0:'- Select a state -',
            geo_country: '',
            geo_state: '',
            brand:'',
            geo_state_data: [],
            geo_city_data:[],
            data_slice:{},
        }
    },
    components: {chosen_container_offer
    },
    computed: {
        hideAlertPop() {
          this.alertPop = "hide"
        },
        getParams() {
            var affs = $(this.$refs.selecAff).serializeArray();
            return affs;
        },
        isDisabledBtn(){
            var geo_country = this.geo_country,
                geo_state = this.geo_state,
                device_model = this.brand,
                modalType = this.modalType;
            if (modalType === 'geoTargeing' && (!geo_country || !geo_state || geo_state === 'all')) {
                return true;
            } if (modalType === 'deviceModel' && (!device_model || device_model === 'all')) {
                return true;
            } else {
                return false
            }
        },
    },
    watch: {
        geo_country() {
            this.get_geo_city()
        },
        modalState: function (val) {
          this.toggleModal(val)
        },
        source(newVal, oldVal) {
            if(newVal) {
                var geo_country = this.source && this.source[0] &&　this.source[0].id
                this.geo_country = geo_country
                this.geo_state_data = this.getState(geo_country);
            }
        },
    },
    methods: {
        getData() {
            var modalType = this.modalType;
            if (modalType === 'geoTargeing') {
                this.get_geo_city();
            } 
            if (modalType === 'deviceModel') {
                this.get_device_model_targeting();
            }
        },
        chosenCallback(v,text) {
            var curState = this.getState(v);
            this.geo_country = v
            this.geo_state = ""
            this.geo_state_data = curState


        },
        chosenCallbackGeoState(v,text){
            this.geo_state = v
            $('#420multiselect').empty();
            $('#420multiselect').multiSelect('refresh');
        },
        chosenCallbackDeviceModel(v,text){
            this.brand = v
            $('#420multiselect').empty();
            $('#420multiselect').multiSelect('refresh');
        },
        preselect_action(act) {
            if (act !== "save") {
                $('#420multiselect').multiSelect(act)
            }
        },
        get_device_model_targeting() {
            var _this = this,
                device_model_datas = {},
                brand = $.trim(_this.brand),
                $420multiselect = $('#420multiselect');
            _this.geo_city_data = '';
            if (brand !== "0") {
                if (brand === "all") {
                    $('#420multiselect').multiSelect('refresh');
                    return;
                }
                var _query = 'brand=' + encodeURIComponent(brand)
                _this.$http.get('Info/getDeviceModelTargeting?' + _query).then(response => {
                    var data = response.body && response.body.data;
                    _.each(data, function(val,index){
                        if (val.indexOf(',') != -1){
                            data[index] = val.replace(',',' ');
                        }
                         //去掉设备名称中的逗号
                    })

                    var data_slice = data && data.length > 300 ? data.slice(0, 301) : data;
                    _this.geo_city_data = data
                    _this.$nextTick(function() {
                        $420multiselect.multiSelect('refresh');
                    })
                }, response => {
                    // error callback
                });
            }
            $420multiselect.multiSelect('refresh');

        },
        get_geo_city() {
            var $geo_country = this.geo_country,
                $geo_state = this.geo_state,
                $420multiselect = $('#420multiselect'),
                _this = this;
            _this.geo_city_data = '';
            if ($geo_country !== "" && $geo_state !== "" && $geo_state !== "all") {
                if ($geo_country === "all") {
                    $420multiselect.multiSelect('refresh');
                    return;
                }
                var _query = 'country=' + $.trim($geo_country) + "&state=" + $.trim($geo_state)
                _this.$http.get('Info/getGeoCityList?' + _query).then(response => {
                    var _data = response.body.data[$geo_country]
                    _this.geo_city_data = _data
                    _this.$nextTick(function() {
                        $420multiselect.multiSelect('refresh');
                    })
                }, response => {
                    // error callback
                });
            }
            $420multiselect.multiSelect('refresh');

        },
        getState (country) {
            var country = this.states[country];
            var source_arr = [{id:"all", text:"All"}]
             _.map(country, function(value, key) {
                if(value !== "-") {
                    source_arr.push({
                        id: value,
                        text: value,
                        name:value,
                        key:value
                    })
                }

            })
            return source_arr
        },
        toggleModal:function(msg) {
          $(this.$refs.choose_citys_dailog).modal(msg)
        },
    },
    mounted () {
        let that = this
        $(this.$refs.choose_citys_dailog).on('hidden.bs.modal', function () {
            that.hideModal()
        })

        $('#420multiselect').multiSelect({
            selectableHeader: '<input type="text" class="search-input" autocomplete="off" placeholder="Search"><br /><label>Choose to select:</label>',
            selectionHeader: '<input type="text" class="search-input" autocomplete="off" placeholder="Search"><br /><label>Selected:</label>',
            afterInit: function(ms) {
                var _this = this,
                    $selectableSearch = _this.$selectableUl.prevAll('input.search-input'),
                    $selectionSearch = _this.$selectionUl.prevAll('input.search-input'),
                    selectableSearchString = '#' + _this.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                    selectionSearchString = '#' + _this.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                _this.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                    .on('keydown', function(e) {
                        if (e.which === 40) {
                            _this.$selectableUl.focus();
                            return false;
                        }
                    });

                _this.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                    .on('keydown', function(e) {
                        if (e.which == 40) {
                            _this.$selectionUl.focus();
                            return false;
                        }
                    });
            },
            afterSelect: function() {
                var _this = this
                _this.qs1.cache();
                _this.qs2.cache(_this.qs1);

            },
            afterDeselect: function() {
                var _this = this
                _this.qs1.cache();
                _this.qs2.cache();
            }
        });

    }
}
</script>

<style scoped>
.ms-container {
    min-width: 550px;
    margin: 0 auto;
}

.modal-body {
    max-height: 600px;
}

#preselect_action {
    text-align: center;
}

select.col-md-4 {
    margin-bottom: 0;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 6px;
}

.tab-content {
    overflow: initial
}

.chosen-container {
    margin-left: 10px;
}

.preselect_affs {
    margin-top: 15px;
}

.country_ids[data-type="select2"] {
    background: none;
}

.control-group .form-group-geo .select2-search-choice div {
    word-break: break-all;
    line-height: 20px;
}

.ibutton-edit-done {
    top: -10px;
}

.row-editable .btn {
    margin-left: 7px;
}

.control-group.form-group .tips {
    position: absolute;
    top: 6px;
    left: 125px;
    color: #666;
}

.geo_country_ids[data-type="select2"]{
    background: none;
}
label.block{
  display: block;
}
</style>