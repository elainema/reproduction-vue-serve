<template>
<div v-yeah-loading='loadingZone'>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Certificate</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container" ref="certificate_wrapper">
            <div class="box-content">
                <certificate :fileInfo="fileInfo" :onUploadFileChange="onUploadFileChange" :isWriteable="isWriteable"  :del_file="del_file" :isShowBannerButtonPlaceholder="true" :renderOffer="renderOffer" :multiple="true" :btnName="'Upload Certificate'" ></certificate>
                <!-- <files :fileInfo="fileInfo" :onUploadFileChange="onUploadFileChange" :isWriteable="isWriteable"  :del_file="del_file" :isShowBannerButtonPlaceholder="true" :renderOffer="renderOffer" :multiple="true" :btnName="'Upload Certificate'" ></files> -->
            </div>
        </div>
    </div>

    <form class="hide" ref="upload_form" >
        <input type="hidden" name="Filename" :value="upload_file.name">
        <input type="hidden" name="offer_id" :value="offer_id">
        <input type="hidden" name="PHPSESSID" :value="cookieHash.PHPSESSID">
        <input name="upload" type="file"/>
    </form>
    <!-- <confirmWnd :modalState="confirmModalState" :hideModal="hideModal" :modalBody="modalBody" :onConfirm="confirmDelete"></confirmWnd> -->
    <modal 
      :dialogVisible.sync="confirmModalState"
      :title="'Confirmation'"
      :onConfirm="confirmDelete"
      :dialogBody="modalBody"
      :confirmText="'OK'">
    </modal>
</div>
</template>

<script>
import cors_config from '@/util/config'
import Certificate from '../../components/certificate/'
/*const confirmWnd = () => import(
 webpackChunkName: "confirmWnd"  '@/components/ConfirmWnd.vue');*/
const Modal = () => import( /* webpackChunkName: "Modal" */ '@/components/common/modal/');

import { mapGetters } from 'vuex'

export default{
    data() {
        return {
            offer_id:this.$route.query.id,
            fileInfo:[],
            loadingZone:false,
            confirmModalState:'hide',
            modalBody:'',
            file_id:'',
            upload_file:"",
            file_name:'',
            isWriteable: 0
        }
    },
    computed:{
        ...mapGetters({
          cookieHash:"cookieHash",
        })
    },
    components:{
        Certificate,
        Modal
    },
    props:['showAlert', 'renderOffer','setOfferEditAuth'],
    watch:{
        renderOffer(newVal, oldVal){
            if(newVal){
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.certificate_wrapper)
                })
            }
        },
    },
    methods:{
        renderCallback(swfu) {
            this.swfu = swfu
        },
        hideModal () {
            this.confirmModalState = "hide"
        },
        onUploadFileChange(file, $file){
            this.upload_file = file
            this.uploadFile(file)
        },
        uploadFile(file){
            var that = this;
            that.loadingZone = true
            var formData = new FormData()
            formData.append('Filename',file.name)
            formData.append('offer_id',this.offer_id)
            formData.append('PHPSESSID',this.cookieHash.PHPSESSID)
            formData.append('upload',file)
            //$(this.$refs.upload_form).getFormData()
            this.$http.post(cors_config.swfupload.upload_url.uploadCertificate, formData).then(response => {
                var data = response.body.data
                this.loadingZone = false
                data.file_path = 'http://uploads.yeahmobi.com/' + data.file_path
                this.fileInfo.push(data)
                if(!data){
                    that.showAlert(response.body.msg, "info")
                    return;
                }
            }, response => {
                this.loadingZone = false
                that.showAlert(response.body.msg, "error")
            })
        },
        del_file(file_id,file_name) {
            this.loadingZone = false
            var that = this
            that.confirmModalState = 'show'
            that.file_id = file_id
            that.file_name = file_name
            that.modalBody = '<p>Confirm delete <strong>' + that.file_name + '</strong>?</p>'
        },
        confirmDelete(){
            var that = this;
            var oldFiles = that.fileInfo
            that.$http.get('Offer2/deleteCertificateById?ids=' + that.file_id).then(response => {
                var data = response.body.data
                if(!data){
                    that.showAlert(response.body.msg, "info")
                    return;
                }
            }, response => {
                that.showAlert(response.body.msg, "error")
            })
            that.confirmModalState = 'hide'
            that.fileInfo = _.remove(oldFiles, function(n) {
                return n.id != that.file_id;
            });
            that.hideModal()
        },
        getCertificateInfoByOfferId() {
            var that = this;
            that.fileInfo = [];
            that.$http.get('Offer2/getCertificateInfoByOfferId?offer_id=' + that.offer_id).then(response => {
                // get body data
                var data = response.body && response.body.data
                if(!data){
                    that.showAlert(response.body.msg, "info")
                    return;
                }
                that.fileInfo = data && data.list
                that.isWriteable = data.is_writeable ? true : false
                that.render = true;
            }, response => {
                //that.showAlert(response.body.msg, "error")
            })
        }
    },
    created () {
        this.getCertificateInfoByOfferId();
    },
    mounted() {
    }

}
</script>