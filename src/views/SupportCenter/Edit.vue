
<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">Update Support Center</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Titles</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container" id="box_container">
            <div class="box-content">
                <div class="row">
                    <form class="form-horizontal " ref="form" @submit.prevent="editArticle">
                        <div class="form-group">
                            <input type="hidden" name="id" :value="articleDetail.id">
                            <label for="inputEmail3" class="col-md-2 control-label">Page Title<i class="icon-exclamation red"></i>
                            </label>
                            <div class="col-md-6">
                                <input type="text"  maxlength="50" class="form-control" id="" name="title" placeholder="page title" required="" v-model="articleDetail.title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword3" class="col-md-2 control-label">Catalog<i class="icon-exclamation red"></i>
                            </label>
                            <div class="col-md-6">
                                <input type="text" name="catalog_text" class="hidden_text">
                                <select class=" form-control  col-md-8 no-padding" name="category_id" id="catalog" v-model="articleDetail.category_id" data-name="catalog_text">
                                    <option v-for="item in categories" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputPassword3" class="col-md-2 control-label">Status</label>
                            <div class="col-md-6">
                                <select class=" form-control  col-md-8 no-padding" name="status" v-model="articleDetail.status" id="payment">
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="deleted">Deleted</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group form-page-content">
                            <label for="inputPassword3" class="col-md-2 control-label">Page Content<i class="icon-exclamation red"></i></label>
                            <div class="col-md-10">
                                <!-- <span class="btn  btn-file">
                                    <input type="file"  data-control-name="bt-button"  :class="'btn btn-primary'" ref="btn_upload" accept=".jpg,.jpeg,.png,.gif,.bmp" @change="loadImage" > load Image </input>
                                </span> -->
                                <!-- <ckeditor :descriptions="articleDetail.content"  :allowedContent=true  :editor_name="'content'"  :editor_width="'auto'" ></ckeditor> -->
                                <div class="editer-box">
                                    <quill-editor v-model="articleDetail.content"
                                                ref="myQuillEditor">
                                    </quill-editor>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-6">
                                <button type="submit" class="btn btn-primary col-md-2">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <form class="hide" ref="upload_form" >
        <input type="hidden" name="Filename" :value="upload_file_name">
        <input type="hidden" name="PHPSESSID" :value="cookieHash.PHPSESSID">
        <input name="upload" type="file" />
    </form>

</div>
</template>
<script>
import auth from '@/util/auth'
import { mapGetters } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import mixin_alert_msg from '@/mixins/alert_msg'

import Vue from 'vue'
// const ckeditor = () => import(
//  '@/components/Ckeditor.vue'
// );
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import cors_config from '@/util/config'

export default {
  data(){
    return {
            loadingZone:"",
            upload_file_name:"",
            categories:[],
            articleDetail:{}
        }
    },
    mixins: [mixin_alert_msg],
    components:{AlertPop, quillEditor},
    computed:{
        ...mapGetters({
          cookieHash:"cookieHash",
        })
    },
    watch:{

    },
    methods: {
        getCategoryList() {
            Vue.http.get('ArticlePublisher/getCategoryList').then(response => {
                var data = response.body && response.body.data 
                this.categories = data
            }, response => {
                that.showAlert(response.body.msg, 'info')
            })

        },
        getArticleDetail(){
            Vue.http.get('ArticlePublisher/getArticleDetail', {params:{id: this.$route.query.id, source:"not_view"}}).then(response => {
                var data = response.body && response.body.data 
                this.articleDetail = data
            }, response => {
                that.showAlert(response.body.msg, 'info')
            })
        },
        uploadFile(callback){
            var that = this;
            that.loadingZone = true
            this.$http.post(cors_config.swfupload.upload_url.simpleUploadFile, $(this.$refs.upload_form).getFormData()).then(response => {
                callback(response.body.data)
                this.loadingZone = false
            }, response => {
                this.loadingZone = false
                that.showAlert(response.body.msg, "error")
            })
        },

        loadImage($event) {
            let $file = $($event.target).clone()
            $file.attr("name","upload")
            $('[name="upload"]').replaceWith($file)

            this.upload_file_name = $event.target.files[0].name
            this.$nextTick(function(){
                this.uploadFile(function(file){
                    let data = window.editor.getData()
                    data += "<img src='" + file + "'>"
                    setTimeout(function(){
                        window.editor && window.editor.setData(data)
                    },1000)
                })
            })
        },
        editArticle() {
            let that = this
            that.loadingZone = true
            let options = $(this.$refs.form).getFormQuery()
            options.content = this.$refs.myQuillEditor.value
            this.$http.post('ArticlePublisher/editArticle', options).then(response => {
                this.loadingZone = false
                that.showAlert("success!","success")
                setTimeout(function(){
                    that.$router.push("./update_support_center")
                },2000)
            }, response => {
                this.loadingZone = false
                that.showAlert(response.body.msg, "error")
            })
        }
    },
    created () {
        this.getCategoryList()
        if(this.$route.query.id) {
            this.getArticleDetail()
        }
    },
}
</script>

<style scoped="">
.btn-file{
    background-color: #ff8400;
    border-color: #ff8400;
    color: #fff;
    outline: none;
}
.editer-box {
    height: 600px
 }
.quill-editor{
    height: 510px;
}
</style>