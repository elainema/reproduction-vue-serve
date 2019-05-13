<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a href="#" ref="editable" id=""  :data-offer-caps="is_offer_caps"  data-field-name="caps" :data-inputclass="offer_class" :data-value="offer_val"   :data-name="offer_name" data-control-name="bt-select" :data-type="caps_type" class="hide-normal"  :data-mode="editable_mode"  ></a>


  </div>
</template>
<script>
import Vue from "vue"
import confirmModal from "./ConfirmModal.vue"
export default {
  data(){
    return {
      modalState:"hide",
      payoutCapsInfo:{},
      caps_select:[{val:"1",text:"Yes"},{val:"0",text:"No"}]
    }
  },
  props: {
    source:{},
    is_offer_caps:{},
    "showAlert":{},
    offer_val:{},
    renderOffer:{},
    dynamic_render:{},
    offer_name:{},
    onShown:{},
    getCustomParam:{},
    caps_type:{default:"caps"},
    aff_id:{},
    app_id:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    offer_class:{},
    onSuccess:{},
    offer_api:{default:'Offer2/edit'}
  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: { confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      $(this.$refs.editable_zone).find(".editableform").submit();
    },
    renderEditable:function(){
        let that = this
        let id = that.$route.query.id
        let _params = {};
        console.log(this.offer_val)
        $(this.$refs.editable).attr('data-value', this.offer_val).css("display",'inline-block');
        let opt = {
            placement: 'left',
            pk: id,
            validate: function(value) {
                var msg = false;
                var $self = $(this);
                $.each(value, function(i, v) {
                    if (i == 'is_caps' && v == 1) {
                        var flag = [];
                        $.each(['daily_conversions', 'monthly_conversions', 'daily_payout', 'monthly_payout', 'daily_revenue', 'monthly_revenue'], function(index, key) {
                            if (value[key] - 0 == 0) {
                                flag.push(0);
                            } else {
                                flag.push(1);
                            }
                        })
                        if (flag.indexOf(1) == -1) {
                            msg = 'Conversion, Payout, Revenue fields can not be "0" when you choose Caps as "Yes"';
                            return false;
                        }
                    }
                    if (isNaN(v - 0)) {
                        var dom = $self.next().find('input[name=' + i + ']');
                        var txt = dom.parent('td').prev('td').text();
                        msg = txt + ' Only numbers are allowed.';
                        return false;
                    }
                    if (i == 'daily_alarm' || i == 'monthly_alarm') {
                        var alarm_dom = $self.next().find('input[name=' + i + ']');
                        var alarm_txt = alarm_dom.parent('td').prev('td').text();
                        if (v !== '' && /^[0-9]{1,2}$/.test(v) === false) {
                            msg = alarm_txt + ' Only integer numbers are allowed.';
                            return false;
                        }
                    }
                })
                if (msg) {
                    return msg;
                }
            },
            params: function(params) {
                var aff_id = that.aff_id;
                var app_id = that.app_id
                params.name = $(this).attr('data-field-name');
                var new_params = { id: params.pk,offer_id:params.pk};
                if(aff_id) new_params.aff_id = aff_id
                if(app_id) new_params.app_id = app_id
                if ('object' === typeof params.value) {
                    console.log(params.value)
                    for (var key in params.value) {
                        new_params[key] = params.value[key];
                    }
                } else {
                    new_params[params.name] = params.value;
                }
                return new_params;
            },
            url: function(new_params) {
                return  Vue.http.post(that.offer_api, new_params)
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    if (new_value.is_caps == 0) {
                        // $(this).parent('td').next('td').find('a.editable').editable('setValue', '');
                    }
                    that.onSuccess && that.onSuccess()
                    return { newValue: new_value };
                } else {
                    that.showAlert(response.body.msg || 'unknown error');
                    return response.body.msg || 'unknown error';
                }
            },
            error: function(response, newValue) {
                that.showAlert(response.body.msg || 'unknown error');
                if(response.status === 500) {
                    return 'Service unavailable. Please try later.';
                } else {
                    return response.body.msg;
                }
            }
        }

        if(!that.is_offer_caps){
            let display = function(value, sourceData) {
                var html;
                var caps_flag = false;

                $.each(value, function(i, n) {
                    if ((i != 'is_caps') && (n - 0 > 0)) {
                        caps_flag = true;
                        return false;
                    }
                })

                if (caps_flag && value.is_caps == 1 ) {
                    html = '<p>Allow Caps: <strong>Yes</strong></p>' +
                        '<p>Daily Conversions: <strong>' + ((value.daily_conversions != 0) ? $('<div>').text(value.daily_conversions).html() : 'Unlimited') +
                        '</strong>, Monthly Conversions: <strong>' + ((value.monthly_conversions != 0) ? $('<div>').text(value.monthly_conversions).html() : 'Unlimited') +
                        '</strong>, Daily Payout: <strong>' + ((value.daily_payout != 0) ? '$ ' + $('<div>').text(value.daily_payout).html() : 'Unlimited') +
                        '</strong>, Monthly Payout: <strong>' + ((value.monthly_payout != 0) ? '$ ' + $('<div>').text(value.monthly_payout).html() : 'Unlimited') +
                        '</strong>, Daily Revenue: <strong>' + ((value.daily_revenue != 0) ? $('<div>').text(value.daily_revenue).html() : 'Unlimited') +
                        '</strong>, Monthly Revenue: <strong>' + ((value.monthly_revenue != 0) ? $('<div>').text(value.monthly_revenue).html() : 'Unlimited') +
                        '</strong>, Daily Alarm: <strong>' + ((value.daily_alarm != 0) ? $('<div>').text(value.daily_alarm).html() : '0') + ' %' +
                        '</strong>, Monthly Alarm: <strong>' + ((value.monthly_alarm != 0) ? $('<div>').text(value.monthly_alarm).html() : '0') + ' %</strong></p>';
                } else {
                    html = 'Allow Caps: <strong>No</strong>';
                }

                $(this).html(html);
            }
            opt.display = display
        }
        $(this.$refs.editable).editable(opt)

        $(that.$refs.editable).on("shown", function(){

        })
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      if(newVal){
        this.renderEditable()
      }
    }
  },
  mounted () {
    let that = this;
    if(that.dynamic_render){
        this.renderEditable()
    }

    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      that.modalState = "show"
    })

  }
}
</script>
