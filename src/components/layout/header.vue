<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
        {{ systemName }}
      </div>
    </div>
    <div class="header-right">
      <div class="user-avator">
        <img src="@/assets/images/avatur.jpg">
      </div>
      <span class="user_name">{{ username }}</span>
      <span @click="loginOut" class="login_out">退出登录</span>
    </div>
  </div>
</template>
<script>
let systemName = require('@/utils/const.js').SYSTEM_NAME;
export default {
  data() {
    return {
      systemName: systemName
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem("userName");
      return username || this.name;
    },
  },
  methods: {
    loginOut() {
      sessionStorage.clear();
      this.$router.replace('/login')
    }
  }
};
</script>

<style scoped lang="stylus">
.header {
  height: 70px;
  padding: 0px 20px;
  font-size: 22px;
  color: #fff;
  background-color: #002140;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left{
    display: flex;
    align-items: center;
    .split {
      background-color: #aaa;
      width: 2px;
      height: 25px;
      margin: 0px 10px;
    }
    img{
      width: 120px;
    }
  }
  .header-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    .user_name{
      padding: 0px 10px;
    }
    .user-avator {
      display: inline-block;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .login_out{
      cursor pointer
    }
  }
}
</style>
