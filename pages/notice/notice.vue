<template>
	<view class="container">
	
		<view class="header">
			<view class="lang">
				<navigator url="../index/index" class="backbtn"></navigator>
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
					<image src="../../static/images/noticelogo.png"></image>
				</view>
			</view>

		</view>

		<view class="maindiv">
			<view class="maintitle">{{i18n.noticename}}</view>
			<view class="noticelist">
				
				<view class="noticeitem" v-for="(item,index) in noticelist"  :key="index">
					<view class="shortinfo">
						<view class="arrow"></view>
						<view class="title">{{item.title}}</view>
						<view class="switch" @tap="chekstatus(item)">
							<view class="open iconfont icon-xiangshang" v-if="item.status==1"></view>
							<view class="close iconfont icon-xiangxia" v-if="item.status==0"></view>
						</view>
					</view>
					<view class="details" v-show="item.status==1">
						<view></view>
						<view>{{item.details}}</view>
						<view></view>
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
				userinfo: {
					invite_code: '',
					role_name: '',
					invite_url: 'https://www.bombgame.org/users/new'
				},
				lantype: 0,
				lanpic: '',
				lanchk: 0,
				langpics: [
					{
						name:'zh-CN',
						url:'../../static/images/lang-CN.png'
					},
					{
						name:'en',
						url:'../../static/images/lang-EN.png'
					}],
				noticename:['公告', 'NOTICE'],
				noticelist:[
					{
						id: 1,
						title: '中国向欧方提出严正交涉',
						details: '中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉',
						status: 0
					},
					{
						id: 2,
						title: '中国向欧方提出严正交涉方提出严正',
						details: '中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉',
						status: 0
					},
					{
						id: 3,
						title: '中国向欧方提出严正交涉国向欧方提',
						details: '中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉',
						status: 0
					}
				]
			}
		},
		computed: {
			i18n () {
				return this.$t('lang.notice')
			}
		},
		onLoad() {
			
			this.lanpic = this.langpics[this.lantype].url;
		},
		methods: {
			tourl(url){
				console.log(url)
				this.$util.Tips(url);
			},
			changelang(){
				
				if(this.lantype == 0){
					this.lantype = 1;
				}
				else
				{
					this.lantype = 0;
				}
				uni.setStorageSync('language',this.langpics[this.lantype].name)
				this.$i18n.locale = uni.getStorageSync('language')
console.log('ggg:'+this.$i18n.locale)
				
				this.lanpic = this.langpics[this.lantype].url;
			},
			chekstatus(e){
				//console.log(e);return;
				if(e.status == 0){
					e.status = 1;
				}
				else
				{
					e.status = 0;
				}
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
	.backbtn{
		width: 260rpx;
		height: 120rpx;
		margin-left: -20rpx;
		background: url(../../static/images/back.png) no-repeat left top;
		background-size: 60%;
	}
	.maindiv{
		.maintitle{
			text-align: center;
			font-size: 48rpx;
			font-family: "黑体";
			font-weight: 650;
			letter-spacing: 20rpx;
			margin-top: 10rpx;
			line-height: 80rpx;
		}
		.noticelist{
			margin-top: 30rpx;
			.noticeitem{
				display: table;
				width: 94%;
				border: 2rpx solid #00a8ff;
				background-color: #FFF;
				border-radius: 30rpx;
				margin-top: 20rpx;
				padding: 20rpx;
				
				.shortinfo{
					display: table-row;
					height: 140rpx;
					.arrow{
						background: url(../../static/images/title.png) no-repeat center;
						background-size: 90%;
						width: 20%;
						display: table-cell;
					}
					.title{
						width: 70%;
						
						font-size: 40rpx;
						line-height: 60rpx;
						padding-left: 20rpx;
						display: table-cell;
						vertical-align: middle;
					}
					.switch{
						display: table-cell;
						vertical-align: bottom;
						width: 5%;
						.open{
							color: #1095ff;
							width: 16rpx; height:16rpx;
						}
						.close{
							color: #1095ff;
							width: 16rpx; height:16rpx;
						}
						
					}
				}

				.details{
					display: table-row;
					width: 100%;
					font-size: 30rpx;
					color: #777;
					line-height: 40rpx;
					view{
						display: table-cell;
					}
				}
			}
		}
	}
</style>
