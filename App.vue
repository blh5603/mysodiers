<script>
	import service from '@/utils/service.js';
	import utils from '@/utils/util.js';
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 头条小程序需要把 iconfont 样式放到组件外;*/
	@import "static/css/input.css";
	@import "static/css/header.scss";
	@import "static/css/iconfont.css";
	@import "static/css/animate.min.css";
</style>
