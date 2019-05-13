<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Create Publisher</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Create Publishers</h2>

        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal frm-entity" action="" method="post" id="cc_add" ref="form_report" @submit.prevent.stop="submitForm">
                <div class="box-sub-header">
                    <h3>Auth</h3>
                </div>
                <div class="box-content">
                    <div class="control-group field-required form-group">
                        <label class="control-label col-md-3" for="email">Account Email<i class="icon-exclamation red"></i></label>
                        <div class="controls col-md-9">
                            <input type="email" class="col-md-4 form-control" name="email" id="email" required />
                        </div>
                    </div>
                    <div class="control-group field-required form-group">
                        <label class="control-label col-md-3" for="password">Password<i class="icon-exclamation red"></i></label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input class="col-md-4 form-control  pull-left mr10 mb10 " name="password" id="password" maxlength="200" type="text" required v-model="ramdom_pass"/><a class="btn  btn-primary" id="gen_pass" @click="setRamdomPass">Generate</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-sub-header">
                    <h3>Personal Info</h3>
                </div>

                <div class="box-content">
                    <div class="control-group field-required form-group">
                        <label class="control-label col-md-3" for="first_name">First Name<i class="icon-exclamation red"></i></label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-control" name="first_name" id="first_name" required />
                        </div>
                    </div>
                    <div class="control-group field-required form-group">
                        <label class="control-label col-md-3" for="last_name">Last Name<i class="icon-exclamation red"></i></label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-control" name="last_name" id="last_name" required />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="phone">Phone</label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-control" name="profile[phone]" id="phone" />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="im">IM</label>
                        <div class="controls col-md-9" id="ims">
                            <div class="im-base">
                                <select class="col-md-4 form-control  pull-left mr10" v-model="ims">
                                    <option value="qq">QQ</option>
                                    <option value="skype">Skype</option>
                                    <option value="msn">Msn</option>
                                    <option value="gtalk">Gtalk</option>
                                    <option value="wechat">Wechat</option>
                                </select>
                                <a href="#" class="btn im-add-btn" id="btn_im_add" @click.prevent="addIMs"><i class="icon-plus fa fa-plus" ></i></a>
                            </div>
                            
                            <div id="im_container">
                                <div class="im-base col-md-4 nopadding">
                                    <ul>
                                        <li v-if="imsArr.indexOf('qq') !== -1"><input type="text" class="col-md-12"  name="profile[qq]" placeholder="QQ" /></li>
                                        <li v-if="imsArr.indexOf('skype') !== -1" ><input type="text" class="col-md-12"  name="profile[skype]" placeholder="Skype" /></li>
                                        <li v-if="imsArr.indexOf('msn') !== -1" ><input type="text" class="col-md-12"  name="profile[msn]" placeholder="Msn" /></li>
                                        <li v-if="imsArr.indexOf('gtalk') !== -1" ><input type="text" class="col-md-12"  name="profile[gtalk]" placeholder="Gtalk" /></li>
                                        <li v-if="imsArr.indexOf('wechat') !== -1" ><input type="text" class="col-md-12"  name="profile[wechat]" placeholder="Wechat" /></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="address">Address</label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-comtrol" name="profile[address]" id="address" />
                        </div>
                    </div>
                    <div class="control-group field-required form-group country-box">
                        <label class="control-label col-md-3" for="country">Country<i class="icon-exclamation red"></i></label>
                        <div class="controls col-md-9" style="position:relative">
                            <chosen  v-if="geoChosen"  :chosen_name="'profile[country]'"  :default_option="'- Country -'" :chosen="geoChosen" :chosen_type="'simple'"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="region">Region</label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-control" name="profile[region]" id="region" />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="city">City</label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-control" name="profile[city]" id="city" />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="home_page">Website</label>
                        <div class="controls col-md-9">
                            <input type="text" class="col-md-4 form-comtrol" name="profile[home_page]" id="home_page" />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="grade">Grade</label>
                        <div class="controls col-md-9">
                            <select name="grade" class="col-md-4 form-control" id="grade">
                                <option value="" selected="selected"></option>
                                <option value="level1">level1</option>
                                <option value="level2">level2</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="box-sub-header">
                    <h3>Company Info</h3>
                </div>
                <div class="box-content">
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="career">Career</label>
                        <div class="controls col-md-9">
                            <select name="profile[career]" id="career" v-model="career" class="form-control col-md-4">
                                <option value="Self-employed">Self-employed</option>
                                <option value="Work in Company" selected="selected">Work in Company</option>
                            </select>
                        </div>
                    </div>
                    <div id="companyDiv" v-if="career === 'Work in Company' ">
                        <div class="control-group field-required form-group">
                            <label class="control-label col-md-3" for="company_name">Company</label>
                            <div class="controls col-md-9">
                                <chosen  v-if="companyChosen"  :chosen_name="'profile[company_name]'"  :default_option="''" :chosen="companyChosen" :chosen_type="'simple'"></chosen>

                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-3" for="title">Title</label>
                            <div class="controls col-md-9">
                                <input type="text" class="col-md-4" name="profile[title]" id="title" />
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-3" for="company_address">Company Address</label>
                            <div class="controls col-md-9">
                                <input type="text" class="col-md-4 form-comtrol" name="profile[company_address]" id="company_address" />
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-3" for="company_phone">Company Tel</label>
                            <div class="controls col-md-9">
                                <input type="text" class="col-md-4" name="profile[company_phone]" id="company_phone" />
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-3" for="company_fax">Company Fax</label>
                            <div class="controls col-md-9">
                                <input type="text" class="col-md-4" name="profile[company_fax]" id="company_fax" />
                            </div>
                        </div>
                        <div class="control-group form-group">
                            <label class="control-label col-md-3" for="company_website">Company Website</label>
                            <div class="controls col-md-9">
                                <input type="text" class="col-md-4 form-comtrol" name="profile[company_website]" id="company_website" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="box-sub-header">
                    <h3>Account Status</h3>
                </div>
                <div class="box-content">
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="parent_id">Account Manager</label>
                        <div class="controls col-md-9" ref="pmChosen" >
                            <chosen  v-if="pmChosen" :afterRender="afterAMRender" :checked_first="true" :chosen="pmChosen" :default_option="''" :onChange="onParentChange"  :chosen_name="'parent_id'"  :chosen_type="'simple'"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="parent_id2">Second Account Manager</label>
                        <div class="controls col-md-9">

                            <chosen  v-if="pmChosen" :chosen="pmChosen" :default_option="''"  :onChange="onParent2Change" :chosen_name="'profile[parent_id2]'"  :chosen_type="'simple'"></chosen>



                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="status">Status</label>
                        <div class="controls col-md-9">
                            <select id="status" class="col-md-4"  name="status">
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="level">Level</label>
                        <div class="controls col-md-9">
                            <select id="level" class="col-md-4" name="profile[level]">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>

                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Relocate(200 redirect)</label>
                        <div class="controls col-md-9">

                            <!-- <vue_switch :name="'profile[redirect_200]'" ></vue_switch> -->
                            <!-- <div class="common-switch">
                                <i-common-switch class="common-switch" size="large" value="0" name="profile[redirect_200]" true-value="1" false-value="0">
                                    <span slot="open">Yes</span>
                                    <span slot="close">No</span>
                                </i-common-switch>
                            </div> -->
                            <common-switch
                                id="is_private"
                                :updateState="false"
                                :default_val="0"
                                :switch_param='"profile[redirect_200]"'
                                :onChange="onChange"
                            />
                        </div>
                    </div>
                    
                    <div class="form-actions col-md-offset-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="reset" class="btn btn-default">Cancel</button>
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
//import vue_switch from '@/components/common/switch/'

import Vue from 'vue'

const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);




export default {
  data(){
    return {
            loadingZone:"",
            ramdom_pass:"",
            career:"Work in Company",
            parent_id2:"",
            parent_id:"",
            ims:"qq",
            imsArr:[]
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
    pmChosen(){
        return _.find(this.chosens, { name:'pm' });
    },
    companyChosen(){
        return _.find(this.chosens, { name:'company' });
    }
  },
  components:{chosen, AlertPop,CommonSwitch},

  methods: {
    ...mapActions([
      'getChosen'
    ]),
    onChange(){

    },
    addIMs(){
        if(this.imsArr.indexOf(this.ims) === -1) {
            this.imsArr.push(this.ims)
        }
    },
    setRamdomPass(){
        this.ramdom_pass = _.generate_password()
    },
    afterAMRender(){
        $(this.$refs.pmChosen).find("option").eq(1).prop("selected",true)
        $(this.$refs.pmChosen).find("select").trigger("chosen:updated");
    },
    submitForm ($event){
        if(!this.checkParent) return
        let that = this;
        let param = $(this.$refs.form_report).getFormQuery()
        this.loadingZone = "ajax_loading"
        Vue.http.post('Affiliate/create', param).then(response => {
            this.loadingZone = ""
            let _o = response.body.data;
            if(response.body.flag === 'fail'){

                that.showAlert(response.body.msg)
                return 
            }
            this.$router.push('/p_manage_aff?id=' + _o.id)
        }, response => {
            this.loadingZone = ""
            // error callback
            that.showAlert(response.body.msg)

            // error callback
        })
    },
    checkParent(){
        if(this.parent_id && this.parent_id2 && this.parent_id === this.parent_id2) {
            this.showAlert("Second account manager can not be same as Account manager.")
            return false;
        }
        return true
    },
    onParent2Change(val){
        this.parent_id2 = val
        this.checkParent()
    },
    onParentChange(val){
        this.parent_id = val
        this.checkParent()
    }
  },
  created () {
    this.getChosen()
        

  }
}
</script>

<style>
.im-base li {
    margin-top: 8px;
}
</style>