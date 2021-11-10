<template>
	<view class="container">

		<view class="login">

			<view class="user_avatar">
				<view class="avatar">

				</view>
			</view>

			<view class="input-group">

				<view class="input-row">
					<view class="input-img">
						<image src="../../static/images/reg/address.png" mode=""></image>
					</view>

					<input class="m-text" type="text" v-model="myaddress" placeholder="我的地址"
						placeholder-class="input-placeholder"></input>
				</view>

				<view class="input-row">
					<view class="input-img">
						<image src="../../static/images/reg/invater.png" mode=""></image>
					</view>

					<input class="m-text" type="text" v-model="myinviter" placeholder="邀请人ID"
						placeholder-class="input-placeholder"></input>
				</view>


				<view class="memory" style="display: none;">
					<label class="radio" @click="checked = !checked">
						<radio value="" v-bind:checked="checked" color="rgba(255,255,255,.4)" />记住密码
					</label>

					<view class="m-code" @click="forget()">忘记密码</view>
				</view>

				<view style="height: 30upx;"></view>

				<view class="input-btn" @click="bindRegister" v-if="status == 1">点击注册</view>
				<view class="input-btn" v-else>点击注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '@/utils/service.js';
	import NCWeb3 from "@/static/js/web3";

	export default {
		data() {
			return {
				myaddress: '',
				myinviter: '',
				status: 1,
				checked: false,
				invite_code: ''
			};
		},
		onLoad(options) {
			let that = this
			// test
			// uni.setStorageSync('user_token','0x5ca09ea346730984b586ca170728f46661401ad3')
			that.invite_code = options.invite_code;
			if(typeof that.invite_code == "undefined" || that.invite_code == null || that.invite_code == ""){
				that.invite_code = uni.getStorageSync('invite_code')
			}
			
			// 有邀请码，设为推荐人
			if(that.invite_code) that.myinviter = that.invite_code
			// let iuserkey = uni.getStorageSync('user_token');

			// 没有注册，连接钱包读取地址
			service.getWeb3().then(res => {
				that.web3 = res;

				res.eth.getAccounts(function(err, result) {
					let address = result[0];
					// console.log(err, result);
					that.myaddress = address

					that.checkExist(address).then(function(rs) {
						if (rs) {
							console.log(rs)
							// 更新用户信息
							uni.setStorageSync('user_token', address)

							// 已注册用户跳转
							that.$util.Tips("/pages/playgame/playgame");
							return;
						}
					});

				});
			}).catch(function(result) {
				console.log(result);
				// 弹框提示错误信息
			});

		},
		methods: {
			bindRegister() {

				if (this.myaddress == "") {
					this.$util.Tips({
						title: '我的地址格式有误！'
					});
					return;
				}

				if (this.myinviter == "") {
					this.$util.Tips({
						title: '邀请人不能为空！'
					});
					return;
				}

				// 发送注册请求
				service.getdata(this, service.api.main.register, {
					"address": this.myaddress,
					"invite_code": this.myinviter,
				}, 'POST', '', '', function(self, res) {
					// 反馈结果
					if (res.code == 'success') {
						self.$util.Tips({
							title: '注册成功！'
						},"/pages/playgame/playgame");
						uni.setStorageSync('user_token', res.data.user_token)
					} else {
						self.$util.Tips({
							title: res.msg
						});
					}
					return;
				});
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
			forget() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: url(../../static/images/reg/regbg.png) no-repeat fixed top;
		background-size: 100%;
		overflow: hidden;
	}

	.login {
		.user_avatar {
			height: 140rpx;
			margin-top: 240rpx;
			align-items: center;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 150rpx;
				// background: #FFF;
				margin: 0 auto;
			}
		}
	}

	.input-group {

		overflow: hidden;
		margin-top: 100rpx;
		z-index: 999;

		.input-row {
			input {
				.input-placeholder {
					color: #DDD;
					letter-spacing: 2rpx;
					font-family: "Heiti SC";
					font-weight: 500;
				}
			}

			.input-img {
				image {
					width: 50rpx;
					height: 50rpx;

				}
			}

		}
	}
</style>
