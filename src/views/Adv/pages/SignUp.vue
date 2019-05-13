<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">


    <div class="box mt20">
        <div class="box-header">
            <h2>Registration</h2>

        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal " id="register_form" action="" method="post" autocomplete="off"  @submit.prevent.stop="onSubmit" ref="form">
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="companyName">Company Name<i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="companyName" class="col-md-6 form-control" placeholder="Company Name" name="company_name" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="address1">Address 1<i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="address1" class="col-md-6 form-control" placeholder="Address 1" name="address" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="address2">Address 2</label>
                    <div class="controls col-md-6">
                        <input type="text" id="address2" class="col-md-6 form-control" name="address_2" placeholder="Address 2">
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="city">City <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="city" class="col-md-6 form-control" placeholder="City" name="city" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="country">Country <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <select id="country" name="country" class="col-md-6 form-control" data-placeholder="- Country -" required>
                            <option value="0">- Select a Country -</option>
                            <option value="1">HK - HONG KONG</option>
                            <option value="2">HU - HUNGARY</option>
                            <option value="3">IS - ICELAND</option>
                            <option value="4">IN - INDIA</option>
                            <option value="5">ID - INDONESIA</option>
                            <option value="6">IR - IRAN</option>
                            <option value="7">IQ - IRAQ</option>
                            <option value="8">IE - IRELAND</option>
                            <option value="9">IL - ISRAEL</option>
                            <option value="10">IT - ITALY</option>
                            <option value="11">CI - COTE D'IVOIRE</option>
                            <option value="12">JM - JAMAICA</option>
                            <option value="13">JP - JAPAN</option>
                            <option value="14">KZ - KAZAKHSTAN</option>
                            <option value="15">JO - JORDAN</option>
                            <option value="16">KE - KENYA</option>
                            <option value="17">KP - KOREA</option>
                            <option value="18">KR - KOREA</option>
                            <option value="19">KW - KUWAIT</option>
                            <option value="20">KG - KYRGYZSTAN</option>
                            <option value="21">LA - LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                            <option value="22">LB - LEBANON</option>
                            <option value="23">LS - LESOTHO</option>
                            <option value="24">LV - LATVIA</option>
                            <option value="25">LR - LIBERIA</option>
                            <option value="26">LY - LIBYA</option>
                            <option value="27">LI - LIECHTENSTEIN</option>
                            <option value="28">LT - LITHUANIA</option>
                            <option value="29">LU - LUXEMBOURG</option>
                            <option value="30">MO - MACAO</option>
                            <option value="31">MG - MADAGASCAR</option>
                            <option value="32">MW - MALAWI</option>
                            <option value="33">MY - MALAYSIA</option>
                            <option value="34">MV - MALDIVES</option>
                            <option value="35">ML - MALI</option>
                            <option value="36">AU - Australia</option>
                            <option value="37">MQ - MARTINIQUE</option>
                            <option value="38">MR - MAURITANIA</option>
                            <option value="39">MU - MAURITIUS</option>
                            <option value="40">MX - MEXICO</option>
                            <option value="41">MC - MONACO</option>
                            <option value="42">MN - MONGOLIA</option>
                            <option value="43">MD - MOLDOVA</option>
                            <option value="44">ME - MONTENEGRO</option>
                            <option value="45">MS - MONTSERRAT</option>
                            <option value="46">MA - MOROCCO</option>
                            <option value="47">MZ - MOZAMBIQUE</option>
                            <option value="48">OM - OMAN</option>
                            <option value="49">NA - NAMIBIA</option>
                            <option value="50">NR - NAURU</option>
                            <option value="51">NP - NEPAL</option>
                            <option value="52">NL - NETHERLANDS</option>
                            <option value="53">CW - Cura?ao</option>
                            <option value="54">AW - ARUBA</option>
                            <option value="55">SX - SINT MAARTEN</option>
                            <option value="56">BQ - BONAIRE</option>
                            <option value="57">NC - NEW CALEDONIA</option>
                            <option value="58">VU - VANUATU</option>
                            <option value="59">NZ - NEW ZEALAND</option>
                            <option value="60">NI - NICARAGUA</option>
                            <option value="61">NE - NIGER</option>
                            <option value="62">NG - NIGERIA</option>
                            <option value="63">NU - NIUE</option>
                            <option value="64">NF - NORFOLK ISLAND</option>
                            <option value="65">NO - NORWAY</option>
                            <option value="66">MP - NORTHERN MARIANA ISLANDS</option>
                            <option value="67">UM - UNITED STATES MINOR OUTLYING ISLANDS</option>
                            <option value="68">FM - MICRONESIA</option>
                            <option value="69">MH - MARSHALL ISLANDS</option>
                            <option value="70">PW - PALAU</option>
                            <option value="71">PK - PAKISTAN</option>
                            <option value="72">PA - PANAMA</option>
                            <option value="73">PG - PAPUA NEW GUINEA</option>
                            <option value="74">PY - PARAGUAY</option>
                            <option value="75">PE - PERU</option>
                            <option value="76">PH - PHILIPPINES</option>
                            <option value="77">PN - PITCAIRN</option>
                            <option value="78">PL - POLAND</option>
                            <option value="79">PT - PORTUGAL</option>
                            <option value="80">GW - GUINEA-BISSAU</option>
                            <option value="81">TL - TIMOR-LESTE</option>
                            <option value="82">PR - PUERTO RICO</option>
                            <option value="83">QA - QATAR</option>
                            <option value="84">RE - REUNION</option>
                            <option value="85">RO - ROMANIA</option>
                            <option value="86">RU - RUSSIAN FEDERATION</option>
                            <option value="87">RW - RWANDA</option>
                            <option value="88">BL - SAINT BARTHELEMY</option>
                            <option value="89">SH - SAINT HELENA</option>
                            <option value="90">KN - SAINT KITTS AND NEVIS</option>
                            <option value="91">AI - ANGUILLA</option>
                            <option value="92">LC - SAINT LUCIA</option>
                            <option value="93">MF - SAINT MARTIN</option>
                            <option value="94">PM - SAINT PIERRE AND MIQUELON</option>
                            <option value="95">VC - SAINT VINCENT AND THE GRENADINES</option>
                            <option value="96">SM - SAN MARINO</option>
                            <option value="97">ST - SAO TOME AND PRINCIPE</option>
                            <option value="98">SA - SAUDI ARABIA</option>
                            <option value="99">SN - SENEGAL</option>
                            <option value="100">RS - SERBIA</option>
                            <option value="101">SC - SEYCHELLES</option>
                            <option value="102">SL - SIERRA LEONE</option>
                            <option value="103">SG - SINGAPORE</option>
                            <option value="104">SK - SLOVAKIA</option>
                            <option value="105">VN - VIET NAM</option>
                            <option value="106">SI - SLOVENIA</option>
                            <option value="107">SO - SOMALIA</option>
                            <option value="108">ZA - SOUTH AFRICA</option>
                            <option value="109">ZW - ZIMBABWE</option>
                            <option value="110">ES - SPAIN</option>
                            <option value="111">SS - SOUTH SUDAN</option>
                            <option value="112">EH - WESTERN SAHARA</option>
                            <option value="113">SD - SUDAN</option>
                            <option value="114">SR - SURINAME</option>
                            <option value="115">SJ - SVALBARD AND JAN MAYEN</option>
                            <option value="116">SZ - SWAZILAND</option>
                            <option value="117">SE - SWEDEN</option>
                            <option value="118">CH - SWITZERLAND</option>
                            <option value="119">SY - SYRIAN ARAB REPUBLIC</option>
                            <option value="120">TJ - TAJIKISTAN</option>
                            <option value="121">TH - THAILAND</option>
                            <option value="122">TG - TOGO</option>
                            <option value="123">TK - TOKELAU</option>
                            <option value="124">TO - TONGA</option>
                            <option value="125">TT - TRINIDAD AND TOBAGO</option>
                            <option value="126">AE - UNITED ARAB EMIRATES</option>
                            <option value="127">TN - TUNISIA</option>
                            <option value="128">TR - TURKEY</option>
                            <option value="129">TM - TURKMENISTAN</option>
                            <option value="130">TC - TURKS AND CAICOS ISLANDS</option>
                            <option value="131">TV - TUVALU</option>
                            <option value="132">UG - UGANDA</option>
                            <option value="133">UA - UKRAINE</option>
                            <option value="134">MK - MACEDONIA</option>
                            <option value="135">EG - EGYPT</option>
                            <option value="136">GB - UNITED KINGDOM</option>
                            <option value="137">GG - GUERNSEY</option>
                            <option value="138">JE - JERSEY</option>
                            <option value="139">IM - ISLE OF MAN</option>
                            <option value="140">TZ - TANZANIA</option>
                            <option value="141">US - UNITED STATES</option>
                            <option value="142">VI - VIRGIN ISLANDS</option>
                            <option value="143">BF - BURKINA FASO</option>
                            <option value="144">UY - URUGUAY</option>
                            <option value="145">UZ - UZBEKISTAN</option>
                            <option value="146">VE - VENEZUELA</option>
                            <option value="147">WF - WALLIS AND FUTUNA</option>
                            <option value="148">WS - SAMOA</option>
                            <option value="149">YE - YEMEN</option>
                            <option value="150">ZM - ZAMBIA</option>
                            <option value="151">DK - Denmark</option>
                            <option value="152">CN - China</option>
                            <option value="153">DE - Germany</option>
                            <option value="154">CA - Canada</option>
                            <option value="155">UK - United Kingdom</option>
                            <option value="157">CZ - Czech Republic</option>
                            <option value="158">AF - Afghanistan</option>
                            <option value="159">BG - Bulgaria</option>
                            <option value="170">CO - Colombia</option>
                            <option value="188">CR - Costa Rica</option>
                            <option value="214">DO - Dominican Republic</option>
                            <option value="218">EC - Ecuador</option>
                            <option value="222">SV - El Salvador</option>
                            <option value="246">FI - Finland</option>
                            <option value="300">GR - Greece</option>
                            <option value="316">GU - Guam</option>
                            <option value="320">GT - Guatemala</option>
                            <option value="340">HN - Honduras</option>
                            <option value="470">MT - Malta</option>
                            <option value="471">FR - France</option>
                            <option value="472">AT - Austria</option>
                            <option value="473">AR - Argentina</option>
                            <option value="474">AX - Aland Islands</option>
                            <option value="475">AL - Albania</option>
                            <option value="476">DZ - Algeria</option>
                            <option value="477">AS - American Samoa</option>
                            <option value="478">AD - Andorra</option>
                            <option value="479">AO - Angola</option>
                            <option value="480">AQ - Antarctica</option>
                            <option value="481">AG - Antigua And Barbuda</option>
                            <option value="482">AM - Armenia</option>
                            <option value="483">AP - Asia (Unknown Country)</option>
                            <option value="484">AZ - Azerbaijan</option>
                            <option value="485">BS - Bahamas</option>
                            <option value="486">BH - Bahrain</option>
                            <option value="487">BD - Bangladesh</option>
                            <option value="488">BB - Barbados</option>
                            <option value="489">BY - Belarus</option>
                            <option value="490">BE - Belgium</option>
                            <option value="491">BZ - Belize</option>
                            <option value="492">BJ - Benin</option>
                            <option value="493">BM - Bermuda</option>
                            <option value="494">BT - Bhutan</option>
                            <option value="495">BO - Bolivia</option>
                            <option value="496">BA - Bosnia And Herzegovina</option>
                            <option value="497">BW - Botswana</option>
                            <option value="498">BV - Bouvet Island</option>
                            <option value="499">BR - Brazil</option>
                            <option value="500">IO - British Indian Ocean Territory</option>
                            <option value="501">BN - Brunei Darussalam</option>
                            <option value="502">BI - Burundi</option>
                            <option value="503">KH - Cambodia</option>
                            <option value="504">CM - Cameroon</option>
                            <option value="505">CV - Cape Verde</option>
                            <option value="506">KY - Cayman Islands</option>
                            <option value="507">CF - Central African Republic</option>
                            <option value="508">TD - Chad</option>
                            <option value="509">CL - Chile</option>
                            <option value="510">CX - Christmas Island</option>
                            <option value="511">CC - Cocos (Keeling) Islands</option>
                            <option value="512">KM - Comoros</option>
                            <option value="513">CG - Congo</option>
                            <option value="514">CD - Congo - The Democratic Rep Of</option>
                            <option value="515">CK - Cook Islands</option>
                            <option value="516">HR - Croatia</option>
                            <option value="517">CU - Cuba</option>
                            <option value="518">CY - Cyprus</option>
                            <option value="519">DJ - Djibouti</option>
                            <option value="520">DM - Dominica</option>
                            <option value="521">GQ - Equatorial Guinea</option>
                            <option value="522">ER - Eritrea</option>
                            <option value="523">EE - Estonia</option>
                            <option value="524">ET - Ethiopia</option>
                            <option value="525">EU - Europe (Unknown Country)</option>
                            <option value="526">FK - Falkland Islands (Malvinas)</option>
                            <option value="527">FO - Faroe Islands</option>
                            <option value="528">FJ - Fiji</option>
                            <option value="529">GF - French Guiana</option>
                            <option value="530">PF - French Polynesia</option>
                            <option value="531">TF - French Southern Territories</option>
                            <option value="532">GA - Gabon</option>
                            <option value="533">GM - Gambia</option>
                            <option value="534">GE - Georgia</option>
                            <option value="535">GH - Ghana</option>
                            <option value="536">GI - Gibraltar</option>
                            <option value="537">GL - Greenland</option>
                            <option value="538">GD - Grenada</option>
                            <option value="539">GP - Guadeloupe</option>
                            <option value="540">GN - Guinea</option>
                            <option value="541">GY - Guyana</option>
                            <option value="542">HT - Haiti</option>
                            <option value="543">HM - Heard And Mc Donald Islands</option>
                            <option value="544">VA - Holy See (Vatican City State)</option>
                            <option value="545">INT - International (Generic)</option>
                            <option value="546">KI - Kiribati</option>
                            <option value="547">YT - Mayotte</option>
                            <option value="548">MM - Myanmar</option>
                            <option value="549">AN - Netherlands Antilles</option>
                            <option value="550">PS - Palestinian Territories</option>
                            <option value="551">SB - Solomon Islands</option>
                            <option value="552">GS - South Georgia / South Sandwich Isl</option>
                            <option value="553">LK - Sri Lanka</option>
                            <option value="554">TW - Taiwan</option>
                            <option value="555">VG - Virgin Islands, British</option>
                            <option value="557">XK - CAROLINE ISLANDS</option>
                            <option value="559">XK - CAROLINE ISLANDS</option>
                            <option value="561">XK - CAROLINE ISLANDS</option>
                        </select>
                        <span id="country_help" class="help-inline hide" data-trans="YM_10037"> Please choose a country</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="region">Region </label>
                    <div class="controls col-md-6">
                        <input type="text" id="region" class="col-md-6 form-control" placeholder="Region" name="region">
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="zipcode">Zipcode <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="zipcode" class="col-md-6 form-control" placeholder="Zipcode" name="zipcode" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="phone">Phone <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="phone" class="col-md-6 form-control" placeholder="Phone" name="phone" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="email">Email <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="email" id="email" class="col-md-6 form-control" placeholder="Email" name="email" required>
                        <span class="help-inline hide" data-trans="YM_10037">Please input email format </span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="password">Password <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="password" id="password" class="col-md-6 form-control" placeholder="Password" name="password" v-model="password" required>
                        <span class="help-inline hide" data-trans="YM_10037">The two passwords you entered do not match</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="confirmPassword">Confirm Password <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="password" id="confirmPassword" class="col-md-6 form-control" data-name="confirmPassword" placeholder="Confirm Password" v-model="password_confirm" required>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="">What is your website? <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <textarea rows="5" class="form-control span6" name="question[a]" required></textarea>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="">Which countries you are targeting? </label>
                    <div class="controls col-md-6">
                        <textarea rows="5" class="form-control span6" id="question2" name="question[b]"></textarea>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="">What's kind of offers you are mainly provide? <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <textarea rows="5" class="form-control span6" name="question[c]" required></textarea>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Tracking System<i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <select name="tracking_system" class="span3" id="tracking_system" required>
                            <option value="" selected="selected"></option>
                            <option value="Adjust">Adjust</option>
                            <option value="Appsflyer">Appsflyer</option>
                            <option value="MAT">MAT</option>
                            <option value="" name="other">Other 3rd Party System</option>
                            <option value="Self-Tracking">Self-Tracking</option>
                        </select>
                        <input class="hide" id="otherTracking" type="text" value="" />
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="">What is your payment term? Can you do prepayment? <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <textarea rows="5" class="form-control span6" name="question[d]" required></textarea>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3" for="" data-name="" data-trans="verificationCode">Verification Code <i class="icon-exclamation red"></i>
                    </label>
                    <div class="controls col-md-6">
                        <input type="text" id="verificationCode" class="form-control" name="verification_code" placeholder="Verification Code" required>
                        <img id="verication_img" class="mt10" :src="verication_img" @click="ramdom_val=!ramdom_val">
                    </div>
                </div>
                <div class="control-group form-group">
                    <div class="span3"></div>
                    <div class="col-md-offset-3 col-md-9">
                        <label class="checkbox-inline">
                            <input type="checkbox" data-name="agree_terms" id="agree_terms" value="0" v-model="agree_terms"> <span data-trans="SIGNUP_08">I agree to the</span> <a href="#terms_wnd" id="terms" class="terms" data-toggle="modal" data-trans="SIGNUP_09" @click="modalState=true">Terms and Conditions</a>
                        </label>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label><span id="errorMsg" class="help-inline"></span> </label>
                </div>
                <div class="control-group form-group">
                    <label class="col-md-offset-3 col-md-9">
                        <button type="submit" class="btn btn-primary btn-large" id="btn_sign_up" ref="btn_sign_up" data-trans="signUp" disabled>Sign Up</button>
                    </label>
                </div>
            </form>
        </div>
    </div>
    <!-- <advSignUpTermsModal :modalState="modalState" :hideModal="hideModal"></advSignUpTermsModal> -->
    <adv-signup-terms-modal  
        :modalState.sync="modalState" 
        :dialogName="'modalState'">
    </adv-signup-terms-modal>
</div>
</template>
<script>
import auth from '@/util/auth'
import config from "@/util/config"

const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import commonDataAPI from '@/api/commonData'

import mixin_alert_msg from '@/mixins/alert_msg'
import mixin_modal from '@/mixins/modal'


import Vue from 'vue'

//import advSignUpTermsModal from '@/components/AdvSignUpTermsModal.vue'
const AdvSignupTermsModal = () => import(
/* webpackChunkName: "AdvSignupTermsModal" */ '../components/adv-signup-terms-modal/'
);
export default {
  data(){
    return {
            loadingZone:"",
            agree_terms:false,
            ramdom_val:false,
            geoChosen:[],
            password:"",
            password_confirm:""
        }
    },
  mixins: [mixin_modal,mixin_alert_msg],
  components:{AlertPop, AdvSignupTermsModal},
  watch:{
    agree_terms(newVal, oldVal){
        $(this.$refs.btn_sign_up).prop("disabled", !newVal)
    }
  },
  computed: {
    verication_img(){
        return document.location.protocol + "//" + config.api_host + "/" + config.app_name + "/Session/vcode?t=" + this.ramdom_val
    }
  },
  methods: {
    onSubmit ($event){
        let that = this
        if(that.password !== that.password_confirm) return that.showAlert("Password Confirm must be equal with password")
        let param = $(this.$refs.form).getFormQuery()
        Vue.http.post('Advertiser/register', param).then(response => {
            this.loadingZone = ""
            let _o = response.body.data;
            if(response.body.flag === 'fail'){

                this.showAlert(response.body.msg)
                this.ramdom_val = !this.ramdom_val
                return 
            }

            this.showAlert("success!","success")
            setTimeout(function(){
                that.$router.push('/')
            },2000)
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert(response.body.msg)
            this.ramdom_val = !this.ramdom_val

            // error callback
        })


    }
  },
  created () {
    let that = this

  }
}
</script>