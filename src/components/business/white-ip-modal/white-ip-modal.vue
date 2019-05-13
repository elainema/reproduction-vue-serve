<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :title="ip_header"
  :confirmText="'Apply'"
  :onConfirm="onConfirm"
  ref="modal"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <form class="form-horizontal" role="form">
        <div class="control-group form-group">
            <label class="control-label col-md-2 col-md-2">Type: </label>
            <div class="controls">
                <select id="changeIPType" class="col-md-4 form-control" @change="changeIPType" v-model="iptype">
                    <option value="ip_address" :selected="iptype == 'ip_address' ? true: false">IPv4 Address</option>
                    <option value="ip_range" :selected="iptype == 'ip_range' ? true: false">IPv4 Range</option>
                    <option value="ip_subnet"  :selected="iptype == 'ip_subnet' ? true: false">IPv4 Subnet</option>
                    <option value="ipv6_address" :selected="iptype == 'ipv6_address' ? true: false">IPv6 Address</option>
                    <option value="ipv6_range" :selected="iptype == 'ipv6_range' ? true: false">IPv6 Range</option>
                    <option value="ipv6_subnet"  :selected="iptype == 'ipv6_subnet' ? true: false">IPv6 Subnet</option>
                </select>
            </div>
        </div>
    </form>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ip_address'" id="content_ip_address" style="margin-top: 15px">
        <input @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip0" />.
        <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip1" />.
        <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip2" />.
        <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" v-model.trim="ip3" />
    </div>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ip_range'" id="content_ip_range">
        <p class="col-md-offset-2">*Example: 192.0.2.0-255</p>
        <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip0" />.
        <input  @keyup="inputOnKeyup" onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip1" />.
        <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip2" />.
        <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip3" />
        <span class="spliter"> - </span>
        <input  @keyup="inputOnKeyup"  onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip5 col-md-2 form-control" maxlength="3" data-id="ip_range" type="text" value="" v-model.trim="ip4" />
    </div>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ip_subnet'" id="content_ip_subnet">
        <p class="col-md-offset-2">*IP address/routing prefix. Example:192.0.2.0/24</p>
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip1 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip0" />.
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip2 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip1" />.
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip3 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip2" />.
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip4 col-md-2 form-control" maxlength="3" type="text" value="" v-model.trim="ip3" />
        <span class="spliter"> / </span>
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip5 col-md-2 form-control" maxlength="3" data-id="ip_subnet" type="text" value="" v-model.trim="ip4" />
    </div>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ipv6_address'" id="content_ipv6">
        <p class="col-md-offset-2">Example:2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
        <input class="ip2 col-md-7 col-md-offset-2 form-control" type="text" value="" v-model.trim="ipv6" />
    </div>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ipv6_range'" id="content_ipv6_range">
        <!-- <p class="col-md-offset-2">Example:2001:0db8:85a3:0000:0000:8a2e:0370:7334</p> -->
        <input class="ip2 col-md-7 col-md-offset-2 form-control" type="text" value="" v-model.trim="ipv6" />
        <span class="spliter"> - </span>
        <input class="ip5 col-md-7 col-md-offset-2 form-control" style="margin-top:5px" data-id="ipv6_range" type="text" value="" v-model.trim="ip_range" />
    </div>
    <div class="row-fluid field-required content_ip" v-show="iptype =='ipv6_subnet'" id="content_ipv6_subnet">
        <p class="col-md-offset-2">Example:2a0b:14c0::/32</p>
        <input class="ip2 col-md-5 col-md-offset-2 form-control" type="text" value="" v-model.trim="ipv6" />
        <span class="spliter"> / </span>
        <input onKeyup="value=value.replace(/[^0-9]/g,'')" class="ip5 col-md-2 form-control" maxlength="3" data-id="ipv6_subnet" type="text" value="" v-model.trim="ip_subnet" />
    </div>
  </template>
</modal>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');
let defaultData = {
    iptype: 'ip_address',
    ip_header: "IP Address",
    flag: false,
    editVal:'',
    ip0:'',
    ip1:'',
    ip2:'',
    ip3:'',
    ip4:'',
    ips:[],
    ipv6:'',
    ip_range:'',
    ip_subnet:'',
}
let clone = _.clone(defaultData)
export default {
    data(){
        return {
            iptype: 'ip_address',
            ip_header: "IP Address",
            flag: false,
            editVal:'',
            ip0:'',
            ip1:'',
            ip2:'',
            ip3:'',
            ip4:'',
            ips:[],
            ipv6:'',
            ip_range:'',
            ip_subnet:'',
            outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    computed: {
    },
    props:{
        modalState:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
        selectedVal:{
            type:Array,
            required: true,
        },
        actionType:{
            type:String,
            required: true,
        },
        rebackBtn:{
            type:Function,
            required: true,
        },
    },
    watch:{
        modalState (val) {
            this.outerVisible = this.modalState
            if (val == 'show' && this.selectedVal.length != 0) {
                this.calcuEditVal()
            }
        },
        editVal: function(){
            this.changeIPType()
        },
        actionType: function(newVal, oldVal) {
            let that = this
            if(newVal ==="Add") {
                _.map(clone, function(val, key){
                    that[key] = val
                })
            }
        }
    },
    methods:{
        getIpAddr(){
            var ip_type = this.iptype
            if (ip_type == "ip_address") {
                this.ips = [this.ip0,this.ip1,this.ip2,this.ip3]
            } 
            else if (ip_type == "ipv6_address"){
                this.ips = [this.ipv6]
            }
            else if (ip_type == "ipv6_range"){
                this.ips = [this.ipv6 + '-' + this.ip_range]
            }
            else if (ip_type == "ipv6_subnet"){
                this.ips = [this.ipv6 + '/' + this.ip_subnet]
            }
            else {
                this.ips = [this.ip0,this.ip1, this.ip2,this.ip3,this.ip4]
            }
            return  {
                ip:this.ips.join('.'),
                ip_type:ip_type
            };
        },
        onConfirm() {
            let ippAddr = this.getIpAddr()
            this.rebackBtn(ippAddr)
        },
        inputOnKeyup(e) {
            //auto next
           if (e.keyCode == 110) {
                $(e.target).next().focus()
            }
            var iptlen = e.target.value.length;
            var thisResult = e.target.getAttribute('class') && e.target.getAttribute('class').split('ip')[1].slice(0,1);
            var thisFousc = thisResult * 1;
            if (iptlen >= 3 && thisFousc <= 4) {
                $(e.target).next().focus()
            }
        },
        changeIPType(e) {
            var that = this;
            if (e) {
                that.iptype = e.target.value
            }
            if (that.iptype == 'ip_address') {
                that.ip_header = 'IP Address'
            } else if (that.iptype == 'ip_range') {
                that.ip_header = 'IP Range'
            }else if (that.iptype == 'ipv6_address') {
                that.ip_header = 'IPv6 Address'
            } else if (that.iptype == 'ipv6_range'){
                that.ip_header = "IPv6 Range"
            }else if (that.iptype == 'ipv6_subnet'){
                that.ip_header = "IPv6 Subnet"
            }else {
                that.ip_header = 'IP Subnet'
            }
        },
        calcuEditVal  () {
            var that = this;
            var ip_val = "";
            var edit_val = that.selectedVal
            if (edit_val[0].match(/\//i)) {
                //that.iptype = "ip_subnet";
                if (edit_val[0].match(/\:/i)){
                    that.iptype = "ipv6_subnet";
                }
                else {
                    that.iptype = "ip_subnet";
                }
            } else if (edit_val[0].match(/-/i)) {
                if (edit_val[0].match(/\:/i)){
                    that.iptype = "ipv6_range";
                }
                else {
                    that.iptype = "ip_range";
                }
            } else if (edit_val[0].match(/:/i)) {
                that.iptype = "ipv6_address";
                that.ipv6 = edit_val[0]
            } else {
                that.iptype = "ip_address";
            }
            var edit_val_arr = edit_val[0].split('.')
            var selected = []
            
            for (var j = 0; j < edit_val_arr.length; j++) {
                if (edit_val_arr[j].match(/\/|-/i)) {
                    var arr = edit_val_arr[j].split("/");
                    arr = arr.length === 1 ? edit_val_arr[j].split("-") : arr;
                    if (that.iptype == 'ipv6_subnet'){
                        that.ipv6 = arr[0]
                        that.ip_subnet = arr[1]
                    }
                    if (that.iptype == 'ipv6_range'){
                        that.ipv6 = arr[0]
                        that.ip_range = arr[1]
                    }else {
                        that.ip3 = arr[0]
                        that.ip4 = arr[1]
                    }
                    
                } else {
                    that['ip' + j] = edit_val_arr[j]
                }
            }
            
            this.editVal = selected
        },
    },
    mounted() {
        $(this.$refs.modal).find('input:visible').attr("required", true)
    }
}
</script>