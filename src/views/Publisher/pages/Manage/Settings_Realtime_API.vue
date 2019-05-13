<template>
<div class="box" :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Settings-Realtime API</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Access</label>
                <div class="controls col-md-9">

                    <!-- <switch_publisher :publisher_param='"realtime_api"' :publisher_val="offlineAPIInfo.access" :showAlert='showAlert' :renderPublisher="renderPublisher" :switchDefaultAPI="'Publisher/saveProductAccess'" :getCustomParam="getCustomParam" :onSuccess="getProductInfo"></switch_publisher> -->
                    <common-switch
                        :showAlert='showAlert'
                        :default_val="offlineAPIInfo.access"
                        :switch_param='"realtime_api"'
                        :render="renderPublisher"
                        :switchGetCustomParam="getCustomParam"
                        :switchDefaultAPI="'Publisher/saveProductAccess'" 
                        :onSuccess="getProductInfo"
                    />

                </div>
            </div>
            <div class="control-group form-group">
               <label class="control-label col-md-3">API Token</label>
               <div class="controls col-md-9">
                   <span class="download text" href="#" id="api_token_offline" v-show="offlineAPIInfo.access">{{offlineAPIInfo.token}}</span>
               </div>
           </div>
            <div class="control-group form-group">
                <a class="download" target="_blank" download href="http://uploads.yeahmobi.com/api/UserGuide_YeahMobi_Realtime_API_EN_1.7.5.pdf"  id="apiDownload">Download Realtime API Manual</a>
           </div>
        </div>
    </div>
</div>

</template>
<script>
import publisherAPI from '@/api/publisher'
//import switch_publisher from '@/components/Switch_Publisher.vue'
const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
export default {
    data(){
        return {
                loadingZone:"",
                renderPublisher:false,
                offlineAPIInfo:{}
            }
    },
    computed: {
    },
    components:{CommonSwitch},
    methods: {
        getCustomParam(param, value){
            return {
                publisher_id:this.$route.query.id, 
                product:"realtime_api",
                type: value ? "approve" : "block"
            }
        },
        getProductInfo(param,value,callback){
            let that = this
            publisherAPI.getProductInfo({publisher_id:this.$route.query.id, product:"realtime_api"}, function(data){
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
