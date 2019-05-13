<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box-content form-horizontal frm-entity frm-detail" id="creative_files">
        <upload-file
            :disabled="!isWriteable"
            :uploadFile="onUpload"
            :btnName="btnName"
            :accept="accept">
        </upload-file>

        <!-- <span class="btn btn-file" :disabled="!isWriteable">
            {{btnName}}<input type="file" data-control-name="bt-button" :class="'btn btn-primary'" name="certificate" ref="btn_upload" accept=".jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.zip,.mp4" v-if="multiple" multiple="multiple">
            <input type="file" :class="'btn btn-primary'" data-control-name="bt-button" name="certificate" ref="btn_upload" accept=".jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.zip,.mp4" v-else>
        </span> -->
        <p class="clearfix">Upload File Type：jpg、jpeg、png、gif、bmp、txt、doc、ppt、pdf、zip</p>
        <div class="overflow_scroll">
            <table class="table table-hover tablesorter table-upload-list">
                <colgroup>
                    <col width="50" />
                    <col width="400" />
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th v-if="isShowBannerButtonPlaceholder">ID</th>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Link</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="creative_files_list">
                    <tr v-if="isShowBannerButtonPlaceholder" v-for="n in files" :id="'file_row_' + n.id">
                        <td>{{ n.id }}</td>
                        <td  v-if="n.type == 'image'" class="tl-center">
                            <img :src="n.file_path" />
                            <div v-if="n.file_path == ''">{{ n.file_name }}</div>
                        </td>
                        <td  v-if="n.type == 'url'" class="tl-center">
                            <img :src="n.file_url" />
                            <div v-if="n.file_url == ''">{{ n.file_name }}</div>
                        </td>
                        <td v-else class="tl-center">
                            <div :class="'creative-file ' + n.file_ext"><i class="icon-file"></i>{{ n.file_name}}</div>
                        </td>
                        <td class="tl-center">{{ humanizeFileSize(n.file_size) }}</td>
                        <td class="tl-center"><a :href="n.file_path" target="_blank">File Link</a></td>
                        <td class="tl-center"><a class="btn del-btn" :data-id="n.id" :data-file="n.file_name" @click.prevent='del_file(n.id,n.file_name,"certificate")'>Delete</a></td>
                    </tr>
                    <tr  v-if="!isShowBannerButtonPlaceholder" v-for="file in files"  :data-path="file.md5path">
                        <td class="tl-center">
                            <div :class="'creative-file ' + file.ext">
                                <span v-if="file.image == ''">
                                    <i class="icon-file"></i>
                                </span>
                                <span v-else><img :src="file.path" /></span>
                            </div>
                        </td>
                        <td class="tl-center">{{ file.name }}</td>
                        <td class="tl-center">{{ file.size }}</td>
                        <td class="tl-center">
                            <a :href="file.path" class="file_link" target="_blank">File Link</a>
                        </td>
                        <td class="tl-center"><a class="btn del-btn btn-default" href="javascript:;" @click.prevent="del_file(file.md5path)">Delete</a></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>
</template>

<script>
import cors_config from '@/util/config'
const UploadFile = () => import(
/* webpackChunkName: "UploadFile" */ '@/components/common/upload-file/');
import Vue from 'vue'
export default {
    props: {
        showAlert:{},
        fileInfo:{default:[]},
        render:{default:false},
        chosenCallback:{type:Function,default:function(){return $.noop}},
        del_file:{},
        upload_files:{},
        onUploadFileChange:{},
        isShowBannerButtonPlaceholder:{default:false},
        btnName:{},
        multiple:{default:""},
        isWriteable:{default:false},
        accept:'.jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.zip,.mp4'
    },
    data(){
        return {
            loadingZone:false,
            offer_id:this.$route.query.id,
            is_writeable:0,
            offer_file_language: '',
            files:[],
            fileList:{},
            cookie_hack:{},
            impression_url: ''
        }
    },
    computed: {
    },
    components:{UploadFile},
    methods: {
        hideAlertPop () {
          this.alertPop = "hide"
        },
        humanizeFileSize(file_size){
            return humanize.filesize(file_size)
        },
        onUpload (fileObj) {
            let file = fileObj
            this.onUploadFileChange(file, 'certificate')
        }
    },
    watch:{
        fileInfo(newVal, oldVal){
            if (newVal) {
                this.files = this.fileInfo
            }
        },
        render(newVal, oldVal){
            if (newVal) {
                let that = this
                if (that.fileInfo) {
                    var data = that.fileInfo;
                    that.files = data
                }
            }
        }
    },
    mounted () {
    }
}
</script>
<style scoped>
#creative_files .swfupload-control {
    left: 300px;
}

.file_upload_tips a {
    color: #08c;
}
p {
    margin-bottom: 10px;
}
.btn-file{
    color: #fff;
    outline: none;
    background-color: #ff8400;
    border-color: #ff8400;
}
#impression_url{
    display: block;
}
</style>
