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
					<view class="myvalue">{{userinfo.invite_code}}</view>
				</view>
				<view class="mylevel">
					<view class="myname">我的等级：</view>
					<view class="myvalue">{{userinfo.role_name}}</view>
				</view>
				<view class="invite">
					<view class="myname">邀请战友：</view>
					<view class="myvalue" @tap="copylink(userinfo.invite_url)">
						{{userinfo.invite_url}}
					</view>
				</view>
			</view>

		</view>
		
		<view class="myteamcount">
			<view class="midleft">
				我的战友：
			</view>
			<view class="midright">
				{{userinfo.friends}}
			</view>
		</view>
		
		<view class="mystatics">
			<view class="midleft">
				PK累计流水：
			</view>
			<view class="midright">
				{{userinfo.team_usdt_flow_display}} CIC
			</view>
		</view>
		
		<view class="myteamlist">
			<view class="team-item" v-for="(item,index) in teamlist" :key="index">
				<view class="sortnum">{{item.sortnum}}</view>
				<view class="memberavatar">
					<image :src="item.teamavatar"></image>
				</view>
				<view class="memberinfo">
					<view class="id">ID: {{item.invite_code}}</view>
					<view class="level" title="item.role_name">{{item.role_name}}</view>
					<view class="operabtn" v-text="item.address">登录钱包地址</view>
				</view>
				<view class="membercount">
					<view class="mname">战友数：</view>
					<view class="mvalue">
						{{item.friends}}
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
				user_token: "",
				userinfo: {
					invite_code: '',
					mlevel: '',
					invite_url: 'https://www.bombgame.org/users/new'
				},
				maxnum: 0,
				teamlist:[],
				isLoading:false,
				scroll:false,
				status:0,
				limit:5,
				pages:1,
				page:0,
				out:0,
			}
		},
		onLoad() {
			
			this.user_token = uni.getStorageSync('user_token') //user_token
			if(this.user_token == ''){
				this.$util.Tips({title: '信息有误！'},"/pages/register/register");return;
			}
			
			// 获取用户信息
			service.getdata(this, service.api.main.userinfo, {
				"user_token": this.user_token,
			}, 'POST', '', '', function(self, res) {
				// console.log(res)
				
				// 反馈结果
				if(res.code == 'success'){
					self.userinfo = res.data
				}
				else
				{
					self.$util.Tips({title: res.msg});return;
				}
			});
			
			this.loadHistory();
		},
		onReachBottom() {
			this.loadHistory();
		},
		methods: {
			//加载历史数据
			loadHistory(e){
				
				if(this.isLoading){
					return ;
				}
				if(this.page < this.pages){
					
					this.out = 0;
					this.isLoading = true;
					this.scroll = false;
					this.status = 1;
					var page = this.page;
					if(this.teamlist.length > 0) page += 1;
					console.log(page)
					service.getdata(this, service.api.main.myfriends, {
						'user_token': this.user_token,
						'page': page,
						'limit': this.limit,
						'type': this.tabIndex,
					}, 'POST', '', '', function(self, res) {
						
						if(res.code == 'success'){
							
							var list = res.data;
							for(let i=0;i<list.length;i++){
								list[i].sortnum = self.maxnum += 1;
								list[i].teamavatar = '../../static/images/avatar.png';
								//将数据逐条写入数组
								self.teamlist.push(list[i]);
							}
							
							//console.log('gg:'+res.data.length)
							self.pages = Math.ceil(res.data.length / self.limit);
							self.page = page;
							self.scroll = true;
							self.isLoading = false;
							self.out = 1;
							if(self.page == self.pages || res.data.total == 0){
								self.status = 2;
							}else{
								self.status = 0;
							}
						}
					});
				}else{
					this.status = 2;
				}
			},
			copylink(info){

				uni.showModal({
					content: info,//模板中提示的内容
					confirmText:'复制内容',
					success:(res) => {//点击复制内容的后调函数
						if(res.confirm) {
							let result
							// #ifndef H5
							//uni.setClipboardData方法就是讲内容复制到粘贴板
							uni.setClipboardData({
								data: info,//要被复制的内容
								success:() => {//复制成功的回调函数
									uni.showToast({
										title:'复制成功' 
									})
								}
							});
							// #endif
							
							 // #ifdef H5 
								let textarea = document.createElement("textarea")
								textarea.value = info
								textarea.readOnly = "readOnly"
								document.body.appendChild(textarea)
								textarea.select() // 选中文本内容
								textarea.setSelectionRange(0, info.length) 
								uni.showToast({//提示
									title:'复制成功' 
								})
								result = document.execCommand("copy") 
								textarea.remove()    
							// #endif
						} else {
							console.log('取消')
						}
					}
				});

			}
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
	margin-top: 20rpx;
	padding: 14rpx 28rpx;
	background: #64abeb;
	border-radius: 60rpx;
	line-height: 60rpx;
	color: #FFFFFF;
	opacity: .8;
	/* border:2rpx solid rgba(0,0,0,0.2); */
	animation: load 3.5s infinite alternate;
	
	font-size: 40rpx;
	
	@keyframes load {
	    20% {
	        box-shadow: inset 100rpx 0rpx 100rpx 5rpx rgba(100, 171, 235, 1), 0rpx 0rpx 200rpx 3rpx rgba(255, 255, 255, 0.5);
	    }
	    100% {
	        box-shadow: inset 100rpx 0rpx 10rpx 5rpx rgba(100, 171, 235, 1), 0rpx 0rpx 40rpx 3rpx rgba(255, 255, 255, 1);
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
				white-space: nowrap;
			}
			.level{
				background: url(../../static/images/center/level.png) no-repeat center left;
				background-size: 70%;
				text-indent: 50rpx;
				font-size: 12rpx;
				line-height: 50rpx;
				overflow: hidden;
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
