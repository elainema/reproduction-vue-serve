<template>
    <div class="box">
        <div class="box-header">
            <h2>Statistics</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Affiliate Counts</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="affiliate_counts">{{empInfo.affiliate_counts}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Offer Counts</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="offer_counts">{{empInfo.offer_counts}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Total Clicks</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="click">{{statisticsInfo && statisticsInfo.click}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Total Conversions</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="conversion">{{statisticsInfo && statisticsInfo.conversion}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Total Payout</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="cost">{{statisticsInfo && statisticsInfo.cost}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Total Revenue</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="revenue">{{statisticsInfo && statisticsInfo.revenue}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Total Profit</label>
                    <div class="controls">
                        <span class="text" data-type="text" id="profit">{{statisticsInfo && statisticsInfo.profit}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
export default {
    data () {
        return {
            statisticsInfo:{},
            id:this.$route.query.id,
        }
    },
    props:{
        showAlert:{},
        empInfo:{},
    },
    components: {},
    methods: {
        getStatistics() {
            let that = this
            Vue.http.get('Employee/getStatistics', {params:{passport_id: this.id}}).then(response => {
                var data = response.body && response.body.data;
                that.statisticsInfo = data
            }, response => {
                that.showAlert(response.body.msg)
            })
        },
    },
    created () {
        this.getStatistics()
    },
    mounted () {
    }
}
</script>