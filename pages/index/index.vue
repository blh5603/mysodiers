<template>
	<view class="container">
	
		<view class="header">
			<view class="lang">
				<navigator url="/pages/index/index"></navigator>
				<image :src="lanpic" @tap="changelang()"></image>
			</view>
			
			<view class="mainrow">
				<view class="userinfo">
					<view class="avatar" @tap="tourl('/pages/family/family')">
						<image src="../../static/images/avatar.png"></image>
					</view>
					<view class="mainfo">
						<view class="nickname">Sodier GH</view>
						<view class="levelname">V1</view>
					</view>
				</view>
				<view class="notice">
					<navigator url="../notice/notice">
						<image src="../../static/images/noticelogo.png"></image>
					</navigator>
				</view>
			</view>
			
			<view class="maqueen">
				<view class="textinfo">
					<textscroll :list="list"/>
				</view>
			</view>
		</view>
		
		<view class="maindiv">
			<view class="aditem" v-for="(item,index) in adlist " :key="index">
				<view v-for="(itm,idx) in item " :key="idx">
					<image :title="itm.name" :src="lanchk==0?itm.image1:itm.image2" mode="widthFix" @tap="tourl(itm.url)"></image>
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
				lantype: 0,
				lanpic: '',
				lanchk: 0,
				langpics: [
					{
						name:'CN',
						url:'../../static/images/lang-CN.png'
					},
					{
						name:'EN',
						url:'../../static/images/lang-EN.png'
					}],
				list:['1分钟前，无夏购买了会员','2分钟前，无夏购买了会员','3分钟前，无夏购买了会员'],
				adlist:[
					[{
						name:'employ',
						image1:'../../static/images/adver/employ-CN.png',
						image2:'../../static/images/adver/employ-EN.png',
						url: '/pages/employ/employ'
					}],
					[{
						name:'mysodier',
						image1:'../../static/images/adver/mysodier-CN.png',
						image2:'../../static/images/adver/mysodier-EN.png',
						url: '/pages/mysodiers/mysodiers',
						
					}],
					[{
						name:'warehouse',
						image1:'../../static/images/adver/warehouse-CN.png',
						image2:'../../static/images/adver/warehouse-EN.png',
						url: '/pages/warehouse/index',
						height: '120'
					},
					{
						name:'strategy',
						image1:'../../static/images/adver/strategy-CN.png',
						image2:'../../static/images/adver/strategy-EN.png',
						url: '/pages/strategy/strategy',
						height: '120'
					}],
					[{
						name:'pkjjc',
						image1:'../../static/images/adver/pkjjc-CN.png',
						image2:'../../static/images/adver/pkjjc-EN.png',
						url: '/pages/pkAthletics/index'
					}],
				]
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
				
				if(this.lanchk == 0){
					this.lanchk = 1;
				}
				else
				{
					this.lanchk = 0;
				}
				
				if(this.lantype == 0){
					this.lantype = 1;
				}
				else
				{
					this.lantype = 0;
				}
				
				console.log(this.lantype)
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
	
	.maqueen{
		margin-top: 5%;
		background: url(../../static/images/marquee.png) no-repeat;
		background-size: 100%;
		height: 90rpx;
		overflow: hidden;
		.textinfo{
			font-size: 40rpx;
			padding: 0 30rpx;
		}
	}
	
	.maindiv{
		margin-top: 5%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: -5%;
		margin-right: -5%;
		.aditem{
			width: 45%;
			height: 500rpx;
			overflow: hidden;
			margin-bottom: 5%;
			margin-right: 5%;
			image{
				width: 100%;
				border-radius: 10rpx;
			}
		}
		.aditem>image:first{ border:2rpx solid #103E5C}
	}
	
</style>
