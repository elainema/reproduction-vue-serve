<template>
    <div class="box" v-if="ajax_loading">
        <div class="box-header" v-box-action-resize>
            <h2>Quality Level<help-box :content="helpTips"></help-box></h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <chart
                        :options="radar"
                        :init-options="initOptions"
                        theme="chalk"
                        ref="radar"
                        auto-resize
                />
                <p class="level"><b>Quality Level:</b> {{affquality.level}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import theme from '@/assets/chalk.json'
    import Chart from '@/views/BI_Adv/ECharts.vue'
    import '@node_modules/echarts/lib/chart/radar'
    import '@node_modules/echarts/lib/component/tooltip'
    import HelpBox from '@/components/common/help-box/'

    Chart.registerTheme('chalk', theme);
    //这样会全局注册组件，即便不再使用一个组件了，仍然会被包含在最终的构建结果中，忌用
    //Vue.component('chart', ECharts);  
    export default {
        data () {
            return {
                ajax_loading: false,
                initOptions: {
                    renderer: "canvas"
                },
                affquality:"",
                helpTips: "Affiliate’s quality level that generated automatically by system on the basis of Settlement, Traffic Reliability, CTIT data in the previous month will be displayed here. Level1 is the worst and level 4 is the best. Level here for reference only, it won’t change the real level of affiliate."
            }
        },
        components: {HelpBox,Chart},
        computed: {
            radar() {
                let data = this.affquality.details ? this.affquality.details : {};
                return  {
                    tooltip: {
                        formatter(params) {
                            var str = `ctit: ${(data.ctit).toFixed(2)}%</br>
                                    Settlement: ${(100 - data.deduction).toFixed(2)}%</br>
                                    Reliability: ${(100 - data.fraud).toFixed(2)}%</br>`

                            return params.name + '</br>' + str;
                        }
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#666'
                            }
                        },
                        splitNumber: 4,
                        indicator: [
                            { name: 'Settlement', max: 100},
                            { name: 'ctit', max: 100},
                            { name: 'Reliability', max: 100}
                        ]
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        itemStyle: {normal: {
                            areaStyle: {
                                color: {
                                        type: 'radial',
                                        x: 0.5,
                                        y: 0.65,
                                        r: 0.65,
                                        colorStops: [{
                                            offset: 0,
                                            color: '#FFFF77'
                                        },{
                                            offset: 1,
                                            color: '#FFFF77'
                                        }],
                                }
                            }}},
                        data : [
                            {
                                value : Object.keys(data).map((key) => {
                                    if(key == 'deduction' || key == 'fraud') {
                                        return 100 - Number(data[key])
                                    }
                                    return Number(data[key])
                                }),
                                name : 'ID : ' + this.$route.query.id
                            }
                        ]
                    }]
                };
            }
        },
        mounted (){
            this.$http.get('Affiliate/getAffQualityLevel',{params:{aff_id:this.$route.query.id}})
            .then(response => {
                this.affquality = response.body.data[0]
                if (this.affquality.details) this.ajax_loading = true
            },(response => {
                this.ajax_loading = false
            }))
        }
    }
</script>
<style>
    .box-container{
        position:relative;
    }
    .level {
        position: absolute;
        bottom:40px;
        left:50%;
        transform: translate(-50%, 0);
    }
</style>