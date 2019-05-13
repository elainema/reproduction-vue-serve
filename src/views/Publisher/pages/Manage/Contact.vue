<template>
    <div class="box" :class="!renderPublisher ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Contact</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Full Name</label>
                <div class="controls col-md-9">
                    <editable_text_publisher
                    :onShown="onNameShown" :editable_id="'name'" :savenochange=true 
                    :customParam="customNameParam" :showAlert="showAlert"  
                    :publisher_name="'profile[name]'" :onSuccess="onNameSuccess"
                     :publisher_val="(publisherContact.first_name||'' ) + ' ' + (publisherContact.last_name||'') " :renderPublisher="renderPublisher"></editable_text_publisher>



                </div>
            </div>
            <!--Company info start, display when Career is Work In Company-->
            <div class="control-group form-group"   v-show="publisherContact.career === 'Work in Company' ">
                <label class="control-label col-md-3">Title</label>
                <div class="controls col-md-9">
                    <editable_text_publisher  :editable_id="'title'" :showAlert="showAlert"  :publisher_name="'profile[title]'" :publisher_val="publisherContact.title" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <!--Company info end, display when Career is Work In Company-->
            <div class="control-group form-group">
                <label class="control-label col-md-3">Phone</label>
                <div class="controls col-md-9">
                    <editable_text_publisher  :editable_id="'phone'" :showAlert="showAlert"  :publisher_name="'profile[phone]'" :publisher_val="publisherContact.phone" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group"   v-show="publisherContact.career !== 'Work in Company' ">
                <label class="control-label col-md-3">Fax</label>
                <div class="controls col-md-9">
                    <editable_text_publisher  :editable_id="'fax'" :showAlert="showAlert"  :publisher_name="'profile[fax]'" :publisher_val="publisherContact.fax" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Email</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'email_send_address'" :showAlert="showAlert"  :publisher_name="'email_send_address'" :publisher_val="publisherContact.email_send_address" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">QQ</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'qq'" :showAlert="showAlert"  :publisher_name="'profile[qq]'" :publisher_val="publisherContact.qq" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Skype</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'skype'" :showAlert="showAlert"  :publisher_name="'profile[skype]'" :publisher_val="publisherContact.skype" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Msn</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'msn'" :showAlert="showAlert"  :publisher_name="'profile[msn]'" :publisher_val="publisherContact.msn" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Gtalk</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'gtalk'" :showAlert="showAlert"  :publisher_name="'profile[gtalk]'" :publisher_val="publisherContact.gtalk" :renderPublisher="renderPublisher"></editable_text_publisher>


                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Wechat</label>
                <div class="controls col-md-9">
                    <editable_text_publisher :editable_id="'wechat'" :showAlert="showAlert"  :publisher_name="'profile[wechat]'" :publisher_val="publisherContact.wechat" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group hide">
                <label class="control-label col-md-3">Other Contact</label>
                <div class="controls col-md-9">
                    <a href="#" id="other_contact"></a>
                </div>
            </div>
        </div>
    </div>
    <div class="hide" >
        <div class="editable-name" ref="editable_name">
            <div class=""><span>First Name </span>
                <input type="text" name="first_name" :value="publisherContact.first_name" class="input-small form-control">
            </div>
            <div class="mt10"><span>Last Name </span>
                <input type="text" name="last_name" :value="publisherContact.last_name"  class="input-small form-control">
            </div>
        </div>

    </div>
</div>
</template>
<script>
import publisherAPI from '@/api/publisher'
import editable_text_publisher from '@/components/Editable_Text_Publisher.vue'



export default {
    data(){
        return {
                publisherContact:{first_name:"",last_name:""},
                renderPublisher:false
            }
    },
    computed: {
        userInfo(){
            return this.$store.state.app.userInfo
        },
    },
    components:{editable_text_publisher},
    methods: {
        onNameShown($editable_zone){
            $editable_zone.find(".editable-input").empty().append($(this.$refs.editable_name))
        },
        onNameSuccess(new_value, _params){
            this.publisherContact.first_name = _params.first_name;
            this.publisherContact.last_name = _params.last_name;
        },
        customNameParam(param){
            let _param = {}
            _param.id = param.pk;
            _param.first_name = $(this.$refs.editable_name).find("[name=first_name]").trimVal();
            _param.last_name = $(this.$refs.editable_name).find("[name=last_name]").trimVal();
            return _param
        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        let that = this
        publisherAPI.getContact({id:this.$route.query.id},function(body){
            that.renderPublisher = true
            if(body.flag === "fail") {
                that.showAlert(body.msg,"error")
                return
            }
            if(body.data){
                that.publisherContact = body.data
            }
        })

    }
}
</script>