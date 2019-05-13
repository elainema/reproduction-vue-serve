<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li>Register Applications Detail</li>
        </ul>
    </div>
    <div class="box">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

        <div class="box-header">
            <h2>Register Applications Detail</h2>
            <div class="box-action">
                
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity ">
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="email">Account Email</label>
                    <div class="controls col-md-9">
                        <span class="text" id="email"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="email">Account Type</label>
                    <div class="controls col-md-9">
                        <span class="text" id="account_type"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="email">Sign Up Time</label>
                    <div class="controls col-md-9">
                        <span class="text" id="create_time"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="first_name">First Name</label>
                    <div class="controls col-md-9">
                        <span class="text" id="first_name"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="last_name">Last Name</label>
                    <div class="controls col-md-9">
                        <span class="text" id="last_name"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="phone">Phone</label>
                    <div class="controls col-md-9">
                        <span class="text" id="phone"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">QQ</label>
                    <div class="controls col-md-9">
                        <span id="qq" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Msn</label>
                    <div class="controls col-md-9">
                        <span id="msn" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Skype</label>
                    <div class="controls col-md-9">
                        <span id="skype" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Gtalk</label>
                    <div class="controls col-md-9">
                        <span id="gtalk" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Wechat</label>
                    <div class="controls col-md-9">
                        <span id="wechat" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Facebook</label>
                    <div class="controls col-md-9">
                        <span id="" name="basic_facebook" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Linkedin</label>
                    <div class="controls col-md-9">
                        <span name="basic_linkedin"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Preference timezone</label>
                    <div class="controls col-md-9">
                        <span id="" name="basic_timezone" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Best time to reach</label>
                    <div class="controls col-md-9">
                        <span name="basic_reah_time"class="text"></span>
                    </div>
                </div>
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment method</label>
                    <div class="controls col-md-9">
                        <span name="payment_method"class="text"></span>
                    </div>
                </div> -->
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment account name</label>
                    <div class="controls col-md-9">
                        <span name="payment_account_name"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment bank name</label>
                    <div class="controls col-md-9">
                        <span name="payment_bank_name"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment bank address</label>
                    <div class="controls col-md-9">
                        <span name="payment_bank_address"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment bank city</label>
                    <div class="controls col-md-9">
                        <span name="payment_bank_city"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment bank region</label>
                    <div class="controls col-md-9">
                        <span name="payment_bank_region"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment bank country</label>
                    <div class="controls col-md-9">
                        <span name="payment_bank_country"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment account number</label>
                    <div class="controls col-md-9">
                        <span name="payment_account_number"class="text"></span>
                    </div>
                </div> -->
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment swift code</label>
                    <div class="controls col-md-9">
                        <span name="payment_swift_code"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment other wire info</label>
                    <div class="controls col-md-9">
                        <span name="payment_wire_other"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Payment paypal email</label>
                    <div class="controls col-md-9">
                        <span name="payment_paypal_email"class="text"></span>
                    </div>
                </div> -->
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="address">Address</label>
                    <div class="controls col-md-9">
                        <span class="text" id="address" ></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="country">Country</label>
                    <div class="controls col-md-9">
                        <span class="text" id="country_name"></span>
                        <span style="margin-left: 100px;color: #999">IP address detected:<span class="ip_address"></span></span>
                    </div>
                </div>
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3" for="region">Region</label>
                    <div class="controls col-md-9">
                        <span class="text" id="region" ></span>
                    </div>
                </div> -->
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="city">City</label>
                    <div class="controls col-md-9">
                        <span class="text" id="city"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="home_page">Website</label>
                    <div class="controls col-md-9">
                        <span class="text" id="home_page" ></span>
                    </div>
                </div>
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3" for="career">Career</label>
                    <div class="controls col-md-9">
                        <span class="text" id="career" ></span>
                    </div>
                </div> -->

                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3" for="company_name">Company</label>
                    <div class="controls col-md-9">
                        <span class="text" id="company_name" ></span>
                    </div>
                </div> -->
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3">Company</label>
                    <div class="controls col-md-9">
                        <a href="#" id="company_name" data-type="text"></a>
                    </div>
                </div>
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3" for="title">Title</label>
                    <div class="controls col-md-9">
                        <span class="text" id="title" ></span>
                    </div>
                </div>
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3" for="company_address">Company Address</label>
                    <div class="controls col-md-9">
                        <span class="text" id="company_address" ></span>
                    </div>
                </div>
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3" for="company_phone">Company Tel</label>
                    <div class="controls col-md-9">
                        <span class="text" id="company_phone" ></span>
                    </div>
                </div>
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3" for="company_fax">Company Fax</label>
                    <div class="controls col-md-9">
                        <span class="text" id="company_fax" ></span>
                    </div>
                </div>
                <div class="control-group form-group inCorp">
                    <label class="control-label col-md-3" for="company_website">Company Website</label>
                    <div class="controls col-md-9">
                        <span class="text" id="company_website" ></span>
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-3">What verticals are you looking for?</label>
                    <div class="controls col-md-9">
                        <span name="career_verticals" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">What traffic types do you use to promote the offers?</label>
                    <div class="controls col-md-9">
                        <span name="career_traffic_type"class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">How much monthly revenue do you generate with other metworks?</label>
                    <div class="controls col-md-9">
                        <span name="career_revenue"class="text"></span>
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-3">What are your top 5 markets/geos?</label>
                    <div class="controls col-md-9">
                        <span name="career_top_market" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Welcome to share any successful case if you don’t mind.</label>
                    <div class="controls col-md-9">
                        <span name="career_campaigns" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">What Ad format do you use for promation purpose?</label>
                    <div class="controls col-md-9">
                        <span name="career_ad_format" class="text"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">What is your pricing Model?</label>
                    <div class="controls col-md-9">
                        <span name="career_pricing_model" class="text"></span>
                    </div>
                </div>
                <!-- <div class="control-group form-group">
                    <label class="control-label col-md-3">What other affiliate networks do you work with? Please mention your contacts with these affiliate networks</label>
                    <div class="controls col-md-9">
                        <span name="career_networks"class="text"></span>
                    </div>
                </div> -->
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="h">Please provide your app store URL here:</label>
                    <div class="controls col-md-9">
                        <span class="text" id="h"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="i">How many users do you have in total now? What about the DAU?</label>
                    <div class="controls col-md-9">
                        <span class="text" id="i"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="j">what are your top 5 countries by number of app users?</label>
                    <div class="controls col-md-9">
                        <span class="text" id="j"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="l">Please include any other information that we should know.</label>
                    <div class="controls col-md-9">
                        <span class="text" id="l"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="n">What are your traffic source? Please list some networks which you work with now.</label>
                    <div class="controls col-md-9">
                        <span class="text" id="n"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="k">What are your current monetization partners?</label>
                    <div class="controls col-md-9">
                        <span class="text" id="k"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="u">What's your main business? Please describe in brief.</label>
                    <div class="controls col-md-9">
                        <span class="text" id="u"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="o">What are your traffic source and top 5 geos?</label>
                    <div class="controls col-md-9">
                        <span class="text" id="o"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="s">Do you have your in-house traffic? What percentage of it?</label>
                    <div class="controls col-md-9">
                        <span class="text" id="s"></span>
                    </div>
                </div>
                <!-- <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="referral_name">Referral</label>
                    <div class="controls col-md-9">
                        <span class="text" id="referral_name"></span>
                    </div>
                </div> -->
                <div class="control-group form-group" style="display:none">
                    <label class="control-label qst-label col-md-3" for="u">What's your main business? Please describe in brief.</label>
                    <div class="controls col-md-9">
                        <span class="text" id="u"></span>
                    </div>
                </div>


                <div class="control-group form-group">
                    <label class="control-label col-md-3">Account Manager</label>
                    <div class="controls account-manager ">
                        <chosen  v-if="amChosen" :chosen="amChosen"  :chosen_name="'am_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All PMs -'"></chosen>
                    </div>
                    
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Level</label>
                    <div class="controls level-box">
                        <select id="level" class="col-md-3 form-control" v-model="level">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Note</label>
                    <div class="controls note-reason">

                        <select id="reason_id" class="col-md-3 form-control" v-model="reason">
                            <option value="0">- Select an reason -</option>
                            <option value="affiliate come from VN/PH/MA/IN1">1 - affiliate come from VN/PH/MA/IN</option>
                            <option value="Small scale1">2 - Small scale</option>
                            <option value="Newbie1">3 - Newbie</option>
                            <option value="Traffic not allowed1">4 - Traffic not allowed</option>
                            <option value="False registration information1">5 - False registration information</option>
                            <option value="Can not be reached1">6 - Can not be reached</option>
                            <option value="No earning history screenshot1">7 - No earning history screenshot</option>
                            <option value="False screenshot1">8 - False screenshot</option>
                            <option value="Other1">9 - Other</option>
                        </select>


                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-3">Contract Type</label>
                    <div class="controls level-box">
                        <input name="contract_type" type="radio" checked value="b" id="tob" /><label for="tob">&nbsp;&nbsp;To B</label>&nbsp;&nbsp;
                        <input name="contract_type" type="radio" value="c" id="toc" /><label for="toc">&nbsp;&nbsp;To C</label>
                    </div>
                </div>
                
                <div class="control-group form-group  remark-box">
                    <label class="control-label col-md-3"></label>
                    <div class="controls note-remark">
                    </div>
                </div>
                
                <div class="control-group form-group">
                    <label class="control-label qst-label col-md-3" for="g"></label>
                    <div class="controls note-box"> 
                        <textarea class="form-control remark" style="width:255px; height:63px;" v-model="remark"></textarea>
                    </div>
                </div>
                <div class="form-actions col-md-offset-3 nopadding mb15" id="status_btn">
                    <!--<button type="button" class="btn btn-primary hidden" id="assign" style="margin-right:10px">Assign</button>-->
                    <button type="button" class="btn btn-primary " v-show="!is_history_route && allow === 'yes'"  id="pass" @click.prevent="onClickApprove">Approve</button>
                    <button type="button" class="btn btn-primary " v-show="!is_history_route &&  allow === 'yes'" id="refuse" @click.prevent="onClickReject">Reject</button>
                    <a target="_self" href="#" class="btn btn-primary" id="cancel"  @click.prevent="onClickCancal">Cancel</a>
                </div>
            </div>
        </div>
    </div>
  </div>


</template>

<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"
import commonDataAPI from '@/api/commonData'
import chosen from '@/components/Chosen.vue'
import affInfoHelper from '@/util/affInfoHelper'
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

export default {
    data(){
        return {
            loadingZone:"",
            amChosen:"",
            allow:"",
            level:"1",
            remark:"",
            reason:"0",
            is_history_route:this.$route.query.pageType == 'history',
            rigister_detail:{},
        }
    },
    computed: {
    },
    components: {chosen, AlertPop},
    mixins: [mixin_modal, mixin_alert_msg],
    methods: {
        getRigisterDetail(){
            let that = this
            this.loadingZone = "ajax_loading"
            Vue.http.get('Affiliate/getPendingDetail',{params:{id:this.$route.query.id}}).then(response => {
                let data  = response.body.data 
                this.loadingZone = ""
                this.rigister_detail = data
                $.each(data, function(i, n){
                    $('#' + i).text(n);
                });

                $.each(data.supplement,function(i, n){
                    $.each(data.supplement[i], function(j, k){
                        var k = affInfoHelper.format(j,k);
                        if(k){
                            $("[name=" + i + "_"+ j +"]").text(k)
                        }else{
                            $("[name=" + i + "_"+ j +"]").closest(".control-group").hide()
                        }
                        
                    })
                })

                $(".ip_address").text(data.sign_up_ip.countryName === "ZZ" ?  "Unknown Country" : data.sign_up_ip.countryName)
                if($('#career').text() !== 'Work in Company') {
                    $('.inCorp').addClass('hide');
                }

                if(that.$route.query.pageType == 'history') {
                        
                    $("#cancel").attr("href", "p_register_history.html");
                    $(".account-manager").html("");
                    $(".note-reason").html("<span class='text'>" + data.remark + "</span>");
                    $(".level-box").html("");
                    $(".note-remark").html(data.reason);
                    $(".account-manager").removeClass("hidden");
                    $(".note-box").addClass("hidden");
                }

            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })


        },
        onClickReject(){
            if(this.reason == "0") return this.showAlert("You must select an reason")
            let that = this
            let params = {
                aff_ids:this.$route.query.id,
                reason:this.reason,
                remark:this.remark
            }

            Vue.http.post('Affiliate/unprove',params).then(response => {
                this.showAlert(response.body.msg, "success")
                setTimeout(function(){
                    that.$router.push("/p_register_list")
                },4000)
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        },
        onClickCancal(){
            this.$router.push("/p_register_list")
        },
        onClickApprove(){
            if(!$('[name="am_id"]').val()) return this.showAlert("You must select an account Manager")

            let params = {
                aff_ids:this.$route.query.id,
                am_id:$('[name="am_id"]').val(),
                level:this.level,
                reason:this.reason,
                remark:this.remark,
                contract_type:$('[name="contract_type"]:checked').val()
            }

            let that = this
            Vue.http.post('Affiliate/prove',params).then(response => {
                this.showAlert(response.body.msg, "success")
                setTimeout(function(){
                    that.$router.push("/p_register_list")
                },4000)
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        }
    },
    props:{

    },
    created () {
        let that = this
        commonDataAPI.getPMs(function(data){

          that.amChosen = { name: "am", trans_name:"",  full_name: "am_id", data: data }
        })
        Vue.http.get('Passport/getProveAffiliate').then(response => {
                let data  = response.body.data 
                that.allow = data.allow
            }, response => {
            })
        this.getRigisterDetail()


    }
}
</script>