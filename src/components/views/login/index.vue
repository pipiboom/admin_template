<template>
	<div class="login-box">
		<span class="sys_name">后台管理系统</span>
		<el-form class="login_info" label-width="0" ref="loginForm" :rules="rules" :model="loginInfo">
			<el-form-item prop="name">
				<el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="loginInfo.name"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginInfo.password" type="password"></el-input>
			</el-form-item>
			<el-button type="primary" @click="login">登录</el-button>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loginInfo: {
				name: '',
				password: ''
			},
			rules: {
				name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
		}
	},
	methods: {
		login() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.$router.push('/home')
				};
				return false;
			})
		}
	}
};
</script>

<style lang="stylus" scoped>
.login-box{
	display flex
	justify-content center
	align-items center
	height 100vh
	flex-direction column
	background url('../../../assets/images/loginBg.jpg') no-repeat left top
	background-size 100% 100%
	.sys_name{
		color: #fff
		font-size: 24px
		padding-bottom 20px
	}
	.login_info{
		width: 300px;
		display flex
		flex-direction column
		background hsla(0,0%,100%,.3)
		border-radius 5px
		padding 20px
		/deep/.el-form-item:last-child{
			margin-bottom 0px !important;
		}
	}
}

</style>