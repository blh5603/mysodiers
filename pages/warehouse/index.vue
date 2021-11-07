<template>
	<view class="warehouse">
		<view class="warehouse-banner" id="warehouse-banner">
			<image src="/static/images/warehouse/banner.jpg" mode="widthFix" class="warehouse-banner_image"></image>
			<navigator url="../index/index" hover-class="none"><image src="/static/images/back.png" mode="" class="warehouse-banner_back"></image></navigator>
		</view>
		<view class="warehouse-modules" :style="{ 'padding-top': bannerHeight + 13 + 'px' }">
			<view
				class="warehouse-modules_item"
				@click="index !=0 ? jumpToDetail(item) : ''"
				:style="{ 'background-color': item.bgColor }"
				v-for="(item, index) in warehouseTypeList"
				:key="index"
			>
				<view class="warehouse-modules_item__sequence">{{ item.sequence }}</view>
				<image :src="item.img" class="warehouse-modules_item__image"></image>
				<view class="warehouse-modules_item__num" v-if="index == 0">
					<view @click="jumpToDetail(item, '游戏')">
						游戏：{{ item.count }}
						<image src="/static/images/warehouse/right.png" mode=""></image>
					</view>
					<view @click="jumpToDetail(item, '币币')">
						币币：{{ item.count }}
						<image src="/static/images/warehouse/right.png" mode=""></image>
					</view>
				</view>
				<view class="warehouse-modules_item__num" v-else>
					<view>{{ item.count }}</view>
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
			bannerHeight: 0,
			warehouseTypeList: [
				{
					type: 0,
					img: '/static/images/warehouse/cic.png',
					count: 12345678,
					bgColor: '#F8CFCF',
					sequence: ''
				},
				{
					type: 1,
					img: '/static/images/warehouse/pliers.png',
					count: 12345678,
					bgColor: '#C9FBFF',
					sequence: ''
				},
				{
					type: 2,
					img: '/static/images/warehouse/bomb_1.png',
					count: 12345678,
					bgColor: '#E4C5EC',
					sequence: '1#'
				},
				{
					type: 2,
					img: '/static/images/warehouse/bomb_2.png',
					count: 12345678,
					bgColor: '#C5EAB5',
					sequence: '2#'
				},
				{
					type: 2,
					img: '/static/images/warehouse/bomb_3.png',
					count: 12345678,
					bgColor: '#A0FFD6',
					sequence: '3#'
				},
				{
					type: 2,
					img: '/static/images/warehouse/bomb_0.png',
					count: 12345678,
					bgColor: '#FFE5B7',
					sequence: '4#'
				}
			]
		};
	},
	mounted() {
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#warehouse-banner')
			.boundingClientRect(data => {
				this.bannerHeight = data.height;
			})
			.exec();
	},
	methods: {
		// TODO：获取仓库数值
		loadWareHouseData() {},

		// 跳转仓库详情
		jumpToDetail(item, name) {
			let params = {
				type: item.type,
				sequence: item.sequence,
				image: item.img
			};
			uni.navigateTo({
				url: './detail?params=' + JSON.stringify(params) + (name ? '&name=' + name : '')
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f2f5fc;
}
.warehouse-banner {
	z-index: 1;
	position: fixed;
	left: 0;
	right: 0;
	height: 0;
	padding-bottom: 70%;
	overflow: hidden;
	.warehouse-banner_image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.warehouse-banner_back {
		width: 139rpx;
		height: 94rpx;
		margin-top: 45rpx;
	}
}
.warehouse-modules {
	display: flex;
	flex-wrap: wrap;
	padding: 25rpx;
	justify-content: space-between;
	.warehouse-modules_item {
		cursor: pointer;
		position: relative;
		width: calc(100% / 2 - 86rpx);
		border-radius: 14rpx;
		margin: 16rpx 25rpx;
		padding: 18rpx 18rpx 30rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		.warehouse-modules_item__image {
			height: 176rpx;
			width: 176rpx;
			margin-bottom: 18rpx;
		}
		.warehouse-modules_item__num {
			height: 70rpx;
			display: flex;
			flex-direction: column;
			font-size: 26rpx;
			line-height: 1.7;
			align-items: center;
			justify-content: center;
			image {
				width: 12rpx;
				height: 20rpx;
				margin-left: 20rpx;
			}
		}
		.warehouse-modules_item__sequence {
			height: 20rpx;
			width: 100%;
			text-align: right;
			font-size: 20rpx;
		}
	}
}
</style>
