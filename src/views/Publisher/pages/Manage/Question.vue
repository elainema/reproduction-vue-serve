<template>
<div class="box" :class="ajax_loading ? 'ajax_loading' : '' " >
    <div class="box-header" v-box-action-resize>
        <h2>Sign Up Question Responses</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.a">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%; word-break:break-all">From who or where did you hear about us? </label>
                <div>
                    <span class="text question-text">A: {{questions.a}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.b">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%; word-wrap:break-word">What is your method of traffic? IF you are doing mediabuy, please list some ad networks you are using </label>
                <div>
                    <span class="text question-text">A: {{questions.b}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.c">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">What kind of offers do you promote?  </label>
                <div>
                    <span class="text question-text">A: {{questions.c}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.e">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">We only accept mobile traffic, desktop traffic is not allowed, please make sure you know this </label>
                <div>
                    <span class="text question-text">A: {{questions.e}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.f">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">How long have you been in mobile marketing?  </label>
                <div>
                    <span class="text question-text">A: {{questions.f}}</span>
                </div>
            </div>
            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.h">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%; word-break:break-all">Please provide your app store URL here. </label>
                <div>
                    <span class="text question-text">A: {{questions.h}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.i">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%; word-wrap:break-word">How many users do you have in total now? What about the DAU? </label>
                <div>
                    <span class="text question-text">A: {{questions.i}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.j">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">what are your top 5 countries by number of app users?  </label>
                <div>
                    <span class="text question-text">A: {{questions.j}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.k">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">What are your current monetization partners? </label>
                <div>
                    <span class="text question-text">A: {{questions.k}}</span>
                </div>
            </div>
            
             <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.l">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">Please include any other information that we should know.  </label>
                <div>
                    <span class="text question-text">A: {{questions.l}}</span>
                </div>
            </div>

            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.n">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">What are your traffic source? Please list some networks which you work with now. </label>
                <div>
                    <span class="text question-text">A: {{questions.n}}</span>
                </div>
            </div>

            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.o">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">What are your traffic source and top 5 geos? </label>
                <div>
                    <span class="text question-text">A: {{questions.o}}</span>
                </div>
            </div>

            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.s">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">Do you have your in-house traffic? What percentage of it?  </label>
                <div>
                    <span class="text question-text">A: {{questions.s}}</span>
                </div>
            </div>

            <div class="control-group form-group" style="margin-bottom:15px" v-if="questions.u">
                <label class="control-label text-left" style="float:none;white-space:normal;width:100%">What's your main business? Please describe in brief.  </label>
                <div>
                    <span class="text question-text">A: {{questions.u}}</span>
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
                questions:{},
                renderPublisher:false,
                ajax_loading:false
            }
    },
    computed: {
    },
    methods: {

        getQuestions(){
            let that = this
            if(this.renderPublisher) return
            that.ajax_loading = "ajax_loading"
            that.renderPublisher = true

            publisherAPI.getQuestions({id:this.$route.query.id},function(data){
                that.questions = data || {}
                that.ajax_loading = ""
            })

        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        this.getQuestions()
    }
}
</script>
<style scoped>
    .text-left {
        text-align: left !important;
    }
</style>