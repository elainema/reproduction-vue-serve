<template>
<div :class="chosen_container_class">
    <select v-if="chosenName === 'geo'" ref="chosen_container" :class="classList" data-control-name='bt-select'>
        <option v-if="option0"  value="">{{option0}}</option>
        <option v-for="n in chosenInfo" :value="n.id" :data-name="n.name">{{ n.code }} - {{ n.name }}</option>
    </select>
   <select v-else-if="chosenName === 'conversionFlow'" ref="chosen_container" :class="classList" data-control-name='bt-select'>
       <option v-if="option0"  value="">{{option0}}</option>
       <option v-for="n in chosenInfo" :value="n.id" :data-name="n.name">{{ n.name }}</option>
   </select>
   <select v-else ref="chosen_container" :class="classList" data-control-name='bt-select' :name="chosenName">
       <option v-if="option0"  value="">{{option0}}</option>
       <option v-for="n in chosenInfo" :value="n.id" :data-name="n.name" :text="n.key ? n.key : ''">{{ n.text }}</option>
   </select>
</div>
</template>

<script>
import Vue from "vue"
export default {
    data(){
        return {
        }
    },
    props: {
        'option0':{
            default:''
        },
        'chosenInfo': {
        },
        'chosenName': {default:"publisher"},
        'renderOffer':{default:false},
        'chosenCallback':{type:Function,default:function(){return $.noop}},
        "classList": {
            default: 'col-md-3 chosenSelect'
        },
        onChange:{},
        defaultVal:{
            default:''
        },
        placeholder:{default:''
        },
        chosenWidth:{default:'270px'
        },
        chosen_container_class:{default:'inline-block'}
    },
    computed: {
    },
    components: {},
    methods: {
      renderChosen(){
        this.$nextTick(function(){
            let that = this
            $(that.$refs.chosen_container).chosen({ width: this.chosenWidth }).on('change', function(e) {
                var v = e.target.value,
                    name = $(e.target).find("option:selected").attr("data-name"),
                    text = $(e.target).find("option:selected").text()
                that.chosenCallback && that.chosenCallback(v,name, text, $(that.$refs.chosen_container))
                that.onChange && that.onChange(v,name,text)
            }).trigger('chosen:updated');
        })
      }
    },
    watch:{
        chosenInfo(newVal, oldVal) {
            let that = this
            //if (newVal) {
            that.$nextTick(function(){
                $(that.$refs.chosen_container).find("option:first").prop("selected", true)
                $(that.$refs.chosen_container).trigger('chosen:updated');
            })
            //}

        },
        defaultVal(newVal, oldVal) {
            if (newVal) {
                if (this.defaultVal) {
                    
                  this.$nextTick(function(){
                    $(this.$refs.chosen_container).find('option[value="' + this.defaultVal + '"]').prop('selected', 'selected');
                    $(this.$refs.chosen_container).trigger('chosen:updated').trigger('change');
                  })

                }
            } else {
                $(this.$refs.chosen_container).find('option]')[0].prop('selected', 'selected');
            }
        },
        renderOffer:function(newVal, oldVal){
            if (newVal) {
              this.renderChosen()
            }
        },
    },
    mounted () {
      if(this.renderOffer){
        this.renderChosen()
      }

    }

}
</script>
<style scoped>
    .inline-block{
        display: inline-block;
    }
</style>
