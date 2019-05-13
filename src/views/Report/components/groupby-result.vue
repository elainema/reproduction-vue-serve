<template>
    <div>
        <ul class="filter-bar" v-if="listOrder.length">
            <li v-for="(item,index) in listOrder" :key="index">
                <a>{{tabIds[item].length}} {{tabMap[item]}} {{tabIds[item].length > 5 ? '' : tabIds[item].join(',')}}</a>
                &nbsp;<span v-if="index+1 != listOrder.length">&rArr;</span>
            </li>
        </ul>
        <el-select v-if="groupByOption.length > 0" v-model="orderByVal" placeholder="Group By" :disabled="groupByEnable" @change="changeHandler" class="top-choosen">
            <el-option
            v-for="item in groupByOption"
            :key="item"
            :label="tabMap[item]"
            :value="item">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data(){
        return {
            groupByOption: [],
            orgGroupByOption: [ 'offer_id','aff_id','publisher_app_id'],
            groupByEnable: true,
            orderByVal:'',
            offerTab:[],
            pubTab:[],
            pubAppTab:[],
            tabMap:{
                'advertiser_id' : 'Advertiser',
                'publisher_app_id': 'Publisher App',
                'aff_id': 'Publisher',
                'offer_id': 'Offer'
            }
        }
    },
    props:{
        checkModel: {
            type: Array,
            default(){
                return []
            }
        },
        curTab: {
            type: String,
            default: ''
        },
        changeGroupByHandler: {
            type: Function
        },
        listOrder: {
            type: Array,
            default(){
                return []
            }
        },
        tabIds:{
            type: Object,
            default(){
                return {}
            }
        },
        barLength:'',
    },
    watch: {
        checkModel(val){
            if (val.length < 1){
                this.groupByEnable = 'disabled'
            }
            else {
                this.groupByEnable = false
            }
            this.orderByVal = ''
        },
        groupByOption(val){
            //下拉没选项时不显示，checkbox也不显示
            this.$emit('update:getBarLength',val.length)
        },
        deep: true
    },
    methods:{
        changeHandler(val){
            this.$emit('changeGroupByHandler',val)
        },
        getGroupByOption(){
            if (!this.orgGroupByOption.includes(this.curTab)){
                this.groupByOption = []
            }
            this.groupByOption = _.clone(this.orgGroupByOption) 
            this.groupByOption = _.remove(this.groupByOption, (o)=>{
                return o != this.curTab
            })
            this.groupByOption = _.remove(this.groupByOption, (o)=>{
                return !this.listOrder.includes(o)
            })
        }
    },
    created(){
        
    }
}
</script>
<style scope lang="less">
    .el-select {
        input[type=text][readonly]{
            cursor: pointer;
            background-color: transparent
        }
        input[type=text][disabled]{
            cursor: not-allowed;
            background-color: #eee;
        }
        .el-input .el-select__caret{
            display: flex;
            align-items: center;
        }
    }
    .top-choosen{
        position:absolute;
        left:15px;
        top:95px;
        z-index: 100
    }
    .filter-bar{
        display: inline-block;
        margin-top:5px;
        width: 100%;
        li {
            float: left;
            margin-right:5px;
        }
        li a{
            background: #ffe8b7;
            padding:5px;
            color:#999;
        }
    }
</style>

