<template>
	<view class="container">
		<view class="centerheader">
			
			<view class="head-left">
				<view class="myavatar">
					<image src="../../static/images/avatar.png" mode=""></image>
				</view>
			</view>
			
			<view class="head-right">
				<view class="myid">
					<view class="myname">我的ID：</view>
					<view class="myvalue">{{userinfo.mid}}</view>
				</view>
				<view class="mylevel">
					<view class="myname">我的等级：</view>
					<view class="myvalue">{{userinfo.mlevel}}</view>
				</view>
				<view class="invite">
					<view class="myname">邀请战友：</view>
					<view class="myvalue">{{userinfo.minvite}}</view>
				</view>
			</view>

		</view>
		
		<view class="myteamcount">
			<view class="midleft">
				我的战友：
			</view>
			<view class="midright">
				{{teamcount}}
			</view>
		</view>
		
		<view class="mystatics">
			<view class="midleft">
				PK累计流水：
			</view>
			<view class="midright">
				{{teamamount}} CIC
			</view>
		</view>
		
		<view class="myteamlist">
			<view class="team-item" v-for="(item,index) in teamlist" :key="index">
				<view class="sortnum">{{item.sortnum}}</view>
				<view class="memberavatar">
					<image :src="item.teamavatar"></image>
				</view>
				<view class="memberinfo">
					<view class="id">ID: {{item.uid}}</view>
					<view class="level">{{item.levelname}}</view>
					<view class="operabtn">登录钱包地址</view>
				</view>
				<view class="membercount">
					<view class="mname">战友数：</view>
					<view class="mvalue">
						{{item.teamcount}}
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
				userinfo: {
					mid: 12,
					mlevel: '排长',
					minvite: 'http://www.baidu.com/?inviteid=234232'
				},
				teamcount: 120,
				teamamount:9999999,
				teamlist:[
					{
						sortnum: 1,
						uid: 15,
						teamavatar: '../../static/images/center/avatar-small.png',
						levelname: '排长',
						teamcount: 45
					},
					{
						sortnum: 2,
						uid: 16,
						teamavatar: '../../static/images/center/avatar-small.png',
						levelname: '排长',
						teamcount: 25
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
	background: #0b5b8f;
}

.myteamcount,.mystatics{
	display: flex;
	height: 60rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	margin-bottom: 30rpx;
	padding: 14rpx 28rpx;
	background: #64abeb;
	border-radius: 60rpx;
	line-height: 60rpx;
	color: #FFFFFF;
	
	/* border:2rpx solid rgba(0,0,0,0.2); */
	animation: load 3.5s infinite alternate;
	
	font-size: 40rpx;
	
	@keyframes load {
	    0% {
	        box-shadow: inset 0px 0px 10px 5px rgba(100, 171, 235, 1), 0rpx 0rpx 10rpx 3rpx rgba(255, 255, 255, 0.5);
	    }
	    100% {
	        box-shadow: inset 0px 0px 10px 5px rgba(100, 171, 235, 1), 0rpx 0rpx 40rpx 3rpx rgba(255, 255, 255, 1);
	    }
	}
	
	.midleft{
		width: 40%;
		text-align: left;
	}
	.midright{
		width: 60%;
		text-align: right;
	}
}

.myteamlist{
	.team-item{
		height: 180rpx;
		background: #2e78a4;
		border: 2rpx solid #579bc6;
		margin: 0 20rpx 20rpx 20rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: space-around;
		color: #FFFFFF;
		.sortnum{
			width: 5%;
			font: italic bold 40rpx arial,sans-serif; color:#FFFFFF;
			line-height: 180rpx;
		}
		.memberavatar{
			width: 20%;
			height: 180rpx;
			display: flex;
			align-items: center;
			image{
				width: 120rpx;
				height: 120rpx;
				background: rgba(0,0,0,0.2);
				border: 2rpx solid rgba(0,0,0,0.1);
				border-radius: 120rpx;
			}
		}
		.memberinfo{
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 24rpx 0;
			align-items: center;
			line-height: 40rpx;
			width: 200rpx;
			
			.id,.level,.operabtn{
				font-family: Verdana, Geneva, Tahoma, sans-serif;
				width: 100%;
				text-align: left;
			}
			.level{
				background: url(../../static/images/center/level.png) no-repeat center left;
				background-size: 70%;
				text-indent: 70rpx;
				font-size: 12rpx;
				line-height: 40rpx;
			}
			.operabtn{
				font-size: 12rpx;
			}
		}
		.membercount{
			width: 25%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 60rpx;
			white-space: nowrap;
			
			.mname{
				height: 60rpx;
				text-align: left;
				width: 75%;
			}
			.mvalue{
				height: 60rpx;
				width: 25%;
				text-align: right;
			}
		}
	}
}
</style>
