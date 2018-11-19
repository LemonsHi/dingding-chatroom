<template>
  <div class="chat-room">
    <el-row style="height: 8%;">
      <el-col :span="24" style="height: 100%;">
        <ChatRoomTitle />
      </el-col>
    </el-row>
    <el-row style="height: 92%;">
      <el-col :span="5" style="height: 100%;">
        <UserList :user-list="userList"/>
      </el-col>
      <el-col :span="19">
        <div class="chat-room-main-panel">
          <el-row>
            <el-col :span="24">
              <div class="chat-room-panel">

              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="chat-room-send">

              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ChatRoomTitle from '../components/ChatRoomTitle'
import UserList from '../components/UserList'

export default {
  name: "Chatroom",
  data: () => ({
    form: {
      input: ''
    }
  }),
  components: {
    ChatRoomTitle,
    UserList
  },
  computed: {
    userList () {
      return this.$store.getters.allUserList
    }
  },
  created () {
    this.initSocket()
    // this.$store.dispatch('setID', 'JVEOG6Pd9-dqNqDEAAAA')
    // this.$store.dispatch('setUserList', JSON.parse('[{"key":"0","id":"1","name":"1"}]'))
  },
  methods: {
    // onSubmit () {
    //   if (window.socket) {
    //     window.socket.emit('chat message', this.form.input)
    //     this.form.input = ''
    //   }
    // },
    initSocket () {
      // setTimeout(() => {
      //   this.$store.dispatch('setUserList', JSON.parse('[{"key":"0","id":"1","name":"1"}, {"key":"1","id":"2","name":"2"}]'))
      // }, 3000)
      // setTimeout(() => {
      //   this.$store.dispatch('setUserList', JSON.parse('[{"key":"1","id":"2","name":"2"}]'))
      // }, 6000)
      // setTimeout(() => {
      //   this.$store.dispatch('setUserList', JSON.parse('[{"key":"1","id":"2","name":"2"}, {"key":"2","id":"3","name":"3"}]'))
      // }, 9000)
      if (window.socket) {
        window.socket.on('login', (msg) => {
          console.log(msg)
          this.$store.dispatch('setID', msg)
        })
        window.socket.on('user list', (msg) => {
          console.log(msg)
          this.$store.dispatch('setUserList', JSON.parse(msg))
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-room {
  position: absolute;
  height: 100%;
  width: 100%;
  .chat-room-user-list {
    height: 100%;
    background: #eee;
  }
}
</style>
