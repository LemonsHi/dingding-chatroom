<template>
  <div class="user-info">
    <el-row>
      <el-col :span="8">
        <!-- <img src=""> -->
        <div class="head iconfont"> &#xe625; </div>
      </el-col>
      <el-col :span="16">
        <div class="info">
          <p>{{ user.name }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "userInfo",
  props: ['user'],
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
.user-info {
  height: 100px;
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  .head {
    text-align: center;
    line-height: 80px;
    font-size: 35px;
    height: 80px;
  }
  .info {
    height: 80px;
    line-height: 50px;
    white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    padding: 15px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
