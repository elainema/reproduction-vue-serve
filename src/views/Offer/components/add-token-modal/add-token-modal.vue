<template>
<modal 
  :dialogVisible.sync="outerVisible" 
  :cancelText="'Close'" 
  :showConfirmText="false"
  :title="'Add Tokens'"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <div class="control-group form-group row">
      <span class="control-label col-md-3">Conversion Pixel<span class=""></span></span>
      <textarea 
          id="add_conversion_pixel_textarea"  
          :value="addConversionPixel || conversion_pixel" 
          class="col-md-8" 
          readonly="" 
          style="min-height: 75pt;background-color: #fff;" 
          @click="showPrompt(addConversionPixel || conversion_pixel)">
      </textarea>
  	</div>
    <table class="table table-hover tablesorter">
        <thead>
            <tr>
                <th>Token Name</th>
                <th class="left">Description</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="add_token_list">
            <tr v-for="(token,index) in tokenList" :key="index">
                <td>{{token.tokenName}}</td>
                <td>{{token.description}}</td>
                <td><input :value="token.tokenName" type="checkbox" v-model="checkedTokenList"/></td>
            </tr>
        </tbody>
    </table>	
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
          checkedTokenList:[],
          addConversionPixel:"",
          outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    props:{
    	tokenList:{
    		type:Array,
    		required:true
    	},
    	conversion_pixel:{
    		type:String,
    		required:true
    	},
    	modalStateAddTokenModal:{
    		type:[Boolean,String],
    		required:true
    	},
      dialogName:{
        type: String,
        required: true,
        default: ''
      },
      showPrompt:{
        type:Function,
        required: true,
      }
    },
    watch:{
        checkedTokenList(newVal, oldVal) {
            if (newVal) {
                this.updateTokenList()
            }
        },
        modalStateAddTokenModal () {
        	this.outerVisible = this.modalStateAddTokenModal
        }
    },
    methods:{
      updateTokenList() {
          let addConversionPixel = this.conversion_pixel
          this.checkedTokenList.forEach((el,index) => {
              addConversionPixel += `&${el}={${el}}`
          })
          this.addConversionPixel = addConversionPixel
      }
    }
}
</script>