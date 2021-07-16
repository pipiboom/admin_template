<template>
  <div class="wrapper">
    <v-head />
    <div class="main">
      <v-sidebar />
      <div class="content-box" :class="{ 'content-collapse': collapse }">
        <v-tags />
        <div class="content">
          <app-main />
          <el-footer>
            Version 1.0.0 Copyright
            <i class="fa fa-copyright" aria-hidden="true" /> 2019 Wondertek Co.,
            Ltd.
          </el-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./header.vue";
import vSidebar from "./side.vue";
import vTags from "./tags.vue";
import AppMain from "./AppMain.vue";
export default {
  data() {
    return {
      collapse: false,
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    AppMain,
  },
  created() {
    this.$bus.on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
};
</script>
<style scoped lang="less">
.el-footer {
  font-size: 12px;
  color: #c0c1c3;
  line-height: 60px;
  text-align: center;
}
@media (min-width: 1200px) {
  .content-box {
    left: 200px;
  }
}
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
  overflow: hidden;
  .content {
    width: auto;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    box-sizing: border-box;
    background: #fff;
  }
}
.content-collapse {
  left: 65px;
}
</style>
