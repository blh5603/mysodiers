
 export default {
	isJSON: function(str) {
		if (typeof str == 'string') {
			try {
				JSON.parse(str);
				return true;
			} catch(e) {
				console.log(e);
				return false;
			}
		}
		console.log('It is not a string!')    
	},
	
 	/**
 	 * opt  object | string
 	 * to_url object | string
 	 * 例:
 	 * this.Tips('/pages/test/test'); 跳转不提示
 	 * this.Tips({title:'提示'},'/pages/test/test'); 提示并跳转
 	 * this.Tips({title:'提示'},{tab:1,url:'/pages/index/index'}); 提示并跳转值table上
 	 * tab=1 一定时间后跳转至 table上
 	 * tab=2 一定时间后跳转至非 table上
 	 * tab=3 一定时间后返回上页面
 	 * tab=4 关闭所有页面，打开到应用内的某个页面
 	 * tab=5 关闭当前页面，跳转到应用内的某个页面
 	 */
 	Tips: function(opt, to_url) {
 		if (typeof opt == 'string') {
 			to_url = opt;
 			opt = {};
 		}
 		let title = opt.title || '',
 			icon = opt.icon || 'none',
 			endtime = opt.endtime || 2000,
 			success = opt.success;
 		if (title) uni.showToast({
 			title: title,
 			icon: icon,
 			duration: endtime,
 			success
 		})
 		if (to_url != undefined) {
 			if (typeof to_url == 'object') {
 				let tab = to_url.tab || 1,
 					url = to_url.url || '';
 				switch (tab) {
 					case 1:
 						//一定时间后跳转至 table
 						setTimeout(function() {
 							uni.switchTab({
 								url: url
 							})
 						}, endtime);
 						break;
 					case 2:
 						//跳转至非table页面
 						setTimeout(function() {
 							uni.navigateTo({
 								url: url,
 							})
 						}, endtime);
 						break;
 					case 3:
 						//返回上页面
 						setTimeout(function() {
 							// #ifndef H5
 							uni.navigateBack({
 								delta: parseInt(url),
 							})
 							// #endif
 							// #ifdef H5
 							history.back();
 							// #endif
 						}, endtime);
 						break;
 					case 4:
 						//关闭所有页面，打开到应用内的某个页面
 						setTimeout(function() {
 							uni.reLaunch({
 								url: url,
 							})
 						}, endtime);
 						break;
 					case 5:
 						//关闭当前页面，跳转到应用内的某个页面
 						setTimeout(function() {
 							uni.redirectTo({
 								url: url,
 							})
 						}, endtime);
 						break;
 				}

 			} else if (typeof to_url == 'function') {
 				setTimeout(function() {
 					to_url && to_url();
 				}, endtime);
 			} else {
 				//没有提示时跳转不延迟
 				setTimeout(function() {
 					uni.navigateTo({
 						url: to_url,
 					})
 				}, title ? endtime : 0);
 			}
 		}
 	},
 	/**
 	 * 移除数组中的某个数组并组成新的数组返回
 	 * @param array array 需要移除的数组
 	 * @param int index 需要移除的数组的键值
 	 * @param string | int 值
 	 * @return array
 	 * 
 	 */
 	ArrayRemove: function(array, index, value) {
 		const valueArray = [];
 		if (array instanceof Array) {
 			for (let i = 0; i < array.length; i++) {
 				if (typeof index == 'number' && array[index] != i) {
 					valueArray.push(array[i]);
 				} else if (typeof index == 'string' && array[i][index] != value) {
 					valueArray.push(array[i]);
 				}
 			}
 		}
 		return valueArray;
 	},
 	/**
 	 * 生成海报获取文字
 	 * @param string text 为传入的文本
 	 * @param int num 为单行显示的字节长度
 	 * @return array
 	 */
 	textByteLength: function(text, num) {
 		let strLength = 0;
 		let rows = 1;
 		let str = 0;
 		let arr = [];
 		for (let j = 0; j < text.length; j++) {
 			if (text.charCodeAt(j) > 255) {
 				strLength += 2;
 				if (strLength > rows * num) {
 					strLength++;
 					arr.push(text.slice(str, j));
 					str = j;
 					rows++;
 				}
 			} else {
 				strLength++;
 				if (strLength > rows * num) {
 					arr.push(text.slice(str, j));
 					str = j;
 					rows++;
 				}
 			}
 		}
 		arr.push(text.slice(str, text.length));
 		return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
 	},

 	/**
 	 * 获取分享海报
 	 * @param array arr2 海报素材
 	 * @param string store_name 素材文字
 	 * @param string price 价格
	 * @param string ot_price 原始价格
 	 * @param function successFn 回调函数
 	 */
 	PosterCanvas: function(arr2, store_name, price, ot_price, successFn) {
		
 		let that = this;
		
 		uni.showLoading({
 			title: '海报生成中',
 			mask: true
 		});
		
 		const ctx = uni.createCanvasContext('myCanvas');
 		ctx.clearRect(0, 0, 0, 0);
		
 		/**
 		 * 只能获取合法域名下的图片信息,本地调试无法获取
 		 * 
 		 */
		
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, 750, 1150);
		
		uni.getImageInfo({
 			src: arr2[2],
 			success: function(res) {
 				const WIDTH = 750;//res.width;
 				const HEIGHT = 950; //res.height;
 				//ctx.drawImage(arr2[0], 0, 0, WIDTH, 1050);
 				ctx.drawImage(arr2[1], 0, 0, WIDTH, WIDTH);
 				ctx.save();
				
 				let r = 130;
 				let d = r * 2;
 				let cx = 460;
 				let cy = 790;
 				// ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
 				// ctx.clip();
 				ctx.drawImage(arr2[2], cx, cy, d, d);
 				ctx.restore();
				
 				const CONTENT_ROW_LENGTH = 20;
 				let [contentLeng, contentArray, contentRows] = that.textByteLength(store_name, CONTENT_ROW_LENGTH);
 				if (contentRows > 2) {
 					contentRows = 2;
 					let textArray = contentArray.slice(0, 2);
 					textArray[textArray.length - 1] += '……';
 					contentArray = textArray;
 				}
 				ctx.setTextAlign('left');
 				ctx.setFontSize(36);
				ctx.setFillStyle('#000');
 				let contentHh = 36 * 1.3;
 				for (let m = 0; m < contentArray.length; m++) {
 					ctx.fillText(contentArray[m], 50, 1000 + contentHh * m,750);
 				}
 				ctx.setTextAlign('left')
 				ctx.setFontSize(72);
 				ctx.setFillStyle('#DA4F2A');
 				ctx.fillText('￥' + price, 40, 820 + contentHh);
				
				ctx.setTextAlign('left')
				ctx.setFontSize(36);
				ctx.setFillStyle('#999');
				ctx.fillText('￥' + ot_price, 50, 880 + contentHh);
				
				var underline = function(ctx, text, x, y, size, color, thickness ,offset){ 
					var width = ctx.measureText(text).width;
					switch(ctx.textAlign){ 
						case "center": 
							x -= (width/2); break; 
						case "right": 
							x -= width; break; 
					}
					
					y += size+offset; 
					
					ctx.beginPath(); 
					ctx.strokeStyle = color; 
					ctx.lineWidth = thickness; 
					ctx.moveTo(x,y); 
					ctx.lineTo(x+width,y); 
					ctx.stroke(); 
				}
				underline(ctx,'￥'+ot_price, 55,880,36,'#999',2,0)
				
				ctx.setTextAlign('left')
				ctx.setFontSize(28);
				ctx.setFillStyle('#999');
				ctx.fillText('长按或扫描查看', 490, 1030 + contentHh);
				
 				ctx.draw(true, function() {
					
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						fileType: 'png',
						destWidth: WIDTH,
						destHeight: HEIGHT,
						success: function(res) {
							//successFn && successFn(arr2[1]);
							successFn && successFn(res.tempFilePath)
						},
						fail: function(err){
							that.Tips({
								title: '图片信息生成失败'
							});
						}
					})
 				});
				uni.hideLoading();
 			},
 			fail: function(err) {
 				uni.hideLoading();
 				that.Tips({
 					title: '无法获取图片信息'
 				});
 			}
 		})
 	},
 	/**
 	 * 处理服务器扫码带进来的参数
 	 * @param string param 扫码携带参数
 	 * @param string k 整体分割符 默认为：&
 	 * @param string p 单个分隔符 默认为：=
 	 * @return object
 	 */
 	// #ifdef MP
 	getUrlParams: function(param, k, p) {
 		if (typeof param != 'string') return {};
 		k = k ? k : '&'; //整体参数分隔符
 		p = p ? p : '='; //单个参数分隔符
 		var value = {};
 		if (param.indexOf(k) !== -1) {
 			param = param.split(k);
 			for (var val in param) {
 				if (param[val].indexOf(p) !== -1) {
 					var item = param[val].split(p);
 					value[item[0]] = item[1];
 				}
 			}
 		} else if (param.indexOf(p) !== -1) {
 			var item = param.split(p);
 			value[item[0]] = item[1];
 		} else {
 			return param;
 		}
 		return value;
 	},
 	// #endif
 	/*
 	 * 合并数组
 	 */
 	SplitArray(list, sp) {
 		if (typeof list != 'object') return [];
 		if (sp === undefined) sp = [];
 		for (var i = 0; i < list.length; i++) {
 			sp.push(list[i]);
 		}
 		return sp;
 	},
 	trim(str) {
 		return String.prototype.trim.call(str);
 	},
 	$h: {
 		//除法函数，用来得到精确的除法结果
 		//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 		//调用：$h.Div(arg1,arg2)
 		//返回值：arg1除以arg2的精确结果
 		Div: function(arg1, arg2) {
 			arg1 = parseFloat(arg1);
 			arg2 = parseFloat(arg2);
 			var t1 = 0,
 				t2 = 0,
 				r1, r2;
 			try {
 				t1 = arg1.toString().split(".")[1].length;
 			} catch (e) {}
 			try {
 				t2 = arg2.toString().split(".")[1].length;
 			} catch (e) {}
 			r1 = Number(arg1.toString().replace(".", ""));
 			r2 = Number(arg2.toString().replace(".", ""));
 			return this.Mul(r1 / r2, Math.pow(10, t2 - t1));
 		},
 		//加法函数，用来得到精确的加法结果
 		//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 		//调用：$h.Add(arg1,arg2)
 		//返回值：arg1加上arg2的精确结果
 		Add: function(arg1, arg2) {
 			arg2 = parseFloat(arg2);
 			var r1, r2, m;
 			try {
 				r1 = arg1.toString().split(".")[1].length
 			} catch (e) {
 				r1 = 0
 			}
 			try {
 				r2 = arg2.toString().split(".")[1].length
 			} catch (e) {
 				r2 = 0
 			}
 			m = Math.pow(100, Math.max(r1, r2));
 			return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
 		},
 		//减法函数，用来得到精确的减法结果
 		//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
 		//调用：$h.Sub(arg1,arg2)
 		//返回值：arg1减去arg2的精确结果
 		Sub: function(arg1, arg2) {
 			arg1 = parseFloat(arg1);
 			arg2 = parseFloat(arg2);
 			var r1, r2, m, n;
 			try {
 				r1 = arg1.toString().split(".")[1].length
 			} catch (e) {
 				r1 = 0
 			}
 			try {
 				r2 = arg2.toString().split(".")[1].length
 			} catch (e) {
 				r2 = 0
 			}
 			m = Math.pow(10, Math.max(r1, r2));
 			//动态控制精度长度
 			n = (r1 >= r2) ? r1 : r2;
 			return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
 		},
 		//乘法函数，用来得到精确的乘法结果
 		//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 		//调用：$h.Mul(arg1,arg2)
 		//返回值：arg1乘以arg2的精确结果
 		Mul: function(arg1, arg2) {
 			arg1 = parseFloat(arg1);
 			arg2 = parseFloat(arg2);
 			var m = 0,
 				s1 = arg1.toString(),
 				s2 = arg2.toString();
 			try {
 				m += s1.split(".")[1].length
 			} catch (e) {}
 			try {
 				m += s2.split(".")[1].length
 			} catch (e) {}
 			return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
 		},
 	},
 	// 获取地理位置;
 	$L: {
 		async getLocation() {
 			// #ifdef APP-PLUS
 			let status = await this.checkPermission();
 			if (status !== 1) {
 				return;
 			}
 			// #endif
 			// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-QQ
 			let status = await this.getSetting();
 			if (status === 2) {
 				this.openSetting();
 				return;
 			}
 			// #endif

 			this.doGetLocation();
 		},
 		doGetLocation() {
 			uni.getLocation({
 				success: (res) => {
 					uni.removeStorageSync('CACHE_LONGITUDE');
 					uni.removeStorageSync('CACHE_LATITUDE');
 					uni.setStorageSync('CACHE_LONGITUDE', res.longitude);
 					uni.setStorageSync('CACHE_LATITUDE', res.latitude);
 				},
 				fail: (err) => {
 					// #ifdef MP-BAIDU
 					if (err.errCode === 202 || err.errCode === 10003) { // 202模拟器 10003真机 user deny
 						this.openSetting();
 					}
 					// #endif
 					// #ifndef MP-BAIDU
 					if (err.errMsg.indexOf("auth deny") >= 0) {
 						uni.showToast({
 							title: "访问位置被拒绝"
 						})
 					} else {
 						uni.showToast({
 							title: err.errMsg
 						})
 					}
 					// #endif
 				}
 			})
 		},
 		getSetting: function() {
 			return new Promise((resolve, reject) => {
 				uni.getSetting({
 					success: (res) => {
 						if (res.authSetting['scope.userLocation'] === undefined) {
 							resolve(0);
 							return;
 						}
 						if (res.authSetting['scope.userLocation']) {
 							resolve(1);
 						} else {
 							resolve(2);
 						}
 					}
 				});
 			});
 		},
 		openSetting: function() {
 			uni.openSetting({
 				success: (res) => {
 					if (res.authSetting && res.authSetting['scope.userLocation']) {
 						this.doGetLocation();
 					}
 				},
 				fail: (err) => {}
 			})
 		},
 		async checkPermission() {
 			let status = permision.isIOS ? await permision.requestIOS('location') :
 				await permision.requestAndroid('android.permission.ACCESS_FINE_LOCATION');

 			if (status === null || status === 1) {
 				status = 1;
 			} else if (status === 2) {
 				uni.showModal({
 					content: "系统定位已关闭",
 					confirmText: "确定",
 					showCancel: false,
 					success: function(res) {}
 				})
 			} else if (status.code) {
 				uni.showModal({
 					content: status.message
 				})
 			} else {
 				uni.showModal({
 					content: "需要定位权限",
 					confirmText: "设置",
 					success: function(res) {
 						if (res.confirm) {
 							permision.gotoAppSetting();
 						}
 					}
 				})
 			}
 			return status;
 		},
 	}

 }
