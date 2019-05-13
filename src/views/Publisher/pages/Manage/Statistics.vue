<template>
<div class="box" :class="ajax_loading ? 'ajax_loading' : '' ">
    <div class="box-header" @click="getStatistic">
        <h2>Statistics</h2>
        <div class="box-action">
            <i class="icon-chevron-down" title="Unfold"></i>
            <i class="icon-chevron-up hide" title="Fold"></i>
        </div>
    </div>
    <div class="box-container " v-show="renderPublisher">  <!-- 默认隐藏 -->
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Offer Applications</label>
                <div class="controls col-md-9">
                    <p  id="offer_application">{{statistics.offer_application}}</p>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Total Payout</label>
                <div class="controls col-md-9">
                    <p  id="cost">{{statistics.cost}}</p>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Total Clicks</label>
                <div class="controls col-md-9">
                    <p  id="click">{{statistics.click}}</p>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Total Conversions</label>
                <div class="controls col-md-9">
                    <p  id="conversion">{{statistics.conversion}}</p>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Average CR</label>
                <div class="controls col-md-9">
                    <p  id="cr">{{statistics.cr}}</p>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Average EPC</label>
                <div class="controls col-md-9">
                    <p  id="epc">{{statistics.epc}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import publisherAPI from '@/api/publisher'

export default {
    data(){
        return {
                statistics:{},
                renderPublisher:false,
                ajax_loading:false
            }
    },
    computed: {
    },
    methods: {

        getStatistic(){
            let that = this
            if(this.renderPublisher) return
            that.ajax_loading = "ajax_loading"
            that.renderPublisher = true

            publisherAPI.getStatistic({id:this.$route.query.id},function(data){
                that.statistics = data
                that.ajax_loading = ""
            })

        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
    }
}
</script>
