<template>
    <div class="help_box">
        <i style="margin-left:10px;cursor:pointer" @mousemove="showBox" @mouseout="hideBox"  class="fa fa-info-circle"></i>
        <div class="help_notice" v-show="isShowBox" v-html="content">
           
        </div>
    </div>
</template>
<script>
import  Vue from 'vue'
export default {
    data() {
        return {
            isShowBox : false
        }
    },
    methods: {
        showBox(){
            this.isShowBox = true
        },
        hideBox(){
            this.isShowBox = false
        }
    },
    props: {
        content:''
    }
}
</script>

<style>
.help_notice {
    width:600px;
    background: #fff2cc;
    border:1px solid #999;
    box-shadow: 5px 5px 10px #888888;
    padding:5px;
    position: absolute;
    left:25px;
    top:20px;
    z-index: 100;
    color:#000;
    text-align: left;
    font-size:12px;
    line-height: 180%;
}
.help_box {
    display: inline-block;
    position: relative;
    z-index: 10;
}
</style>

