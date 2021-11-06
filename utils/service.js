const config = {
	verify: 6, // 手机验证码位数控制
	version:"1.0.0.0" // 初始版本
}

const User_paw = function(user,paw){
	let User_paw = []
	User_paw.push(user)
	User_paw.push(paw)
	uni.setStorageSync('User_paw',User_paw)
	// return User_paw
}

const Memory = function(memory){
	uni.setStorageSync('memory',memory)
}

//分享配置
const share = [{
	name:'分享到微信好友',
	code:'WXSceneSession',
	id:1,
},{
	name:'分享到微朋友圈',
	code:'WXSenceTimeline',
	id:0,
},{
	name:'分享到微信收藏',
	code:'WXSceneFavorite',
	id:0,
/* },{
	name:'分享给QQ好友',
	code:'qq',
	id:0,
},{
	name:'分享到新浪微博',
	code:'weibo',
	id:0, */
}];
/* 
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}
*/

const api_root = 'https://api.yingxiaobao.shop';

const api = {
	root: api_root,
	main: {
		task: api_root + "/api/member/myTask",//我的任务
		notice: api_root + "/api/service/notice",//获取首页弹出公告
	},
	combo: {
		pay: api_root + "/api/machine/bySetmeal",//购买套餐
	}
}

const upload = function(self, url, data, type, path, name, _success) {
	if(data == '' || path == ''){
		uni.request({
			url: url,
			method: type,
			data: data,
			header: {
				'Authorization':'Bearer '+uni.getStorageSync('token'),
			},
			success: res => {
				
				var res = res.data;
				if(res.code == 400){
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('token','');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						});           
					},2000);
				}else{
					_success(self, res);
				}
			},
		});
	}else{
		uni.uploadFile({
			url : url,
			filePath: path,
			name: name,
			formData: data,
			header: {
				'Authorization':'Bearer '+uni.getStorageSync('token'),
			},
			success: function (res) {
				res = res.data;
				res = eval('(' + res + ')');
				if(res.code == 400){
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('token','');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						});
					},2000);
				}else{
					_success(self, res);
				}
			}
		});
	}
}
const downLoad = function(self, url, data, type, path, name, _success) {
	uni.request({
		url: url,
		method: type,
		data: data,
		header: {
			'Authorization':'Bearer'+uni.getStorageSync('token'),
		},
		success: res => {
			var res = res.data;
			_success(self, res);
		},
	});
}

const auth = function(self, url, data, _success) {
	if(uni.getStorageSync('token') == ''){
		setTimeout(function(){
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},2000);
		return;
	}
	uni.request({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Authorization':'Bearer '+uni.getStorageSync('token'),
		},
		success: res => {
			var res = res.data;
			
			if (res.code == 1) {
				_success(self, res);

			} else {
				if (res.code == 400) {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
					uni.setStorageSync('token','');
					setTimeout(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						});
					},2000);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.info
					});
				}
			}
		},
		fail: res => {
			uni.showToast({
				icon: 'none',
				title: '网站消息获取错误'
			});
		},
		complete: (data) => {
			//console.log(data);
			var data = data.data;
			if(data.code == 13){
				uni.showToast({
					icon: 'none',
					title: data.info
				});
				this.removeToken();
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
			uni.hideLoading();
		}
	});
}

const auths = function(self, url, data, _success) {
	if(uni.getStorageSync('token') == ''){
		setTimeout(function(){
			uni.reLaunch({
				url: '/pages/login/login'
			});
		},2000);
		return;
	}
	uni.request({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Authorization':'Bearer '+uni.getStorageSync('token'),
		},
		success: res => {
			var res = res.data;
			_success(self, res);
		},
	});
}

const request = function(self, url, data, _success) {
	uni.request({
		url: url,
		method: 'GET',
		data: data,
		success: res => {
			var res = res.data;
			_success(self, res);
		},
	});
}
const getlocation = function(self, _success){
	uni.getLocation({
		type: 'wgs84',
		geocode: true,//设置该参数为true可直接获取经纬度及城市信息
		success: function (res) {
			_success(self, res);
		},
		fail: function () {
			
		}
	});	
}

export default {
	api,
	auth,
	auths,
	upload,
	downLoad,
	request,
	config,
	api_root,
	share,
	User_paw,
	Memory,
	getlocation
}
