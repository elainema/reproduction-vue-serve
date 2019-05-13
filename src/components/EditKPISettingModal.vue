<template>
<div id="" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <form class="form-horizontal" ref="form" @submit.prevent="onConfirmBtn">

      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Edit {{getTypeName(kpiItem.type)}}</h3>
            </div>
            <div class="modal-body">
                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI</label>
                    <div class="controls col-md-8 ">
                        <span>{{getTypeName(kpiItem.type)}}</span>
                    </div>
                </div>
                
                <div class="control-group form-group" v-if="eventParamRef.hasOwnProperty(kpiItem.type)">
                    <label class="control-label col-md-4">{{ eventParamRef[kpiItem.type] }}</label>
                    <div class="controls col-md-8 ">
                        <span>{{getTypeName(kpiItem.event_param)}}</span>
                        <!-- <input type="text" name="kpis[event_param]" required="" class="form-control col-md-4" :value="kpiItem.event_param" disabled> -->
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI Index</label>
                    <div class="controls col-md-8 ">
                        <input type="text" name="kpis[quality]" required="" class="form-control col-md-4" placeholder="kpi index (between 0 and 1)" pattern="^(?!0+(?:\.0+)?$)\d?\d(?:\.\d\d?)?$" :value="kpiItem.quality*10000/100"> %
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI Weighting</label>
                    <div class="controls col-md-8 ">
                        <input type="text" name="kpis[wighting]" required="" :value="kpiItem.wighting" class="form-control col-md-4" placeholder="kpi weighting (between 0 and 1)" pattern="^(0(\.\d+)?|1(\.0+)?)$"> 
                    </div>
                </div>



            </div>

            <div class="modal-footer">
                <button class="btn btn-primary " type="submit" >Save</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
            </form>


        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return {
        eventParamRef: {
            retention: 'Day'
        }
    }
  },
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    kpiItem:{},
    
  },
  computed: {


  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        let $form = $(this.$refs.form)
        this.onConfirm({
            id:this.kpiItem.id,
            type: this.kpiItem.type,
            wighting: $form.find("[name='kpis[wighting]']").val(),
            quality: $form.find("[name='kpis[quality]']").val()*100 / 10000,
            event_name: this.kpiItem.event_name,
            event_param: this.kpiItem.event_param,
            is_monitor:this.kpiItem.is_monitor,
        })
        this.hideModal();
    },
    getTypeName:function(key){
        let obj = {
                'cr': 'CR',
                'retention': 'Retention Rate',
                'click_hijacking': "Click Injection",
                'click_flood': "Click Flood"
            }
        return obj[key] || key;
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    }
  },
  mounted () {
    let that = this

    // $(this.$refs.modal).on('shown.bs.modal', function () {
    //   $(that.$refs.modal).find("[value='" + that.kpiItem.event_name + "']").prop("checked", true)
    // })

  }
}
</script>