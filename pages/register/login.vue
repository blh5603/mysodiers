<template>
	<view class="content general_bg">
		<view class="log-img">
			<image :src="logo" mode="aspectFit"></image>
		</view>

		<!-- <view class="log-title">会员登录</view> -->

		<view class="input-group">
			<view class="input-row">
				<view class="input-img">
					<image src="/static/icon/phone.png" mode=""></image>
				</view>

				<input class="m-text" type="text" v-model="account" placeholder="请输入手机号"></input>
			</view>

			<view class="input-row">
				<view class="input-img">
					<image src="../../static/icon/pwd.png" mode=""></image>
				</view>

				<input class="m-text" type="password" v-model="password" placeholder=""></input>
			</view>


			<view class="memory">
				<label class="radio" @click="checked = !checked" >
					<radio value="" v-bind:checked="checked" color="rgba(255,255,255,.4)" />记住密码
				</label>

				<view class="m-code" @click="forget()">忘记密码</view>
			</view>

			<view style="height: 30upx;"></view>

			<view class="input-btn" @click="bindLogin" v-if="status == 1">立即登录</view>
			<view class="input-btn" v-else>立即登录</view>
		</view>

		<view class="action-row" @click="register">
			<text class="reg_btn">注册新账号</text>
			<uni-icons size="20" type="navigate" class="row-icon navigator"></uni-icons>
		</view>
		
		<view class="action-row">
			<view class="iconfont icon-weixin wxlogin" @click="handleThirdLoginApp()"></view>
		</view>
		
		<view class="schedule_box" v-show="show_s"><!-- v-show="show_s" -->
			<view class="schedule">
				<text>{{progress}} / 100</text>
				<view class="schedule_s" :style="{width:progress+'%'}">
					
				</view>
			</view>
			<view class="">
				下载中...
			</view>
		</view>
		
		<view class="w3lsg-bubbles">
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
		</view>
		
	</view>
</template>

<script>
	import service from '@/store/service.js';

	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		data() {
			return {
				account: '',
				password: '',
				status: 1,
				logo: '',
				checked: false,
				progress:0,
				show_s:false,
				isWeixin: false,
				openid: '',
				wxuser: [],
				apptype: 'APP'
			}
		},
		onLoad() {
			//this.scollstop();
			var _this = this
			var platform = {}
			uni.getSystemInfo({
				success(res) {
					console.log(res.platform)
					platform.system = res.platform
				}
			})
			
			// #ifdef H5
				_this.apptype = 'JSAPI';
				_this.isWeixin = this.$wechat.isWechat()
				if(_this.isWeixin){
					let hasAccount = uni.getStorageSync('hasAccount')
					if(hasAccount){
						uni.removeStorageSync('hasAccount');
						return;
					}
					//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
					_this.handleThirdLoginApp();
				}
			// #endif
			
			// #ifdef APP-PLUS  
			plus.runtime.getProperty(plus.runtime.appid, function(e) {
				console.log(e.version);
				uni.request({
					url: service.api.general.logo,
					data: {
						app_version: e.version,
					},
					success: (result) => {
						//console.log(result);
						var data = result.data;
						// console.log(e.version !== data.data.version, 'e.version !== data.data.version')
						if (data.code == 0) {
							uni.showModal({
								content: '检测到新版本，是否确定更新？',
								success: (res) => {
									if (res.confirm) {
										// console.log('用户点击确定', this);
										const url = data.data[platform.system];
										// console.log(data.data[platform.system],'data.data[platform.system]');
										_this.updata_app(url)
									} else if (res.cancel) {
										//console.log('用户点击取消');
										plus.runtime.quit();
									}
								}
							})
						}
					}
				});
			});
			// #endif
			// let updata_app = function(url) {}
		},
		onShow: function() {
			// console.log(uni.getStorageSync('User_paw')[0])
			this.account = uni.getStorageSync('User_paw')[0]
			if (uni.getStorageSync('memory') == true) {
				this.checked = uni.getStorageSync('memory')
				this.password = uni.getStorageSync('User_paw')[1]
			}
			//获取网站logo
			service.upload(this, service.api.general.logo, {

			}, 'GET', '', '', function(self, res) {
				
				if (res.code == '1') {
					
					var data = res.data;
					//console.log(service.api_root + data.site_logo);
					uni.setStorageSync('logo', data)
					self.logo = data.site_logo;
					uni.setStorageSync('ios_dwonlink', res.data.ios_dwonlink)
					uni.setStorageSync('android_dwonlink', res.data.android_dwonlink)
				}
			});
		},
		methods: {
			afterLogin(data){
				var that = this;
				console.log(data);
				
				service.User_paw(data.user.account, data.user.password);
				setTimeout(function() {
					that.status = 1;
					uni.setStorageSync('token', data.token);
					uni.setStorageSync('user', data.user);
					that.$util.Tips('/pages/main/index');
				}, 1000);
			},
			//禁止滚动
		    scollstop(){
				var mo=function(e){e.preventDefault();};
				document.body.style.overflow='hidden';
				document.addEventListener("touchmove",mo,false);//禁止页面滑动
			},
			updata_app(url) {
				//升级app
				this.show_s = true
				/* uni.showLoading({
					title: '下载中',
					mask: true
				}); */
				console.log(url, 'foaishfio');
				var downloadTask = uni.downloadFile({
					url,
					success: (downloadResult) => {
						uni.showLoading({
							title: '安装中',
							mask: true
						});
						// console.log(downloadResult,uni.getStorageSync('v_data').url)
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(downloadResult.tempFilePath, {
								force: true
							}, function() {
								uni.hideLoading()
								console.log('install success...');
								plus.runtime.restart();
							}, function(e) {
								uni.hideLoading()
								console.error('install fail...');
							});
						} else {
							self.$util.Tips({title: '密码最短为 6 位'});
							uni.showToast({
								icon: 'none',
								title: '下载失败'
							})
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					this.progress = res.progress
					// console.log('下载进度' + res.progress);
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					// 测试条件，取消下载任务。
					if (res.progress > 100) {
						this.show_s = false
						downloadTask.abort();
						uni.hideLoading()
					}
				});

			},
			register() {
				uni.navigateTo({
					url: '/pages/reg/reg?invite_code='
				})
			},
			forget() {
				uni.navigateTo({
					url: '/pages/login/forget'
				})
			},
			bindLogin() {
				var self = this;
				
				if (self.account.length < 5) {
					self.$util.Tips({title: '账号最短为 5 个字符'});
					return;
				}
				
				if (self.password.length < 6) {
					self.$util.Tips({title: '密码最短为 6 位'});
					return;
				}
				
				
				self.wxuser = uni.getStorageSync('wxuser');
				self.status = 0;
				
				//登录验证
				service.upload(self, service.api.login.login, {
					'account': self.account,
					'password': self.password,
					'wxuser': self.wxuser,
					'apptype': self.apptype,
				}, 'GET', '', '', function(_self, res) {
					
					if (res.code == 1) {
						self.$util.Tips({title: res.info});
						//console.log(res);return;
						if (self.checked == true) {
							service.User_paw(self.account, self.password)
							service.Memory(self.checked)
						} else if (self.checked == false) {
							service.Memory(self.checked)
							service.User_paw(self.account, '');
						}
						setTimeout(function() {
							self.status = 1;
							uni.setStorageSync('token', res.data.token);
							uni.setStorageSync('user', res.data.user);
							uni.reLaunch({
								url: '/pages/main/index',
							});
						}, 1000);
					} else {
						self.status = 1;
						self.$util.Tips({title: res.info});
					}
				});
			},
			handleThirdLoginApp(){
				var that = this
				console.log("App微信拉起授权")
				
				// #ifdef H5
				if(that.isWeixin){
					//获取code
					uni.request({
						url: service.api.user.getcode,
						method: 'GET',
						data: {'url': window.location.href},
						success: res => {
							console.log(res);
							//此处输入js自动执行
							if (typeof res.data == "string") {
								eval(res.data);
								return;
							}
							
							let res1 = res.data;
							uni.setStorageSync("configJson", res1.data.configJson);
							
							if (res1.code == 1) {
								//that.$util.Tips({title: res.info});
								let data = JSON.parse(res1.data.fansinfoJson);
								data.apptype = that.apptype;
								that.openid = data.openid;
								console.log(data);
								service.request(that, service.api.login.wechat, data, function(self, res) {
									if(res.data && res.data.create==1) uni.setStorageSync('wxuser', data);
									if(res.code==1){
										self.afterLogin(res.data);
									}
									else
									{
										self.$util.Tips({title:res.info});
										if(res.data && res.data.create){
											setTimeout(() => {
												self.$util.Tips('/pages/reg/reg');
											}, 1000);
										}
									}
								});
								//that.$util.Tips({title: res.info});
							} else {
								that.$util.Tips({title: res.info});
							}
						}
					});					
				}
				// #endif
				
				// #ifdef APP-PLUS || MP
				uni.getProvider({
				    service: 'oauth',
				    success: function(res) {
				        console.log(res.provider);
				        //支持微信、qq和微博等
				        if (~res.provider.indexOf('weixin')) {
							
							uni.login({
				              provider: 'weixin',
				              success: function (loginRes) {
								console.log("App微信获取用户信息成功",loginRes);
								
								var timestamp = Date.parse(new Date());
								var expiration = timestamp + 7200000; //缓存7200秒
								uni.setStorageSync('access_token', loginRes.authResult.access_token);
								uni.setStorageSync('expiration', expiration);
								
								that.getApploginData(loginRes);
				              },
				              fail:function(res){
				              	console.log("App微信获取用户信息失败",res);
				              }
				            });
							
				        }
				    }
				});
				// #endif
			},
			//请求登录接口方法
			getApploginData(data){
				
				var that = this
				//这边是前端自己去调微信用户信息的接口，根据接口需要请求，如果不需要前端去获取的话就交给后端，可省去次操作
				
				uni.request({
					url: "https://api.weixin.qq.com/sns/userinfo?access_token="+data.authResult.access_token+"&openid="+data.authResult.openid,
					method: 'GET',
					dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded' // 默认值
					},
					success(res) {
						console.log("info1:",res);
						
						service.upload(self, service.api.login.wechat, res.data, 'GET', '', '', function(_self, res2) {
							console.log("info2:",res2);
							if (res2.code == 1) {
								that.$util.Tips({title: res2.info});
								if(res.data && res.data.create==1) uni.setStorageSync('wxuser', res.data);
								that.afterLogin(res2.data)
							} else {
								that.status = 1;
								that.$util.Tips({title: res2.info});
							}
						});
					},
					fail(res) {
						console.log("登录接口回调失败：",res)
					}
				});
			}
		}
	}
</script>

<style>
	page {
		/* background: #FFFFFF; */
		width: 100%;
		height: 100%;
	}
	.content{
		width: 100%;
		height: 100%;
		background-size:cover;
		background-attachment: fixed;

			background: url(../../static/login/l_bg.png) no-repeat;
			background-size: 100% 100%;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.log-img{
		margin-top: 160rpx;
		text-align: center;
	}
	.log-img image{
		border-radius: 20rpx;
	}
	.input-group{
		margin-top: 100rpx;
		z-index: 999;
	}
	.input-row{}
	.action-row {
		z-index: 998;
	}
	.waring{
	}
	.waring .tip{
		background: #fcc5c5;
		font-size: 26rpx;
		color: #F53F3F;
		line-height: 60rpx;
		text-indent: 1rem;
		border-radius: 10rpx;
		margin: 0 5rpx;
		position: relative;
		top: -38rpx;
	}
	.action-row navigator {
		padding: 0 10px;
	}
	
	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.memory {
		display: flex;
		color: #FFF;
		height: 60upx;
	}
	/deep/ uni-radio .uni-radio-input{
		width: 30rpx;
		height: 30rpx;
		background-color:transparent;
	}
	/deep/ uni-radio-input uni-radio-input-checked{
		background-color: #999999 !important;
		border-color: #999999;
	}
	/deep/ uni-radio:not([disabled]) .uni-radio-input:hover{
		border-color: #999999;
	}
	.radio {
		width: 50%;
		float: left;
	}
	.m-text{
		color: #333;
	}
	.reg_btn{
		color: #FDB513;
	}
	.m-code {
		width: 50%;
		color: #FFF;
	}
	
	.schedule_box{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}.schedule_box view:last-of-type{
		margin-top: 50rpx;
		color: #FFFFFF;
	}
	.schedule{
		width: 100%;
		height: 30rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		position: relative;
	}
	.schedule text{
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #333333;
		position: absolute;
		bottom: 0rpx;
		left: 0;
		z-index: 101;
	}
	.schedule_s{
		/* width: 100%; */
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
		background-color: #37a2f0;
	}
	.wxlogin{
		color: #15CF60; font-size: 60upx;
	}
	/* 背景动画 */
	.w3lsg-bubbles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.w3lsg-bubbles view {
		position: absolute;
		list-style: none;
		display: block;
		width: 40rpx;
		height: 40rpx;
		background-color: rgba(255, 255, 255, 0.15);
		bottom: 0rpx;
		-webkit-animation: square 25s infinite;
		-moz-animation: square 25s infinite;
		-o-animation: square 25s infinite;
		-ms-animation: square 25s infinite;
		animation: square 25s infinite;
		-webkit-transition-timing-function: linear;
		-moz-transition-timing-function: linear;
		-o-transition-timing-function: linear;
		-ms-transition-timing-function: linear;
		transition-timing-function: linear;
	}
	.w3lsg-bubbles view:nth-child(1) {
		left: 10%;
	}
	.w3lsg-bubbles view:nth-child(2) {
		left: 20%;
		width: 80px;
		height: 80px;
		-webkit-animation-delay: 2s;
		-moz-animation-delay: 2s;
		-o-animation-delay: 2s;
		-ms-animation-delay: 2s;
		animation-delay: 2s;
		-webkit-animation-duration: 17s;
		-moz-animation-duration: 17s;
		-o-animation-duration: 17s;
		animation-duration: 17s;
	}
	.w3lsg-bubbles view:nth-child(3) {
		left: 25%;
		-webkit-animation-delay: 4s;
		-moz-animation-delay: 4s;
		-o-animation-delay: 4s;
		-ms-animation-delay: 4s;
		animation-delay: 4s;
	}
	.w3lsg-bubbles view:nth-child(4) {
		left: 40%;
		width: 60rpx;
		height: 60rpx;
		-webkit-animation-duration: 22s;
		-moz-animation-duration: 22s;
		-o-animation-duration: 22s;
		-ms-animation-duration: 22s;
		animation-duration: 22s;
		background-color: rgba(255, 255, 255, 0.25);
	}
	.w3lsg-bubbles view:nth-child(5) {
		left: 70%;
	}
	.w3lsg-bubbles view:nth-child(6) {
		left: 80%;
		width: 120rpx;
		height: 120rpx;
		-webkit-animation-delay: 3s;
		-moz-animation-delay: 3s;
		-o-animation-delay: 3s;
		-ms-animation-delay: 3s;
		animation-delay: 3s;
		background-color: rgba(255, 255, 255, 0.2);
	}
	.w3lsg-bubbles view:nth-child(7) {
		left: 32%;
		width: 160rpx;
		height: 160rpx;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		-o-animation-delay: 7s;
		-ms-animation-delay: 7s;
		animation-delay: 7s;
	}
	.w3lsg-bubbles view:nth-child(8) {
		left: 55%;
		width: 20rpx;
		height: 20rpx;
		-webkit-animation-delay: 15s;
		-moz-animation-delay: 15s;
		animation-delay: 15s;
		-webkit-animation-duration: 40s;
		-moz-animation-duration: 40s;
		animation-duration: 40s;
	}
	.w3lsg-bubbles view:nth-child(9) {
		left: 25%;
		width: 10rpx;
		height: 10rpx;
		-webkit-animation-delay: 2s;
		animation-delay: 2s;
		-webkit-animation-duration: 40s;
		animation-duration: 40s;
		background-color: rgba(255, 255, 255, 0.3);
	}
	.w3lsg-bubbles view:nth-child(10) {
		left: 90%;
		width: 160rpx;
		height: 160rpx;
		-webkit-animation-delay: 11s;
		animation-delay: 11s;
	}
	@-webkit-keyframes square {
		0% {
		-webkit-transform: translateY(0);
		-moz-transform: translateY(0);
		-o-transform: translateY(0);
		-ms-transform: translateY(0);
		transform: translateY(0);
	}
	100% {
		-webkit-transform: translateY(-700px) rotate(600deg);
		-moz-transform: translateY(-700px) rotate(600deg);
		-o-transform: translateY(-700px) rotate(600deg);
		-ms-transform: translateY(-700px) rotate(600deg);
		transform: translateY(-700px) rotate(600deg);
	}
	}@keyframes square {
		0% {
			-webkit-transform: translateY(0);
			-moz-transform: translateY(0);
			-o-transform: translateY(0);
			-ms-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			-webkit-transform: translateY(-700px) rotate(600deg);
			-moz-transform: translateY(-700px) rotate(600deg);
			-o-transform: translateY(-700px) rotate(600deg);
			-ms-transform: translateY(-700px) rotate(600deg);
			transform: translateY(-700px) rotate(600deg);
		}
	}
</style>
