<template>
<div class="uploadFile">
    <el-button class="mask" size="small" type="primary" disabled v-show="disabled">{{btnName}}</el-button>
    <el-upload
      action="string"
      :multiple="multiple"
      :accept="accept"
      :http-request="httpRequest"
      :show-file-list="false">
      <el-button size="small" type="primary">{{btnName}}</el-button>
    </el-upload>
</div>
</template>

<script>
export default{
    data() {
        return {
        }
    },
    components:{},
    props:{
        disabled:{
            type:Boolean,
            required: false,
            default:false
        },
        multiple:{
            type:Boolean,
            required: false,
            default:false
        },
        btnName:{
            type:String,
            required: false,
            default:'Upload'
        },
        nonsupport:{
            type:String,
            required: false,
            default:'image/bmp'
        },
        accept:{
            type:String,
            required: false,
            default:'.jpg,.jpeg,.png,.gif,.bmp,.txt,.doc,.ppt,.pdf,.rar,.zip,.mp4'
        },
        uploadFile:{
            type:Function,
            required: true,
        },
    },
    computed: {
    },
    methods:{
        httpRequest(param){
            var fileObj = param.file;// 文件对象
            this.uploadFile(fileObj)
        },  
    }

}
</script>

<style lang="less">
.el-upload .el-upload__input {
    display: none;
}
input[type=file] {
    display: none;
}
.uploadFile {
    position: relative;
    display: inline-block;
    .mask{
        position: absolute;
    }
    .el-button--primary{
        border-radius: 0;
    }
}
</style>
