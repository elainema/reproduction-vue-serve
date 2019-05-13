<template>
<modal 
  :dialogVisible.sync="outerVisible" 
  :cancelText="'Close'" 
  :confirmText="'Submit'"
  :onConfirm="onConfirm"
  :titleHtml="titleHtml"
  :disabled='disabled'
  :onCancel="handleClose">
  <template slot="dialogBody">
    <p class="red desc_risk_rate">Malware Risk Level <strong>High (<span>{{riskRate}}</span>)</strong> </p>
    <p class="desc_risk_level">The URL scanning result from VirusTotal indicates the product is recognized as malware or malicious by major anti-virus engine. To reduce the risk of Yeahmobi redirector (ymtracking.com), we highly suggest the Adv providing specific domain for the offer. </p>
    <p>
        <strong>Note: The domain provided by Adv should be CNAME to global.ymtracking.com before recorded in the system.</strong>
    </p>
    <p class="tracking_domain form-group">
        <label for="tracking_domain" class="col-md-4 control-label">Tracking Domain</label>
        <input type="text" pattern="[^\s]+" autofocus="" required="" autocomplete="off" class="col-md-8" placeholder="example:advdomain.com" id="tracking_domain" v-model.trim="tracking_domain_val">
    </p>
  </template>
</modal>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');
export default {
    data(){
        return {
          titleHtml:'<h3 class="">Offer Virus Risk Scanning<span class="red">The third-party analysis results from VirusTotal.com</span></h3>',
          outerVisible:false,
          tracking_domain_val:'',
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    props:{
    	modalState:{
    		type:[Boolean,String],
    		required:true
    	},
      riskRate:{
        type: [Number,String],
        required: true,
        default: ''
      },
      setTrackingDomain:{
        type:Function,
        required: true,
      }
    },
    computed: {
      disabled(){
        return !this.tracking_domain_val.match(/.\../gi)
      }
    },
    watch:{
        modalState () {
        	this.outerVisible = this.modalState
        },
    },
    methods:{
      onConfirm() {
        this.setTrackingDomain(this.tracking_domain_val)
        this.handleClose()
      }
    }
}
</script>