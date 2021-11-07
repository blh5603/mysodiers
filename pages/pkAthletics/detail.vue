<template>
	<view class="pk-wrap">
		<header>
			<view class="header">PK详情</view>
			<navigator url="../index/index" hover-class="none"><image src="/static/images/back.png" mode="" class="pk-banner_back"></image></navigator>
		</header>
		<view v-if="status == 1" class="popup-wrap">
			<image src="/static/images/pk/success.png" mode="" class="success-image"></image>
			<view class="content">
				<view class="num">1000 CIC</view>
				<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
			</view>
		</view>
		<!-- 失败 -->
		<view v-else="status == 0" class="popup-wrap">
			<image src="/static/images/pk/failed.png" mode="" class="failed-image"></image>
			<view class="content-fail">
				<image src="/static/images/warehouse/pliers.png" mode="" class="pliers-image"></image>
				<view class="num">获得钳子</view>
				<image src="/static/images/pk/replay.png" mode="" class="replay-image"></image>
			</view>
		</view>
		<view class="details-pk-type">10CIC  1 VS 4</view>
		<view class="history__flows">
			<view class="history__flows_list">
				<view class="history__flows_item" v-for="(item, index) in historyData" :key="index">
					<view class="history__flows_item--right">
						<view class="flows_item--right_type">
							<image src="/static/images/center/avatar-small.png" mode="aspectFill"></image>
						</view>
						<view class="flows_item--right_status">
							<view class="pk-id">ID 1A2B3C</view>
							<view class="color">PK成功: 56CIC</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import service from '@/utils/service.js';
export default {
	data() {
		return {
			id: '',
			status: 0,
			pkList: [
				{
					name: '2人PK',
					img: '/static/images/pk/center-1.png',
					desc: '10CIC 1 VS 1'
				},
				{
					name: '3人PK',
					img: '/static/images/pk/center-2.png',
					desc: '10CIC 1 VS 2'
				},
				{
					name: '5人PK',
					img: '/static/images/pk/center-3.png',
					desc: '10CIC 1 VS 4'
				},
				{
					name: '10人PK',
					img: '/static/images/pk/center-4.png',
					desc: '10CIC 1 VS 9'
				}
			],
			historyData: [{ id: 0, status: 0, time: '2021-11-06 17:00:00' }, { id: 1, status: 1, time: '2021-11-06 17:00:00' }, { id: 2, status: 0, time: '2021-11-06 17:00:00' }],
		};
	},
	onLoad(options) {
		this.id = options.id;
	},
	methods: {
		// TODO：获取PK详情
		loadpkDetails() {}
	},
	onPullDownRefresh() {
		// TODO: 下拉刷新
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		let timer = null;
		//阻止重复加载
		if (timer !== null) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => this.loadpkDetails(), 500);
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
					image{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}
				}
				.flows_item--right_status {
					font-size: 28rpx;
					display: flex;
					align-items: center;
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
.details-pk-type{
	color: #fff;
	font-size: 30rpx;
	text-align: center;
}
.pk-id{
	font-weight: 500;
	margin-right: 60rpx;
}
.popup-wrap {
	position: relative;
	padding: 160rpx 32rpx 32rpx 32rpx;
	text-align: center;
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
	width: 460rpx;
	position: absolute;
	bottom: 70rpx;
	left: 50%;
	text-align: center;
	margin-left: -230rpx;
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
	margin: 20rpx auto 0;
}
.pliers-image {
	width: 140rpx;
	height: 140rpx;
}
.content-fail {
	width: 460rpx;
	position: absolute;
	bottom: 70rpx;
	left: 50%;
	text-align: center;
	margin-left: -230rpx;
	.replay-image {
		margin-left: 165rpx;
	}
}
</style>
