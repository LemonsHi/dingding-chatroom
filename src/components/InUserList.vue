<template>
  <div class="input-user-list" v-if="isOpen && userList.length !== 0">
    <div class="input-user" v-for="(user, index) in userList" :key="user.key" @click="selectUser(user.name)">
      <!-- <img src=""> -->
      <el-row>
        <el-col :span="7">
          <div class="head iconfont"> &#xe625; </div>
        </el-col>
        <el-col :span="17">
          <div class="info">
            <p>{{ user.name }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  }),
  computed: {
    isOpen: function () {
      return this.$store.getters.isOpenUserList
    },
    userList: function () {
      return this.$store.getters.aimUserList
    }
  },
  methods: {
    selectUser (name) {
      this.$store.dispatch('addMsg', name)
      this.$store.dispatch('controlList', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.input-user-list {
  width: 150px;
  position: absolute;
  z-index: 999;
  bottom: 15px;
  left: 15px;
  border: 1px solid #d0d0d0;
  .input-user {
    background: #FFF;
    height: 40px;
    .head {
      line-height: 40px;
      font-size: 30px;
      cursor:pointer;
    }
    .info {
      white-space: nowrap;
      line-height: 40px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    :hover {
      background: #9f9a9a;
    }
  }
  p {
    cursor:pointer;
  }
}
</style>
