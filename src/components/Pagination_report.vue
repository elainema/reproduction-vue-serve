<template>
<div class="btn-group pagination clearfix" >
    <div class="pull-right">
        <a class="btn" :disabled="currentPage === 1 " href="javascript:void(0);" @click="toPrev" ref="prev"> Prev</a>
        <a class="btn" :class="n === currentPage ? 'btn-active' : ''" href="javascript:;" v-for="n in pagetotal" @click="changePage(n)">{{n}}</a>
        <a class="btn" href="javascript:;" v-if="page.hasMore">...</a>
        <a class="btn" :disabled="this.currentPage === pagetotal" href="javascript:;"  @click="toNext" ref="next"> Next</a>
    </div>

</div>

</template>
<script>

export default {
  data(){
    return {
    }
  },
  props:  {
    page:{
      default:{}
    },
    onChangePage:{},
    currentPage: {

    }
  },
  computed: {
    pagetotal(){
        let total = this.page.total > 150 ? 150 : this.page.total
        let pagenumber = this.page.pagenumber*3;

        if(Math.round(total / 50) < (total / 50)){
            return pagenumber + (Math.round(total / 50) + 1)
        } else {
            return pagenumber + Math.round(total / 50)
        }

    }
  },
  methods: {
    changePage(n){
        this.onChangePage(n)
    },
    toPrev(){
        if(!($(this.$refs.prev).attr("disabled") === "disabled")){
            this.changePage(this.currentPage - 1)
        } 
    },
    toNext(){
        if(!($(this.$refs.next).attr("disabled") === "disabled")){
            this.changePage(this.currentPage + 1)

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