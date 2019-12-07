<template>
	<view class="box">
		<view class="com_title">好友</view>
		<view class="bg_fff for_data" @click="go_Msg(item.name)" v-for="(item,idx) in member" :key="idx">
			<image src="../../static/images/theme@2x.png" mode=""></image>
			<view>{{item.name}}</view>
		</view>
		<view class="com_title">群聊</view>
		<view class="bg_fff for_data" @click="go_moreIm(item.name,item.roomId)" v-for="(item,idx) in rooms" :key="idx">
			<image src="../../static/images/groupTheme.png" mode=""></image>
			<view>{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	let disp = require("../../utils/broadcast");
	let isfirstTime = true
	export default {
		data() {
			return {
				member: [], //好友
				rooms: [], //群组
			}
		},
		onLoad() {
			let me = this;
			//监听解散群
			disp.on("em.xmpp.invite.deleteGroup", function() {
				me.listGroups();
				me.getRoster();
				me.messageNum = getApp().globalData.saveFriendList.length;
			});

			//监听未读消息数
			disp.on("em.xmpp.unreadspot", function(message) {

				me.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			});

			//监听未读加群“通知”
			disp.on("em.xmpp.invite.joingroup", function() {
				me.unReadNoticeNum = getApp().globalData.saveGroupInvitedList.length;
				me.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});

			disp.on("em.xmpp.contacts.remove", function() {
				me.getRoster();
			});
			// this.getUserInfo()
			// setTimeout(() => {
				me.getRoster()
			// }, 2000)

		},
		onShow() {
			console.log("show")
		},
		methods: {
			go_moreIm(name,roomId) {
				var nameList = {
					myName:"lixu",
					your:name,
					groupId:roomId
				};
				uni.navigateTo({
					url: "/minePage/IMmore/IMmore?username=" + JSON.stringify(nameList)
				})
			},
			go_Msg(yourname) {
				var nameList = {
					myName:"lixu",
					your: yourname,
				};
				console.log(yourname)
				uni.navigateTo({
					url: "/minePage/IMone/IMone?username=" + JSON.stringify(nameList)
				})
			},
			async getUserInfo(code) {
				try {
					let data = await this.$wxhttp.post({
						url: '/user/v1/getUserInfo',
					})
					let userInfo = data.data;
					this.userInfo = userInfo;
					this.login(userInfo.user_no, userInfo.nickname);
				} catch (e) {

				}
			},
			login(user_no, userName) {

				uni.setStorage({
					key: "myUsername",
					data: userName.toLowerCase()
				});
				this.$conn.open({
					apiUrl: this.$im.config.apiURL,
					user: user_no,
					pwd: "111111",
					grant_type: "password",
					appKey: this.$im.config.appkey
				});
			},
			getRoster() {
				let me = this;

				let rosters = {
					success(roster) {
						var member = [];
						for (let i = 0; i < roster.length; i++) {
							if (roster[i].subscription == "both") {
								member.push(roster[i]);
							}
						}
						uni.setStorage({
							key: "member",
							data: member
						});
						console.log("好友", member)
						me.member = member
						me.listGroups()
						disp.fire("em.main.ready");
						me.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
					},
					error(err) {
						console.log(11, err);
					}
				};
				this.$im.conn.getRoster(rosters);
			},
			listGroups() {
				var me = this;
				return this.$im.conn.listRooms({
					success: function(rooms) {
						uni.setStorage({
							key: "listGroup",
							data: rooms
						});
						console.log("群组", rooms)
						me.rooms = rooms
					},
					error: function(err) {
						console.log(err)
					}
				});
			},

			into_chatRoom(item) {
				let detail = item;
				//↓↓↓↓ 谁赞成谁反对?
				//群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
					this.into_groupChatRoom(detail)
				} else {
					this.into_singleChatRoom(detail)
				}
			},

			//	单聊
			into_singleChatRoom(detail) {
				var my = uni.getStorageSync("myUsername");
				var nameList = {
					myName: my,
					your: detail.username
				};
				uni.navigateTo({
					url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			},

			//	群聊 和 聊天室 （两个概念）
			into_groupChatRoom(detail) {
				var my = uni.getStorageSync("myUsername");
				var nameList = {
					myName: my,
					your: detail.groupName,
					groupId: detail.info.to
				};
				console.log("群聊")
				uni.navigateTo({
					url: "/minePage/IMmore/IMmore?username=" + JSON.stringify(nameList)
				})
				// uni.navigateTo({
				// 	url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
				// });
			},

		}
	}
</script>

<style lang="scss">
	.box {
		.com_title {
			text-indent: 26upx;
			padding: 20upx 0;
			background: #f2f2f2;
		}

		.bg_fff {
			background: #fff;
		}

		.for_data {
			display: flex;
			align-items: center;
			
			image{
				width: 60upx;
				height: 60upx;
				margin:0 18upx;
			}
			view{
				height:70upx;
				line-height: 70upx;
				padding: 10upx 0;
				width: 88%;
				border-bottom: 1upx solid #f2f2f2;
			}
		}
		
	}
</style>
