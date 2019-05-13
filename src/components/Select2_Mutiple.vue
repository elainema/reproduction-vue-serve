<template>
    <select :data-placeholder="placeholder" class="" :name="selectName" :id="id" multiple="multiple" ref="mutipleSelect">
        <option v-if="option0" value="" selected="selected"  data-locked="true">{{option0}}</option>
        <option :value="n.id" v-for="n in selectInfo">{{ n.name }}</option>
    </select>
</template>
<script>

import Vue from "vue"
export default {
    data(){
        return {
        }
    },
    props: {
        option0:{
            default:''
        },
        placeholder:{default:''},
        selectName:{default:''},
        id :{default:''},
        multiple: {default:true},
        defaultVal:{},
        selectInfo:{},
        renderOffer:{default:false},
        callBack:{},
    },
    computed: {
    },
    components: {},
    methods: {
    },
    watch:{
        defaultVal(newVal, oldVal) {
            let that = this
            if (newVal) {
                $.each(that.defaultVal, function(ci, cn) {
                    $(that.$refs.mutipleSelect).find('option[value="' + cn + '"]').attr('selected', 'selected');
                })
                $(that.$refs.mutipleSelect).select2().trigger('select2-selecting');
            }
        },
        renderOffer:function(newVal, oldVal){

            let that = this
            $(this.$refs.mutipleSelect).select2()
            $(that.$refs.mutipleSelect)
                .on('select2-selecting', function(e) {
                    that.callBack && that.callBack(e.val)
                    if (e.val == '') {
                        $(this).select2('val', '')
                    } else {
                        $(that.$refs.mutipleSelect).find('option[value=""]').removeAttr('selected').trigger('change');
                    }
                })
                .on('change', function(e) {
                    if (typeof(e.val) !== 'undefined' && e.val.length == 0) {
                        setTimeout(function() {
                            $(that.$refs.mutipleSelect).find('option[value=""]').attr('selected', true).trigger('change');
                        }, 10)
                        that.callBack && that.callBack('')
                    }
                })
        },
    },
    mounted () {
    }

}
</script>