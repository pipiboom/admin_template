/* eslint-disable */
<template>
  <div class="tags-view-container" v-if="visitedViews.length > 0">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="(item, index) in visitedViews"
        ref="tag"
        replace
        :key="index"
        :class="isActive(item)?'active':''"
        :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
        tag="span"
        class="tags-view-item"
        event="click"
        @click.middle.native="closeSelectedTag(item)"
        @contextmenu.prevent.native="openMenu(item, $event)"
      >
        <i :class="item.meta.icon" />
        <span>{{ item.title }}</span>
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(item)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
import ScrollPane from "@/components/layout/ScrollPane";
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: ""
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.visitedViews;
    }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    },
    routes() {
      return this.$store.state.permission.routes;
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  created() {
    this.initTags();
    // 增加关闭tag方法
    this.$bus.on('closeCurrentTag', (view) => {
      this.closeSelectedTag(view)
    });
  },
  methods: {
    initTags() {
      this.$store.commit({
        type: "putTags",
        data: this.$route
      });
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    // 关闭选中的标签
    closeSelectedTag(view) {
      this.$store.dispatch("deleteView", view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
        this.moveToCurrentTag();
      });
    },
    // 关闭全部标签
    closeAllTags(view) {
      this.$store.dispatch("delAllVisitedViews").then(({ visitedViews }) => {
        this.toLastView(visitedViews, view);
      });
    },
    // 关闭其他标签
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    addTags() {
      const { fullPath } = this.$route;
      this.selectedTag = fullPath;
      if (fullPath) {
        this.$store.commit({
          type: "putTags",
          data: this.$route
        });
      }
      return false;
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        this.$router.push("/home");
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 15; // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY - 50;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.tags-view-container {
  position: relative;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}

.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
