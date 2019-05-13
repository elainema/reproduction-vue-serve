<template>
    <div class="box" :class="!renderPublisher ? 'ajax_loading' : '' ">
    <div class="box-header" v-box-action-resize>
        <h2>Block-Adv</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container" id="">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Adv</label>
                <div class="controls col-md-9">
                    <chosen  style="width: 320px; margin-right:20px;" v-if="new_advList"  :chosen_width="'320px'" class="inline-block " :select_class="'col-md-11 '" :onChange="onAdvChange" :chosen_name="'advertiser_id'"  :default_option="'- Select an Adv -'" :chosen="new_advList" :chosen_type="'simple'"></chosen>
                    
                    <a href="javascript:;" class="btn btn_block" data-control-name='bt-button' data-target="#aff_payment_container" @click.prevent="blockAdv">Block</a>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Blocked Adv</label>
                <div class="controls col-md-9"> 
                    <select multiple="multiple" class="col-md-8 form-control  pull-left mr20" v-model="adv_unblock"   id="adv_blocked" data-value="blocked" >
                        <option :value="_item.id" v-for="(_item,_index ) in adv_blocked_arr">{{_item.val}}</option>
                    </select>
                    <a href="javascript:;" class="btn  btn_unblock  pull-left " @click.prevent="unblockAdv">UnBlock</a>
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
                advChosen:"",
                adv_blocked:"",
                adv_blocked_arr:[],
                adv_selected:{},
                adv_unblock:[],
                new_advList:[]
            }
    },
    computed: {
    },
    components:{chosen},
    methods: {
        blockAdv(){
            let that = this;

            if (!this.adv_selected.id) {
                return;
            }
            if(_.findIndex(this.adv_blocked_arr,{id: this.adv_selected.id}) === -1) {
                this.adv_blocked_arr.push(this.adv_selected)
            }
            
            Vue.http.post('Affiliate/blockAdvs', {aff_id:this.$route.query.id, adv_ids: this.adv_selected.id}).then(response => {
                that.showAlert("success","success");
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        onAdvChange(val, text){
            let obj = {}
            obj.id = val;
            obj.val = text;
            this.adv_selected = obj
        },
        unblockAdv(){
            let that = this

            if(!this.adv_unblock.length) return
            _.each(this.adv_unblock, function(val) {
                let index = _.findIndex(that.adv_blocked_arr, {id:val})
                that.adv_blocked_arr.splice(index, 1)
            })

            Vue.http.post('Affiliate/unBlockAdvs', {aff_id:this.$route.query.id, adv_ids: this.adv_unblock.join(",")}).then(response => {
                that.showAlert("success","success");
            }, response => {
                that.showAlert(response.body.msg);
            })

        },
        getBlockAdv(advIds){
            let that = this
            let arr = []
            _.each(advIds, function(id) {
                let obj = _.find(that.advChosen.data, {id:id})
                obj.val = obj.id + " " + obj.name;
                arr.push(obj)
            })
            return arr
        }
    },
    props:{
        showAlert:{}
    },
    created () {
        let that = this
        commonDataAPI.getAdvertisers(function(advertisers){
            that.advChosen = { name: "advertiser_id", trans_name:"advertiser_id",  full_name: "advertiser", data: advertisers}

            publisherAPI.getBlockedAdvsByAff({id:that.$route.query.id}, function(data){
                let black_ids = data.data? data.data.black_list : []
                that.adv_blocked_arr = that.getBlockAdv(black_ids)
                let adv_stoped = data.data ? data.data.white_list : []
                let result = _.filter(advertisers,function(o){
                    return adv_stoped.indexOf(o.id) == -1
                })
                that.new_advList = { name: "advertiser_id", trans_name:"advertiser_id",  full_name: "advertiser", data: result}
                
                that.renderPublisher = true
            })
        })

    }
}
</script>
