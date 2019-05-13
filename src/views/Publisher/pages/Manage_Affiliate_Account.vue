<template>
  <div >
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Manage Publisher Account</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Manage Publisher Account</h2>

            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <div id="get_aff" v-show="!get_aff">
                    <label>Please Input The Publisher Id. </label>

                    <div><input id="get_affiliate_input" type="text" size="10" class="col-md-2" v-model="aff_id"><span id="get_tip">{{tip}}</span></div>
                    <div>
                        <button id="get_affiliate_button" class="btn btn-primary mt10" @click="getPublisher">Get Publisher</button>
                    </div>
                </div>
                <div id="aff_info"  v-show="get_aff">
                    <label>Id: <span id="aff_id">{{get_aff_info.id}}</span>,Account: <span id="aff_account">{{get_aff_info.email}}</span></label>
                    <label>New Account: <input type="text" id="aff_new_account" v-model="aff_new_account"><span id="ret_tip"></span>{{ret_tip}}</label>

                    <div>
                        <button id="submit_affiliate_button" class="btn btn-primary mt10" @click="submitAffAccount">SubmitNewAccount</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>


</template>

<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"
import commonDataAPI from '@/api/commonData'
import chosen from '@/components/Chosen.vue'
import pagination from '@/components/Pagination.vue'

export default {
    data(){
        return {
            aff_id:"",
            tip:"",
            ret_tip:"",
            aff_new_account:"",
            get_aff:false,
            get_aff_info:{}

        }
    },
    computed: {
    },
    components: {chosen, pagination},
    mixins: [mixin_modal],
    methods: {
        getPublisher() {
            this.tip = ""
            Vue.http.get('Affiliate/getById',{params:{id:this.aff_id}}).then(response => {
                let data  = response.body.data 
                if(response.body.msg !== "success.") {
                    this.tip = response.body.msg
                } else {
                    this.get_aff = true
                    this.get_aff_info  = data
                }
            }, response => {
                if(response.body.msg !== "success.") {
                    this.tip = response.body.msg
                }
                this.showAlert(response.body.msg)
            })
        },
        submitAffAccount() {
            this.ret_tip = ""
            Vue.http.post('Employee/editAccount',{id:this.aff_id, email: this.aff_new_account}).then(response => {
                let data  = response.body.data 
                if(response.body.msg !== "success.") {
                    this.ret_tip = response.body.msg
                } else {
                    this.ret_tip = "success!"

                }
            }, response => {
                if(response.body.msg !== "success.") {
                    this.ret_tip = response.body.msg
                }
                this.showAlert(response.body.msg)
            })
        }
    },
    props:{

    },
    created () {
        let that = this

        
    },
    mounted() {
    }
}
</script>