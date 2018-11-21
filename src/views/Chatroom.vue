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
      <el-col :span="19" style="height: 100%">
        <el-row style="height: 90%">
          <el-col :span="24" style="height: 100%;">
            <ChatPanel />
          </el-col>
        </el-row>
        <el-row style="height: 10%;">
          <el-col :span="24" style="height: 100%;">
            <SendMessage />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ChatRoomTitle from '../components/ChatRoomTitle'
import UserList from '../components/UserList'
import SendMessage from '../components/SendMessage'
import ChatPanel from '../components/ChatPanel'

export default {
  name: "Chatroom",
  data: () => ({
    form: {
      input: ''
    }
  }),
  components: {
    ChatRoomTitle,
    UserList,
    SendMessage,
    ChatPanel
  },
  computed: {
    userList () {
      return this.$store.getters.allUserList
    }
  },
  created () {
    this.initSocket()
    this.$store.dispatch('setID', 'JVEOG6Pd9-dqNqDEAAAA')
    this.$store.dispatch('setUserList', JSON.parse(`
      [
        {
          "key":"0",
          "id":"JVEOG6Pd9-dqNqDEAAAA",
          "name":"JVEOG6Pd9-dqNqDEAAAA"
        },
        {
          "key":"1",
          "id":"JVEOG6Pd9-dqNqDEAAAA",
          "name":"JVEOG6Pd9-dqNqDEAAAA"
        },
        {
          "key":"2",
          "id":"JVEOG6Pd9-dqNqDEAAAA",
          "name":"JVEOG6Pd9-dqNqDEAAAA"
        }
      ]
    `))
  },
  methods: {
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
}
</style>
