<template>
	<view class="box">
		<view class="headers bg_all"></view>
		<view class="com_block com_width">
			<view v-if="isLogin" class="user_box com_width display_flex">
				<image v-if="userInfo.header_pic_url" class="user_img" :src="userInfo.header_pic_url" mode=""></image>
				<image v-else class="user_img" src="/static/imgs/fang_zw.jpg" mode=""></image>
				<view class="user_info">
					<view>{{userInfo.nick_name}}</view>
					<text class="color_gray">{{userInfo.phone}}</text>
				</view>
			</view>
			<view class="no_login" v-else>
				<view class="btn" @click="go_Testlogin">去登陆</view>
			</view>
		</view>

		<view @click="go_addressbook" class="com_block com_width">
			<view class="com_list com_width display_flex space_between">
				<view class="display_flex">
					<image class="title_image" src="/static/imgs/lxwm.png" mode=""></image>
					通讯录
				</view>
				<image class="right_icon" src="../../static/imgs/right_icon.png" mode=""></image>
			</view>
		</view>
		
		<!-- v-if="userInfo.vip_type == 99" -->
		<view v-if="userInfo.vip_type == 99" class="com_block com_width" @click="go_Testlogin">
			<view class="com_list com_width display_flex space_between">
				<view>内部测试入口</view>
				<image class="right_icon" src="../../static/imgs/right_icon.png" mode=""></image>
			</view>
		</view>

		<view class="com_block com_width" @click="go_moreIm">
			<view class="com_list com_width display_flex space_between">
				<view>群聊</view>
				<image class="right_icon" src="../../static/imgs/right_icon.png" mode=""></image>
			</view>
		</view>

		<view class="com_block com_width" @click="go_Msg">
			<view class="com_list com_width display_flex space_between">
				<view>单聊</view>
				<image class="right_icon" src="../../static/imgs/right_icon.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {},
				topInfo: {},
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			go_myHobby() {
				uni.navigateTo({
					url: "/minePage/myHobby/myHobby"
				})
			},
			async getUserInfo(code) {
				try {
					let data = await this.$wxhttp.post({
						url: '/user/v1/getUserInfo',
					})
					
				} catch (e) {

				}
			},
			go_login() {
				uni.navigateTo({
					url: "/minePage/getUserInfo/getUserInfo"
				})
			},
			go_Testlogin() {
				uni.navigateTo({
					url: "/minePage/testLogin/testLogin"
				})
			},
			go_contactus() {

				uni.makePhoneCall({
					phoneNumber: '01085850935'
				});
			},
			go_addressbook() {
				uni.navigateTo({
					url: "/minePage/addressbook/addressbook"
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		height: 100vh;
		background: rgba(242, 242, 242, 1);
		border-top: 1px solid #B896C2;

		.com_block {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 0px 10upx 0px rgba(143, 33, 255, 0.07);
			border-radius: 10upx;
		}

		.headers {
			height: 144upx;
		}

		.heder_bottom {
			padding: 30upx 0;
			font-size: 24upx;

			.color_title {
				color: #666666;
			}

			.color_con {
				color: #999999;
			}
		}

		.com_list {
			height: 110upx;
			margin-top: 20upx;

			.title_image {
				width: 50upx;
				height: 50upx;
				margin-right: 15upx;
			}
		}

		.no_login {
			height: 239upx;
			margin-top: -119upx;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn {
				background: #8A41F4;
				width: 200upx;
				height: 100upx;
				line-height: 100upx;
				border-radius: 22upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;

			}
		}

		.user_box {
			height: 239upx;
			margin-top: -119upx;

			.user_img {
				width: 134upx;
				height: 134upx;
				border-radius: 50%;
			}

			.user_info {
				margin-left: 61upx;

				view {
					padding: 20upx 0;
					font-size: 36upx;
				}
			}
		}

	}
</style>
