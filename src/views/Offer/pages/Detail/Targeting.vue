<template>
<div v-yeah-loading='loadingZone'>
    <div class="box" ref="targeting_wrapper">
        <div class="box-header"  v-box-action-resize>
            <h2>Targeting</h2>
            <div class="box-action"><i class="icon-chevron-up" title="Fold"></i> <i class="icon-chevron-down hide" title="Unfold"></i></div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group control-group form-group-geo">
                   <label class="control-label col-md-2">Geo Targeting<help-box :content="helpTips.geo_targeting"></help-box></label>
                    <div class="controls">
                        <editable_select2_offer :showAlert="showAlert" :source="sourceCounries" :offer_name="'country'" :offer_val="geoTargeting" :renderOffer="renderGeoTargeting" :onfocus="onfocus" :type="'geo_city'" :onSuccess="switch_disabled" data-switch="is_geo_targeting" :confirmCallBack="geoOnConfirm" id="geo_country_ids" class="col-md-10 nopadding"></editable_select2_offer>
                        <a href="" id="geo_reverse" ref="geo_reverse" data-control-name="bt-button" class="btn pull-right" @click.prevent.stop="geo_reverse">Reverse</a>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Enforce Geo Targeting</label>
                    <div class="controls">
                        <common-switch 
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.is_geo_targeting"
                            :switch_param='"is_geo_targeting"'
                            :render="renderOffer"
                            :disabled="country"
                            :switchDefaultAPI="Offer2edit"
                            :setOffWhenDisabled="true"
                        />
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Platform Targeting<help-box :content="helpTips.platform_targeting"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_select2_offer  :select2_multiple="true" data-switch="is_device_targeting"  :showAlert="showAlert" :source="sourcePlatform" :offer_name="'device_names'" :offer_val="platformTargeting"  :renderOffer="renderOffer" :onSuccess="switch_disabled"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Enforce Platform Targeting</label>
                    <div class="controls">
                        <common-switch 
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.is_device_targeting"
                            :switch_param='"is_device_targeting"'
                            :render="renderOffer"
                            :disabled="device_names"
                            :switchDefaultAPI="Offer2edit"
                            :setOffWhenDisabled="true"
                        />
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Device OS Targeting<help-box :content="helpTips.device_os_targeting"></help-box></label>
                    <div class="controls">
                        <editable_select2_offer  :select2_multiple="true"  data-switch="is_device_os_targeting" :showAlert="showAlert" :source="sourceDeviceOS" :offer_name="'device_os'" :offer_val="offerInfo.device_os && offerInfo.device_os[0] ? offerInfo.device_os: 'all'"  :renderOffer="renderOffer" :onSuccess="switch_disabled"></editable_select2_offer >
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Enforce Device OS Targeting</label>
                    <div class="controls">
                        <common-switch 
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.is_device_os_targeting"
                            :switch_param='"is_device_os_targeting"'
                            :render="renderOffer"
                            :disabled="device_os"
                            :switchDefaultAPI="Offer2edit"
                            :setOffWhenDisabled="true"
                        />
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Device Model Targeting<help-box :content="helpTips.device_model_targeting"></help-box></label>
                    <div class="controls">
                        <editable_select2_offer :showAlert="showAlert"  data-switch="is_device_model_targeting" :source="sourceDeviceModels" :offer_name="'device_model'" :offer_val="deviceModels" :renderOffer="renderOffer" :onfocus="onfocus" :type="''" :getCustomParam="getCustomParam" :onSuccess="switch_disabled"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Enforce Device Model Targeting</label>
                    <div class="controls">
                        <common-switch 
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.is_device_model_targeting"
                            :switch_param='"is_device_model_targeting"'
                            :render="renderOffer"
                            :disabled="device_model"
                            :switchDefaultAPI="Offer2edit"
                            :setOffWhenDisabled="true"
                        />
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Carriers<help-box :content="helpTips.carriers"></help-box></label>
                    <div class="controls">
                        <editable_select2_offer  :select2_multiple="true"  data-switch="is_carriers_targeting" :showAlert="showAlert" :source="sourceCarrier" :offer_name="'carriers_target'" :offer_val="Carriers"  :renderOffer="renderOffer" :onSuccess="switch_disabled"></editable_select2_offer >
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Enforce Carriers Targeting</label>
                    <div class="controls">
                        <common-switch 
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.is_carriers_targeting"
                            :switch_param='"is_carriers_targeting"'
                            :render="renderOffer"
                            :disabled="carriers_target"
                            :switchDefaultAPI="Offer2edit"
                            :setOffWhenDisabled="true"
                        />
                        <div class="tips inline_block">* Enforcing the option will need advertiser postback the 'carrier' token.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <chooseCitysModal :modalState="modalState" :hideModal="hideModal" :source="source" :states="sourceStates" :renderOffer="renderGeoTargeting && renderDeviceModels" :title="titles" :modalType="type" :btnName="btnName" :classList="classList"></chooseCitysModal>
</div>


</template>

<script>
import commonDataAPI from '@/api/commonData'
import chooseCitysModal from '@/components/Editable_Chosen_Offer_Onfocus.vue'
import { targetingHelpTips } from '../../config/config'

const HelpBox = () => import(/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

const editable_select2_offer = () => import(/* webpackChunkName: "editable_select2_offer" */ '@/components/Editable_Select2_Offer.vue');

const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);

export default {
    data () {
        return {
            modalState:'hide',
            sourceCounries:[],
            renderGeoTargeting:false,
            renderDeviceModels:true,
            geoCountryList:{},
            sourceCarrier:"",
            //deviceModels:'',
            titles:'',
            countryTitles:{
                title:'Choose City',
                subTitle1:'Country:',
                subTitle2:'Area: ',
                subTitle3:'City:',
            },
            deviceTitles:{
                title:'Choose Device Model',
                subTitle1:'',
                subTitle2:'Device Brand:',
                subTitle3:'Device Models:',
            },
            type:'geoTargeing',
            btnName:'Load City',
            source:'',

            country:false,
            device_names:false,
            device_os:false,
            device_model:false,
            carriers_target:false,

            alreadyCountryCodes:[],
            carrier_rerender:0,
            selectedCountryCodes:'',
            all_countries: {},
            countries_val: [],
            countries_data:[],
            states: {},
            select2:'',
            is_writeable:0,
            renderPlatformTargeting:false,
           // deviceNames:'all',
           class1:'col-md-2 control-label',
           class2:'block',
           classList:'',
           helpTips: {},
           loadingZone:true,
           Offer2edit:'Offer2/edit'

        }
    },
    components: { editable_select2_offer, chooseCitysModal,HelpBox,CommonSwitch },
    computed:{
    },
    watch:{
        offerInfo(newVal, oldVal) {
            let that = this
            that.getCarriers();
            that.getGeoCountryList();
            that.is_writeable = that.offerInfo.is_writeable

            //that.init_device_names()
            if (newVal) {
                that.switch_disabled('country')
                that.switch_disabled('device_names')
                that.switch_disabled('device_os')
                that.switch_disabled('device_model')
                that.switch_disabled('carriers_target')
                that.getGeoStateList()
            }
        },
        renderOffer(newVal, oldVal) {
            if (newVal) {
                this.loadingZone = false
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.targeting_wrapper)
                })
            }
        }
    },
    methods: {
        init_device_names() {
            let that = this
            var data = that.offerInfo
            if (data['device_names']) {
                if (_.isEmpty(data['device_names'][0])) {
                    //return 'all'
                    that.deviceNames = 'all'
                } else {
                    //return data['device_names']
                    that.deviceNames = data['device_names']
                }
            } else {
                //return 'all'
                    that.deviceNames = 'all'
            }
            that.renderPlatformTargeting = true
        },
        setDisplayGeoCountry(item, type) {
            var all_countries = this.all_countries
            var countries_val = this.countries_val
            var countries_data = this.countries_data
            switch (type) {
                case "country":
                    countries_val.push(item)
                    countries_data.push({
                        id: item,
                        text: item + " - " + all_countries[item] + " (All)",
                        country: item
                    })
                    break;
                case "state":
                    countries_val.push(item.key + "_" + item.value);
                    countries_data.push({
                        id: item.key + "_" + item.value,
                        text: item.key + " - " + all_countries[item.key] + "(" + item.value + ")",
                        country: item.key + "_" + item.value
                    })
                    break;
                case "city":
                    countries_val.push(item.country + "_" + item.state + "_" + item.city);
                    countries_data.push({
                        id: item.country + "_" + item.state + "_" + item.city,
                        text: item.country + " - " + all_countries[item.country] + "(" + item.city + ")",
                        country: item.country + "_" + item.state + "_" + item.city
                    })

                    break;
                default:
                    break;
            }
        },
        renderData(callback) {
            let that = this;
            var select2 = that.select2
            var countries_data = that.countries_data
            var countries_val = that.countries_val
            select2.select2('addToData', countries_data)
            if (countries_val.length < 1) countries_val = ['all'];
            select2.val(countries_val).trigger('change');
            that.countries_val = countries_val
            callback && callback();
        },
        geo_reverse() {
            let that = this;
            var role_id = that.userInfo.role_id
            var all_countries = that.all_countries
            var states = that.states
            var is_writeable = that.is_writeable
            if (role_id != 14 && is_writeable != 0) {
                if ($(that.$refs.geo_reverse).prev().find(".editable-container")) {
                    var select2 = $('#geo_country_ids').find('.editable-container').find('.select2-offscreen');
                    var select2_countries = select2.select2('val');
                    var flag = true;
                    that.select2 = select2
                    that.countries_val = [];
                    that.countries_data = [];
                    if (flag) {
                        flag = false;
                        $(that).text("waiting").attr("disabled", true);

                        //step1
                        var storage_country = [],
                            storage_state = {},
                            storage_city = {}
                        select2_countries.map(function(each) {
                            var each_arr = each.split("_")
                            var each_arr_len = each_arr.length
                            if (each_arr_len === 1 && (_.indexOf(storage_country, each_arr[0]) === -1)) {
                                storage_country.push(each_arr[0]);
                                storage_city[each_arr[0]] = {};
                                storage_state[each_arr[0]] = [];
                            } else if (each_arr_len === 2) {
                                var index_country = _.indexOf(storage_country, each_arr[0]);
                                if (index_country !== -1) {
                                    //storage_country.push(each_arr[0]);
                                    var _state = storage_state[each_arr[0]];
                                    if (_.indexOf(_state, each_arr[1]) === -1) {
                                        storage_state[each_arr[0]].push(each_arr[1])
                                    }
                                } else {
                                    storage_country.push(each_arr[0]);
                                    storage_state[each_arr[0]] = [each_arr[1]]
                                    storage_city[each_arr[0]] = {}

                                }
                                //storage_country.push(each_arr[0]);
                            } else if (each_arr_len === 3) {
                                var index_country = _.indexOf(storage_country, each_arr[0]);

                                if (index_country !== -1) {
                                    var _country = storage_city[each_arr[0]];
                                    var _state = _country[each_arr[1]];
                                    if (!_state) {
                                        storage_city[each_arr[0]][each_arr[1]] = [each_arr[2]];
                                        if (storage_state[each_arr[0]] && _.indexOf(storage_state[each_arr[0]], each_arr[1]) === -1) {
                                            storage_state[each_arr[0]].push(each_arr[1])
                                        }
                                        if (!storage_state[each_arr[0]]) {
                                            storage_state[each_arr[0]] = [each_arr[1]]
                                        }
                                    } else {
                                        storage_city[each_arr[0]][each_arr[1]].push(each_arr[2]);
                                    }

                                } else {
                                    storage_country.push(each_arr[0]);
                                    storage_state[each_arr[0]] = [each_arr[1]]
                                    var obj = {}
                                    obj[each_arr[1]] = [each_arr[2]];
                                    storage_city[each_arr[0]] = obj


                                }
                            }

                        })
                        //step2
                        //filter all
                        delete all_countries['all'];
                        _.map(all_countries, function(value, key) {
                            if (_.indexOf(storage_country, key) === -1) {
                                that.setDisplayGeoCountry(key, "country");
                            }
                        })

                        _.map(storage_state, function(value, key) {
                            if (value.length > 0) {
                                var t = _.difference(states[key], value)
                                t = _.without(t, "-")
                                t.map(function(_value, _key) {
                                    that.setDisplayGeoCountry({
                                        key: key,
                                        value: _value
                                    }, "state")
                                })
                            }
                        })

                        var flag_empty_city = true;
                        _.map(storage_city, function(value, key) {
                            if (!_.isEmpty(value)) {
                                flag_empty_city = false
                                _.map(value, function(_value, _key) {
                                    var query = {
                                        country: $.trim(key),
                                        state: $.trim(_key)
                                    }
                                    that.$http.get('Info/getGeoCityList?' + _query).then(response => {
                                        var t = _.difference(data[key], _value)
                                        t = _.without(t, "-");
                                        t.map(function(_val, _k) {
                                            that.setDisplayGeoCountry({
                                                country: key,
                                                state: _key,
                                                city: _val
                                            }, "city")
                                        })
                                    }, response => {
                                        // error callback
                                    });
                                })

                            }
                        })

                        if (flag_empty_city) {
                            that.renderData(function() {
                                $(that).text("Reverse").removeAttr("disabled")
                            });
                        }
                    }
                }
            }
        },
        geoOnConfirm(params) {
            var that = this
            var carriersText = that.offerInfo.carriers
            if (carriersText == []) {
                carriersText = 'Empty'
            }
            var alreadyCountryCodes = [];
            if (carriersText && carriersText.length > 0) {
                var tmp = carriersText
                if (!_.isEmpty(tmp)) {
                    $.each(tmp, function(i, d) {
                        d = $.trim(d);
                        that.alreadyCountryCodes.push(d.substring(0, 2));
                    })
                }
            }
            that.carrierLoad(params.newValue);
        },
        carrierLoad(selectedCountryCodes) {
            let that = this
            that.selectedCountryCodes = selectedCountryCodes;
            if (!_.isEmpty(that.alreadyCountryCodes) && selectedCountryCodes != null) {
                that.selectedCountryCodes = $.merge(that.alreadyCountryCodes, selectedCountryCodes);
            }
            that.getCarriers()
        },
        getCarriers(callback) {
            let that = this
            commonDataAPI.getCarriers(function(carriers) {
                var geoDataValue = [];
                var countryCodes = [];
                var countryCarriers = [];
                if (!_.isEmpty(geoDataValue) && geoDataValue[0].toLowerCase() != 'all') {
                    $.each(geoDataValue, function(i, v) {
                        v = $.trim(v);
                        countryCodes.push(v.substring(0, 2));
                    })
                }
                if (!_.isEmpty(countryCodes)) {
                    carrier.map(function(d, i) {
                        if ($.inArray(d.country_code, countryCodes) != -1) {
                            countryCarriers.push(carrier[i]);
                        }
                    })
                } else {
                    countryCarriers = carriers;
                }
                var source = countryCarriers.map(function(c_obj) {
                    return {
                        id: c_obj.id,
                        text: c_obj.country_code + "--" + c_obj.carrier
                    };
                });
                that.sourceCarrier = source
            })

        },
        getGeoStateList(){
            let that = this
            commonDataAPI.getGeoStateList(function(data) {
                that.states = data;
            })
        },
        getGeoCountryList () {
            let that = this
            commonDataAPI.getGeoCountryList(function(countries) {
                var data_source_country = that.offerInfo.country || [];
                var data_arr = []
                var source_arr = []
                that.all_countries = countries;
                if (!countries) return
                countries.all = 'All'
                _.map(countries, function(value, key) {
                    if (key == 'all') {
                        source_arr.push({
                            id: 'all',
                            text: 'All',
                            name:'All',
                            country: "",
                            locked: true
                        })
                    } else {
                        var text = key + ' ' + value
                        source_arr.push({
                            id: key,
                            text: text,
                            name:text,
                            key:text
                        })
                    }
                })
                var source = _.map(countries, function(value, key) {
                    if (key == 'all') {
                        return {
                            id: 'all',
                            text: 'All',
                            country: "",
                            locked: true
                        };
                    }
                    //case1:all city for one country
                    if (_.indexOf(data_source_country, key) !== -1) {
                        var text = key + " - " + value + " (All)"
                        return {
                            id: key,
                            text: text,
                            country: key
                        }
                    } else {
                        return {
                            id: key,
                            text: value
                        }
                    }
                })
                data_source_country.map(function(each_value) {
                    var temp_arr = each_value.split("_");
                    var temp_arr_len = temp_arr.length;
                    //case2: all city for one state
                    if (temp_arr_len === 2) {
                        var text = temp_arr[0] + " - " + countries[temp_arr[0]] + "(" + temp_arr[1] + ")"
                        data_arr.push({
                            id: each_value,
                            text: text,
                            country: each_value
                        })
                        //case3: specific city for one state
                    } else if (temp_arr_len === 3) {
                        var text = temp_arr[0] + " - " + countries[temp_arr[0]] + "(" + temp_arr[2] + ")"
                        data_arr.push({
                            id: each_value,
                            text: text,
                            country: each_value
                        })
                    }
                })
                that.sourceCounries = source.concat(data_arr);
                that.geoCountryList = source_arr;
                that.renderGeoTargeting = true
            })
        },
        switch_disabled (offer_param, response, new_value, $dom) {
            var offerInfo = this.offerInfo
            if (new_value) {
                if (new_value != 'empty' && new_value != 'all' && new_value != '') {
                    this[offer_param] = false
                } else {
                    this[offer_param] = true
                }
                if (new_value && offer_param == 'device_model') {
                    this.device_model_targeting_success(response, new_value)
                }
            } else {
                if ((offerInfo[offer_param] && offerInfo[offer_param].length == 0) || (new_value && new_value == 'all') || (new_value && new_value == 'Empty')) {
                    this[offer_param] = true
                } else {
                    this[offer_param] = false
                }
            }
            if (offer_param == 'carriers_target' && (this.offerInfo.carrier_names && this.offerInfo.carrier_names.length == 0 || this.offerInfo.carrier_names == 'all')) {
                this.carriers_target = true
            } else if(offer_param == 'carriers_target'){
                this.carriers_target = false
            }



        },
        device_model_targeting_success(response, new_value) {
            let that = this;
            new_value = window['Device_Model_Selected_Value'];
            new_value = that.parseCombinedModel(new_value)
            if (new_value[0].toLowerCase() == 'all') {
                $('#is_device_model_targeting_top').bootstrapSwitch('setActive', false);
                $('#is_device_model_targeting').attr('disabled', true);
                $('#is_device_model_targeting_top').bootstrapSwitch('setState', false, true);
            } else {
                $('#is_device_model_targeting_top').bootstrapSwitch('setActive', true);
                $('#is_device_model_targeting').attr('disabled', false);
            }
            return {
                newValue: new_value
            };
        },
        getCustomParam(params, $editable) {
            var params_value = _.clone(params.value);
            var params_value_clone = _.clone(params.value)
            var new_params = {
                id: params.pk
            };
            new_params[params.name] = _.isEmpty(params_value) ? [''] : _.clone(params_value);

            //去掉集合名
            var tmpBrand = [];
            _.each(new_params[params.name], function(each_value, index) {
                if (window['Large_Device_Model_Selected'] && window['Large_Device_Model_Selected'][md5(each_value)]) {
                    tmpBrand.push(each_value.substring(0,each_value.indexOf('(')));
                    new_params['brand'] = tmpBrand.join(',');
                    new_params[params.name].splice(index, 1)
                    //屏蔽从品牌转成 modles 后下发
                    //new_params[params.name] = new_params[params.name].concat(window['Large_Device_Model_Selected'][md5(each_value)])
                }
            })
            new_params[params.name] = _.uniq(new_params[params.name])
            window['Device_Model_Selected_Value'] = params_value_clone
            return new_params;
        },

        hideModal () {
            this.modalState = "hide"
        },
        onfocus: function(offer_name) {
            if (offer_name === 'country') {
                this.source = this.geoCountryList;
                this.titles = this.countryTitles
                this.classList = this.class1
                this.type = 'geoTargeing'
            }
            if (offer_name === 'device_model') {
                this.type = 'deviceModel';
                this.btnName = 'Load Device Models';
                this.titles = this.deviceTitles
                this.source = this.sourceDeviceModels;
                this.classList = this.class2
            }

            $("#select2-drop").hide();
            $('#420multiselect').empty();
            $('#420multiselect').multiSelect('refresh');
            this.modalState = "show"
        },
        switchCallBack(value){
            //this.is_use_advanced_pixel = value
        },
    },
    props:{
      renderOffer:{default:false},
      sourcePlatform:{
        default:""
      },
      sourceDeviceOS:{
        default:""
      },
      sourceDeviceModels:{
        default:""
      },
      sourceStates:{
        default:""
      },
      offerInfo:{},
      showAlert:{},
      deviceModels:{},
      parseCombinedModel:{},
      userInfo:{},
      geoTargeting:{},
      platformTargeting:{},
      Carriers:{},
      setOfferEditAuth:{},
      updateOfferInfo:{},
    },
    created() {
        this.helpTips = targetingHelpTips
    },
    mounted () {
    }
}
</script>


<style scoped>
</style>
