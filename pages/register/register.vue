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

					<input class="m-text" type="text" v-model="account" placeholder="我的地址" placeholder-class="input-placeholder"></input>
				</view>

				<view class="input-row">
					<view class="input-img">
						<image src="../../static/images/reg/invater.png" mode=""></image>
					</view>

					<input class="m-text" type="password" v-model="password" placeholder="邀请人ID"placeholder-class="input-placeholder"></input>
				</view>


				<view class="memory" style="display: none;">
					<label class="radio" @click="checked = !checked" >
						<radio value="" v-bind:checked="checked" color="rgba(255,255,255,.4)" />记住密码
					</label>

					<view class="m-code" @click="forget()">忘记密码</view>
				</view>

				<view style="height: 30upx;"></view>

				<view class="input-btn" @click="bindLogin" v-if="status == 1">点击注册</view>
				<view class="input-btn" v-else>点击注册</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				password: '',
				status: 1,
				checked: false,
				
			};
		},
		onLoad() {
			
		},
		methods: {
			bindLogin(){
				console.log(111)
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
