<template>
	<view class="container">
		<view class="waiting">
			
		</view>
		<view class="play-row">
			<view class="play-btn" @tap="play()"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(){
			
		},
		methods:{
			play(){
				console.log('game played')
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background: url(../../static/images/playgame/playbg.png) no-repeat fixed top;
		background-size: 100%;
	}
	.waiting{
		height: 350rpx;
	}
	.play-row{
		margin-top: 80%;
		width: 100%;
		align-items: center;
		.play-btn{
			background: url(../../static/images/playgame/30.gif) no-repeat center center;
			background-size: 40%;
			height: 240rpx;
		}		
	}

</style>
