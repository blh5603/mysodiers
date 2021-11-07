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
								<view class="employ-btn" @tap="open(index)">
									<image src="../../static/images/employ/employbtn.png" mode=""></image>
								</view>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<!-- 详情弹框 -->
		<popup ref="popup" :mask-click="true">
			<!-- 雇佣 -->
			<view v-if="status == 0" class="popup-wrap">
				<view class="centerheader">
					<view class="head-left">
						<view class="myavatar">
							<image src="../../static/images/avatar.png" mode=""></image>
						</view>
					</view>
					
					<view class="head-right">
						<view class="myid">
							<view class="myname">工兵等级：</view>
							<view class="myvalue">{{sodiertype[typeid].level}}</view>
						</view>
						<view class="mylevel">
							<view class="myname">可用CIC：</view>
							<view class="myvalue">{{userinfo.money}}</view>
						</view>
						<view class="mylevel">
							<view class="myname">最多雇佣：</view>
							<view class="myvalue">{{sodiertype[typeid].maxnum}}</view>
						</view>
					</view>
				</view>
				<view class="employ">
					<view class="text-choose">
						选择雇佣数量
					</view>
					<view class="text-number">
						<view @tap="reduce()" class="reduce">-</view>
						<input type="number" :value="total" class="number" />
						<view @tap="add()" class="add">+</view>
					</view>
					<view class="btn-ok">
						<view class="btn" @tap="employ(sodiertype[typeid].level)">雇佣</view>
					</view>
				</view>
			</view>
			
			<!-- 成功 -->
			<view v-else="status == 1" class="popup-wrap">
				<view class="content">
					<view class="result">
						成功了!
					</view>
				</view>
			</view>
			<!-- 失败 -->
			<view v-else="status == 2" class="popup-wrap">
				<view class="content-fail">
					<view class="result">
						很遗憾!
					</view>
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
				userinfo:{
					id: 10,
					money: 10000
				},
				sodiertype:[
					{
						level: '一级工兵',
						image: '../../static/images/employ/sodier1.png',
						price: 14000,
						period: 7,
						contribution: 10,
						military: 1400,
						maxnum: 5
					},
					{
						level: '二级工兵',
						image: '../../static/images/employ/sodier2.png',
						price: 14000,
						period: 7,
						contribution: 20,
						military: 1400,
						maxnum: 5
					},
					{
						level: '三级工兵',
						image: '../../static/images/employ/sodier3.png',
						price: 14000,
						period: 7,
						contribution: 30,
						military: 1400,
						maxnum: 5
					},
				],
				sodierchoice: {},
				typeid: 0,
				status: 0,
				total: 1,
			};
		},
		onLoad(options) {
			if(options.data) this.sodierchoice = JSON.parse(options.data);
		},
		methods:{
			employ(e){
				let that = this
				that.$refs.popup.close('center');
				if(1){
					that.status = 1;
				}
				else
				{
					that.status = 2;
				}
				
				
				that.status = 0;
				console.log(e);
			},
			reduce(){
				this.total -= 1;
				this.countVal(this.total)
			},
			add(){
				this.total += 1;
				this.countVal(this.total)
			},
			countVal(e){
				if(e <= 0){
					this.total = 1
				}
			},
			open(typeid){
				this.typeid = typeid;
				this.$refs.popup.open('center');
				console.log(1111)
			},
			// 关闭详情
			close() {
				this.$refs.popup.close('center');
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
		background: #88f5fe url(../../static/images/employ/embg.png) repeat-x top left;
		background-size: contain;
	}
	.centerheader{
		border-radius: 20rpx;
		border: 2rpx solid #63acea;
	}
	.employ{
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 30rpx;
		color: #FFF;
		background: #63acea;
		border-radius: 20rpx;
		line-height: 120rpx;
		margin: 20rpx 0;
		
		.text-choose{
			
		}
		.text-number{
			display: flex;
			justify-content: space-between;
			width: 20%;
			text-align: center;
			align-items: center;
			font-size: 30rpx;
			font-family: Arial, Helvetica, sans-serif;
			.reduce{}
			.number{}
			.add{}
		}
		.btn-ok{
			background: #d1e6f9;
			border-radius: 120rpx;
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			color: #1088d3;
		}
	}
	.result{
		
		background: #67BA56;
		width: 300rpx;
		height: 140rpx;
		line-height: 140rpx;
		margin-left: -50%;
		border-radius: 40rpx;
	}
	
	.header{
		.avatar{
			width: 180rpx;
			height: 180rpx;
			margin: 20rpx auto;
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
						width: 320rpx;
						height: 300rpx;
						image{
							zoom: .6;
							width: 320rpx;
							height: 300rpx;
						}
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
									width: 220rpx;
									height: 100rpx;
									zoom: 0.7;
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
