<template>
  <div class="chat-room-send">
    <el-row type="flex" align="middle" style="height: 100%;">
      <el-col :span="20" style="border-right: 1px solid #d0d0d0;">
        <el-form ref="form">
          <el-input v-model="formMsg" placeholder="Type your message" style="width: 90%;" @keyup.enter.native="onSubmit"></el-input>
          <el-button circle class="iconfont buttom-send" @click="onSubmit">&#xe608;</el-button>
        </el-form>
      </el-col>
      <el-col :span="2">
        <div class="voice">
          <span class="iconfont">&#xeae6;</span>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="annex">
          <span class="iconfont">&#xe616;</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "SendMessage",
  data: () => ({
    form: {
      msg: ''
    }
  }),
  computed: {
    formMsg: {
      get: function () {
        return this.form.msg
      },
      set: function (nVal) {
        this.form.msg = nVal
        let reg = /@.*/g;
        if (reg.test(nVal)) {
          this.$store.dispatch('controlList', true)
          this.$store.dispatch('search', nVal.split('@')[1])
        }
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      if (window.socket) {
        window.socket.emit('chat message', this.form.msg)
        this.form.msg = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-room-send {
  height: 100%;
  border-top: 1px solid #d0d0d0;
  .buttom-send {
    color: #fafafa;
    background: #49d3ff;
    height: 40px;
    width: 40px;
    text-align: center;
    display: inline-block;
    margin-left: 25px;
    border: 0px;
  }
  .voice {
    .iconfont {
      font-size: 30px;
    }
  }
  .annex {
    .iconfont {
      font-size: 30px;
    }
  }
}
</style>
