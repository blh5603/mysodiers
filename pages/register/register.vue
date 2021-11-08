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

					<input class="m-text" type="text" v-model="myaddress" placeholder="我的地址" placeholder-class="input-placeholder"></input>
				</view>

				<view class="input-row">
					<view class="input-img">
						<image src="../../static/images/reg/invater.png" mode=""></image>
					</view>

					<input class="m-text" type="text" v-model="myinviter" placeholder="邀请人ID"placeholder-class="input-placeholder"></input>
				</view>


				<view class="memory" style="display: none;">
					<label class="radio" @click="checked = !checked" >
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
			};
		},
		onLoad(options) {
			let that = this
			uni.setStorageSync('user_token','')
			
			if(options.data) that.myinviter = options.data
			let iuserkey = uni.getStorageSync('user_token');
			if(iuserkey != ''){
				that.$util.Tips("/pages/index/index")
			}
			
			// test1
			service.getWeb3().then(res => {
				that.web3 = res;
				res.eth.getAccounts(function(err, result) {
					let address = result[0];
					console.log(err, result);
					that.myaddress = address
				});
			}).catch(function(result) {
				console.log(result);
				// 弹框提示错误信息
			});
			
			// test2
/* 			let web3 = service.getWeb3();
			if(web3){
				  web3.eth.getAccounts(function (err, result) {
					  let address = result[0];
					  console.log(address);
					  that.myaddress = address
				  });
			} */
		},
		methods: {
			bindRegister(){
				
				if(this.myaddress == ""){
					this.$util.Tips({title: '我的地址格式有误！'});return;
				}
				
				if(this.myinviter == ""){
					this.$util.Tips({title: '邀请人不能为空！'});return;
				}
				
				// 判断是否注册
				service.getdata(this, service.api.main.exists, {
					"address": this.myaddress,
				}, 'POST', '', '', function(self, res) {
					// 反馈结果
					if(res.code == 'success'){
						if(res.data.exists){
							self.$util.Tips({title: '用户已注册！'},"/pages/index/index");return;
						}
						else
						{
							console.log('可以注册！')
						}
					}
					else
					{
						self.$util.Tips({title: res.msg});return;
					}
				});
				
				// 发送注册请求
				service.getdata(this, service.api.main.register, {
					"address": this.myaddress,
					"invite_code": this.myinviter,
				}, 'POST', '', '', function(self, res) {
					// 反馈结果
					if(res.code == 'success'){
						self.$util.Tips({title: '注册成功！'});
						uni.setStorageSync('user_token', res.data.user_token)
					}
					else
					{
						self.$util.Tips({title: res.msg});
					}
					return;
				});
			},
			forget(){
				
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
	
	.login{
		.user_avatar{
			height: 140rpx;
			margin-top: 240rpx;
			align-items: center;
			.avatar{
				width: 150rpx;
				height: 150rpx;
				border-radius: 150rpx;
				// background: #FFF;
				margin: 0 auto;
			}
		}
	}
	
	.input-group{
		
		overflow: hidden;
		margin-top: 100rpx;
		z-index: 999;
		.input-row{
			input{
				.input-placeholder{
					color:#DDD;
					letter-spacing: 2rpx;
					font-family: "Heiti SC";
					font-weight: 500;
				}
			}
			.input-img{
				image{
					width: 50rpx; height:50rpx;
					
				}
			}
			
		}
	}
	
</style>
