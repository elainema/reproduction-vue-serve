<template>
<div :calss="ajax_loading ? ' ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li><router-link to="p_offer_category">Categories</router-link></li>
            <li class="active">Manage Categories</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="box">
        <div class="box-header">
            <h2>Manage Categories</h2>
            <div class="box-action" v-box-action-full-small>
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <table class="table table-hover tablesorter" id="offer_cat_list">
                    <colgroup>
                        <!-- <col width="25" /> -->
                        <col width="50" />
                        <col width="300" />
                        <col width="80" />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Offers</th>
                        </tr>
                    </thead>
                    <tbody id="cp_list">
                        <tr v-for="i in renderData">
                            <td> {{ i.id }}</td>
                            <td><a :href="'p_manage_category?id='+ i.id">{{ i.category }}</a></td>
                            <td> {{ i.offers }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn-group" id="pager"></div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
 </div>


</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false,
            renderData:[],
        }
    },
    components: {AlertPop},
    mixins: [mixin_alert_msg],
    methods:{
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        list_categories() {
            let that = this
            Vue.http.get('Category/getAllList').then(response => {
                that.renderData = response && response.body && response.body.data && response.body.data.list
                that.ajax_loading = false
            }, response => {
                that.showAlert(response && response.data && response.data.msg)
                that.ajax_loading = false
            })
        },
    },
    mounted() {
        this.list_categories()
    }

}
</script>