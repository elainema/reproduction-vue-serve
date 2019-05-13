<template>
<div v-yeah-loading='loadingZone'>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Creative Files</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container" ref="creative_files_wrapper">
            <div class="box-content">
               <!--  <files :showAlert="showAlert" :fileInfo="fileInfo" :onUploadFileChange="onUploadFileChange"  :del_file="del_file" :isShowBannerButtonPlaceholder="true" :renderCallback="renderCallback" :multiple="true" :renderOffer="renderOffer" :chosenCallback="chosenCallback" :btnName="'Upload New'" ></files> -->
                <creative-files
                    :setOfferEditAuth="setOfferEditAuth"
                    :showAlert="showAlert" 
                    :fileInfo="fileInfo" 
                    :onUploadFileChange="uploadFile"  
                    :del_file="del_file" 
                    :isShowBannerButtonPlaceholder="true" 
                    :renderCallback="renderCallback" 
                    :multiple="true" 
                    :renderOffer="renderOffer" 
                    :chosenCallback="chosenCallback" 
                    :btnName="'Upload New'"
                ></creative-files>
            </div>
        </div>
    </div>

    <form class="hide" ref="upload_form" >
        <input type="hidden" name="Filename" :value="upload_file.name">
        <input type="hidden" name="offer_id" :value="offer_id">
        <input type="hidden" name="language" :value="offer_file_language">
        <input type="hidden" name="PHPSESSID" :value="cookieHash.PHPSESSID">
    </form>

    <!-- <confirmWnd :modalState="confirmModalState" :hideModal="hideModal" :modalBody="modalBody" :onConfirm="confirmDelete"></confirmWnd> -->
    <modal 
        :dialogVisible.sync="confirmModalState"
        :title="'Confirmation'"
        :confirmText="'OK'"
        :cancelText="'Cancel'"
        :onConfirm="confirmDelete"
        :cancelOnLeft="true"
        :dialogBody="modalBody">
    </modal>
</div>
</template>

<script>
import cors_config from '@/util/config'
//import files from '@/components/File.vue'

const CreativeFiles = () => import(
/* webpackChunkName: "CreativeFiles" */ '../../components/creative-files/');

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');


import { mapGetters } from 'vuex'

export default{
    data() {
        return {
            offer_id:this.$route.query.id,
            offer_file_language:'',
            fileInfo:[],
            loadingZone:false,
            confirmModalState:'hide',
            modalBody:'',
            file_id:'',
            upload_file:"",
            file_name:'',
            file_list:[]
        }
    },
    computed:{
        ...mapGetters({
          cookieHash:"cookieHash",
        })
    },
    components:{CreativeFiles,Modal},
    props:['showAlert', 'renderOffer','setOfferEditAuth'],
    watch:{
        renderOffer(newVal, oldVal){
            if(newVal){
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.certificate_wrapper)
                })
            }
        }
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
            /*let _file = $file.clone()
            _file.attr("name","upload")
            $('[name="upload"]').replaceWith(_file)
            this.$nextTick(function(){
                this.uploadFile()
            })*/
            this.uploadFile(file)
        },
        uploadFile(file){
            var that = this;
            that.loadingZone = true
            var formData = new FormData()
            formData.append('Filename',file.name)
            formData.append('offer_id',this.offer_id)
            formData.append('language',this.offer_file_language)
            formData.append('PHPSESSID',this.cookieHash.PHPSESSID)
            formData.append('upload',file)
            //$(this.$refs.upload_form).getFormData()
            this.$http.post(cors_config.swfupload.upload_url.uploadFile, formData).then(response => {
                var data = response.body.data
                this.loadingZone = false
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
            that.$http.get('Offer2/deleteFileById?ids=' + that.file_id).then(response => {
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
        },
        getFileInfoByOfferId() {
            var that = this;
            that.fileInfo = [];
            that.$http.get('Offer2/getFileInfoByOfferId?offer_id=' + that.offer_id).then(response => {
                // get body data
                var data = response.body && response.body.data
                if(!data){
                    that.showAlert(response.body.msg, "info")
                    return;
                }
                that.fileInfo = data && data.list
                that.render = true;
            }, response => {
                that.showAlert(response.body.msg, "error")
            })
        },
        chosenCallback(v, text) {
            this.offer_file_language = v;
        }
    },
    created () {
        this.getFileInfoByOfferId();
    },
    mounted() {
        this.setOfferEditAuth(this.$refs.creative_files_wrapper)
    }

}
</script>