<template>
	<view class="box">
		<view class="content">
			<view class="logo_img">
				<image src="../../static/imgs/userInfo.png" mode=""></image>
			</view>
			
			<view v-if="!getPhoneIsShow" class="btn_box">
				<view class="say">
					您暂未授权元气家政小程序获取你的信息,将无法正
					常使用小程序的功能。如需要正常使用,请点击“授
					权”按钮,打开头像,昵称等信息的授权。
				</view>
				<button class="bg_all" open-type="getUserInfo" @getuserinfo="getuserinfo">授权登录</button>
				<!-- <button class="default_btn" type="default">取消</button> -->
			</view>
			<view v-else class="btn_box">
				<view class="say">
					作为您的生活助理，元气管家能够了解您的生活 需求及偏好，提供量身定制的贴心服务，助力您 精彩的生活。
				</view>
				<button class="bg_all" open-type="getPhoneNumber" @getphonenumber="getPhone">
					手机号一键登录
				</button>
			</view>

		</view>
	</view>


</template>

<script>
	// let WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
	
	export default {
		data() {
			return {
				getPhoneIsShow: false,
				openid: "",
				userInfo:{},
			}
		},
		onLoad() {
			uni.login({
				success(res) {
					console.log(res)
				}
			})
		},
		methods: {
			getuserinfo(e) {
				console.log(JSON.parse(e.detail.rawData))
				let userInfo = JSON.parse(e.detail.rawData)
				if (e.detail.rawData) {
					this.getPhoneIsShow = true;
					this.userInfo = userInfo
				}
			},
			async getOpenid(code) {
				try {
					let data = await this.$wxhttp.post({
						url: '/user/v1/getUserWxOpenId',
						data:{
							code:code
						}
					})
					console.log(data)
				} catch (e) {
					
				}
			},
			async login(openId,phone) {
				try {
					let nickname = encodeURI(this.userInfo.nickName);
					let headerPicUrl = this.userInfo.avatarUrl;
					let sex = this.userInfo.gender;
					
					let data = await this.$wxhttp.post({
						url: '/user/v1/wxLogin',
						data: {
							openId: openId,
							nickname: nickname,
							headerPicUrl: headerPicUrl,
							sex: sex,
							phone: phone,
						}
					})
					if(data.code == 0){
						uni.setStorageSync("token",data.data.token)
						uni.navigateBack()
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			getPhone(e) {
				const that = this;
				uni.login({
					success(res) {
						if (res.code) {
							that.$wxhttp.post({
								url: '/user/v1/getUserWxOpenId',
								data:{
									code:res.code
								}
							}).then(res=>{
								// console.log(res.data);
								// console.log(e.detail);
								let appId = "wxf58984d0c4e191d4";
								let session_key = res.data.session_key;
								let encryptedData = e.detail.encryptedData
								let iv = e.detail.iv
								let openid = res.data.openid;
								// that.login(res.data.openid,data.phoneNumber)
								that.$wxhttp.post({
									url: '/user/v1/decodeWXInfo',
									data:{
										sessionKey:res.data.session_key,
										encryptedData:encryptedData,
										iv:iv
									}
								}).then(res=>{
									console.log(res);
									that.login(openid,res.data.phoneNumber)
								})
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.box {
		height: 100vh;
		background: #fff;
		button{
			font-size: 30upx;
		}
		.bg_all{
			color: #fff;
			padding: 10upx 0;
		}
		.content {
			height: 70vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.logo_img {
				width: 628upx;
				height: 498upx;
				margin-bottom: 50upx;
				image{
					width: 628upx;
					height: 498upx;
					border-radius: 50%;
				}
			}

			.logo_font {
				font-size: 45upx;
				font-weight: 400;
				margin-bottom: 50upx;
			}

			.btn_box {
				width: 84%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.say {
					width: 95%;
					line-height: 45upx;
					color: #999;
					margin-bottom: 50upx;
				}

				button {
					width: 100%;
				}
			}

			.default_btn {
				color: green;
				border: 1px solid green;
				background: #fff;
				margin-top: 30upx;
			}

		}
	}
</style>
