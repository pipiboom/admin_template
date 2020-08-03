<template>
	<div class="warpper">
		<v-header />
		<div class="warpper-content">
			<v-sidebar />
			<v-main></v-main>
		</div>
	</div>
</template>

<script>
import vHead from "./header.vue";
import vSidebar from "./side.vue";
export default {
	components: {
		vHead,
		vSidebar,
		vTags,
		AppMain
	},
};
</script>

<style lang="stylus">
</style>