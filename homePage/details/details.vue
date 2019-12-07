<template>
	<view class="box">
		<view class="com_block com_width bg_fff">
			<view class="com_list">
				<view class="com_title_weight">小区名称：</view>
				<view>{{queryUserDetailInfo.address}}{{queryUserDetailInfo.house}}</view>
			</view>
			<view class="com_list">
				<view class="com_title_weight">姓名：</view>
				<view>{{queryUserDetailInfo.real_name}}</view>
			</view>
			<view @click="go_contactus(18801287297)" class="com_list">
				<view class="com_title_weight">联系电话：</view>
				<view class="color_blue">{{queryUserDetailInfo.phone}}</view>
			</view>
			<view @click="openMap" class="com_list">
				<view class="com_title_weight">快捷导航：</view>
				<view class="color_blue">高德地图</view>
			</view>
		</view>
		<view class="bottom_box com_width">
			<view class="tab_title display_flex">
				<view :class="idx == tabStatus ?'add_class':''" v-for="(item,idx) in tabList" :key="idx" @click="tabTap(idx)">
					{{item.value}}
					<text></text>
				</view>
			</view>
		</view>

		<view class="com_width">
			<view v-if="tabStatus == 0" class="tab_content">
				<view class="dian"><text></text></view>
				<view>使馆于海燕使馆于海燕使馆于海燕使馆于海燕使馆于海燕使馆于海燕使馆于海燕使馆于海燕</view>
			</view>

			<view v-if="tabStatus == 1" v-for="(item,idx) in queryUserTipList" :key="idx" class="com_block com_width main_home">
				<view class="com_title com_width display_flex">
					<image class="title_img" :src="item.area_icon_url" mode=""></image>
					<text>{{item.area_name}}</text>
				</view>

				<view v-for="(item_son,idx_son) in item.area_tips" :key="idx_son" class="com_width com_title_content">
					<view class="color_dian_box">
						<text class="color_dian color_zw" :style="{ background:item.area_list_style}"></text>
					</view>
					<text class="com_title_font">{{item_son.info}}</text>
				</view>
			</view>
			
			<view v-if="tabStatus == 2" class="yq_supply_list com_width border_bottom display_flex space_between" v-for="(item,idx) in queryUserSupplyList"
			 :key="idx">
				<view>
					<view class="supply_name display_flex">
						{{item.sku_name}}
						<image v-if="item.type == 1" src="/static/imgs/zs_icon.png" mode=""></image>
					</view>
					<view class="supply_info color_gray">{{item.sku_info}}</view>
				</view>
				<view>
					<switch :checked="item.is_buy == 1 ? true : false" :data-id="item.id" color="#8A41F4" @change="switchChange" />
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				queryUserDetailInfo: {},
				queryUserPlanList: [], //任务
				queryUserTipList: [], //偏好
				queryUserSupplyList: [], //补给信息
				userId: '',
				tabStatus: 0,
				tabList: [{
						value: '任务'
					},
					{
						value: '偏好'
					},
					{
						value: '补给'
					}
				],
			}
		},
		onLoad(options) {
			let userId = "1c25df1c-ee66-419b-8e33-c66de33467e8";
			// console.log(options)
			this.userId = options.userId
		},
		onShow() {
			this.queryUserDetailInfoFun(this.userId)
			this.queryUserPlanListFun(this.userId)
			this.queryUserTipListFun(this.userId)
			this.queryUserSupplyListFun(this.userId)
		},
		methods: {
			async queryUserDetailInfoFun(userId) {
				try {
					let data = await this.$wxhttp.post({
						url: '/assistant/v1/queryUserDetailInfo',
						data: {
							userId: userId
						}
					})
					this.queryUserDetailInfo = data.data;
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},
			async queryUserPlanListFun(userId) {
				try {
					let data = await this.$wxhttp.post({
						url: '/assistant/v1/queryUserPlanList',
						data: {
							userId: userId
						}
					})
					this.queryUserPlanList = data.data.userList;
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},
			async queryUserTipListFun(userId) {
				try {
					let data = await this.$wxhttp.post({
						url: '/assistant/v1/queryUserTipList',
						data: {
							userId: userId
						}
					})
					this.queryUserTipList = data.data.tipsList;
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},
			async queryUserSupplyListFun(userId) {
				try {
					let data = await this.$wxhttp.post({
						url: '/assistant/v1/queryUserSupplyList',
						data: {
							userId: userId
						}
					})
					this.queryUserSupplyList = data.data.supplyList;
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},
			tabTap(idx) {
				console.log(idx)
				this.tabStatus = idx
			},
			go_contactus(phone) {
				uni.makePhoneCall({
					phoneNumber: phone + ""
				});
			},
			openMap() {
				//#ifdef APP-PLUS
				let mapStr = this.queryUserDetailInfo.address+this.queryUserDetailInfo.house
				let url = "";
				if (plus.os.name == "Android") {
					let hasBaiduMap = plus.runtime.isApplicationExist({
						pname: 'com.baidu.BaiduMap',
						action: 'baidumap://'
					});
					let hasAmap = plus.runtime.isApplicationExist({
						pname: 'com.autonavi.minimap',
						action: 'androidamap://'
					});
					let urlAmap = `androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=${mapStr}`
					let urlBaiduMap = `baidumap://map/marker?&title=${mapStr}`;
					// let urlBaiduMap = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";
					// let urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=迁安&lat=39.9631018208&lon=116.3406135236&dev=0"
					if (hasAmap && hasBaiduMap) {
						plus.nativeUI.actionSheet({
							title: "选择地图应用",
							cancel: "取消",
							buttons: [{
								title: "百度地图"
							}, {
								title: "高德地图"
							}]
						}, function(e) {
							switch (e.index) {
								case 1:
									plus.runtime.openURL(urlBaiduMap);
									break;
								case 2:
									plus.runtime.openURL(urlAmap);
									break;
							}
						})
					} else if (hasAmap) {
						plus.runtime.openURL(urlAmap);
					} else if (hasBaiduMap) {
						plus.runtime.openURL(urlBaiduMap);
					} else {
						url = "geo:39.96310,116.340698?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
						plus.runtime.openURL(url);
						//如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差  
					}
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "Apple地图"
						}, {
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						console.log("e.index: " + e.index);
			
						switch (e.index) {
							case 1:
								url =
									"http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=39.96310,116.340698&spn=0.008766,0.019441";
								break;
							case 2:
								url = "baidumap://map/marker?location=39.968789,116.347247&title="+mapStr+"&src=Hello%20uni-app";
								break;
							case 3:
								let maps = encodeURI(mapStr);
								url =
									"iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname="+maps+"&lat=39.9631018208&lon=116.3406135236&dev=0";
								break;
							default:
								break;
						}
						if (url != "") {
							console.log(url)
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
				// #endif
				console.log("暂不支持调起app")
			},
		},

	}
</script>

<style lang="scss">
	page {
		height: 100vh;

		// background: #f2f2f2;
		.com_block {
			padding: 30rpx 0;
			border-radius: 5rpx;
			margin-top: 30rpx;
			box-shadow: 3rpx 3rpx 24rpx 3rpx rgba(71, 33, 95, 0.04);

			.com_list {
				display: flex;
				align-items: flex-start;
				padding: 10rpx 0;

				view {
					line-height: 40rpx;
					width: 64%;
				}

				.com_title_weight {
					font-weight: bold;
					width: 34%;
					text-align: end;
				}
			}
		}

		.bottom_box {
			padding: 60rpx 0 50rpx 0;

			// margin-bottom: 20rpx;
			.tab_title {
				view {
					margin-right: 30rpx;
					font-size: 32rpx;
				}

				.add_class {
					color: #80529D;
					font-weight: bold;
					position: relative;

					text {
						position: absolute;
						display: block;
						// margin:8rpx 0 0 11rpx;
						bottom: -20rpx;
						left: 11rpx;
						width: 42rpx;
						height: 8rpx;
						background: rgba(128, 82, 157, 1);
						border-radius: 6rpx;
					}
				}

			}
		}
		.yq_supply_list {
			padding: 26upx 0;
		
			.supply_name {
				font-size: 28upx;
				font-weight: 500;
		
				image {
					width: 62upx;
					height: 30upx;
					margin-left: 30upx;
				}
			}
		
			.supply_info {
				font-size: 26upx;
				margin-top: 14upx;
			}
		}

		.tab_content {
			display: flex;
			align-items: flex-start;
			padding: 10rpx 0;

			view {
				width: 90%;
				line-height: 45rpx;
			}

			.dian {
				width: 8%;
				height: 34rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				text {
					width: 16rpx;
					height: 16rpx;
					border-radius: 50%;
					background: #80529D;
				}
			}
		}

		.main_home {
			margin-top: 20rpx;
			padding-bottom: 30rpx;

			.title_img {
				width: 50rpx;
				height: 50rpx;
				margin-right: 14rpx;
			}

			.plan_list_box {
				width: 80%;
				margin-left: 7.5%;
				border-left: 1px solid #E2E2E2;

				.plan_list {
					padding: 12rpx 0;
					font-size: 28rpx;
					color: #666666;
				}
			}

			.com_title_content {
				font-size: 28rpx;
				display: flex;
				align-items: flex-start;
				padding: 10rpx 0;

				.com_title_font {
					width: 92%;
					line-height: 40rpx;
				}

				.color_dian_box {
					width: 43rpx;
					height: 26rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin-right: 20rpx;

					.color_dian {
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						margin-top: 14rpx;
					}
				}
			}
		}
	}
</style>
