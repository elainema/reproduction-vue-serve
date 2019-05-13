<template>
<div class="box">
    <div class="box-header">
        <h2>Activity</h2>
        <div class="box-action">
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal">
            <div class="control-group form-group">
                <label class="control-label col-md-2">Latest Login</label>
                <div class="controls">
                    <span class="text" data-type="text" id="latest_login">{{ empInfo.latest_login }}</span>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-2">Login Times</label>
                <div class="controls">
                    <span class="text" data-type="text" id="login_times">{{ empInfo.login_times }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props:{
        empInfo:{},
    },
    components: {},
    methods: {
    },
    mounted () {
    }
}
</script>