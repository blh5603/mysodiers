<template>
	<view class="container">

		<view class="header">
			<view class="lang">
				<navigator url="/pages/index/index"></navigator>
				<image :src="lanpic" @tap="changelang()"></image>
			</view>

			<view class="mainrow">
				<view class="userinfo">
					<view class="avatar">
						<navigator url="/pages/family/family">
							<image src="../../static/images/avatar.png"></image>
						</navigator>
					</view>
					<view class="mainfo">
						<view class="nickname" v-text="userinfo.invite_code"></view>
						<view class="levelname" v-text="userinfo.role_name"></view>
					</view>
				</view>
				<view class="notice">
					<!-- <navigator url="/pages/notice/notice"> -->
					<image src="../../static/images/noticelogo.png"></image>
					<!-- </navigator> -->
				</view>
			</view>

			<view class="maqueen">
				<view class="textinfo">
					<textscroll :list="list" />
				</view>
			</view>
		</view>

		<view class="maindiv">
			<view class="aditem" v-for="(item,index) in adlist " :key="index">
				<view v-for="(itm,idx) in item " :key="idx">
					<image :title="itm.name" :src="lanchk==0?itm.image1:itm.image2" mode="widthFix"
						@tap="tourl(itm.url)"></image>
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
				userinfo: {
					invite_code: '',
					role_name: '',
					invite_url: 'https://www.bombgame.org/users/new'
				},
				lantype: 0,
				lanpic: '',
				lanchk: 0,
				langpics: [{
						name: 'zh-CN',
						url: '../../static/images/lang-CN.png'
					},
					{
						name: 'en',
						url: '../../static/images/lang-EN.png'
					}
				],
				list: [
					"预注册期间所有新玩家都可以获得100CIC空投奖励，正式上线后空投奖励可用来雇佣工兵进行扫雷游戏。",
					"预注册期间所有新玩家都可以获得100CIC空投奖励，正式上线后空投奖励可用来雇佣工兵进行扫雷游戏。",
					"预注册期间所有新玩家都可以获得100CIC空投奖励，正式上线后空投奖励可用来雇佣工兵进行扫雷游戏。"],
				adlist: [
					[{
						name: 'employ',
						image1: '../../static/images/adver/employ-CN.png',
						image2: '../../static/images/adver/employ-EN.png',
						url: '/pages/employ/employ'
					}],
					[{
						name: 'mysodier',
						image1: '../../static/images/adver/mysodier-CN.png',
						image2: '../../static/images/adver/mysodier-EN.png',
						url: '/pages/mysodiers/mysodiers',

					}],
					[{
							name: 'warehouse',
							image1: '../../static/images/adver/warehouse-CN.png',
							image2: '../../static/images/adver/warehouse-EN.png',
							url: '/pages/warehouse/index',
							height: '120'
						},
						{
							name: 'strategy',
							image1: '../../static/images/adver/strategy-CN.png',
							image2: '../../static/images/adver/strategy-EN.png',
							url: '/pages/strategy/strategy',
							height: '120'
						},
					],
					[{
						name: 'pkjjc',
						image1: '../../static/images/adver/pkjjc-CN.png',
						image2: '../../static/images/adver/pkjjc-EN.png',
						url: '/pages/pkAthletics/index'
					}],
				]
			}
		},
		onLoad() {
			// console.log(this.$i18n.locale)
			// uni.setStorageSync('user_token','0x5ca09ea346730984b586ca170728f46661401ad3')
			let that = this
			this.lanpic = this.langpics[this.lantype].url;

			service.getWeb3().then(res => {
				that.web3 = res;
				res.eth.getAccounts(function(err, result) {
					let address = result[0];
					that.myaddress = address

					that.checkExist(address).then(function (rs) {
						if (rs) {
							// 更新用户信息
							uni.setStorageSync('user_token', address)
							that.user_token = address
						
							// 获取用户信息
							service.getdata(that, service.api.main.userinfo, {
								"user_token": that.user_token,
							}, 'POST', '', '', function(self, res) {
								// 反馈结果
								if (res.code == 'success') {
									self.userinfo = res.data
								} else {
									self.$util.Tips({
										title: res.msg
									}, "/pages/register/register");
									return;
								}
							});
						
						} else {
							that.$util.Tips({
								title: ''
							}, "/pages/register/register");
						}
					});
				});
			}).catch(function(result) {
				console.log(result);
				// 弹框提示错误信息
			});
		},
		methods: {
			tourl(url) {
				console.log(url);
				// 暂停转向
				return;

				this.$util.Tips(url);
			},
			async checkExist(address) {
				// 判断是否注册
				let result = false;
				await service.getdata(this, service.api.main.exists, {
					"address": address,
				}, 'GET', '', '', function(self, res) {
					// 反馈结果
					if (res.code == 'success') {
						if (res.data.exists) {
							result = true;
						}
					}
				});
				return result;
			},
			changelang() {

				if (this.lanchk == 0) {
					this.lanchk = 1;
				} else {
					this.lanchk = 0;
				}

				if (this.lantype == 0) {
					this.lantype = 1;
				} else {
					this.lantype = 0;
				}
				uni.setStorageSync('language', this.langpics[this.lantype].name)
				this.$i18n.locale = uni.getStorageSync('language')

				this.lanpic = this.langpics[this.lantype].url;
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: url(../../static/images/background.png) no-repeat fixed top;
		background-size: 100%;
	}

	.container {
		padding: 20rpx;
		font-size: 14rpx;
		line-height: 24rpx;
	}

	.maqueen {
		margin-top: 5%;
		background: url(../../static/images/marquee.png) no-repeat;
		background-size: 100%;
		height: 90rpx;
		overflow: hidden;
		padding: 0 30rpx;
		.textinfo {
			width: 90%;
			font-size: 40rpx;
			margin: 0 30rpx;
		}
	}

	.maindiv {
		margin-top: 5%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: -5%;
		margin-right: -5%;

		.aditem {
			width: 45%;
			height: 500rpx;
			overflow: hidden;
			margin-bottom: 5%;
			margin-right: 5%;

			image {
				width: 100%;
				border-radius: 10rpx;
			}
		}

		.aditem>image:first {
			border: 2rpx solid #103E5C
		}
	}
</style>
