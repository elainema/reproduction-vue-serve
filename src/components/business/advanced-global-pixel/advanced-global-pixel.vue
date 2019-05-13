<template>
<div class="globalPixelType" v-show="is_use_advanced_pixel == 1" ref="global_pixel_type">
    <div class="type-action">
        <button class="btn btn-primary btn-submit" @click.prevent="saveAdvancedPixel"><i class="icon-ok icon-white"></i></button>
        <button type="button" class="btn editable-cancel hidden"><i class="icon-remove"></i></button>
    </div>
    <div class="nest-clone cloneya-wrap advanced">
        <div class="toclone cloneya global_pixel_type" v-for="(box,index) in pixels">
            <button class="clone btn btn-add-box mt4 btn-primary" v-show="box_len == 0 || index == box_len" @click.prevent="addBox">Add</button>
            <button class="delete btn btn-delete-box btn-primary" v-show="index != box_len && box_len != 0"  @click.prevent="deletebox(index)">Delete</button>
            <form class="form-horizontal box">
                <div class="box-header">
                    <label class="control-label col-md-3" for="name">Pixel Url</label>
                    <input class="url col-md-4  nomargin " name="url" maxlength="" type="text" :value="box.uri">
                    <div class="icon pull-right">
                        <i class="icon-chevron-up" title="Fold"></i>
                        <i class="icon-chevron-down hide" title="Unfold"></i>
                    </div>
                </div>
                <div class="box-container">
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="requestMethod">Request Method</label>
                        <div class="controls col-md-4 nomargin nopadding">
                            <select name="method" class="method" v-model="box.method">
                                <option value="GET" selected>GET</option>
                                <option value="POST">POST</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group nest-clone inner-wrap cloneya-wrap parameters">
                        <label class="control-label col-md-3" for="parameters">QUERY PARAMETERS</label>
                        <div class="col-md-9 nomargin nopadding parameters">
                            <div class="toclone cloneya" v-for="(elem, indx) in box.parameters">
                                <span v-for="(val, key) in elem">
                                    <input class="paramName col-md-4" maxlength="" type="text" :value="key" @blur="check_parameters_key" placeholder="Aff-param">&nbsp;=&nbsp;
                                    <input class="paramValue col-md-4" maxlength="" type="text" :value="val" placeholder="YM-param">
                                </span>
                                <i class="delete icon-remove" @click.prevent="deleteContent(index, indx, 'parameters')"></i>
                                <i class="clone fa fa-plus icon-plus-sign" v-show="indx == box.parameters.length - 1" @click.prevent="addContent(index, 'parameters')"></i>
                            </div>
                        </div>

                    </div>
                    <div class="control-group form-group nest-clone inner-wrap cloneya-wrap headers">
                        <label class="control-label col-md-3" for="HEADERS">HEADERS</label>
                        <div class="col-md-9 nomargin nopadding headers">
                            <div class="toclone cloneya"  v-for="(item, dex) in box.headers">
                                <span v-for="(val, key) in item">
                                    <input class="paramName col-md-4" maxlength="" type="text" :value="key" @blur="check_headers_key">&nbsp;：&nbsp;
                                    <input class="paramValue col-md-4" maxlength="" type="text" :value="val">
                                </span>
                                <i class="delete icon-remove" @click.prevent="deleteContent(index, dex, 'headers')"></i>
                                <i class="clone fa fa-plus icon-plus-sign" v-show="dex == box.headers.length - 1" @click.prevent="addContent(index, 'headers')"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

</template>
<script>
import Vue from "vue"
import common from '@/util/common'

export default {
    data() {
        return {
            option0:'- Select an Affiliate -',
            affiliate:'',
            pixels:[],
            defaultAdvancedPixel: [{ "uri": "", "method": "GET", "parameters": [{'': ''}], "headers": [{'':''}], id:this.md5Value() }]
        }
    },
    props:{
      renderOffer:{default:false},
      showAlert:{},
      advancedPixel: {
      },
      aff_id:{default:''},
      callBack:{},
      is_use_advanced_pixel:{},
      showLoading :{},
      hideLoading:{},
      customParam:{default:{}},
    },
    computed:{
        box_len() {
            return this.pixels && this.pixels.length - 1
        },
    },
    components: {},
    watch: {
        renderOffer(newVal, oldVal) {
            if (newVal) {
                this.convertPixel()
            }
        },
        aff_id(newVal, oldVal) {
            this.convertPixel()
        },
        advancedPixel() {
            this.convertPixel()
        }
    },
    methods: {
        check_key(e, type) {
            var that = this
            var _val = e.target.value
            var parameters = $(e.target).closest('.toclone').siblings()
            var index = _.filter(parameters, function(n) {
                return $(n).find('.paramName').val() == _val;
            });
            if (index.length > 0) {
                that.showAlert(type +  "\'S key can not be the same, please check !" )
                $(e.target).focus()
            }
        },
        check_parameters_key(e) {
            this.check_key(e, "QUERY PARAMETERS")
        },
        check_headers_key(e) {
            this.check_key(e, "HEADERS")
        },
        md5Value() {
            return Array.apply(0, Array(15)).map(function() {
                return (function(charset) {
                    return charset.charAt(Math.floor(Math.random() * charset.length));
                }('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'));
            }).join('');
        },
        saveAdvancedPixel() {
            var that = this
            that.showLoading()
            var query = that.customParam && that.customParam()
            var pixel = common.cps_offer_global_pixel.getAdvancedPixelParams($(this.$refs.global_pixel_type));
            query.pixel = JSON.stringify(pixel)
            Vue.http.post('Pixel/editAdvancedPixel', query).then(response => {
                this.showAlert && this.showAlert("success!", "success");
                this.hideLoading()
            }, response => {
                this.callBack && this.callBack()
                this.hideLoading()
                this.showAlert && this.showAlert(response.body.msg || 'unknown error');
            })
        },
        addContent(index, type) {
            var action = 'add'
            var newPixel = common.cps_offer_global_pixel.getAdvancedPixelParams($(this.$refs.global_pixel_type), type, index, action);
            this.pixels = newPixel;
        },
        deleteContent(boxIndex, contentIndex, type) {
            var action = 'delete'
            var newPixel = common.cps_offer_global_pixel.getAdvancedPixelParams($(this.$refs.global_pixel_type), type, boxIndex, action, contentIndex);
            this.pixels = newPixel;
        },
        addBox() {
            var newPixel = [];
            var new_box = [{ "uri": "", "method": "GET", "parameters": [{'': ''}], "headers": [{'':''}] , id:this.md5Value()}]
            var old_pixel = common.cps_offer_global_pixel.getAdvancedPixelParams($(this.$refs.global_pixel_type), 'addBox');
            var new_pixel = new_box.concat(old_pixel)
            this.pixels = new_pixel
        },
        deletebox(box_id) {
            var old_pixel = common.cps_offer_global_pixel.getAdvancedPixelParams($(this.$refs.global_pixel_type), 'addBox');
            this.pixels = _.filter(old_pixel, function(item, index) {
                return index != box_id
            });
        },
        attributeCount(obj) {
            var count = 0;
            for(var i in obj) {
                if(obj.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count - 1;
        },
        convertData(obj, type) {
            var type = type,
                data = [];
            for(var i in obj) {
                if(obj.hasOwnProperty(i)) {
                    var item = {};
                    item[i] = obj[i];
                    data.push(item)
                }
            }
            return data
        },
        convertPixel() {
            var that = this
            var pixel = []
            try {
                pixel = JSON.parse(that.advancedPixel);
            } catch (e) {
                console.log('JSON.parse ' + pixel + ' error!')
            }
            if (pixel && pixel.length == 0) {
                pixel = this.defaultAdvancedPixel
            } else {
                $.map(pixel, function(elem, index) {
                    $.each(elem, function(indx, el) {
                        if (indx === 'parameters' || indx === 'headers') {
                            var data = that.convertData(el)
                            elem[indx] = data
                        }
                    });
                })
            }
            pixel.id = that.md5Value()
            this.pixels = pixel
        },
    },  
    mounted() {
        if(this.renderOffer) {
            this.convertPixel()
        }
    }
}
</script>

<style>
.box{
    border: none
}
.globalPixelType{
    padding: 10px;
    width: 90%;
    border: 1px #ccc solid;
}
.globalPixelType .editable-cancel{
    background: #d0c5a5;
    color: #4b3817;
}
.global_pixel_type{
    background: transparent;
    border-radius: 5px;
    border: 1px #ddd solid;
    padding: 10px 10px 0 10px;
    position: relative;
    margin: 10px 0;
}
.global_pixel_type .box{
    box-shadow: none;
}
.global_pixel_type .box-header{
    background: transparent;
    padding-left: 0;
    padding-bottom: 15px;
    font-size: 13px
}
.frm-entity .controls .btn_delete{
    margin-left: 50px;
    cursor: pointer;
}
.global_pixel_type button[type=submit] {
    margin-left: 100px;
}
.global_pixel_type .btn_Add,
.global_pixel_type .btn_delete，
.global_pixel_type .icon-remove,
.global_pixel_type [class*="icon"]{
    cursor: pointer;
}
.global_pixel_type [class*="icon"]:hover{
    opacity: 1;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}
.global_pixel_type .btn-add-box,
.global_pixel_type .btn-delete-box,
.global_pixel_type .btn-submit{
    position: absolute;
    top: 10px;
    z-index: 1000;
}
.global_pixel_type .btn-add-box,
.global_pixel_type .btn-delete-box{
    right: 20%;
}
.global_pixel_type .editable-submit{
    right: 15%;
    height: 30px;
}
/* .global_pixel_type .btn-delete-box{
    left: 56%;
} */
.global_pixel_type .icon-plus-sign,
.global_pixel_type .icon-remove{
    font-size: 13px;
}
.global_pixel_type .icon-plus-sign{
    display: block;
    margin: 0 0 5px 0
}
.global_pixel_type  input[name="url"]{
    margin: 0 0 20px 20px;
}
.global_pixel_type .row-editable input{
    width:200px;
}
.form-horizontal .cloneya input{
    margin-bottom: 5px;
}
.type-action{
    text-align: right;
}
.advanced{
    z-index: 10000;
    width: 90%;
}
</style>
