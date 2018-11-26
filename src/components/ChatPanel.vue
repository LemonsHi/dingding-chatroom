<template>
  <div class="chat-panel">
    <MsgInfo
      v-for="(msg, index) in msgs"
      :key="msg.key" :msg="msg"
      :need-read="msgDataBase[msg.msgID].needReadID"
      :readed="msgDataBase[msg.msgID].readed" />
  </div>
</template>
<script>
import MsgInfo from './MsgInfo.vue'

export default {
  name: "",
  data: () => ({
    msgs: [
      // {
      //   msgID: 1,
      //   key: 1,
      //   isSelf: false,
      //   id: 'JVEOG6Pd9-dqNqDEAAAA',
      //   content: 'hello world'
      // },
      // {
      //   msgID: 2,
      //   key: 2,
      //   isSelf: true,
      //   id: 'JVEOG6Pd9-dqNqDEAAAA',
      //   content: 'again world'
      // },
      // {
      //   msgID: 3,
      //   key: 3,
      //   isSelf: false,
      //   id: '1',
      //   content: 'hello world'
      // },
      // {
      //   msgID: 4,
      //   key: 4,
      //   isSelf: false,
      //   id: 'JVEOG6Pd9-dqNqDEAAAA',
      //   content: 'again world'
      // }
    ],
    msgDataBase: []
  }),
  components: {
    MsgInfo
  },
  created () {
    this.initChatMsg()
  },
  methods: {
    initChatMsg () {
      if (window.socket) {
        window.socket.on('chat message', (msg) => {
          console.log(msg)
          this.pushMsgList(JSON.parse(msg))
        })
        window.socket.on('msgState', (msg) => {
          console.log(msg)
          this.msgDataBase = JSON.parse(msg)
        })
      }
    },
    pushMsgList (msg) {
      if (this.msgs.length === 0) {
        this.msgs.push({
          msgID: msg.msgID,
          key: 0,
          isSelf: false,
          id: msg.id,
          content: msg.content
        })
      } else if (msg.id !== this.msgs[this.msgs.length - 1].id) {
        this.msgs.push({
          msgID: msg.msgID,
          key: this.msgs.length,
          isSelf: false,
          id: msg.id,
          content: msg.content
        })
      } else {
        this.msgs.push({
          msgID: msg.msgID,
          key: this.msgs.length,
          isSelf: true,
          id: msg.id,
          content: msg.content
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-panel {
  padding: 10px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
