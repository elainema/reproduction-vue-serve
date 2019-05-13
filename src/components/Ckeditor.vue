<!-- 重构富文本组件时记得删除index.html引入的ckeditor.js -->
<template>
    <textarea class="col-md-6" ref="description" rows="5" :name="editor_name" id="description" v-model="description"></textarea>
</template>
<script type="text/javascript">
export default{
    data() {
        return{
            editor_config: {
                toolbar: [
                    ['Source', 'Preview'],
                    ['PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', '-', 'Find', 'Replace'],
                    ['SelectAll', 'RemoveFormat', 'TextColor', 'BGColor'],
                    ['Link', 'Image', 'Table', 'HorizontalRule', 'SpecialChar'],
                    ['Bold', 'Italic', 'Underline', 'Strike'],
                    ['NumberedList', 'BulletedList'],
                    ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Maximize', 'ShowBlocks'],
                    ['Format', 'Font', 'FontSize']
                ],
                startupMode: 'wysiwyg',
                allowedContent:true
            },
            description:""
        }
    },
    props:{
        descriptions:{},
        visibility:{},
        editor_width:{default:700},
        editor_name:{default:"description"},
        allowedContent:{default:false}
    },
    methods: {
        getEditorData() {
            return editor.getData()
        },
        initEditor() {
            let that = this
            setTimeout(function(){
                if(!that.descriptions.match(/<style/g) && that.allowedContent) {
                    let _style =  '<style id="table">.selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-data-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}</style>'

                    window.editor && window.editor.setData(_style + that.descriptions)

                } else {
                    window.editor && window.editor.setData(that.descriptions)

                }
            },1000)
        }
    },
    computed:{

    },
    watch:{
        visibility(newVal, oldVal){
            if(newVal === "show"){
                $("#cke_description").show()
                $(this.$refs.description).addClass("hide")
            }else{
                $("#cke_description").hide()
                $(this.$refs.description).removeClass("hide")
            }
        },
        descriptions(newVal, oldVal){
            this.initEditor()
        }
    },
    mounted () {
        var that = this
        if(that.allowedContent) {
            that.editor_config.allowedContent = that.allowedContent
        }

        if(that.descriptions) {
            this.initEditor()
        }
        _.extend(that.editor_config, {width: that.editor_width})
        window.editor = CKEDITOR.replace('description',that.editor_config);
        window.editor && window.editor.on('instanceReady',function(){
           //blabla
           if(that.visibility === 'hide'){
                $("#cke_description").hide() 
                $(that.$refs.description).addClass("hide")
           }
        });
        window.editor && window.editor.on('change',function(){
           that.description =  that.getEditorData()
        });

    }
}
</script>