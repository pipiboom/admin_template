<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="collapseChage">
        <i class="el-icon-d-arrow-left" v-show="!collapse" title="收起">
          &nbsp;&nbsp;
          <small>收缩侧边栏</small>
        </i>
        <i
          class="el-icon-d-arrow-right"
          style="color: #fff;font-weight:700;float: left;margin: 5px 0 0 21px;"
          v-show="collapse"
          title="展开"
        />
      </div>
      <el-menu
        class="sidebar-el-menu"
        :default-active="activeMenu"
        :collapse="collapse"
        background-color="#001529"
        text-color="#8d9199"
        unique-opened
        active-text-color="#fff"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
/* eslint-disable */
import SidebarItem from "./SidebarItem";
export default {
  data() {
    return {
      collapse: false,
      screenWidth: document.body.clientWidth
    };
  },
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        setTimeout(() => {
          this.auto();
          this.timer = false;
        }, 400);
      }
    }
  },
  created() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    this.$bus.on("collapse", msg => {
      this.collapse = msg;
    });
  },
  methods: {
    collapseChage() {
      this.collapse = !this.collapse;
      this.$bus.emit("collapse", this.collapse);
    },
    auto() {
      if (this.screenWidth < 1200) {
        this.collapse = true;
        this.$bus.emit("collapse", true);
      } else {
        this.collapse = false;
        this.$bus.emit("collapse", false);
      }
    }
  }
};
</script>
<style scoped>
.sidebar {
  z-index: 1024;
  display: block;
  position: fixed;
  left: 0;
  top: 65px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #001529;
}
.sidebar::-webkit-scrollbar-track {
  border-radius: 2px;
  background-color: #f5f5f5;
}

.sidebar::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #555;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
  height: calc(100% - 32px);
  top: 30px;
  background-color: #001529;
  border-top: 1px solid #001529;
}
.sidebar > ul > li,
.sidebar > ul > li div {
  background-color: #001529;
}
.sidebar > ul > li > ul {
  background-color: #001529;
}
.el-menu {
  margin-top: 30px;
  background-color: #001529 !important;
  border-right: none;
}
.collapse-btn {
  height: 30px;
  width: 200px;
  cursor: pointer;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #001529;
  color: #fff;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 100;
}
.collapse-btn i {
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  text-overflow: ellipsis;
}
</style>
