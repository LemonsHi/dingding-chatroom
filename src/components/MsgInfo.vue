<template>
  <div class="msg-info">
    <div class="self-msg" v-if="sameId">
      <!-- <img src=""> -->
      <el-row>
        <el-col :span="2">
          <div class="head iconfont" v-if="!msg.isSelf"> &#xe625; </div>
          <div class="hidden" v-else>1</div>
        </el-col>
        <div class="msg first" v-if="!msg.isSelf"> {{ msg.content }} </div>
        <div class="msg" v-else> {{ msg.content }} </div>
        <div class="msg-state">{{ isReaded ? '全部已读' : `${needRead.length - 1} 人未读` }}</div>
      </el-row>
    </div>
    <!-- <div class="other-msg" :class="{'is-other': !msg.isSelf}" v-if="!sameId"> -->
    <div class="other-msg" v-if="!sameId">
      <!-- <img src=""> -->
      <el-row>
        <el-col :span="2" :offset="20">
          <div class="head iconfont" v-if="!msg.isSelf"> &#xe625; </div>
          <div class="hidden" v-else>1</div>
        </el-col>
        <div class="msg first" v-if="!msg.isSelf"> {{ msg.content }} </div>
        <div class="msg" v-else> {{ msg.content }} </div>
        <div class="msg-state">{{ isReaded ? '全部已读' : `${needRead.length - 1} 人未读` }}</div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "MsgInfo",
  props: ['msg', 'needRead', 'readed'],
  data: () => ({

  }),
  computed: {
    sameId () {
      return this.$store.getters.selfId === this.msg.id
    },
    isReaded () {
      return this.needRead.length - 1 < 0 || this.needRead.length - 1 === 0
    }
  }
}
</script>
<style lang="scss" scoped>
.msg-info {
  margin-bottom: 10px;
  .head {
    height: 45px;
    line-height: 45px;
    font-size: 35px;
  }
  .hidden {
    color: #fff;
  }
  .msg {
    font-size: 18px;
    height: 45px;
    line-height: 45px;
    background: #eae0db;
    padding: 0px 20px;
  }
  .msg-state {
    font-size: 8px;
    height: 22.5px;
    top: 22.5px;
    position: relative;
    color: #d0d0d0;
    // p {
    //   position: absolute;
    //   bottom: 0px;
    // }
  }
  .self-msg {
    .msg {
      text-align: left;
      border-radius: 0px 20px 20px 0px;
      float: left;
      &.first {
        border-radius: 20px 20px 20px 0;
      }
    }
    .msg-state {
      float: left;
      left: 10px;
    }
  }
  .is-other {
    margin: 35px 0px;
  }
  .other-msg {
    .el-col {
      margin: 0px;
      float: right;
    }
    .msg {
      text-align: right;
      border-radius: 20px 0px 0px 20px;
      float: right;
      &.first {
        border-radius: 20px 20px 0px 20px;
      }
    }
    .msg-state {
      float: right;
      right: 10px;
    }
  }
}
</style>
