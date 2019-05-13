<template>
  <div>
    <ul class="feeds" id="messageList">
        <li v-if="!messageList.length">No messages.</li>
        <li v-else v-for="item in messageList" class="clearfix" :class=" item.read === '0' ? 'unread':''" @click="markUnread(item)">
            <div class="row">
                <span class="col-md-10 message-left"> {{ item.title }}</span>
                <span class="message-right col-md-2">
                    <span class="date mr20">{{formatTime(item.create_time)}}</span>
                    <span class="icon_mark_read" :class="item.read === '0' ? 'show':'hide'"><i class="icon-ok"></i></span>
                </span>
            </div>
        </li>

    </ul>
    <pagination :page="messagePage"  :onChangePage="onChangePage" :currentPage="currentPage" v-if="messagePage" :no_limit="true"></pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import mixin_alert_msg from '@/mixins/alert_msg'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import pagination from '@/components/Pagination.vue'

export default {
    props: {
      messageList:{
        type: Array,
        default: () => {
          return []
        }
      },
      messagePage: {
        default: ''
      },
      currentPage: {
        type: Number,
        dafault: 1
      }
    },
    data(){
        return {
           
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
    },
    computed: {
        ...mapGetters({
          userInfo:"userInfo",
        }),


    },
    components: {
      dateTimePicker_range, 
      pagination,
    },
    methods: {
      formatTime (time) {
        return moment.unix(time).startOf('second').fromNow();
      },

      onChangePage(page){
        this.$emit('onChangePage', page)
      },

      markUnread(msgData) {
        this.$emit('markUnread', msgData);
      },
    },
    created () {

    },
    mounted () {
    }
}
</script>

<style scoped>
.tab-pane {
    margin-bottom: -10px;
    overflow: auto;
}
.tab-pane .btn {
    position: relative;
    margin: 4px;
}
.tab-pane .btn span {
    position: absolute;
    right: -6px;
    top: 0px;
    color: #ffffff;
    font-weight: normal;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    text-shadow: none;
    border-radius: 12px;
    padding: 0 6px;
}
.tab-pane .btn.active, .tab-pane .btn:active, .tab-pane .btn.active {
    background-color: #E1E1E1;
    box-shadow: none;
}
.filter-form.well {
    margin: 20px 0;
}
.panel {
    min-height: 600px;
}
.date {
    text-align: right;
    font-style: italic;
    color: #c1cbd0;
}
.feeds {
    margin: 20px 0;
}
.feeds li {
    list-style-type: none;
    line-height: 26px;
    font-size: 13px;
    border-bottom: 1px dashed #eaeaea;
    padding: 12px;
    cursor: pointer;
}
.feeds li.unread {
    background: #eaeaea;
    font-weight: bold;
    border-bottom: 1px dashed #D7D7D7;
}
.feeds li .col-md-4 {
    word-wrap: break-word;
}
.feeds li:hover {
    background: #efefef;
}
.feeds li span {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
span.icon_mark_read {
    visibility: hidden;
    cursor: pointer;
    font-size: 18px;
    color: #999;
}
.feeds li .col-md-1 a {
    color: #08c;
}
.feeds li .col-md-1 span {
    display: inline-block;
}
.feeds li.unread:hover span.icon_mark_read {
    visibility: visible;
}
.offer_limit[name="page_limit"], .pager_foot [name="go_page"], .pager_foot [name="go_btn"], .pager_foot [name="page_limit"] {
    display: none;
}
.box-content {
    overflow: hidden;
}
.nav-tabs li {
    position: relative;
}
.nav-tabs li span {
    position: absolute;
    right: 0px;
    top: -7px;
    border-radius: 12px;
    padding: 0 6px;
    color: #fff;
    font-size: 12px;
}
.show{
    display: inline-block !important;
}
</style>