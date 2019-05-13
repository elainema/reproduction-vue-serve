<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box-content form-horizontal frm-entity frm-detail" id="creative_files" ref="creative_files">
        <select name="files_lang" data-control-name="bt-select"  style="width: 250px;" ref="files_lang" class="files_lang" v-model="offer_file_language">
            <option value="">Please select file language code</option>
            <option value="ar">Arabic</option>
            <option value="zh">Chinese</option>
            <option value="nl">Dutch</option>
            <option value="en">English </option>
            <option value="fr">French </option>
            <option value="de">German </option>
            <option value="el">Greek </option>
            <option value="he">Hebrew </option>
            <option value="hi">Hindi </option>
            <option value="in">Indonesian </option>
            <option value="it">Italian </option>
            <option value="ms">Malay</option>
            <option value="jp">Japanese </option>
            <option value="kr">Korean </option>
            <option value="pl">Polish </option>
            <option value="pt">Portuguese </option>
            <option value="ru">Russian </option>
            <option value="es">Spanish </option>
            <option value="th">Thai </option>
            <option value="tr">Turkish </option>
            <option value="tl">Tagalog </option>
            <option value="vi">Vietnamese </option>
        </select>
        <upload-file
            :disabled="offer_file_language == ''"
            :multiple="multiple"
            :uploadFile="onUpload"
            :btnName="btnName"
            :accept="accept">
        </upload-file>
        <span class="btn" :disabled="offer_file_language == ''" v-if="$route.query.id">
            <input type="button" data-control-name="bt-button" :disabled="offer_file_language==''" class="btn" ref="url_upload" value="Impression Url" id="impression_url"  @click.prevent="toggleImgPixel" />
        </span>
        <div class="control-group form-group hide-normal" id="url_container">
            <div class=" col-md-5  nopadding">
                <input type="text" class="span6" name="impre_url" value="impression_url" v-model="impression_url" placeholder="Please input url"/>
            </div>
            <div class="controls col-md-1 nomargin">
                <input type="button" id="btnSave" class="btn btn-primary btn-dytheme" @click="subUrl" value="Save Url" />
            </div>
        </div>
        <p class="clearfix">Upload File Type：jpg、jpeg、png、gif、bmp、txt、doc、ppt、pdf、zip、mp4</p>
        <p class="file_upload_tips">For mp4 file: Artificial upload material requirements must be a MP4 video transcoding is 360 p resolution, including video decoding of h. 264 format.Specific tools can use the handbrake (<a href="https://handbrake.fr/downloads.php" >https://handbrake.fr/downloads.php</a>), the transcoding operation see: <a href="https://a-support.applovin.com/hc/en-us/articles/228047047-VIDEO-How-to-Format-Videos" title="">https://a-support.applovin.com/hc/en-us/articles/228047047-VIDEO-How-to-Format-Videos</a></p>
        <div class="overflow_scroll">
            <table class="table table-hover tablesorter table-upload-list">
                <colgroup>
                    <col width="50" />
                    <col width="400" />
                    <col width="150" />
                    <col width="150" />
                    <col width="400" />
                    <col width="150" />
                </colgroup>
                <thead>
                    <tr>
                        <th v-if="isShowBannerButtonPlaceholder">ID</th>
                        <th>Preview</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Link</th>
                        <th>Language</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="creative_files_list">
                    <template v-if="isShowBannerButtonPlaceholder">
                        <tr v-for="n in files" :id="'file_row_' + n.id">
                            <td>{{ n.id }}</td>
                            <td class="tl-center">
                                <img :src="n.file_path"  v-if="n.type == 'image'"/>
                            </td>
                            <td class="tl-center">
                                <template v-if="n.type == 'url'">
                                    <img :src="n.file_url" />
                                    <div v-if="n.file_url == ''">{{ n.file_name }}</div> 
                                </template>
                                <template v-else>
                                    <div :class="'creative-file ' + n.file_ext">{{ n.file_name}}</div>
                                </template>
                            </td>
                            <td class="tl-center">{{ humanizeFileSize(n.file_size) }}</td>
                            <td class="tl-center"><a :href="n.file_path" target="_blank">File Link</a></td>
                            <td class="tl-center">{{ n.language }}</a></td>
                            <td class="tl-center"><a class="btn del-btn" :data-id="n.id" :data-file="n.file_name" @click.prevent='del_file(n.id,n.file_name)'>Delete</a></td>
                        </tr>
                    </template>
                    <template v-if="!isShowBannerButtonPlaceholder">
                        <tr v-for="file in files"  :data-path="file.md5path">
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
                            <td class="tl-center"> {{ file.language }}</td>
                            <td class="tl-center"><a class="btn del-btn btn-default" href="javascript:;" @click.prevent="del_file(file.md5path)">Delete</a></td>
                        </tr>
                    </template>
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
        accept:'.jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.zip,.mp4',
        setOfferEditAuth:{
            type:Function,
            required:false,
        }
    },
    data(){
        return {
            loadingZone:false,
            offer_id:this.$route.query.id,
            is_writeable:0,
            offer_file_language: '',
            fileList:{},
            impression_url: ''
        }
    },
    computed: {
        files: {
            get: function () {
                return this.fileInfo || []
            },
            set: function () {
            }
        },
    },
    components:{UploadFile},
    methods: {
        hideAlertPop () {
          this.alertPop = "hide"
        },
        humanizeFileSize(file_size){
            return humanize.filesize(file_size)
        },
        toggleImgPixel() {
            $('#url_container').slideToggle(0, function() {
                $(this).find('input').select();
            });
        },
        checkUrl(str) {
            var RegUrl = new RegExp();
            RegUrl.compile("[a-zA-z]+://[^\s]*");
            if (!RegUrl.test(str)) {
                return false;
            }
            return true;
        },
        subUrl(){
            let inputUrl = $('input[name=impre_url]').val();
            if (!this.checkUrl(inputUrl)){
                this.showAlert('URL format error!', 'info');
                return false;
            }
            $('#btnSave').attr('disabled',"true")
            Vue.http.post('Offer2/image', {offer_id:this.$route.query.id, img_url: this.impression_url,language:this.offer_file_language}).then(response => {
                $('#btnSave').removeAttr("disabled")
                this.showAlert('Success!', 'success');
            }, response => {
                this.showAlert(response.body.msg);
                $('#btnSave').removeAttr("disabled")
            })
        },
        onUpload (fileObj) {
            let file = fileObj
            this.onUploadFileChange(file)
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
        },
        offer_file_language(newVal, oldVal) {
            let $btn_upload = $(this.$refs.btn_upload)
            if (newVal) {
                $btn_upload.prop("disabled",false)
            }
        }
    },
    mounted () {
        let that = this
        $(that.$refs.files_lang)
            .chosen({
                width: '250px'
            })
            .on('change', function(e) {
                var _this = $(this)
                var v = e.target.value,
                    text = $(e.target).find("option:selected").attr("data-name")
                if (!_this.val()) {
                    $('#url_container').hide();
                    that.offer_file_language = '';
                    return
                } else {
                    that.offer_file_language = _this.val();
                }
                that.chosenCallback && that.chosenCallback(v,text)
            }).trigger('chosen:updated');
        this.setOfferEditAuth && this.setOfferEditAuth(this.$refs.creative_files)
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
    background-color: #ff8400;
    border-color: #ff8400;
    color: #fff;
    outline: none;
}
#impression_url{
    display: block;
}
</style>
