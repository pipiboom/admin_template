<template>
  <transition
    name="move"
    mode="out-in"
  >
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>
<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>
