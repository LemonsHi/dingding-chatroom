<template>
  <div class="user-list">
    <UserInfo v-for="(user, index) in userList" :key="user.key" :user="user" />
  </div>
</template>
<script>
import UserInfo from './UserInfo.vue'

export default {
  name: "userList",
  props: ['userList'],
  data: () => ({

  }),
  components: {
    UserInfo
  }
}
</script>
<style lang="scss" scoped>
.user-list {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  // background: #eee;
  padding: 10px;
  border-right: 1px solid #D0D0D0;
}
</style>
