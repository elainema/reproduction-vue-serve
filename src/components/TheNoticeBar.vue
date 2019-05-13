<template>
<div  class="notice_bar row nomargin">
    <div class="dropdown dropdown-extended dropdown-inbox pull-left" id="notice_bar">
        <a style="position:relative" href="#" class="dropdown-toggle message-dropdown-toggle" dropdown-menu-hover="" data-hover="dropdown" data-toggle="dropdown" data-close-others="true" aria-expanded="false">
            <i class="icon-envelope-open fa fa-envelope-open"></i>
            <span class="badge badge-default bg_light_red unread_count" :class="message.total ? 'show' : 'hide' " v-show="message.total">{{total}}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="external">
                <h3>You have <span class="bold"><span class="unread_count ">{{total}}</span> New</span> Messages</h3>
                <router-link to="/messages">view all</router-link>
            </li>
            <li>
                <div class="slimScrollDiv" refs="slimScrollDiv">
                    <ul class="dropdown-menu-list">
                        <li v-for="(item,index) in message.list" @click="handleMsgItemClick(item, index)"> 
                            <div>
                                <span class="subject">
                                    <a >{{item.title}}</a>
                                    <span class="time">{{formatTime(item.create_time)}}</span>
                                </span>
                                <span class="message">{{item.description}}</span>
                            </div>
                         </li>
                    </ul>

                </div>
            </li>
        </ul>
    </div>
</div>

</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex' 
import VueScript2  from 'vue-script2'

export default {
  data(){
    return {
      message:{},
      total:""
    }
  },
  watch: {
    unreadMessageCount (newVal, oldVal) {
      this.total = newVal.count
    }
  },
  computed: {
    ...mapGetters({
      unreadMessageCount:"unreadMessageCount",
    })
  },
  mounted () {
    let _this = this;

    VueScript2.load('../../js/jquery.slimscroll.min.js').then(() => {
      $(this.$refs.slimScrollDiv).slimScroll({
          height: '350px',
          width: '250px'
      });

      this.fetchMessageList()
      
      setInterval(getTotelNumber, 1000 * 60 * 10)

      function getTotelNumber() {
        _this.fetchMessageCount()
      }
    })
  },
  methods: {
    fetchMessageCount() {
      Vue.http.get('Message/getMessageCount').then(response => {
        this.fetchMessageList()
      })
    },

    fetchMessageList() {
      Vue.http.get('Message/list?read=0&limit=3').then(response => {
        this.message = response.body.data
        this.total = this.message.total
      })
    },

    formatTime(time){
        return moment.unix(time).startOf('second').fromNow()
    },

    handleMsgItemClick(msgData, index) {
      this.$store.dispatch("setMsgData", { msgStoreData: msgData })
      this.message.list.splice(index, 1)
      this.$router.push({
        name: 'message',
        params: {
          ctx: 'detail',
          msgData,
        }
      })
    }
  },
}
</script>
<style>
.notice_bar {
    padding-left: 15px;
}
.notice_bar .message-dropdown-toggle{
    position: relative;
    height: 28px;
    display: inline-block;
    width: 40px;
    margin-top: 22px;
    margin-right: 10px;
}
.notice_bar .dropdown:hover .dropdown-menu {
    display: block;
}

.notice_bar .badge {
    position: absolute;
    top: -14px;
    right: 4px;
    color: #ffffff;
    font-weight: normal;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    text-shadow: none;
    font-weight: 700;
    padding: 3px 7px;
}

.notice_bar .icon-logout:before {
  content: none;
}
.notice_bar .dropdown-extended .dropdown-menu > li.external > a {
  display: inline-block;
  padding: 0;
  background: none;
  clear: inherit;
  font-size: 13px;
  font-weight: 300;
  position: absolute;
  bottom: 4px;
  right: 15px;
  border: 0;
  margin-top: -1px;
}
.notice_bar .slimScrollDiv {
  position: relative;
  overflow: hidden;
  width: auto;
  height: 320px;
}
.notice_bar .dropdown-extended .dropdown-menu .dropdown-menu-list {
  padding-right: 0 !important;
  padding-left: 0;
  list-style: none;
  padding: 0px;
  margin: 0px;
}
.notice_bar .dropdown-extended .dropdown-menu .dropdown-menu-list {
  padding-right: 0 !important;
  padding-left: 0;
  list-style: none;
}
.notice_bar .dropdown-extended .dropdown-menu .dropdown-menu-list > li > div {
  display: block;
  clear: both;
  font-weight: 300;
  line-height: 20px;
  white-space: normal;
  font-size: 13px;
  padding: 15px 10px;
  text-shadow: none;
  border-bottom: 1px solid #EFF2F6 !important;
  color: #888888;
  border-top: none;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li:hover {
  cursor: pointer;
  background: #f2f2f2;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li .subject {
  display: block;
  margin-bottom: 8px;
  overflow: hidden;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li .subject .from a {
  color: #888;
}
.notice_bar li.dropdown-extended .dropdown-menu > li.external > a:hover {
  color: #3175af;
  text-decoration: none;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li.more {
  padding-top: 6px;
  height: 36px;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li.more,
.notice_bar .dropdown-menu .dropdown-menu-list > li.more a {
  color: #888;
  text-align: center;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li .subject .time {
  font-size: 12px;
  font-weight: 400;
  opacity: 0.5;
  filter: alpha(opacity=50);
  float: right;
}
.notice_bar .dropdown-menu .dropdown-menu-list > li .subject a {
  font-size: 13px;
  font-weight: normal;
  color: #888;
  line-height: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 200px;
  float: left;
}
.notice_bar .dropdown-menu {
  position: absolute;
  top: 100%;
  float: left;
  list-style: none;
  text-shadow: none;
  padding: 0px;
  margin: 10px 0px 0px 0px;
  background-color: #ffffff;
  box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
  border: 1px solid #eee;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.notice_bar .dropdown-extended .dropdown-menu > li.external > a {
  color: #5b9bd1;
}
.notice_bar .dropdown-extended .dropdown-menu > li.external > a:hover {
  color: #3175af;
  text-decoration: none;
}
.notice_bar .bold {
  font-weight: 700 !important;
}
.notice_bar .dropdown-extended .dropdown-menu:after {
  border-bottom-color: #eaedf2;
}
.notice_bar .dropdown-menu:after,
.notice_bar .dropdown-menu.pull-right:after {
  right: 13px;
  left: auto;
}
.notice_bar  .dropdown-menu.pull-right:before {
  right: 12px;
  left: auto;
}
.notice_bar .dropdown-extended .dropdown-menu {
  min-width: 160px;
  max-width: 310px;
  width: 310px;
  z-index: 9995;
  margin-top: 0;
  border-color: #e7eaf0;
}
.notice_bar .dropdown-menu > li.external {
  background: #eaedf2;
}
.notice_bar .dropdown-extended .dropdown-menu > li.external {
  display: block;
  overflow: hidden;
  position: relative;
  height: 40px;
  padding: 15px 15px 0 15px;
  letter-spacing: 0.5px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #eee;
  background: #FFFFFF;
}
.notice_bar .dropdown-extended .dropdown-menu > li.external > h3 {
  margin: 0;
  padding: 0;
  float: left;
  font-size: 13px;
  display: inline-block;
  color: #4A5152;
  font-weight: normal;
}
.notice_bar .item.unread {
  background: #eff6fa;
  border-bottom: 1px solid #d1e0e8;
}
.notice_bar .moreMessage {
  text-align: center;
}
.notice_bar .moreMessage a,
.notice_bar .moreMessage a:hover {
  color: #999;
}
.notice_bar .spliter {
  border-right: 1px solid #a46e11;
}
.notice_bar .nav_choice_helpCenter a:hover .icon-smile {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
.notice_bar .icon-smile {
  -webkit-transition: -webkit-transform 1s;
  transition: -webkit-transform 1s;
  transition: transform 1s;
  transition: transform 1s, -webkit-transform 1s;
  display: inline-block;
}

</style>