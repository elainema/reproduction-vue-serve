<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class=""><router-link to="p_advertisers">Advertisers</router-link></li>
            <li class="active">Create Advertiser</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Create Advertiser</h2>

        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal frm-entity" ref="form_report" action="" method="post" id="cc_add" @submit.stop.prevent="submitForm">
                <div class="box-sub-header">
                    <h3>Basic<small class="required">Basic advertiser informations, required</small></h3>
                </div>
                <div class="box-content">
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="company">Company Name <i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input class="col-md-6" name="company" id="company" maxlength="200" type="text" required="">
                            <p class="col-md-12 mt10"><span>DSP:</span>
                                <input class="dsp-checkbox" id="dspCheckbox" name="dspCheckbox" type="checkbox">
                            </p>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="addresss1">Contract</label>
                        <div class="controls">
                            <chosen  v-if="conTractChosen" :default_option="'Please select a contract'" :chosen_type="'simple'" :chosen_name="'contract_id'" :chosen="conTractChosen"  :multiple_vue=false :onChange="chosenOnConTract"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="addresss1">Address 1</label>
                        <div class="controls">
                            <input class="col-md-8 form-control" name="address1" id="addresss1" maxlength="500" type="text">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="address_2">Address 2</label>
                        <div class="controls">
                            <input class="col-md-8 form-control" name="address2" id="address2" maxlength="500" type="text">
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="country_id">Country <i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <chosen  v-if="geoChosen"  :chosen_name="'country_id'"  :default_option="''" :chosen="geoChosen" :chosen_type="'simple'"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="region">Region</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="region" id="region">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="city">City</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="city" id="city">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="zipcode">Zipcode</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="zipcode" id="zipcode">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="phone">Phone</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="phone" id="phone">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="fax">Fax</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="fax" id="fax">
                        </div>
                    </div>
                </div>

                <div class="box-sub-header">
                    <h3>Tracking</h3></div>
                <div class="box-content">
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="tracking_system">Tracking System <i class="icon-exclamation red"></i></label>
                        <div class="controls">
                           <select name="tracking_system" class="col-md-4 form-control mr10" data-placeholder="- Tracking System -" id="tracking_system" required @change="onSelectChange">
                                <option value="" selected="selected"></option>
                                <option value="Adjust">Adjust</option>
                                <option value="Appsflyer">Appsflyer</option>
                                <option value="MAT">MAT</option>
                                <option :value="otherTracking" data-name="other">Other 3rd Party System</option>
                                <option value="Self-Tracking">Self-Tracking</option>
                            </select>
                            <input v-show="other_tracking" class="col-md-3" id="otherTracking" type="text" v-model="otherTracking" maxlength="50">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="grade">Grade</label>
                        <div class="controls">
                            <select name="grade" class="col-md-4 form-control" id="grade">
                                <option value="" selected="selected"></option>
                                <option value="level1">level1</option>
                                <option value="level2">level2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="box-sub-header">
                    <h3>Settings<small>Use default</small></h3></div>

                <div class="box-content">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="manager_passport_id">Account Manager</label>

                        <div class="controls account_manager" ref="">

                            <chosen  v-if="amChosen" :checked_first="true"    :chosen="amChosen" :chosen_name="'manager_passport_id'" :default_option="''" :chosen_type="'simple'"></chosen>

                        </div>
                    </div>

                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="manager_passport_id">BD Manager</label>

                        <div class="controls bd_manager" ref="">

                            <chosen  v-if="amChosen" :checked_first="true"     :chosen="amChosen" :chosen_name="'bd_manager_passport_id'"  :default_option="''" :chosen_type="'simple'"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="status">Status</label>
                        <div class="controls">
                            <select name="status" class="col-md-3 form-control" id="status">
                                <option value="active" selected="selected">Active</option>
                                <option value="pending">Pending</option>
                                <option value="deleted">Deleted</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="login_email">Email <i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input type="email" class="col-md-3 form-control" name="login_email" id="login_email" required="">
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="password">Password <i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input type="text" class="col-md-3 pull-left mr10 mb10" name="password" id="password" required="" :value="ramdom_pass"> <a class="btn" id="gen_pass" @click="setRamdomPass">Generate</a></div>
                    </div>
                    <div class="form-actions col-md-offset-2 nopadding mt40">
                        <button type="submit" class="btn btn-primary">Create Advertiser</button>
                        <button type="reset" class="btn btn-default">Cancel</button>
                        <input name="employee_id" id="emp_id" type="hidden">
                        <input type="hidden" name="contract_type" v-model="contract_type">
                    </div>
                </div>

                
            </form>
        </div>
    </div>

</div>
</template>
<script>
import auth from '@/util/auth'
import alert_pop_util from '@/util/alert_pop'

import { mapGetters, mapActions } from 'vuex'
import chosen from '@/components/Chosen.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'


import Vue from 'vue'



let reportCache = []
let nameCache = []
let pageCache = {}

export default {
  data(){
    return {
            contract_type:'',
            loadingZone:"",
            ramdom_pass:"",
            conTractChosen: "",
            other_tracking:false,
            otherTracking:'',
        }
    },
  mixins: [mixin_alert_msg],
  computed: {
    ...mapGetters({
      chosens:"chosens"
    }),
    geoChosen(){
        return _.find(this.chosens, { name:'geo' });
    },
    amChosen(){
        return _.find(this.chosens, { name:'am' });
    }
  },
  components:{chosen, AlertPop},
  methods: {
    ...mapActions([
      'getChosen'
    ]),
    chosenOnConTract(selected, text, e) {
       let contract_type = $(e.target).find('option:selected').attr("type")
       this.contract_type = contract_type
    },
    setRamdomPass(){
        this.ramdom_pass = _.generate_password()
    },
    getContract(callback){
        Vue.http.get('Advertiser/getContractList',{params:{}}).then(response => {
            let data  = response.body.data 
            callback && callback(data && data.list || [])
        }, response => {
            this.showAlert(response.body.msg)
        })
    },
    submitForm ($event){
        let value = $('#phone', self.dom).val();
        if(/^\+?[\s\d\-\(\)]*$/.test(value) == false){
            this.showAlert('Please input the correct phone number',"info")
            $('#phone').focus();
            return false;
        }
        if($("#tracking_system").val() == "" || $("#tracking_system").val() == undefined) {
            this.showAlert('Please select the tracking system',"info")
            $('#tracking_system').focus();
            return;
        }
       /*if(!$('[name="contract_id"]').val()) {
            return  this.showAlert('Please select a contract',"info")
       }*/

        let param = $(this.$refs.form_report).getFormQuery()
        this.loadingZone = "ajax_loading"
        Vue.http.post('Advertiser/create', param).then(response => {
            this.loadingZone = ""
            let _o = response.body.data;
            if(response.body.flag === 'fail'){

                this.showAlert(response.body.msg)
                return 
            }
            if(this.$route.query.from == 'offer'){
                this.showAlert("success!","success")
                this.$store.dispatch('addAdvInfo', {id: _o.id, name: $('#company').val()})
                setTimeout(function(){
                    window.close();
                },2000)
            }else{ 
                this.$router.push('/p_manage_adv?id=' + _o.id)
            }       
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert(response.body.msg)

            // error callback
        })

    },
    onSelectChange(e) {
        var selected = $(e.target).find("option:selected").attr("data-name");;
        if(selected == "other") {
            this.other_tracking = true
        } else {
            this.other_tracking = false
        }
    },
  },
  created () {
    let that = this;
    this.getChosen()
    this.getContract(function(data){
        that.conTractChosen = { name: "contract", trans_name:"contract",  full_name: "contract", data: data};

    });

  }
}
</script>