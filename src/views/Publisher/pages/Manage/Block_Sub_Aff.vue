<template>
    <div class="box" :class="!renderPublisher ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Block-Sub-Aff</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container" id="">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Sub Aff</label>
                <div class="controls col-md-9">

                    <input type="text" class="col-md-8 form-comtrol mr20" name="sub_aff" id="sub_aff" v-model="subAff_selected" placeholder="please input sub aff you want block" >
                    
                    <a href="javascript:;" class="btn btn_block" data-control-name='bt-button' data-target="#aff_payment_container" @click.prevent="blockSubAff">Block</a>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Blocked Sub Aff</label>
                <div class="controls col-md-9"> 
                    <select multiple="multiple" class="col-md-8 form-control  pull-left mr20" v-model="subAff_unblock"   id="" data-value="blocked" >
                        <option :value="_item" v-for="(_item,_index ) in subAff_blocked_arr" v-if="subAff_blocked_arr.length">{{_item}}</option>
                    </select>
                    <a href="javascript:;" class="btn  btn_unblock  pull-left " @click.prevent="unblockSubAff">UnBlock</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import chosen from "@/components/Chosen.vue"
import publisherAPI from '@/api/publisher'

import commonDataAPI from '@/api/commonData'

export default {
    data(){
        return {
                renderPublisher:false,
                loadingZone:"",
                subAff_blocked:"",
                subAff_blocked_arr:[],
                subAff_selected:"",
                subAff_unblock:[]
            }
    },
    computed: {
    },
    components:{chosen},
    methods: {
        blockSubAff(){
            let that = this;

            if(!this.subAff_selected) {
                return
            }
            if(this.subAff_blocked_arr.indexOf(this.subAff_selected) === -1) {
                this.subAff_blocked_arr.push(this.subAff_selected)
            }

            Vue.http.post('Affiliate/blockSubAffiliates', {id:this.$route.query.id, 'black_list[]': this.subAff_selected}).then(response => {
                that.showAlert("success","success");
                that.subAff_selected = ""
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        unblockSubAff(){
            let that = this

            if(!this.subAff_unblock.length || !this.subAff_unblock ) {
                return
            }
            _.each(this.subAff_unblock, function(val) {
                let index = that.subAff_blocked_arr.indexOf(val)
                that.subAff_blocked_arr.splice(index, 1)
            })
            
            Vue.http.post('Affiliate/unBlockSubAffiliates', {id:this.$route.query.id, 'black_list': this.subAff_unblock}).then(response => {
                that.showAlert("success","success");
            }, response => {
                that.showAlert(response.body.msg);
            })

        }
    },
    props:{
        showAlert:{}
    },
    created () {
        let that = this
        publisherAPI.getSubAffBlackList({id:that.$route.query.id}, function(data){
            that.subAff_blocked_arr = data.data || []
            that.renderPublisher = true

        })

    }
}
</script>
