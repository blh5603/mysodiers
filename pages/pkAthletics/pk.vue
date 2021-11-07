<template>
	<view>
		<header>
			<view class="header">PK竞技场</view>
			<navigator url="../index/index" hover-class="none"><image src="/static/images/back.png" mode="" class="pk-banner_back"></image></navigator>
		</header>
		<view class="pk-modules">
			<view class="pk-modules_item" :style="{ backgroundImage: 'url(' + itemInfo.img + ')', 'background-repeat': 'no-repeat', backgroundSize: '100% 100%' }">
				<view class="pk-modules_item__sequence">{{ itemInfo.name }}</view>
				<image src="/static/images/pk/tool.png" class="pk-modules_item__image"></image>
				<view class="pk-modules_item__num">
					<view>{{ itemInfo.desc }}</view>
				</view>
				<view class="join-text">参与人数 1/2</view>
				<view class="bottom-btn">
					<button type="default">参与</button>
					<button type="default">详情</button>
				</view>
			</view>
			<view class="pk-matrix">
				<view class="pk-matrix_item" v-for="i in 10" :key="i">
					<view class="avatar">
						<image src="/static/images/avatar.png" mode="widthFix" class="avatar-img" v-if="i < 3"></image>
						<text class="index">{{ i }}</text>
					</view>
					<view class="room_id">ID {{ i < 3 ? '00000' : '' }}</view>
				</view>
			</view>
		</view>
		<view class="history__flows">
			<view class="history__flows_title">参与记录:</view>
			<view class="history__flows_list">
				<view class="history__flows_item" v-for="(item, index) in historyData" :key="index">
					<view class="history__flows_item--right">
						<view class="flows_item--right_type">10 CIC, 5人</view>
						<view :class="['flows_item--right_status', item.status == '1' ? '' : 'color']">拆弹失败</view>
						<view class="view-details">
							<view class="flows_item--right_time">{{ item.time }}</view>
							<view @click="openDetail(item.status)">查看详情 ></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 进入房间 -->
		<!-- 详情弹框 -->
		<popup ref="popup" :mask-click="true">
			<!-- 成功 -->
			<view v-if="status == 1" class="popup-wrap">
				<image src="/static/images/pk/success.png" mode="" class="success-image"></image>
				<view class="content">
					<view class="num">1000</view>
					<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
				</view>
			</view>
			<!-- 失败 -->
			<view v-else="status == 0" class="popup-wrap">
				<image src="/static/images/pk/failed.png" mode="" class="failed-image"></image>
				<view class="content-fail">
					<image src="/static/images/warehouse/pliers.png" mode="" class="pliers-image"></image>
					<view class="num">
						很遗憾!
						<br />
						但您仍获得了
					</view>
					<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
				</view>
			</view>
			<image src="/static/images/pk/close.png" mode="" class="close" @click="close"></image>
		</popup>
	</view>
</template>

<script>
import popup from '../../uni_modules/uni-popup/components/uni-popup/uni-popup';
export default {
	components: { popup },
	data() {
		return {
			itemInfo: {},
			status: '',
			historyData: [{ id: 0, status: 0, time: '2021-11-06 17:00:00' }, { id: 1, status: 1, time: '2021-11-06 17:00:00' }, { id: 2, status: 0, time: '2021-11-06 17:00:00' }]
		};
	},
	onLoad(options) {
		this.itemInfo = JSON.parse(options.data);
	},
	methods: {
		// 跳转详情
		openDetail(status) {
			this.status = status;
			this.$refs.popup.open('center');
		},
		// 关闭详情
		close() {
			this.$refs.popup.close('center');
		}
	}
};
</script>

<style lang="scss">
page {
	width: 100%;
	min-height: 100%;
	background: url(../../static/images/pk/bg.png) no-repeat;
	background-size: 100% 100%;
}
header {
	z-index: 1;
	position: fixed;
	left: 0;
	right: 0;
	height: 94rpx;
	.pk-banner_back {
		position: absolute;
		width: 139rpx;
		height: 94rpx;
		top: 45rpx;
	}
	.header {
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		font-size: 36rpx;
		color: #ffffff;
		margin-top: 45rpx;
		text-align: center;
	}
}
.pk-modules {
	position: relative;
	padding: 160rpx 16rpx 16rpx;
	height: 70%;
	.pk-matrix {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
		padding: 16rpx;
		justify-content: space-between;
		.pk-matrix_item {
			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4),
			&:nth-child(5),
			&:nth-child(6) {
				width: 50%;
			}

			&:nth-child(2),
			&:nth-child(4),
			&:nth-child(6) {
				.avatar {
					margin-left: auto;
				}
				.room_id {
					text-align: right;
				}
				.index {
					margin-left: -20%;
					line-height: 8;
				}
			}

			&:nth-child(1),
			&:nth-child(3),
			&:nth-child(5) {
				.index {
					padding-left: 110%;
					line-height: 200rpx;
				}
			}
			&:nth-child(7),
			&:nth-child(8),
			&:nth-child(9),
			&:nth-child(10) {
				.index {
					display: block;
					width: 100%;
					text-align: center;
					line-height: 350rpx;
				}
				.room_id {
					margin-top: 5rpx;
				}
			}
			.room_id {
				margin-top: -32rpx;
				font-size: 20rpx;
				color: #ffffff;
			}
			.index {
				font-size: 20rpx;
				color: #ffffff;
			}
		}
	}
	.pk-modules_item {
		cursor: pointer;
		position: absolute;
		width: 45%;
		border-radius: 14rpx;
		left: 50%;
		margin-left: -24.5%;
		padding: 18rpx;
		top: 22%;
		text-align: center;
		.pk-modules_item__image {
			height: 150rpx;
			width: 150rpx;
			margin: 60rpx auto 40rpx;
		}
		.pk-modules_item__num {
			display: flex;
			height: 50rpx;
			flex-direction: column;
			font-size: 28rpx;
			line-height: 50rpx;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-weight: 500;
		}
		.join-text {
			color: #fff;
			font-size: 24rpx;
			margin-bottom: 20rpx;
		}
		.bottom-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			button {
				height: 50rpx;
				line-height: 50rpx;
				font-size: 22rpx;
				color: #ffffff;
				background: linear-gradient(to bottom, #26d2f9, #35b3ff);
				border-radius: 50rpx;
				border: none;
			}
		}
		.pk-modules_item__sequence {
			height: 30rpx;
			width: 100%;
			text-align: center;
			font-size: 24rpx;
			line-height: 30rpx;
			margin-top: -10rpx;
			padding-left: 20rpx;
			color: #ffffff;
		}
	}
	.avatar {
		position: relative;
		width: 100rpx;
		height: 200rpx;
		background: url(/static/images/center/border.png) no-repeat;
		background-size: cover;
		.avatar-img {
			position: absolute;
			display: block;
			width: 70rpx;
			height: 70rpx;
			top: 65rpx;
			margin-left: 8rpx;
		}
	}
}

.history__flows {
	padding: 32rpx;
	color: #ffffff;
	.history__flows_title {
		font-size: 32rpx;
		padding-bottom: 32rpx;
	}
	.history__flows_list {
		.history__flows_item {
			margin: 24rpx 0;
			border: 1px solid #2d76a2;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 32rpx;
			border-radius: 12rpx;
			.history__flows_item--right {
				flex: 1;
				.flows_item--right_type {
					font-size: 30rpx;
				}
				.flows_item--right_status {
					margin-top: 24rpx;
					font-size: 24rpx;
				}
				.color {
					color: #f9a864;
				}
				.view-details {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					margin-top: 24rpx;
				}
			}
		}
	}
}
.uni-popup {
	.popup-wrap {
		position: relative;
	}
	.success-image {
		height: 460rpx;
		width: 460rpx;
	}
	.failed-image {
		height: 572rpx;
		width: 460rpx;
	}
	.content {
		position: absolute;
		bottom: 40rpx;
		left: 35%;
		text-align: center;
	}
	.num {
		color: #a15c1a;
		font-size: 40rpx;
		font-weight: bold;
	}
	.replay-image {
		display: block;
		width: 126rpx;
		height: 60rpx;
		margin-top: 20rpx;
	}
	.pliers-image {
		width: 97rpx;
		height: 97rpx;
	}
	.content-fail {
		position: absolute;
		bottom: 40rpx;
		left: 50%;
		margin-left: -230rpx;
		text-align: center;
		width: 100%;
		.replay-image {
			margin-left: 165rpx;
		}
	}
	.close {
		width: 80rpx;
		height: 80rpx;
		margin-left: 190rpx;
	}
	.form-wrap {
		background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;
		}
	}
}
</style>
