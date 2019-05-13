<template>
<div ref="QA">
    <div class="controls col-md-10 nomargin nopadding">
        <select class="col-md-5" ref="app_questions" @change="handle_app_questions" v-model="cur_question_type">
            <option value="">- Questions -</option>
            <option value="1">What's your traffic source for this offer?</option>
            <option value="2">Will you use your own pre-sell page, texts and banner?</option>
            <option value="3">Extra Question</option>
        </select>
    </div>
    <div id="app_qna_container" :class="classList">
        <div v-for="question in app_questions" class="controls clearfix" :id="question.id">
            <input :readonly="question.question_type != 3" type="text" name="question[]" class="col-md-6" placeholder="Question" :required="required" v-model="question.question_title" />
            <span class="positional">
                <span class="close" title="Remove" @click.prevent="removeQues(question.id)">x</span>
            </span><br />
            <textarea class="col-md-6 clearfix" rows="3" name="answer[]" placeholder="Expected Answer" :required="required" v-model="question.question_default_value">
            </textarea>
        </div>
    </div>
</div>
</template>
<script>
export default{
    props: {
        "is_require_approval": {
            default:0
        },
        "defaultQuestions":{default:{}},
        "renderOffer":{},
        "disabledTitle":false,
        "showDefaultQA":{default:true},
        "classList":{default:'controls clearfix'},
        "removeCallback":{default:function() {}},
        "required":{default:false},
        "is_private":{},
    },
    data() {
        return{
            app_questions:[],
            cur_question_type:3,
        }
    },
    watch:{
        renderOffer(newVal, oldVal) {
           this.getInitQuestions()
        },
        is_require_approval(newVal, oldVal) {
           if (!newVal) {
                $(this.$refs.QA).find("input").attr("required", false)
                $(this.$refs.QA).find("textarea").attr("required", false)
           }
        },
        is_private(newVal, oldVal) {
           if (newVal) {
                $(this.$refs.QA).find("input").attr("required", false)
                $(this.$refs.QA).find("textarea").attr("required", false)
           }
        },
    },
    methods:{
        md5Value() {
            return Array.apply(0, Array(15)).map(function() {
                return (function(charset) {
                    return charset.charAt(Math.floor(Math.random() * charset.length));
                }('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'));
            }).join('');
        },
        getInitQuestions() {
            let that = this;
            var questions = that.defaultQuestions
            var question_type = 3
            that.cur_question_type = question_type
            if (that.defaultQuestions.question) {
                that.app_questions = [];
                $.each(that.defaultQuestions.question, function(i, n) {
                    var question_type = 3;
                    var question = {
                        question_title:n,
                        question_type: question_type,
                        question_default_value:questions.answer[i],
                        readonly:false,
                        id: that.calcuQuesId(question_type, n),
                    }
                    that.app_questions.push(question)
                })
            }
        },
        calcuQuesId(_v, _q) {
            var _id = md5(_q);
            if (_v == 3) {
                _id = this.md5Value()
            }
            return _id
        },
        handle_app_questions() {
            var that = this,
                _v = that.cur_question_type,
                _q = $("#app_questions").find("option:selected").text(),
                _id = that.calcuQuesId(_v, _q);
            if (_v != '') {
                if ($('#' + _id).length != 0) {
                    return;
                }
                if (_v == 3) {
                    _q = '';
                }
                var question = {
                    question_title:_q,
                    question_type: _v,
                    question_default_value:'',
                    id: _id
                }
                that.app_questions.push(question)
            }
        },
        removeQues(id) {
            var that = this;
            var app_questions = this.app_questions
            var new_app_questions = _.filter(app_questions, function(item) {
                return item.id != id
            });
            var len = that.app_questions.length;
            if (len == 1) {
                that.removeCallback(that['is_require_approval'])
            } else {
                this.app_questions = new_app_questions;
            }
        },
    },
    mounted() {
    }
}
</script>
<style scoped>
#app_questions select{
    padding-left: 0;
    padding-right: 0;
}
@media (max-width:767px) {
    #app_questions .controls input[type=text],
    #app_questions .controls  textarea,
    #app_questions .controls select{
        width: 90% !important;
    }
}
</style>
