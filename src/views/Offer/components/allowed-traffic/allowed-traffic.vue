<template>
<div>
    <ul :class="'checkList allow_traffic_list ' + 'allow_traffic_list_' + type" v-if="type == 'app_download' || type == 'mobile_content' || type == 'cps' || type == 'cpe'">
        <li>
            <span v-if="n[type] == 1" v-for="n in trafficChosen" class="hvr-fade" @click.prevent="toggleCheck">
                <i v-if="from" :class="'icon_zone' + (defaulVal[n.id] == 1 ? '' : ' not-check')">
                    <i class="icon-check-empty"></i>
                    <i class="icon icon-custom"></i>
                    <input type="hidden" :is_hidden="n.id === 1 ? '0' : '1'" :name="'traffic_ids[\'' +  n.id + '\']'" :data-control-name="'traffic_ids[\'' +  n.id + '\']'" :value=" defaulVal[n.id]"/>
                </i>
                <i v-else :class="'icon_zone' + (n[type] === '1' ? '' : ' not-check')">
                    <i class="icon-check-empty"></i>
                    <i class="icon icon-custom"></i>
                    <input type="hidden" :is_hidden="n.id === 1 ? '0' : '1'" :name="'traffic_ids[\'' +  n.id + '\']'" :data-control-name="'traffic_ids[\'' +  n.id + '\']'" :value="typeof defaulVal[n.id] === 'undefined' ? 1 : defaulVal[n.id]"/>
                </i>
                {{ n.name }} <br />
             </span>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    props: {
        type:{
            default:' '
        },
        from:{default:''},
        renderOffer :{default:''},
        source:{},
        defaulVal:{},
    },
    data(){
        return {
            trafficChosen:[],
            trafficIds:[],
        }
    },
    watch: {
        renderOffer(newVal, oldVal) {
            let that = this
            if (newVal) {
                that.trafficChosen = that.source
                that.trafficIds = that.defaulVal
            }
        },
    },
    computed: {
    },
    methods: {
        toggleCheck(e) {
            var $span = $(e.currentTarget);
            var $icon_zone = $span.find(".icon_zone")
            var is_selected = $icon_zone.hasClass("not-check");
            if(is_selected) {
                $icon_zone.removeClass("not-check")
                $icon_zone.find("[type=hidden]").val(1)
            } else {
                $icon_zone.addClass("not-check")
                $icon_zone.find("[type=hidden]").val(0)
            }
        },
    },
    mounted () {
    }
}
</script>

<style scoped>

/**
* check list
*/

.checkList {
    margin: 0;
}
.checkList li {
    display: block;
    list-style-type: none;
    line-height: 30px;
}
.checkList li span {
    display: inline-block;
    width: 280px;
    cursor: pointer;
}
.checkList li span .icon_zone {
    margin-right: 5px;
    font-size: 16px;
    width: 16px;
    display: inline-block;
    position: relative;
}
.icon_zone {
    color: green;
}
.icon_zone.not-check {
    color: red;
}
.icon_zone .icon:before {
    content: "\f00c";
}
.icon_zone.not-check .icon:before {
    content: "\f00d";
}
.icon_zone .icon-check-empty {
    font-size: 16px;
    opacity: 0.4;
}
.icon_zone .icon {
    position: absolute;
    top: 4px;
    left: 0px;
    font-size: 16px;
}
</style>
