<template>
<div ref="mutipleEvent" class="multiple_events">
    <div class="type-action" v-show="showSubmit">
        <button class="btn btn-primary btn-submit pull-right" type="submit" data-type="offer_id" @click.prevent="saveMutipleEvents"><i class="icon-ok icon-white"></i></button>
    </div>
    <div v-for="(box,index) in boxes" :id="index" class="toclone cloneya multiple_events_box">
        <button class="clone btn btn-primary btn-add-box mt4 pull-right" @click.prevent="addBox" v-show="box_len == 0 || index == box_len">Add</button>
        <button class="delete btn btn-primary btn-delete-box pull-right" @click.prevent="deletebox(index)" v-show="index != box_len && box_len != 0">Delete</button>
        <div class="events_box_content">
            <div class="control-group form-group field-required">
                <label class="control-label col-md-2" for="eventName">Event Name<i class="icon-exclamation red"></i></label>
                <div class="controls">
                    <input class="col-md-3 event_name" v-show="offer_type == 'cps'" name="eventName" maxlength="" type="text" :required="offer_type == 'cps'" :value="eventName(box)">
                </div>
            </div>
            <div class="control-group form-group field-required">
                <label class="control-label col-md-2" for="conv_times">Conversion Times<i class="icon-exclamation red"></i></label>
                <div class="controls">
                    <select class="col-md-3 conv_times" v-show="offer_type == 'cps'" name="conv_times" id="" v-model="box.conv_times" @change="changeBoxes">
                        <option value="1">Once</option>
                        <option value="0">Unlimited</option>
                    </select>
                </div>
            </div>
            <div class="control-group form-group field-required">
                <label class="control-label col-md-2" for="">Revenue per Conversion<i class="icon-exclamation red"></i></label>
                <div class="controls">
                    <div class="col-md-3" v-show="is_dynamic_revenue != 1" style="padding-left:0;">
                        <div class="input-group">
                            <input class="form-control revenue_percentage" v-show="offer_type == 'cps'" name="revenue_percentage" id="" maxlength="200" type="text" :required="offer_type == 'cps'"  :value="box.revenue_percentage">
                            <span class="input-group-addon">%</span>
                        </div>
                        <span>of order amount</span>
                    </div>
                    <div class="col-md-3" style="padding-left:0">
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input class="form-control revenue" v-show="offer_type == 'cps'" name="revenue" id="" maxlength="200" type="text" :required="offer_type == 'cps'"  :value="box.revenue">
                        </div>
                    </div>
                </div>
            </div>
            <div class="control-group form-group field-required dynamicHide" v-show="is_dynamic_revenue != 1">
                <label class="control-label col-md-2" for="">Payout per Conversion<i class="icon-exclamation red"></i></label>
                <div class="controls">
                    <div class="col-md-3" style="padding-left:0">
                        <div class="input-group">
                            <input class="form-control payout_percentage" v-show="offer_type == 'cps'" name="payout_percentage" id="" maxlength="200" type="text" :required="offer_type == 'cps'" :value="box.payout_percentage">
                            <span class="input-group-addon">%</span>
                        </div>
                        <span>of order amount</span>
                    </div>
                    <div class="col-md-3" style="padding-left:0">
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input class="form-control payout" v-show="offer_type == 'cps'" name="payout" id="" maxlength="200" type="text"  :required="offer_type == 'cps'" :value="box.payout">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue"
import common from '../util/common'

export default {
    data() {
        return {
            boxes: [{
                revenue_percentage: "0.00",
                payout_percentage: "0.00",
                revenue: "0.00",
                payout: "0.00",
                conv_times: "1",
                eventName: ""
            }],
        }
    },
    props:{
      renderOffer:{default:false},
      offer_type:{default: 'cps'},
      showSubmit: {default:false},
      offerInfo: {
           default: () => []
        },
      callBack:{},
      showAlert:{},
      default_dynamic_revenue: {},
      showLoading :{},
      hideLoading:{},
    },
    computed:{
        box_len() {
            return this.boxes && this.boxes.length - 1
        },
        is_dynamic_revenue() {
            return this.offerInfo && this.offerInfo.is_dynamic_revenue || this.default_dynamic_revenue
        },
    },
    components: {},
    watch: {
        renderOffer:function(newVal, oldVal){
            let that = this
            if (newVal) {
                this.getEvents();
            }

        }
    },
    methods: {
        changeBoxes(e) {
            var old_pixel = common.CPS_Offer_multipleEvents_settings.getEventsParams($(this.$refs.mutipleEvent),  this.is_dynamic_revenue);
            var index = $(e.target).parents().closest(".multiple_events_box").attr("id")
            var val = $(e.target).val()
            old_pixel[index].conv_times = val
            this.boxes = old_pixel
        },
        eventName(box) {
            return box.eventName || box.event_name
        },
        getEvents() {
            this.boxes = this.offerInfo && this.offerInfo.event || this.boxes
        },
        saveMutipleEvents() {
            this.showLoading && this.showLoading()
            var query = {}
            var flag = this.checkInputs($(this.$refs.mutipleEvent, this.is_dynamic_revenue))
            if (flag) {
                var events = common.CPS_Offer_multipleEvents_settings.getEventsParams($(this.$refs.mutipleEvent, this.is_dynamic_revenue));
                query = {
                    id: this.$route.query.id,
                    is_dynamic_revenue: this.is_dynamic_revenue,
                    event:events,
                    method: "-1"
                }
                if (this.saveType === 'aff_id') {
                    query.aff_id = this.aff_id
                }
                Vue.http.post('Offer2/setTask', query).then(response => {
                    this.showAlert(response.body && response.body.msg, 'success')
                    this.hideLoading && this.hideLoading()
                }, response => {
                    this.hideLoading && this.hideLoading()
                    this.showAlert(response.body && response.body.msg, 'error')
                    this.callBack && this.callBack()
                })
            }
            this.hideLoading && this.hideLoading()
        },
        addBox() {
            var new_pixel = [];
            var new_box = [{
                revenue_percentage: "0.00",
                payout_percentage: "0.00",
                revenue: "0.00",
                payout: "0.00",
                conv_times: "1",
                eventName: ""
            }]
            var old_pixel = common.CPS_Offer_multipleEvents_settings.getEventsParams($(this.$refs.mutipleEvent),  this.is_dynamic_revenue);
            var new_pixel = new_box.concat(old_pixel)
            this.boxes = new_pixel
        },
        deletebox(box) {
            var old_pixel = common.CPS_Offer_multipleEvents_settings.getEventsParams($(this.$refs.mutipleEvent),  this.is_dynamic_revenue);
            this.boxes = _.filter(old_pixel, function(item, index) {
                return index != box
            });

        },
        checkInputs: function(currentDom,is_dynamic_revenue) {
            var that = this;
            var currentDom = currentDom;
            var flag = false
            var forms = $(".multiple_events_box", currentDom);
            var eventName = [];
            var needsChecks= [
                  {
                    el: "event_name",
                    msg: 'Event Name'
                  },
                  {
                    el: "conv_times",
                    msg: 'Conversion Times'
                  },
                  {
                    el: "revenue",
                    msg: 'Revenue'
                  },
                  {
                    el: "payout",
                    msg: 'payout'
                  },
                  {
                    el: "revenue_percentage",
                    msg: 'Revenue per Conversion'
                  },
                  {
                    el: "payout_percentage",
                    msg: 'Payout per Conversion'
                  }
                ]
            $(forms).each(function(index, form) {
                var _this = form;
                var name = $.trim($(".event_name", _this).val());
                if (name != "") {
                    eventName.push($.trim($(".event_name", _this).val()))
                }
            })
            if (eventName.length > 1) {
                var len = eventName.length;
                for (var i = 0; i < len; i++) {
                    for (var j = 1; j < len; j++) {
                        if (i != j && eventName[i] == eventName[j]) {
                            that.showAlert("Event Name can't cannot be the same", "info");
                            return false
                        }
                    }
                }
            }
            $(forms).each(function(index, item) {
                var query = {};
                var _this = item;
                $(needsChecks).each(function (i, elem) {
                   var checkedEl = $(_this).find("." + elem.el);
                    if (checkedEl.is(':visible') && $.trim(checkedEl.val()) == "") {
                        that.showAlert('Please input ' + elem.msg, "info");
                        $(checkedEl).focus();
                        flag = false
                        return false
                    } else {
                        flag = true
                        return true
                    }
                });
                if (!flag) {
                    flag = false
                    return false
                } else {
                    flag = true
                    return true
                }
            })
            return flag
        },
    },
    mounted() {
    }
}
</script>
<style scoped>
.form-horizontal .cloneya input{
    margin-bottom: 0;
}
.field-required i.red{
    position: relative;
    top: 0;
    padding-left: 15px;
}
.events_box_content{
    margin-top: 15px;
}
.multiple_events {
     border: 1px solid #ddd;
     padding: 10px;
}
.multiple_events_box{
    border: 1px #ccc solid;
    padding: 10px;
}
.multiple_events_box .editable-cancel{
    background: #d0c5a5;
    color: #4b3817;
}
.multiple_events_box{
    background: transparent;
    border-radius: 5px;
    border: 1px #ddd solid;
    padding: 10px 10px 0 10px;
    position: relative;
    margin: 50px 0;
}
.multiple_events_box .box{
    box-shadow: none;
}
.multiple_events_box .box-header{
    background: transparent;
    padding-left: 0;
    padding-bottom: 15px;
}
.frm-entity .controls .btn_delete{
    margin-left: 50px;
    cursor: pointer;
}
.multiple_events_box button[type=submit] {
    margin-left: 100px;
}
.multiple_events_box .btn_Add,
.multiple_events_box .btn_delete，
.multiple_events_box .icon-remove,
.multiple_events_box [class*="icon"]{
    cursor: pointer;
}
.multiple_events_box [class*="icon"]:hover{
    opacity: 1;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}
.multiple_events_box .btn-add-box,
.multiple_events_box .btn-delete-box,
.multiple_events_box .btn-submit{
    top: 10px;
    z-index: 1000;
    position: absolute;
}
.multiple_events_box .btn-add-box,
.multiple_events_box .btn-delete-box{
    right: 10%;
}
.multiple_events_box .editable-submit{
    left: 65%;
    height: 30px;
}
/* .global_pixel_type .btn-delete-box{
    left: 56%;
} */
.multiple_events_box .icon-plus-sign,
.multiple_events_box .icon-remove{
    font-size: 20px;
}
.multiple_events_box .icon-plus-sign{
    display: block;
    margin: 0 0 5px 0
}
.multiple_events_box .dynamicHide{
}
.multiple_events_box .row-editable input{
    width:200px;
}
.type-action{
    text-align: right;
}
.advanced{
    z-index: 10000;
    width: 90%;
}
</style>