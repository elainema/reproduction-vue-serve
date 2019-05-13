<template>
<div id="report_download" class="modal fade" ref="report_download">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" @click.prevent="hideModal">&times;</button>
                <h3>Export</h3>
            </div>
            <div class="modal-body">
                <p>Download URL: <span id="downloadUrl"> {{ downloadUrl }}</span></p>
                <span>Expiration in one day</span>
            </div>
            <div class="modal-footer">
                <a class="btn btn-primary" id="download" target="_blank" :href="href" @click="hideModal">Download</a>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    props: ['modalState','hideModal','downloadUrl','href'],
    components: {
    },
    computed: {
        getParams() {
            var params = {
                status: this.status,
                method: this.method.split('+')[0],
                run_time: this.sel_date + ' ' + this.sel_hour
            }
            return params;
        }
    },
    methods: {
        toggleModal:function(msg) {
          $(this.$refs.report_download).modal(msg)
        }
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        }
    },
    mounted () {
        let that = this
        $(this.$refs.report_download).on('hidden.bs.hidden', function () {
            that.hideModal()
        })
    }
}
</script>