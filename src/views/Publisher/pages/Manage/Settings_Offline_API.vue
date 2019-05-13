<template>
<div class="box" :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Settings-Bulk API</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Access<help-box :content="helpTips.add_app"></help-box></label>
                <div class="controls col-md-9">

                    <!-- <switch_publisher :publisher_param='"offline_api"' :publisher_val="offlineAPIInfo.access" :showAlert='showAlert' :renderPublisher="renderPublisher" :switchDefaultAPI="'Publisher/saveProductAccess'" :getCustomParam="getCustomParam" :onSuccess="getProductInfo"></switch_publisher> -->
                    <common-switch
                        :showAlert='showAlert'
                        :default_val="offlineAPIInfo.access"
                        :switch_param='"offline_api"'
                        :render="renderPublisher"
                        :switchGetCustomParam="getCustomParam"
                        :switchDefaultAPI="'Publisher/saveProductAccess'" 
                        :onSuccess="getProductInfo">
                    </common-switch>

                </div>
            </div>
            <div class="control-group form-group">
               <label class="control-label col-md-3">API Token<help-box :content="helpTips.api_token"></help-box></label>
               <div class="controls col-md-9">
                   <span class="download text" href="#" id="api_token_offline" v-show="offlineAPIInfo.access">{{offlineAPIInfo.token}}</span>
               </div>
           </div>
            <div class="control-group form-group">
                <a class="download" target="_blank" download href="http://uploads.yeahmobi.com/api/Yeahmobi_Bulk_API_V2.0.pdf"  id="apiDownload">Download Bulk API Manual</a>
           </div>
            <div class="control-group form-group">
                <a class="download" target="_blank" download href="http://s3-ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/api/Yeahmobi_Video_API_V1.0%20%282%29%281%29.pdf"  id="videoApiDownload">Download Video API Manual</a>
           </div>
        </div>
    </div>
</div>

</template>
<script>
import publisherAPI from '@/api/publisher'
//import switch_publisher from '@/components/Switch_Publisher.vue'
import HelpBox from '@/components/common/help-box/'

const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
export default {
    data(){
        return {
                loadingZone:"",
                renderPublisher:false,
                offlineAPIInfo:{},
                helpTips:{
                    add_app: 'Record detailed publisher’s app info here when settings-bulk api is YES, app_id will be generated automatically when you submit app info. The app info in publisher system and manage system will be synchronized to each other’s system in a real time.',
                    api_token: 'API token will be generated automatically when access is set to YES. It should be provided to publisher using for authorization in bulk API port. </br>Notice：Click ’Download Bulk API Manual’ and ‘Download Video API Manual’ to download the detailed guide for integration.',

                }
            }
    },
    computed: {
    },
    components:{CommonSwitch,HelpBox},
    methods: {
        getCustomParam(param, value){
            return {
                publisher_id:this.$route.query.id, 
                product:"offline_api",
                type: value ? "approve" : "block"
            }
        },
        getProductInfo(param, value,callback){
            let that = this
            publisherAPI.getProductInfo({publisher_id:this.$route.query.id, product:"offline_api"}, function(data){
              that.offlineAPIInfo = data.data
              $.isFunction(callback) && callback()
            })
        }

    },
    props:{
        showAlert:{}
    },
    mounted() {

    },
    created () {
        let that = this
        that.getProductInfo('','',function(){
            that.renderPublisher = true
        })
    }
}
</script>
