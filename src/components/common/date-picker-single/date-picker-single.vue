<template>
	<div class="eldatepicker" id="elDatePickerSingle">
		<el-date-picker
			:class="classList"
			:name="name"
			v-model="start"
			type="date"
			size="'small'"
			placeholder="选择日期"
			format="yyyy-MM-dd"
			@change="onChange"
			:clearable="false"
			:editable="false"
			:picker-options="pickerOptions"
			value-format="yyyy-MM-dd">
		</el-date-picker>
	</div>
</template>

<script>
import Vue from "vue"
export default {
	props: {
	  defaultDate: {
	    required: false,
	    default:  () => {
	    	return moment().format("YYYY-MM-DD")
	    }
	  },
	  pickerOptions:{
	  	type:Object,
	    required: false,
	    default: () => {
	    	return {}
	    }
	  },
	  name:{
	  	type:String,
	    required: false,
	    default:''
	  },
	  classList:{
	  	type:String,
	    required: false,
	    default:''
	  }
	},
	data () {
	  return {
	  	start:'',
	  }
	},
	methods: {
	  onChange () {
	  	let vm = this
	    vm.$emit('update:defaultDate', this.start)
	  },
	},
	mounted() {
		this.start = this.defaultDate
	}
}
</script>

<style lang="less">
@import '~@css/_var.less';
.commonActive(){
  background-color: #286090;
  border-color: #204d74;
}
.dateYeadHover(){
	color: @bodyColor;
  background: #ffb32f!important;
}
.dateYeadCurrent(){
  color: @bodyColor;
  background: #eee;
}
.dateYearTdCell(){
	display: block;
	width: 54px;
  height: 54px;
  line-height: 54px;
  float: left;
  margin: 1%;
  cursor: pointer;
  border-radius: 4px;
}
.eldatepicker{
	display: inline-block;
}
.eldatepicker .el-input__prefix{
  display: none !important;
}
.el-input--prefix .el-input__inner{
	padding-left: 12px;
	padding-right: 0;    
	width: auto;
  display: inline-block;
}
.el-date-table{
	th{
		padding: 5px;
    color: #4c3c1b!important;
    font-size: 14px;
    font-weight: 700;
	}
	td{
		width: 30px;
		padding: 0;
	  height: 30px;
	  border-radius: 4px;
	  border: none;
	  box-sizing: border-box;
		&.today {
		  background-color: #ffdb99 !important;
		  border-color: #ffb733 !important;
		  &:hover{
		  	color: #000 !important;
		    background-color: #ffc966 !important;
		    border-color: #f59e00 !important;
		  }
		  span {
			  color: #000 !important;
				font-weight: 100 !important;
			}
		}
		div{
			padding:0;    
		}
	  &.available:hover, &.available.focused{
	  	background: #eee;
	    cursor: pointer;
	  }
		span {
		  color: @bodyColor;
		  font-size: 14px;
		  text-align: center;
		  width: 30px;
		  height: 30px;    
		  line-height: 30px;
		  border-radius: 4px;
		  border: none;
		}
		&.current:not(.disabled){
			 &:hover {
			  color: #fff;
		    background-color: #204d74;
		    border-color: #122b40;
			}
	    span {
			  color: #fff;
			  background-color: transparent;
			  border-color: transparent;
			}
		  .commonActive()
		}
		&.disabled div{
	    background: 0 0;
		}
		&.disabled span{
	    color: #aaa;
		}
	}
}
.el-date-picker__header-label{
	color: #515a6e !important;
  font-weight: 700 !important;
}
.el-month-table td, .el-year-table td{
	padding:0;
}
.el-month-table td .cell, .el-year-table td .cell{
	.dateYearTdCell()
}
.el-date-picker table {
  margin-top: 10px;
}
.el-month-table td.current:not(.disabled) .cell,.el-year-table td.current:not(.disabled) .cell {
  .dateYeadCurrent()
}
.el-month-table td .cell:hover,.el-year-table td .cell:hover {  
	.dateYeadHover()
}
#elDatePickerSingle input[type=text][readonly]{
	cursor: pointer;
}
</style>