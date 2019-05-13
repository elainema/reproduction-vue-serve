<template>
<div class="uploadDirectly">
    <upload-file
        :uploadFile="uploadFile"
        :btnName="btnName"
        :accept="accept">
    </upload-file>
    <form class="hide" ref="upload_form" >
        <input type="hidden" name="offer_id" v-model="offer_id" v-if="offer_id">
        <input type="hidden" name="PHPSESSID" v-model="cookieHash.PHPSESSID">
    </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import cors_config from '@/util/config'
const UploadFile = () => import(
/* webpackChunkName: "UploadFile" */ '@/components/common/upload-file/');
export default{
    data() {
        return {
        }
    },
    components:{UploadFile},
    props:{
        disabled:{
            type:Boolean,
            required: false,
            default:false
        },
        btnName:{
            type:String,
            required: false,
            default:'Upload'
        },
        showAlert:{
            type:Function,
            required:true
        },
        offer_id:{
            type:[String,Number],
            required:true
        },
        uploadSuccess:{
            type:Function,
            required:true
        },
        beforeChange:{
            type:Function,
            required:true
        },
        afterChange:{
            type:Function,
            required:true
        },
        uploadUrl:{
            type:String,
            required:false,
            default:cors_config.swfupload.upload_url.uploadLogo
        },
        nonsupport:{
            type:String,
            required: false,
            default:''
        },
        accept:{
            type:String,
            required: false,
            default:'.jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.rar,.zip,.mp4'
        }
    },
    computed: {
        ...mapGetters({
          cookieHash:"cookieHash",
        }),
    },
    methods:{
        uploadFile(fileObj){
            var that = this;
            let url = that.uploadUrl
            let Filename = fileObj.name
            let formData = $(this.$refs.upload_form).getFormData()
            formData.append("Filename", Filename);
            formData.append("upload", fileObj);

            let is_accept = this.beforeChange(fileObj)
            if (is_accept) {
                that.$http.post(url, formData).then(response => {
                    var data = response.body.data
                    if(!data){
                        that.showAlert(response.body.msg, "info")
                        return;
                    }
                    var data = response.body.data
                    that.uploadSuccess(data)
                    that.afterChange()
                }, response => {
                    that.afterChange()
                    that.showAlert(response.body.msg, "error")
                })
            }
        },
    }

}
</script>
<style>
.uploadDirectly .el-button--primary{
    color: #333 !important;
    background-color: #fff !important;
    border-color: #ccc !important;
}
</style>