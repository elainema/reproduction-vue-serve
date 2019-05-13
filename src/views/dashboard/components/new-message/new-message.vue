<template>
<div class="wrap-new-message">
  <div class="message-title">
    <span> New Message </span>
    <sup v-show="messageList.length > 0">{{ messageList.length }}</sup>
  </div>
  <div v-show="messageList.length > 0">
    <el-table
      class="message-table"
      :data="messageList"
      header-cell-class-name='header-cell'
      row-class-name='tr-row'
      cell-class-name='td-cell'
      style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <a class="item" @click="handleViewItem(scope.row)">
            <span class="flex-center">
              <span class="type">{{ scope.row.type}}</span>
              <span class="content">{{ scope.row.title}}</span>
            </span>
            <span class="date">{{ scope.row.create_time | formatTime}}</span>
          </a>

          <!-- <router-link :to="{name:'message', params: { ctx: 'detail', msgData: scope.row }}" class="item">
            <span class="flex-center">
              <span class="type">{{ scope.row.type}}</span>
              <span class="content">{{ scope.row.title}}</span>
            </span>
            <span class="date">{{ scope.row.create_time | formatTime}}</span>
          </router-link> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
  <a @click="handleViewAll" v-show="messageList.length > 0" class="message-view-all">
    View All
  </a>
  <!-- <router-link :to="{name:'message'}" v-show="messageList.length > 0" class="message-view-all"> View All</router-link> -->
  <div v-show="messageList.length < 1" class="empty-image">
    <img src="@/assets/image/empty.png" />
  </div>
</div>

</template>

<script>
  import Vue from "vue"
  import CountTo from 'vue-count-to'
  import { formatDate } from '@/util/date'
  export default {
    name: 'new-message',
    props: {
      roleName: {
        type: String,
        default: ''
      }
    },
    
    data() {
      return {
        messageList: []
      }
    },

    components: { CountTo },

    watch: {
    },

    computed: {
      
    },

    filters: {
      formatTime(time) {
        return formatDate(time * 1000, ' ', 'Y-M-d-h-m-s')
      } 
    },
    created() {
      this.fetchMessageList()
    },

    methods: {
      fetchMessageList() {
        Vue.http.get('Message/list', { params: {type:'', page:1,limit:6, read: 0 }}).then(response => {
          this.messageList = response.body.data.list
          this.messagePage = response.body.data.paginator
        })
      },

      handleViewAll() {
        this.$ga && this.$ga.event(this.roleName, 'message', 'viewall')
        this.$router.push({ name: 'message' })
      },

      handleViewItem(msgData) {
        this.$ga && this.$ga.event(this.roleName, 'message', 'detail')
        this.$router.push({ 
          name: 'message',
          params: {
            ctx: 'detail',
            msgData,
          }
        })
      }
    },

    mounted() {

      
    }
  };
</script>
<style lang="less">
.wrap-new-message{
  padding: 0 30px;
  height: 100%;
  .message-title{
    display: flex;
    align-items: center;
    padding: 30px 0 10px 0;
    span{
      font-size:20px;
      color:rgba(1,4,9,1);
      line-height:24px;
      font-weight: 800;
    }
    sup{
      top: 0;
      margin-left: 10px; 
      background-color: #FF0200;
      border-radius: 10px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      padding: 0 6px;
      text-align: center;
      white-space: nowrap;
      border: 1px solid #fff;
    }
    
  }
  .message-table{
    border-top: 1px solid #ebeef5;
    .header-cell{
      display: none;
    }
    .td-cell{
      padding: 10px 0px!important;
      border-bottom: 1px solid #d8d8d8!important;
    }
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size:16px;
      color:#010409;
      cursor: pointer;
      .flex-center{
        display: flex;
        align-items: center;
      }
      .type{
        padding: 4px 18px;
        background: #4DA0FF;
        border-radius:3px;
        color: #fff;
        font-size:14px;
        line-height: 17px;
      }
      .content{
        display: inline-block;
        width: 800px;
        margin-left: 26px;
        line-height:19px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .date{
        font-size:16px;
        font-family:Helvetica;
        color:rgba(1,4,9,0.8);
        line-height:19px;
      }
    }
  }
  .message-view-all{
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #61ABFF;
  }
  .empty-image{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    img{
      width: 510px;
    }
  }
}


.el-table__header-wrapper{
}
// .el-table::before{
//   height: 0!important;
// }
// .el-table__body{
// }
// .tr-row .td-cell:first-child,{
// }
// .tr-row .td-cell:last-child{
// }
// .td-date{
//   font-size:16px;
//   font-family:Helvetica;
//   color:rgba(1,4,9,1);
//   line-height:19px;
// }
// .td-num{
//   font-size:18px;
//   font-family:Helvetica;
//   color:rgba(1,4,9,0.6);
//   line-height:22px;
// }
// .font_family{
//   font-size: 16px;
// }
// .green{
//   color: #5ED899;
// }
// .red{
//   color: #D11D25;
// }
</style>
