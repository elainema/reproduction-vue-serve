
<template>

<div class="box" :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Settings-Yeahmobi</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Access<help-box :content="helpTips.access"></help-box></label>
                <div class="controls col-md-9">

                   <!--  <switch_publisher :switch_disable=true :publisher_param='"affiliate"' :publisher_val="offlineAPIInfo.access" :showAlert='showAlert' :renderPublisher="renderPublisher"  ></switch_publisher> -->
                    <common-switch
                        :disabled=true
                        :showAlert='showAlert'
                        :default_val="offlineAPIInfo.access"
                        :switch_param='"affiliate"'
                        :render="renderPublisher"
                        :switchDefaultAPI="'Publisher/saveProductAccess'"
                    />

                </div>
            </div>
            <div class="control-group form-group">
               <label class="control-label col-md-3">Level<help-box :content="helpTips.level"></help-box></label>
               <div class="controls col-md-9">
                   <a href="#" id="level" data-type="select2"></a>
                    <!-- <editable_select2_publisher  :needConfirmModal=true :id="'level'" :showAlert="showAlert" :source='[{"id":"1","text":"1"},{"id":"2","text":"2"},{"id":"3","text":"3"}]'  :publisher_name="'level'" :publisher_val="offlineAPIInfo.level"  :editable_api="'Affiliate/editLevel'" :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                    <editable-select2-publisher
                        :needConfirmModal=true 
                        :id="'level'" 
                        :showAlert="showAlert" 
                        :source='[{"id":"1","text":"1"},{"id":"2","text":"2"},{"id":"3","text":"3"}]'  
                        :publisher_name="'level'" 
                        :publisher_val="offlineAPIInfo.level"  
                        :editable_api="'Affiliate/editLevel'" 
                        :renderPublisher="renderPublisher">
                    </editable-select2-publisher>

               </div>
           </div>
            <div class="control-group form-group pl5">
                <a class="download" target="_blank" download href="http://uploads.yeahmobi.com/api/Yeahmobi_API_Get_Offer_Information_EN_V2.1.pdf" id="apiDownload">Download API Manual</a>
           </div>
        </div>
    </div>
</div>

</template>
<script>
import publisherAPI from '@/api/publisher'
//import switch_publisher from '@/components/Switch_Publisher.vue'
import EditableSelect2Publisher from '../../components/editable-select2-publisher/'
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
                    access: "Default YES, and cannot be modified. Used for pull offer details in sync api feed. Only manually offers is available in sync api feed.",
                    level: 'Set the level of affiliate, this level will determine affiliate access to offers. From table below to learn more about the detailed mapping table between affiliate level and offer level.</br>' +
                    '<table class="table">' +
                        '<thead>'+
                            '<tr>' +
                                '<th> Offer level</th>' +
                                '<th> Affiliate access</th>' +
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td> Public </td>'+
                                '<td> Available to all publisher levels by default</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td> Public (Require Approval)</td>'+
                                '<td> Available to level3&level2 affiliate by default. level1 affiliate need to answer questions am set as application firstly, and will have the permission to run only after PM approved in Offer Applications page.</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td> Private</td>'+
                                '<td> Available to level3 affiliate by default. For level1&level2 affiliate need to be approved.</td>'+
                            '</tr>'+
                        '</tbody></table>' + 'Notice：Click ‘Download API Manual’ to get the detailed guide about how to do the sync API integration.',
                }
            }
    },
    computed: {
    },
    components:{CommonSwitch, EditableSelect2Publisher,HelpBox},
    methods: {

        getProductInfo(callback){
            let that = this
            publisherAPI.getProductInfo({publisher_id:this.$route.query.id, product:"affiliate"}, function(data){
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
        that.getProductInfo(function(){
            that.renderPublisher = true
        })
    }
}
</script>