<template>
<div>
  <div class="control-group form-group">
      <label class="control-label col-md-2">Publisher</label>
      <div class="col-md-10" id="kpi_ids" ref="kpi_ids">
        <el-table
          :data="lastDayData"
          :span-method="objectSpanMethod"
          empty-text="There is no data."
          border
          style="width: 100%;">
          <el-table-column
              prop="aff_id"
              label="Publisher Id">
          </el-table-column>
          <el-table-column
              prop="affiliate"
              label="Publisher Name">
          </el-table-column>
          <el-table-column
              prop="shadow_aff_id"
              label="Shadow Affiliate Id"
              width="180">
          </el-table-column>
          <el-table-column
              label="Percent">
              <template slot-scope="scope">
                <span>{{ scope.row.rate ? (scope.row.rate*100).toFixed(2) : 100 }}%</span>
              </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
  <div class="control-group">
      <div class="col-md-4 col-md-offset-2 blend_traffic" >
          <button class="btn btn-primary" @click="manualSubmit" :disabled="lastDayData.length == 0" v-yeah-loading='loadingBtn'>{{autoText2}} </button>
      </div>
      <div class="col-md-1 col-md-offset-3">
          <button type="button" class="btn btn-primary" :disabled="manualStart" @click="showEditModal">Edit</button>
      </div>
  </div>
  <edit-blend-traffic-modal  
    :modalState.sync="manualEditState"
    :showAlert="showAlert" 
    :accessInfo="accessInfo" 
    :lastDayData="lastDayData" 
    :onConfirm="savaBlendData"
    :shadowAffiliate="allShadowAffiliatesManul"
    :dialogName="'modalState'">
  </edit-blend-traffic-modal>
</div>
</template>


<script>
import Vue from "vue";
/*const EditBlendTrafficModal = () => import(
 webpackChunkName: "EditBlendTrafficModal"  '../edit-blend-traffic-modal/');*/
import EditBlendTrafficModal from '../edit-blend-traffic-modal/'
export default {
  name: 'ManualBlendTraffic',
  data() {
    return{
      manualEditState: false,
    }
  },
  components: {EditBlendTrafficModal},
  props:{
    autoText2:{
      type:String,
      required:true
    },
    loadingBtn:{
      type:Boolean,
      required:true
    },
    lastDayData:{
      type:Array,
      required:true
    },
    manualSubmit:{
      type:Function,
      required:true
    },
    manualStart:{
      type:Boolean,
      required:true
    },
    savaBlendData:{
      type:Function,
      required:true
    },
    accessInfo:{
      type:Array,
      required:true
    },
    allShadowAffiliatesManul:{
      type:Array,
      required:true
    },
    showAlert:{
      type:Function,
      required:true
    },
    spanArr:{
      type:Array,
      required:true
    },
  },
  methods:{
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
          const _row = this.spanArr[rowIndex];
          const _col = _row > 0 ? 1 : 0;
          return {
              rowspan: _row,
              colspan: _col
          }
        }
    },
    showEditModal(){
      this.manualEditState = true
    },
  },
  mounted () {
    
  },
}
</script>