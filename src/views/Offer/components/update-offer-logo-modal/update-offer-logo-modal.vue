<template>
<div>
    <modal 
        :dialogVisible.sync="outerVisible"
        :title="'Update Offer Logo'"
        :showConfirmText="false"
        :showCancelText="false"
        :onCancel="handleClose">
        <template slot="dialogBody">
            <div class="alert alert-error" v-show="msg">
                <a class="close" data-dismiss="alert">×</a>
                <strong>FAIL: </strong> Upload Error. Message: {{msg}}
            </div>
            <form class="form-horizontal" action="#">
                <div class="control-group">
                    <label class="control-label col-md-2" for="logo">Logo</label>
                    <div class="controls swf-uploader-container">
                        <upload-file-directly
                            v-if="renderOffer"
                            :btnName="'Select File'"
                            :offer_id="offer_id"
                            :beforeChange="beforeChange"
                            :afterChange="afterChange"
                            :uploadSuccess="uploadSuccess"
                            :uploadUrl="uploadUrl"
                            :showAlert="showAlert"
                            :accept="accept">
                        </upload-file-directly>
                        <p></p>
                        <img :src="config.ajax_loader_img" v-show="offer_logo_loading" id="offer_logo_loading" />
                    </div>
                </div>
            </form>
        </template>
    </modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
import cors_config from '@/util/config'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

const UploadFileDirectly = () => import(
/* webpackChunkName: "UploadFileDirectly" */ '@/components/common/upload-file-directly/');
export default {
    data(){
        return {
            outerVisible:false,
            value: "",
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            msg:'',
            config:cors_config,
            offer_logo_loading:false,
            type:'',
            id:'',
            nonsupport:'image/bmp',
            uploadUrl:cors_config.swfupload.upload_url.uploadLogo
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,UploadFileDirectly
    },
    props:{
        modalState:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
        showAlert:{
            type:Function,
            required: true,
        },
        offer_id:{
            type: [String,Number],
            required: true,
        },
        renderOffer:{
            type: [Boolean,String],
            required: true,
        },
        accept:{
            type: String,
            required: true,
        }
    },
    computed: {
        hideAlertPop() {
          this.alertPop = "hide"
        },
    },
    watch:{
        modalState (val) {
            this.outerVisible = this.modalState
            this.toggleModal(val)
        }
    },
    methods:{
        beforeChange(fileObj){
            let that = this
            this.offer_logo_loading = true
            var nonsupport_type = that.nonsupport;
            var reg_nonsupport = new RegExp(nonsupport_type);
            var is_nonsupport_type = reg_nonsupport.test(fileObj.type)
            if (is_nonsupport_type) {
                that.showAlert('Upload fail：please check upload file Type!')
                return false
            } else {
                return true
            }
        },
        afterChange(){
            this.offer_logo_loading = false
        },
        uploadSuccess: function(file, serverData) {
            console.log('uploadSuccess')
            var json = false;
            var id = this.id
            var that = this

            if (_.isNumber(id)) {
                $('#upload_btn' + id).prev('a').find('img').attr('src', file);
            } else {
                var ids = id.split(',');
                $.each(ids, function(i, n) {
                    $('#upload_btn' + n).prev('a').find('img').attr('src', file);
                })
            }

        },
        upload_logo (id, type) {
            var type = "!product"
            this.id = this.offer_id
            this.type = type
        },
        toggleModal:function(msg) {
            this.upload_logo()
            this.offer_logo_loading = false
            this.msg = ''
        },
    }
}
</script>
<style scope>
    .col-md-2{
        width: 16.666666666666664% !important;
        float: left;
    }
</style>