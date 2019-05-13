<template>
<div id="" class="modal  modal_bi fade" ref="modal">
    <div class="modal-dialog"><div class="modal-content">

    <div class="modal-header"> 
        <a class="close" @click.prevent="hideModal" >×</a>
        <h3 class="">BI</h3>
    </div>
    <div class="modal-body">
        <div class="item" v-if="item && item.url">
            <div class="title text-center">{{item.name | capitalizeAll}}</div>
            <iframe ref="iframe" :src="item.url"  frameborder='0' scrolling="no"  style="width:100%" class="loading" @load="hideLoading($event)">
            </iframe>
        </div>

    </div>
    <div class="modal-footer"> <a href="javascript:;" class="btn secondary" data-dismiss="modal" @click.prevent="hideModal">Close</a></div>
    </div></div>
</div>
</template>
<style scoped="">
    .modal_bi .modal-dialog{
        width: 1000px !important;
        height: 500px !important;
    }
    .modal_bi .modal-content {
        min-height: 500px !important;
    }
    .modal_bi .modal-content .modal-body{
        min-height: 460px !important;
    }
    .modal_bi .modal-dialog iframe{
        height: 420px !important;
    }

    .item .title {
        text-align: center;
        font-size: 16px;
        padding: 5px;
        font-weight: bold;
    }
</style>
<script>
export default{
    props: ['modalState','hideModal', "item", "resetItem"],
    data() {
        return {
            alertPop:"hide",
            alertMsg:""
        }
    },
    components: {
    },
    computed: {

    },
    methods: {
        toggleModal:function(msg) {
            $(this.$refs.modal).modal(msg)
        },
        hideLoading($event){
            $($event.target).removeClass("loading")
        }
    },
    watch: {
        modalState: function (val) {
          this.toggleModal(val)
        },
        item: function(newVal, oldVal) {
          //$(this.$refs.iframe).show()
        }
    },
    mounted () {
        let that = this;
        $(this.$refs.modal).on('hidden.bs.modal', function () {
            that.hideModal()
            that.resetItem()
        })
        $(this.$refs.modal).on('shown.bs.modal', function () {
            //$(that.$refs.iframe).hide()
        })


    }
}
</script>