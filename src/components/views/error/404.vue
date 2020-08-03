<template>
	<div class="error-box">
		<div class="error_info">
			<img src="@/assets/images/404.png" alt="">
			<span>啊哦~ 你所访问的页面不存在</span>
		</div>
		<el-button type="primary" @click="goBack">返回</el-button>
	</div>
</template>

<script>
export default {
	methods: {
		goBack() {
			this.$router.back();
		}
	}
};
</script>

<style lang="stylus" scoped>
.error-box{
	display: flex
	align-items center
	flex-direction column
	.error_info{
		display flex
		justify-content center
		align-items center
		padding 20px 0px
		img {
			width 500px
		}
	}
}
</style>