<script>
	export default {
		globalData: {
			
		},
		onLaunch: function() {
	
		},

		onHide: function() {

		},
		methods: {
			async getUserInfo(code) {
				try {
					let data = await this.$wxhttp.post({
						url: '/user/v1/getUserInfo',
					})
				} catch (e) {

				}
			}
		},
	}
</script>

<style lang="scss">
	view {
		line-height: 1;
	}

	.right_icon {
		width: 18upx;
		height: 32upx;
	}

	.bottom_icon {
		width: 32upx;
		height: 18upx;
	}

	/*每个页面公共css */
	.box {
		font-size: 30upx;
		color: #333333;
	}

	.bg_fff {
		background: #fff;
	}

	/* 主色 */
	.bg_all {
		background: #B896C2;
	}

	.color_blue {
		color: #0873DE;
	}

	.color_fff {
		color: #fff;
	}

	.color_all {
		// color: #8A41F4;
		color: #B896C2;
	}

	.color_gray {
		color: #999999;
	}

	.font_sr {
		font-size: 34upx;
	}

	.font_rl {
		font-size: 26upx;
	}

	.border_top {
		border-top: 1px solid #F2F2F2;
	}

	.border_bottom {
		border-bottom: 1upx solid #F2F2F2;
	}

	.com_width {
		width: 92%;
		margin-left: 4%;
	}

	.display_flex {
		display: flex;
		align-items: center;
	}

	.display_column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.space_between {
		justify-content: space-between;
	}

	.overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.overflow_tow {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
