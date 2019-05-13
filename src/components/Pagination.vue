<template>
<div class="btn-group pagination" >
    <div class="pull-right">
        <span>Page {{page.page}} of {{page.page_num}}</span>
        <select class="pageSel" name="page_limit" @change="changeLimitSelect" ref="select" v-model="page_limit" v-if="!no_limit">

            <option value="20">- 20 -</option>
            <option value="30">- 30 -</option>
            <option value="50">- 50 -</option>
        </select>
        <a class="btn" :disabled="!page.has_previous" href="javascript:void(0);" @click="toPrev" ref="prev"> Prev</a>
        <a class="btn" :class="n == currentPage ? 'btn-active' : ''" href="javascript:;" v-for="(n,k) in page.page_range" :key="k" @click="changePage(n,k,page.page_range)" v-html="n"></a>
        <a class="btn" :disabled="!page.has_next" href="javascript:;"  @click="toNext" ref="next"> Next</a>
        <input name="go_page" class="ipt form-control" type="text" v-model="gotoPage" onkeyup="value=value.replace(/[^\d]/g,'')">
        <input name="go_btn" type="button" value="Go" class="btn" @click="toPage">
    </div>

</div>

</template>
<script>

export default {
  data(){
    return {
        gotoPage:"",
        page_limit:20,
    }
  },
  props:  {
    page:{
      default:function(){
        return {}
      }
    },
    onChangePage:{},
    currentPage: {
    },
    onChangeLimit:{},
    no_limit:{default:false},
    pageLimit:{default:20}
  },
  computed: {

  },
  watch:{
    pageLimit() {
        this.page_limit = this.pageLimit
    },
  },
  methods: {
    changeLimitSelect:function(){
        this.onChangeLimit($(this.$refs.select).val())
    },
    changePage(n,index,pageRange){
        this.onChangePage(n,index,pageRange)
    },
    toPrev(){
        if(!($(this.$refs.prev).attr("disabled") === "disabled")){
            this.changePage(parseInt(this.currentPage) - 1)
        } 
    },
    toPage(){
        var num = parseInt(this.gotoPage)
        if(num > this.page.page_num || num < 1) return;
        if(this.gotoPage){
            this.changePage(this.gotoPage)
        }
    },
    toNext(){
        if(!($(this.$refs.next).attr("disabled") === "disabled")){
            this.changePage(parseInt(this.currentPage) + 1)

        } 
    }
  },
  mounted () {

  }
}
</script>

<style>

.pagination .pageSel{
    margin: 0 5px;
    padding: 2px;
    width: 70px;
    height: 30px;
    background: #fff;
    border: 1px solid #e0e0e0;
    color: #4a3716;
    line-height: 30px;
    float: left;
}

.pagination .pageSel:hover {
    background-color: #fff;
    color: #333;
    border-color: #ff8400;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(255,132,0,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(255,132,0,.6)
}

.pagination span,.pagination span:first-child {
    float: left;
    font-size: 9pt;
    height: 30px;
    line-height: 22px;
    margin: 0 2px;
    vertical-align: middle;
    padding: 4px 8px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background: #d0c6a5;
    border: 1px solid #a89676;
    color: #000;
    background: 0 0;
    border: none;
}

.pagination a.btn {
    color: #333;
    height: 30px;
    margin:0 4px;
    background-color: #fff;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e0e0e0;
    border-radius: 0;
    float: left;
}

.pagination a.btn:hover{
    background-color: #fff;
    border-color: #fd9611;
    color: #fd9611;
}
.pagination a.btn-active {
    background: #fd9611;
    border: 1px solid #fd9611;
    color: #fff;
    border-radius: 0;
    height: 30px;
    font-size: 14px;
}
.pagination input.btn {
    margin: 0 5px;
    padding: 0 8px;
    font-size: 9pt;
    font-weight: 700;
    color: #fff;
    text-shadow: none;
    background: #fd9611;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    border: 1px solid #fd9611;
    border-radius: 0;
    float: left
}



.pagination input.ipt {
    display: inline-block;
    float: left;
    padding: 4px 6px;
    line-height: 30px;
    height: 30px;
    width: 42px;
    margin-bottom: 0;
    margin-left: 4px;
}



.pagination a.hellip {
    background: 0 0;
    border: none;
    margin: 0
}

.pagination a.btn-active {
    text-shadow: none;
    box-shadow: none
}
</style>
