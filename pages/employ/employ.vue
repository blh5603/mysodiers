<template>
	<view class="container">
		<view class="header">
			<view class="avatar">
				<image src="../../static/images/bombjogo.png"></image>
			</view>
			<view class="star">
				<image src="../../static/images/employ/star.png"></image>
			</view>
		</view>
		
		<view class="maindiv">
			<view class="sodierlist">
				
				<view class="sodieritem" v-for="(sodier,index) in sodiertype" :key="index">
					<view class="item-left" :style="'background:url('+sodier.image+') no-repeat center center;'">
						<view class="item-status">
							<image src="../../static/images/employ/bage.png"></image>
						</view>
					</view>
					
					<view class="item-right">
						<view class="attr-list">
							
							<view class="attr-item">
								<view class="attr-left">等级：</view>
								<view class="attr-right">{{sodier.level}}</view>
							</view>
							<view class="attr-item">
								<view class="attr-left">费用：</view>
								<view class="attr-right">{{sodier.price}}</view>
							</view>
							<view class="attr-item">
								<view class="attr-left">周期：</view>
								<view class="attr-right">{{sodier.period}}</view>
							</view>
							<view class="attr-item">
								<view class="attr-left">贡献：</view>
								<view class="attr-right">{{sodier.contribution}}</view>
							</view>
							<view class="attr-item">
								<view class="attr-left">战力：</view>
								<view class="attr-right">{{sodier.military}}</view>
							</view>
							<view class="attr-item">
								<view class="employ-btn">
									<image src="../../static/images/employ/employbtn.png" mode=""></image>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sodiertype:[
				{
					level: '一级工兵',
					image: '../../static/images/employ/sodier1.png',
					price: 14000,
					period: 7,
					contribution: 10,
					military: 1400
				},
				{
					level: '二级工兵',
					image: '../../static/images/employ/sodier2.png',
					price: 14000,
					period: 7,
					contribution: 20,
					military: 1400
				},
				{
					level: '三级工兵',
					image: '../../static/images/employ/sodier3.png',
					price: 14000,
					period: 7,
					contribution: 30,
					military: 1400
				},
				]
			};
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background: url(../../static/images/employ/embg.png) repeat-x top left;
		background-size: contain;
	}
	.header{
		.avatar{
			width: 180rpx;
			height: 180rpx;
			margin: 120rpx auto 20rpx auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.star{
			text-align: center;
			image{
				width: 457rpx;
				height: 154rpx;
			}
			zoom: 0.8;
		}
	}
	.maindiv{
		.sodierlist{
			margin-top: 30rpx;
			.sodieritem{
				background: #FFFFFF;
				width: 90%;
				border-radius: 60rpx;
				margin: 0 auto;
				margin-bottom: 30rpx;
				display: flex;
				
				.item-left{
					width: 50%;
					background-size: cover;
					
					.item-status{
						width: 240rpx;
						height: 240rpx;
					}
				}
				.item-right{
					width: 50%;
					.attr-list{
						margin: 20rpx;
						line-height: 50rpx;
						.attr-item{
							display: flex;
							.item-left{
								width: 50%;
							}
							.item-right{
								width: 50%;
							}
							.employ-btn{
								margin: 10rpx 0;
								image{
									width: 280rpx;
									height: 100rpx;
									zoom: 0.7;
								}
								
							}
						}
					}
				}
			}
		}
	}
</style>
