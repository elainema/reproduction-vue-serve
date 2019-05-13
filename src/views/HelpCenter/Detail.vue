<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">Help Center</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="box">
        <div class="box-header">
            <h2>Help Center</h2>
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
                    <div class="col-md-3" role="complementary">
                        <nav class="bs-docs-sidebar affix" id="myAffix" >
                            <ul class="nav bs-docs-sidenav">
                                <li class="menu" @click="activeCatalog=item.name"  :class="activeCatalog === item.name ? 'active' : ''" v-for="item in articleList"> <a href="javascript:;"><i class="icon-plus fa fa-plus"></i><i class="icon-minus"></i>{{item.name}}</a>
                                    <ul class="nav">
                                        <li v-for="single_item in item.article"  class="article_item" @click="activeArticleId=single_item.id" :class="activeArticleId === single_item.id ? 'active' : ''">
                                        <router-link class="" :to="'?id=' + single_item.id " :title="single_item.title"><i class="icon-hand-right"></i>{{single_item.title}}</router-link></li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-md-9" role="main">
                        <div class="article">
                        <iframe src="" id="articleIframe" frameborder='0' scrolling="no"  style="width:100%"onload="this.style.height=this.contentDocument.body.scrollHeight +'px';"></iframe>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>



</div>
</template>
<script>
import auth from '@/util/auth'
import { mapGetters, mapActions } from 'vuex'
import mixin_alert_msg from '@/mixins/alert_msg'

import Vue from 'vue'

const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

let EventProxy = require('eventproxy');
let ep = new EventProxy()

export default {
  data(){
    return {
            loadingZone:"",
            articleList:"",
            activeCatalog:"",
            articleDetail:""

        }
    },
    mixins: [mixin_alert_msg],
    components:{AlertPop},
    computed:{
    },
    watch:{
        "$route": function(newVal, oldVal){
            this.uniformRouteQuery()


        }
    },
    methods: {
        getActiveArticleList(cb){
            Vue.http.get('Article/getActiveArticleList').then(response => {
                var data = response.body && response.body.data 
                cb && cb(data)
                ep.emit("articleList", data)
            }, response => {
                ep.emit("articleList", [])
                this.showAlert(response.body.msg, 'info')
            })
        },
        getArticleDetail() {
            Vue.http.get('Article/getArticleDetail', {params:{id: this.$route.query.id}}).then(response => {
                var data = response.body && response.body.data 

                ep.emit("articleDetail", data)
            }, response => {
                ep.emit("articleDetail", {})
                this.showAlert(response.body.msg, 'info')
            })
        },
        getCategoryList() {
            Vue.http.get('Article/getCategoryList').then(response => {
                var data = response.body && response.body.data 
                ep.emit("categories", data)
            }, response => {
                ep.emit("categories", [])
                //this.showAlert(response.body.msg, 'info')
            })

        },
        beautify: function(content) {
            var $div = $("<div>" + content + "</div>")

            $div.find("img").css("max-width", "900px").css("max-height", "900px").attr("data-action", "zoom")
            $div.find("img").parent("a").attr("target", "_blank")
            $div.find("img").load(function(e) {
                console.log(e.target.src)
            })




            return $div.html();
        },
        cleanStyleContent: function(content) {
            content = (content || '')
                .replace(/width/ig, 'data-width')
            return content
        },
        cleanContent: function(content) {
            content = (content || '')
                .replace(/<!--.*?-->|&lt;!--.*?--&gt;/g, '')
                .replace(/\uF0A7|\uF020/g, '') //pdf 粘贴过来的非法字符
                .replace(/\uFEFF|\u200B/g, '') //ueditor 使用的空白字符
                .replace(/<\/?wbr[^>]*>|<\/?o:p[^>]*>|<\/?font[^>]*>|<\/?st1:[^>]*>|<\/?i(?!m)[^>]*>/gi, '') //删除不支持的标签
                .replace(/<style[^>]*>[\s\S]*?<\/style>|&lt;style.*?&gt;[\s\S]*?&lt;\/style&gt;/gi, '') //删除style标签
                .replace(/<script[^>]*>[\s\S]*?<\/script>|&lt;script.*?&gt;[\s\S]*?&lt;\/script&gt;/gi, '') //删除script标签
                .replace(/\n/g, '\r')
                .replace(/<\/tr*>/ig, '<\/tr>\n')
                .replace(/<br[^>]*>/ig, '\n')
                .replace(/([\u0020\u00a0\t\r]|&nbsp;)*<p[^>]*>|\r/gi, '')
                .replace(/^[\s\u00a0]+|([\s\u00a0]|&nbsp;)+$/gi, '')
                .replace(/([\u0020\u00a0]|&nbsp;)+(?=\n)/gi, '')

            return content
        },

        startRender(){
            this.activeArticleId = this.$route.query.id
            this.loadingZone = true
            let that = this
            ep.all("categories","articleList","articleDetail", function(categories, articleList, articleDetail){
                that.articleList = articleList
                let  _content = articleDetail.content
                try{
                    _content = that.beautify(_content)
                    _content = that.cleanStyleContent(_content)
                }catch(e){}

                $("#articleIframe").attr({ srcdoc: _content });
                that.categories = categories
                that.activeCatalog = (_.find(categories,{id:articleDetail.category_id}) || {} ).name
                that.articleDetail = articleDetail
                that.loadingZone = ""

            })
            this.getArticleDetail();
            this.getActiveArticleList()
            this.getCategoryList()
        },
        uniformRouteQuery() {
            if(this.$route.query.id){
                this.startRender()
            }else{
                let that = this
                this.getActiveArticleList(function(articleList){
                    if(_.isEmpty(articleList)) return
                    that.$router.push("./help_center_detail?id=" + articleList[0].article[0].id)
                })
            }

        }

    },
    created () {
        this.uniformRouteQuery()        
    },
}
</script>

<style scoped="">
.box-content {
    padding: 40px;
    font-family: "Proxima Nova Regular", "Segoe UI", Roboto, "Droid Sans", "Helvetica Neue", Arial, sans-serif;
}
.affix {
    position: static;
}
.affix.stickey {
    position: fixed;
    top: 75px;
    width: 282px;
}
.affix.stickey .back-to-top {
    visibility: visible;
    opacity: 1;
}
.affix.stickey .bs-docs-sidenav {
    max-height: 500px;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
}
[role="main"] {
    min-height: 300px;
    font-size: 13px;
    padding-left: 20px;
    border-left: 1px dashed #E2DEDE;
}
[role="main"].noStyle {
    border-left: none;
}
.box {
    background: #fff;
}
.nav>li {
    position: relative;
    display: block;
}
.bs-docs-sidebar .nav>li>a {
    display: block;
    padding: 6px 20px 6px 14px;
    font-size: 16px;
    line-height: 22px;
    color: #767676;
    word-break: break-all;
    border-left: 2px solid transparent;
    transition: color .3s, background-color .3s;
}
.bs-docs-sidebar .nav>li>a:focus{
    background-color: #fff;
}
.bs-docs-sidebar .nav .nav {
    display: none;
    padding-bottom: 10px;
}
.bs-docs-sidebar .nav .nav>li>a {
    padding: 3px 0 3px 30px;
    font-size: 13px;
    line-height: 22px;
}
.nav li li .icon-hand-right {
    display: none;
    position: absolute;
    top: 8px;
    left: 12px;
}
.nav li li.active .icon-hand-right {
    display: block !important;
}
.nav li .icon-minus, .nav li .icon-plus {
    position: absolute;
    color: #333;
    font-size: 10px;
    left: -2px;
    top: 12px;
}
.nav li .icon-minus, .nav li.active .icon-plus {
    display: none;
}
.nav li .icon-plus, .nav li.active .icon-minus {
    display: block;
}
.bs-docs-sidebar .nav>.active:focus>a, .bs-docs-sidebar .nav>.active:hover>a, .bs-docs-sidebar .nav>.active>a {
    color: #563d7c;
    background-color: transparent;
    font-weight: bold;
}
.bs-docs-sidebar .nav li li.active:focus>a, .bs-docs-sidebar .nav li li.active:hover>a, .bs-docs-sidebar .nav li li.active>a {
    border-left: 2px solid transparent;
}
.bs-docs-sidebar .nav .nav>.active:focus>a, .bs-docs-sidebar .nav .nav>.active:hover>a, .bs-docs-sidebar .nav .nav>.active>a {} .bs-docs-sidebar .nav>.active>ul {
    display: block !important;
}
.summary_info {
    list-style-type: none;
    padding: 0;
    font-size: 13px;
    color: #999;
}
.article .title {
    font-size: 22px;
    margin: 10px 0;
    color: #000
}
.summary_info .icon {
    color: #E5867D;
}
.content {
    margin: 20px 0;
    font-size: 16px;
    min-height: 1000px;
    word-wrap: break-word;
}
.back-to-top {
    visibility: hidden;
    display: block;
    opacity: 0;
    transition: opacity 0.3s linear;
    padding: 4px 10px;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #bbb;
}
.menu {
    margin: 2px 0;
    border-bottom: 1px dashed #E2DEDE;
}
.menu:last-child {
    border-bottom: none;
}
.menu .nav a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: 280px;
    word-break: break-all;
}

</style>