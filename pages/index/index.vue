<template>
	<view class="box">
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeList:[],
			}
		},
		onShow() {
			
			
		},
		onShareAppMessage() {

		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000);
		},
		methods: {
			go_details(user_id) {
				uni.navigateTo({
					url: "../../homePage/details/details?userId="+user_id
				})
			},
			async getHomeData() {
				try {
					let data = await this.$wxhttp.post({
						url: '/assistant/v1/queryUserList'
					})
					console.log(data)
					this.homeList = data.data.userList;
				} catch (e) {
					console.log(e)
				}
			},

		}
	}
</script>
<style lang="scss">
	
</style>
