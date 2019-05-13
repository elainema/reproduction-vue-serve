<template>
<!-- modal virus scanning-->
<div id="modal_virus_scanning" ref="modal_virus_scanning" class="modal fade modal_virus_scanning" aria-labelledby="gridSystemModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"  @click.prevent="hideModal">&times;</button>
                <h3 class="">Offer Virus Risk Scanning<span class="red">The third-party analysis results from VirusTotal.com</span></h3>
            </div>
            <div class="modal-body">
                <p class="red desc_risk_rate">Malware Risk Level <strong>High (<span>{{riskRate}}</span>)</strong> </p>
                <p class="desc_risk_level">The URL scanning result from VirusTotal indicates the product is recognized as malware or malicious by major anti-virus engine. To reduce the risk of Yeahmobi redirector (ymtracking.com), we highly suggest the Adv providing specific domain for the offer. </p>
                <p>
                    <strong>Note: The domain provided by Adv should be CNAME to global.ymtracking.com before recorded in the system.</strong>
                </p>
                <p class="tracking_domain form-group">
                    <label for="tracking_domain" class="col-md-4 control-label">Tracking Domain</label>
                    <input type="text" pattern="[^\s]+" autofocus="" required="" autocomplete="off" class="col-md-8" placeholder="example:advdomain.com" id="tracking_domain" v-model.trim="tracking_domain_val">

                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="confirmBtn" :disabled="disabled"  @click.prevent="setTrackingDomain(tracking_domain_val)">Submit</button>
                <button class="btn btn-secondary"  @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    data() {
        return {
            tracking_domain_val:'',
        }
    },
    computed: {
        disabled(){
            return !this.tracking_domain_val.match(/.\../gi)
        }
    },
    props: ['modalState','hideModal', 'riskRate', 'setTrackingDomain'],
    methods: {
        toggleModal:function(msg) {
            $(this.$refs.modal_virus_scanning).modal(msg)
        },
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        $(this.$refs.modal_virus_scanning).on('hidden.bs.modal', function () {
            this.hideModal()
        })
    }
}
</script>