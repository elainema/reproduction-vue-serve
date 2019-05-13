<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">Update Help Center</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Update Help Center</h2>
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
                <div class="row well" id="searchForm">
                    <div class="col-md-12" role="main">
                        <form class="form-horizontal frm-entity form-inline form-help-center" ref="form" @submit.prevent="getAllArticleList">
                            <div class="form-group-block ">

                            </div>
                            <div class="form-group-block mt15">
                                <div class="col-md-4">
                                    <label for="keyWordsOfPageTitle" class="hide"></label>
                                    <input type="text" name="key" class="form-control col-md-12" id="keyWordsOfPageTitle" placeholder="Keywords of Page Title">
                                </div>
                                <div class="col-md-2 xs-mt10">
                                    <button type="submit" fef-click="resetFormParam" class="col-md-5 btn btn-primary col-md-offset-1">Search</button>
                                    <a href="update_help_center" class="col-md-5 btn btn-default col-md-offset-1">Reset</a>
                                </div>
                                <div class="col-md-6">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="status[]" value="active" id="checkbox_active"></input> Active
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="status[]" value="pending" id="checkbox_pending"></input> Pending
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="status[]" value="deleted" id="checkbox_deleted"></input> Deleted
                                    </label>
                                </div>
                            </div>
                            <div class="form-group-block mt15">
                                <div class="col-md-6">
                                    <router-link to="/edit_help_center" class="col-md-3 btn btn-primary ">Add Page</router-link>
                                    <button type="button" @click="showCatalogModal" class="col-md-3 btn btn-primary col-md-offset-1" >Manage Catalog</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="overflow_scroll">

                <table id="pageTable" class="mt40  table table-bordered table-hover">
                    <thead class="">
                        <tr>
                            <th>Last Update Time</th>
                            <th>Page Title</th>
                            <th>Catalog</th>
                            <th data-nowrap="true">Page View</th>
                            <th>Status</th>
                            <th style="white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in articleList">
                            <td>{{item.update_time}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.category_name}}</td>
                            <td>{{item.hit}}</td>
                            <td>{{item.status}}</td>
                            <td><router-link :to="'/edit_help_center?id=' + item.id + '&source=not_view'">View & Edit</router-link></td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    <catalogModal :modalState="modalState" :hideModal="hideModal" :categories="categories" :onAdd="onAdd" :onRemove="onRemove" :onEdit="onEdit" :categoryState="categoryState"></catalogModal>


</div>
</template>
<script>
import auth from '@/util/auth'
import alert_pop_util from '@/util/alert_pop'
import { mapGetters, mapActions } from 'vuex'
import catalogModal from '@/components/CatalogModal.vue'

import mixin_alert_msg from '@/mixins/alert_msg'
import mixin_modal from '@/mixins/modal'

import Vue from 'vue'

export default {
  data(){
    return {
            loadingZone:"",
            articleList:'',
            categories:"",
            categoryState:{}
        }
    },
    mixins: [mixin_alert_msg, mixin_modal],
    components:{catalogModal},
    computed:{
    },
    watch:{

    },
    methods: {
        getAllArticleList() {
            let that = this
            that.renderData = [];
            that.loadingZone = true
            Vue.http.get('Article/getAllArticleList', {params: $(this.$refs.form).getFormQuery()}).then(response => {
                var data = response.body && response.body.data && response.body.data.list
                this.articleList = data
                that.loadingZone = ""
            }, response => {
                that.loadingZone = ""
                that.showAlert(response.body.msg, 'info')
            })
        },
        setCategoryState(data) {
          let arr = _.map(data,"id");
          let obj = {}
          _.each(arr, function(val) {
            obj[val] = "read"
          })
          this.categoryState = obj
        },
        getCategoryList() {
            Vue.http.get('Article/getCategoryList').then(response => {
                var data = response.body && response.body.data 
                this.setCategoryState(data)
                  
                this.categories = data
            }, response => {
                this.showAlert(response.body.msg, 'info')
            })

        },

        showCatalogModal() {
            this.modalState = "show"
        },
        onAdd(name) {
            Vue.http.post('Article/editCategory', {act:"add", name:name}).then(response => {
                var data = response.body && response.body.data 

                this.getCategoryList()
            }, response => {
                this.showAlert(response.body.msg, 'info')
            })
        },
        onRemove(id) {
            Vue.http.post('Article/editCategory', {act:"delete", id:id}).then(response => {
                var data = response.body && response.body.data 

                this.getCategoryList()
            }, response => {
                this.showAlert(response.body.msg, 'info')
            })
        },
        onEdit(id, name){

            Vue.http.post('Article/editCategory', {act:"edit", id:id, name: name}).then(response => {
                var data = response.body && response.body.data 

                this.getCategoryList()
            }, response => {
                this.showAlert(response.body.msg, 'info')
            })
        }
    },
    created () {
        this.getAllArticleList()
        this.getCategoryList()
    },
}
</script>