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
				
				<view v-for="(sodier,index) in sodiertype" :key="index" :class="'sodieritem sbg' + index">
					<view class="item-left" :style="'background:url('+sodier.image+') no-repeat center center;background-size:80% 75%;'">
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
								<view class="employ-btn" @tap="employ()">
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
		},
		onLoad() {
			
		},
		methods:{
			employ(){
				console.log(1111)
			}
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
			margin: 100rpx auto 20rpx auto;
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
				zoom: .9;
				width: 90%;
				border-radius: 60rpx;
				overflow: hidden;
				margin: 0 auto;
				margin-bottom: 30rpx;
				display: flex;
				
				.item-left{
					width: 50%;
					
					.item-status{
						width: 240rpx;
						height: 240rpx;
					}
				}
				.item-right{
					background: #FFFFFF;
					width: 50%;
					
					.attr-list{
						margin: 20rpx 20rpx;
						line-height: 40rpx;
						font-size: 10rpx;
						font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
									width: 200rpx;
									height: 90rpx;
									zoom: 0.6;
								}
								
							}
						}
					}
				}
			}
			
			.sbg0 { background: #e8cbe6; }
			.sbg1 { background: #f1f1d1; }
			.sbg2 { background: #c8f0fa; }
		}
	}
</style>
