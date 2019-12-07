<template>
	<view class="content">
		<view class="input-group com_width">
			<view class="input-row border bg_fff display_flex">
				<text class="title">账号：</text>
				<input class="m-input" type="text" clearable focus v-model="userName" placeholder="请输入账号"></input>
			</view>

			<view class="input-row bg_fff display_flex">
				<text class="title">密码：</text>
				<input type="password" displayable v-model="userPass" placeholder="请输入密码"></input>
			</view>

		</view>
		<view class="btn-row com_width">
			<button class="bg_all" @click="login">登录</button>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				userName: "",
				userPass: ""
			}
		},
		onShow() {
			
		},
		methods: {
			async login() {
				try {
					let userPass = this.userPass;
					let userName = this.userName;
					console.log(userPass)
					console.log(userName)
					if (userPass != '' && userName != '') {
						let data = await this.$wxhttp.post({
							url: '/assistant/v1/loginByUsername',
							data: {
								username: userName,
								password: userPass
							},
						})
						if (data.code == 0) {
							uni.setStorageSync("token", data.data.token)
							uni.setStorageSync("userInfo", data.data)
							uni.navigateBack()
						}
					} else {
						uni.showToast({
							title: "账号密码不能为空",
							icon: "none",
							duration: 1000
						})
					}
				} catch (e) {
					console.log(e)
				}
			}
		},

	}
</script>

<style>
	page{
		height: 100vh;
		background: #f2f2f2;
	}
	button {
		color: #fff;
		margin-top: 60upx;
	}

	.input-group {
		margin-top: 60upx;
	}

	.input-group view {
		height: 90upx;
		margin-top: 30upx;
		border-radius: 10upx;
	}

	.title {
		margin-left: 20upx;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 100upx;
		height: 100upx;
		border: 1upx solid #dddddd;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
