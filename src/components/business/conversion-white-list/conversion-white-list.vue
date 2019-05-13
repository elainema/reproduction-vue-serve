<template>
   <div class="">
        <select style="float:left;width:520px" size="5" multiple="multiple" id="off_white_list" v-model="editVal">
            <option :value="v" v-if="v" v-for="v in new_ips">{{ v }}</option>
        </select>
        <div>
           <input type="button" class="btn" value="Add" id="add_btn" data-control-name="bt-button" @click.prevent="action_offer_white('Add')"/>
           <input type="button" class="btn" value="Edit" id="edit_btn" data-control-name="bt-button" @click.prevent="action_offer_white('Edit')"/>
           <input type="button" class="btn" value="Delete" id="delete_btn" data-control-name="bt-button"  @click.prevent="action_offer_white('Delete')"/>
        </div>
        <!-- <createOfferWhiteIPModal :modalState="createOfferWhiteIPModalState" :hideModal="hideModal" :actionType="btn_type" :rebackBtn="rebackBtn" :selectedVal="editVal"></createOfferWhiteIPModal> -->
        <white-ip-modal
            :modalState.sync="createOfferWhiteIPModalState"
            :actionType="btn_type" 
            :rebackBtn="rebackBtn" 
            :selectedVal="editVal"
            :dialogName="'modalState'"
        ></white-ip-modal>
   </div>
</template>

<script>
const WhiteIpModal = () => import(
/* webpackChunkName: "WhiteIpModal" */ '@/components/business/white-ip-modal/'
);

import Vue from "vue"
export default{
    data() {
        return {
            editVal:[],
            createOfferWhiteIPModalState:'hide',
            btn_type:'',
            IPType: 'ip_address',
            query_id: this.$route.query.id,
            new_ips:[],
            selectedIP:[],
        }
    },
    props:{
        originIPS:{
            default() {
                []
            }
        },
        showAlert:{},
        editConversionWhiteList:{
            default:''
        },
        query_param_name:{default:"offer_white_ip"},
        ADVWHITEIP:{default:function() {}},
        successCallback:{default:function() {}},
    },
    computed: {
        // new_ips : {
        //     get: function () {
        //         return this.originIPS || []
        //     },
        //     set: function () {

        //     }
        // }
    },
    watch: {
        originIPS() {
            this.new_ips = this.originIPS || []
        },
        new_ips() {
            this.successCallback && this.successCallback(this.new_ips)
        }
    },
    components: {WhiteIpModal },
    methods: {
        rebackBtn(new_ip) {
            if (this.getRightIpAddr(new_ip)) {
                this.hideModal();
                this.editConversionWhiteList && this.saveConversionWhiteList();
            }
        },
        hideModal () {
            this.createOfferWhiteIPModalState = "hide"
           // this.editVal = []
        },
        saveConversionWhiteList(){
            var query = {
                id:this.query_id
            }
            query[this.query_param_name] = this.new_ips.join(',')
            


            Vue.http.post(this.editConversionWhiteList, query).then(response => {
                this.showAlert("Success" , "success")
                this.new_ips = this.new_ips
            }, response => {
                this.showAlert(response.body.msg , "error")
                // error callback
            })
        },
        getRightIpAddr(new_ip) {
            var flag = false
            if (new_ip) {
                var that = this
                var ip = [];
                var thisVal = "";
                var ipAddr = "";
                var newip = new_ip.ip && new_ip.ip.split('.');
                var length = newip.length;
                var ip_type = new_ip.ip_type
                var ADVWHITEIP = that.ADVWHITEIP;
                var ipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
                if (ip_type.indexOf('ipv6') == -1){
                    for (var i = 0; i < length; i++) {
                        thisVal = newip[i] * 1;
                        if (thisVal === "") {
                            that.showAlert("Please input a valid IP address" , "error")
                            return false
                            break;
                        }
                        if (ADVWHITEIP && ADVWHITEIP[0]) {
                            for (var g = 0; g < ADVWHITEIP.length; g++) {
                                if (ADVWHITEIP[g] == new_ip.ip) {
                                    that.showAlert('The IP address can not be same as advertiser IP!', "error")
                                    return false
                                    break;
                                }
                            }
                        }
            
                        if (i == 0) {
                            if (!thisVal || thisVal > 255) {
                                that.showAlert("Please input a valid IP address" , "error")
                                return false
                                break;
                            }
                        } else if (i == 4) {
                            if (!thisVal || thisVal > 255) {
                                that.showAlert("Please input a valid IP address" , "error")
                                return false
                                break;
                            }
                            var prevVal = newip[i - 1] * 1;
                            if (ip_type == "ip_range" && thisVal < prevVal) {
                                that.showAlert("Please input a valid IP address" , "error")
                                return false
                                break;
                            }
                            if (ip_type == "ip_subnet" && thisVal > 32) {
                                that.showAlert("IP subnet should be lower than 33" , "error")
                                return false
                                break;
                            }
                        } else {
                            if ((!thisVal && thisVal != 0) || thisVal > 255) {
                                that.showAlert("Please input a valid IP address" , "error")
                                return false
                                break;
                            }
                        }
                        if (i !== 4) {
                            ip.push(thisVal);
                        }
                    }
                    ipAddr = ip.join('.');
                    if (length == 5) {
                        if (ip_type == "ip_range") {
                            ipAddr += "-" + newip[4] * 1;
                        } else if (ip_type == "ip_subnet") {
                            ipAddr += "/" + newip[4] * 1;
                        }
                    }
                }
                else {
                    if (ip_type == 'ipv6_range'){
                        let tmpArr = newip[0].split('-')
                        if (!ipv6.test(tmpArr[0]) || !ipv6.test(tmpArr[1])){
                            return that.showAlert("Please input a valid IPv6 address" , "error")
                            return false
                        }
                    }
                    if (ip_type == 'ipv6_subnet'){
                        if (!newip[0].match(/\:\:\//i)){
                            return that.showAlert("Please input a valid subnet address" , "error")
                            return false
                        }
                    }
                    if (ip_type == 'ipv6_address'){
                        if (!ipv6.test(newip[0])){
                            that.showAlert("Please input a valid IPv6 address" , "error")
                            return false
                        }
                    }
                    ipAddr = newip[0]
                }
                
                if (that.new_ips.join(",") !== ipAddr) {
                    if (that.btn_type == 'Add') {
                        that.new_ips.push(ipAddr)
                    } else if (that.btn_type == 'Edit') {
                        /*var reg = new RegExp(that.new_ips, 'ig');
                        that.new_ips = that.new_ips.join().replace(reg, ipAddr)*/
                        var selectedIP = that.selectedIP
                        if (that.new_ips.indexOf(selectedIP.join()) != -1) {
                            var newips = that.new_ips.join().replace(selectedIP, ipAddr)
                        }
                        that.new_ips = newips.split(',')
                    }
                    flag = true
                } else {
                    that.showAlert("The IP address can not be same!" , "error");
                    return false
                }
            } else {
                return false
            }
            return flag
        },
        action_offer_white(btn_type) {
            var that = this;
            var off_white_list = $('#off_white_list');
            var original_html = off_white_list.html();
            that.btn_type = btn_type;
            switch (btn_type) {
                case 'Add':
                    that.editVal = []
                    that.createOfferWhiteIPModalState = 'show'
                    break;
                case 'Edit':
                    var edit_val = that.editVal
                    if (!edit_val || edit_val.length == 0) {
                        that.showAlert("Please select a IP address to edit" , "error")
                        return;
                    }
                    if (edit_val.length > 1) {
                        that.showAlert("Please select a single IP address to edit" , "error")
                        return;
                    }
                    that.selectedIP = edit_val;
                    that.createOfferWhiteIPModalState = 'show'
                    break;
                case 'Delete':
                    var delete_val = that.editVal
                    if (!delete_val || delete_val.length == 0) {
                        that.showAlert("Please select a IP address to delete" , "error")
                        return false;
                    }
                    if (delete_val.length > 1) {
                        that.showAlert("Please select a single IP address to delete" , "error")
                        return false;
                    }
                    var array = [1, 2, 3, 4];
                    that.new_ips= _.remove(that.new_ips, function(n) {
                        
                      return n  != delete_val[0];
                    });
                    that.editConversionWhiteList && that.saveConversionWhiteList()
                    break;
            }
        },
    },
}
</script>

<style scoped>

</style>