<template>
	<view class="_notice">
		<swiper class="_swiper tc" @change="slideChange" 
		indicator-dots="false" 
		autoplay="true"
		circular="true"
		skip-hidden-item-layout="true"
		display-multiple-items="2" 
		:interval="interval" 
		:duration="duration">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item">{{item}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			//显示数据
			list: {
				type: Array,
				defual:function(){
					return [];
				}
			},
		},
		data() {
			return {
				interval:10000,
				duration:8000,
			};
		},
		methods:{
			slideChange(e){
				this.$emit('getCurrentIndex',e.detail.current);
			}
		}

	};
</script>

<style lang="scss">
	._notice {
		width: 100%;
		overflow: hidden;
		z-index: 9;
		border-radius: 6upx;
	}
	.active{
		width: 1500rpx;
	}
	._swiper {
		line-height: 90rpx;
		
		&:nth-child(1){
			&:nth-child(1){
				width: 750%;
			}
		}
		
	}
	
	.swiper-item{
		white-space: nowrap;
	}
</style>