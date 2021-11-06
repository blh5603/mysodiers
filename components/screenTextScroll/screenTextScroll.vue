<!-- 
展示屏幕文字滚动效果
 
使用方法：

 -->
<!-- 
展示屏幕文字滚动效果

usage:
 list:数组数据
 @getCurrentIndex  获取当前swiper的下标
 <textscroll :list="list" @getCurrentIndex="getIndex"/>

 -->

<template>
	<view class="_notice">
		<swiper class="_swiper tc" @change="slideChange" indicator-dots="true" autoplay="true" :interval="interval" circular="true"
		 display-multiple-items="2" :duration="duration">
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
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
				interval:3000,
				duration:12000,
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

	._swiper {
		line-height: 90rpx;
		white-space: nowrap;
	}
</style>