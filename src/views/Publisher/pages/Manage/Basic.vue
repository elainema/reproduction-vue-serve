<template>
    <div class="box" :class="!renderPublisher ? 'ajax_loading' : '' ">
        <div class="box-header" v-box-action-resize>
            <h2>Basic</h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Publisher ID</label>
                    <div class="controls col-md-9">
                        <span id="affiliate_id" class="text">{{publisherBasic.affiliate_id}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Account</label>
                    <div class="controls col-md-9">
                        <span id="account" class="text">{{publisherBasic.account}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Publisher Since</label>
                    <div class="controls col-md-9">
                        <span id="sign_up_date" class="text">{{publisherBasic.sign_up_date}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Sign Up IP</label>
                    <div class="controls col-md-9">
                        <span id="sign_up_ip" class="text">{{publisherBasic.sign_up_ip}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Account Type</label>
                    <div class="controls col-md-9">
                        <!-- <editable_select2_publisher  :showAlert="showAlert" :source="sourceAccountType" :publisher_name="'profile[account_type]'" :publisher_val="publisherBasic.account_type"  :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                        <editable-select2-publisher
                            :showAlert="showAlert" 
                            :source="sourceAccountType" 
                            :publisher_name="'profile[account_type]'" 
                            :publisher_val="publisherBasic.account_type"  
                            :renderPublisher="renderPublisher">
                        </editable-select2-publisher>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Career</label>
                    <div class="controls col-md-9">
                        <span id="career" class="text">{{publisherBasic.career}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Country</label>
                    <div class="controls col-md-9">
                        <a href="#" id="country" data-type="select2" ></a>
                        <!-- <editable_select2_publisher  :showAlert="showAlert" :source="sourceGeo" :publisher_name="'profile[country]'" :publisher_val="publisherBasic.country" :savenochange=true :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                        <editable-select2-publisher
                            :showAlert="showAlert" 
                            :source="sourceGeo" 
                            :publisher_name="'profile[country]'" 
                            :publisher_val="publisherBasic.country" 
                            :savenochange=true 
                            :renderPublisher="renderPublisher">
                        </editable-select2-publisher>
                    </div>
                </div>
                <div class="control-group form-group " v-if="publisherBasic.supplement && publisherBasic.supplement.basic">
                    <label class="control-label col-md-3">Facebook</label>
                    <div class="controls col-md-9">
                        <span id="facebook" class="text"> {{publisherBasic.supplement.basic.facebook}}</span>
                    </div>
                </div>
                <div class="control-group form-group " v-if="publisherBasic.supplement && publisherBasic.supplement.basic">
                    <label class="control-label col-md-3">Linkedin</label>
                    <div class="controls col-md-9">
                        <span id="linkedin" class="text"> {{publisherBasic.supplement.basic.linkedin}}</span>
                    </div>
                </div>
                <div class="control-group form-group " v-if="publisherBasic.supplement && publisherBasic.supplement.basic">
                    <label class="control-label col-md-3">Your preference timezone</label>
                    <div class="controls col-md-9">
                        <span id="timezone" class="text"> {{publisherBasic.supplement.basic.timezone}}</span>
                    </div>
                </div>
                <div class="control-group form-group " v-if="publisherBasic.supplement && publisherBasic.supplement.basic">
                    <label class="control-label col-md-3">Best time to reach you</label>
                    <div class="controls col-md-9">
                        <span id="reah_time" class="text"> {{publisherBasic.supplement.basic.reah_time}}</span>
                    </div>
                </div>
                <!--Company info start, display when Career is Work In Company-->
                <div class="control-group form-group"   v-show="publisherBasic.career === 'Work in Company' ">
                    <label class="control-label col-md-3">Company</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'company_name'" :showAlert="showAlert"  :publisher_name="'profile[company_name]'" :publisher_val="publisherBasic.company_name" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "   v-show="publisherBasic.career === 'Work in Company' ">
                    <label class="control-label col-md-3">Company Tel</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'company_phone'" :showAlert="showAlert"  :publisher_name="'profile[company_phone]'" :publisher_val="publisherBasic.company_phone" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "   v-show="publisherBasic.career === 'Work in Company' ">
                    <label class="control-label col-md-3">Company Fax</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'company_fax'" :showAlert="showAlert"  :publisher_name="'profile[company_fax]'" :publisher_val="publisherBasic.company_fax" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <!--Company info end, display when Career is Work In Company-->
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Region</label>
                    <div class="controls col-md-9">
                        <a href="#" id="region" data-type="text"></a>
                        <editable_text_publisher  :editable_id="'region'" :showAlert="showAlert"  :publisher_name="'profile[region]'" :publisher_val="publisherBasic.region" :renderPublisher="renderPublisher"></editable_text_publisher>

                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">City</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'city'" :showAlert="showAlert"  :publisher_name="'profile[city]'" :publisher_val="publisherBasic.city" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "  v-show="publisherBasic.career !== 'Work in Company' ">
                    <label class="control-label col-md-3">Address</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'address'" :showAlert="showAlert"  :publisher_name="'profile[address]'" :publisher_val="publisherBasic.address" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "  v-show="publisherBasic.career === 'Work in Company' ">
                    <label class="control-label col-md-3">Address</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'company_address'" :showAlert="showAlert"  :publisher_name="'profile[company_address]'" :publisher_val="publisherBasic.company_address" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "  v-show="publisherBasic.career !== 'Work in Company' ">
                    <label class="control-label col-md-3">Website</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'home_page'" :showAlert="showAlert"  :publisher_name="'profile[home_page]'" :publisher_val="publisherBasic.home_page" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group "  v-show="publisherBasic.career === 'Work in Company' ">
                    <label class="control-label col-md-3">Website</label>
                    <div class="controls col-md-9">
                        <editable_text_publisher  :editable_id="'company_website'" :showAlert="showAlert"  :publisher_name="'profile[company_website]'" :publisher_val="publisherBasic.company_website" :renderPublisher="renderPublisher"></editable_text_publisher>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-3">Grade</label>
                    <div class="controls col-md-9">
                        <!-- <editable_select2_publisher  :showAlert="showAlert" :source="sourceGrade" :publisher_name="'profile[grade]'" :publisher_val="publisherBasic.grade" :savenochange=true :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                        <editable-select2-publisher
                            :showAlert="showAlert" 
                            :source="sourceGrade" 
                            :publisher_name="'profile[grade]'" 
                            :publisher_val="publisherBasic.grade" 
                            :savenochange=true 
                            :renderPublisher="renderPublisher">
                        </editable-select2-publisher>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import publisherAPI from '@/api/publisher'
/*import editable_select2_publisher from '@/components/Editable_Select2_Publisher.vue'*/
const EditableSelect2Publisher = () => import(
/* webpackChunkName: "EditableSelect2Publisher" */ '../../components/editable-select2-publisher/'
);

import editable_text_publisher from '@/components/Editable_Text_Publisher.vue'
import commonDataAPI from '@/api/commonData'
let EventProxy = require('eventproxy');
let ep = new EventProxy()
export default {
    data(){
        return {
                publisherBasic:{},
                renderPublisher:false,
                sourceGeo:[],
                sourceGrade:[{"id":"","text":""},{"id":"level1","text":"level1"},{"id":"level2","text":"level2"}],
                sourceAccountType:[
                    {"id":"Publisher/Developer","text":"Publisher/Developer"},
                    {"id":"Media Buyer","text":"Media Buyer"},
                    {"id":"Ad Network","text":"Ad Network"},
                    {"id":"Network","text":"Affiliate Network"}]
            }
    },
    computed: {
    },
    components:{EditableSelect2Publisher, editable_text_publisher},
    methods: {
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        let that = this
        publisherAPI.getBasic({id:this.$route.query.id},function(basic){

            ep.emit("publisherBasic", basic.data)

        })
        ep.all("geo","publisherBasic", function(geo, publisherBasic){
            that.renderPublisher = true
            that.sourceGeo = geo
            that.publisherBasic = publisherBasic

        })
        commonDataAPI.getGeos(function(data){
            let source = data.map(function (c_obj) {
                return {id: c_obj.id, text: c_obj.code + ' - ' + c_obj.name};
            })
            ep.emit("geo", source)
        })

    }
}
</script>