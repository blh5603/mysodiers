(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"1bec":function(e,a,t){e.exports=t.p+"static/img/noticelogo.0a1f2ea2.png"},"1fef":function(e,a,t){var n=t("24fb"),i=t("1de5"),s=t("9dce"),r=t("ba96");a=n(!1);var u=i(s),c=i(r);a.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-1136dca9]{width:100%;height:100%;background:url('+u+") no-repeat fixed top;background-size:100%}.container[data-v-1136dca9]{padding:%?20?%;font-size:%?14?%;line-height:%?24?%}.maqueen[data-v-1136dca9]{margin-top:5%;background:url("+c+") no-repeat;background-size:100%;height:%?90?%;overflow:hidden}.maqueen .textinfo[data-v-1136dca9]{font-size:%?40?%;padding:0 %?30?%}.maindiv[data-v-1136dca9]{margin-top:5%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:-5%;margin-right:-5%}.maindiv .aditem[data-v-1136dca9]{width:45%;height:%?500?%;overflow:hidden;margin-bottom:5%;margin-right:5%}.maindiv .aditem uni-image[data-v-1136dca9]{width:100%;border-radius:%?10?%}.maindiv .aditem > uni-image[data-v-1136dca9]:first{border:%?2?% solid #103e5c}body.?%PAGE?%[data-v-1136dca9]{background:url("+u+") no-repeat fixed top;background-size:100%}",""]),e.exports=a},"2ee6":function(e,a,t){"use strict";t.r(a);var n=t("4540"),i=t.n(n);for(var s in n)"default"!==s&&function(e){t.d(a,e,(function(){return n[e]}))}(s);a["default"]=i.a},4540:function(e,a,t){"use strict";(function(e){var n=t("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,t("96cf");var i=n(t("1da1")),s=n(t("7aef")),r={data:function(){return{userinfo:{invite_code:"",role_name:"",invite_url:"https://www.bombgame.org/users/new"},lantype:0,lanpic:"",lanchk:0,langpics:[{name:"zh",url:"../../static/images/lang-CN.png"},{name:"en",url:"../../static/images/lang-EN.png"}],list:["预注册期间所有新玩家都可以获得100CIC空投奖励，正式上线后空投奖励可用来雇佣工兵进行扫雷游戏。"],adlist:[[{name:"employ",image1:"../../static/images/adver/employ-CN.png",image2:"../../static/images/adver/employ-EN.png",url:"/pages/employ/employ"}],[{name:"mysodier",image1:"../../static/images/adver/mysodier-CN.png",image2:"../../static/images/adver/mysodier-EN.png",url:"/pages/mysodiers/mysodiers"}],[{name:"warehouse",image1:"../../static/images/adver/warehouse-CN.png",image2:"../../static/images/adver/warehouse-EN.png",url:"/pages/warehouse/index",height:"120"},{name:"strategy",image1:"../../static/images/adver/strategy-CN.png",image2:"../../static/images/adver/strategy-EN.png",url:"/pages/strategy/strategy",height:"120"}],[{name:"pkjjc",image1:"../../static/images/adver/pkjjc-CN.png",image2:"../../static/images/adver/pkjjc-EN.png",url:"/pages/pkAthletics/index"}]]}},onLoad:function(){var a=this;this.lanpic=this.langpics[this.lantype].url,this.user_token=uni.getStorageSync("user_token"),null!=this.user_token&&""!=this.user_token?(s.default.getWeb3().then((function(e){a.web3=e,e.eth.getAccounts((function(e,t){var n=t[0];a.myaddress=n;var i=a.checkExist(n);i&&uni.setStorageSync("user_token",n)}))})).catch((function(a){e("log",a," at pages/index/index.vue:138")})),s.default.getdata(this,s.default.api.main.userinfo,{user_token:this.user_token},"POST","","",(function(e,a){"success"==a.code?e.userinfo=a.data:e.$util.Tips({title:a.msg},"/pages/register/register")}))):this.$util.Tips({title:"信息有误！"},"/pages/register/register")},methods:{tourl:function(a){e("log",a," at pages/index/index.vue:159")},checkExist:function(e){var a=this;return(0,i.default)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=!1,t.next=3,s.default.getdata(a,s.default.api.main.exists,{address:e},"GET","","",(function(e,a){"success"==a.code&&a.data.exists&&(n=!0)}));case 3:return t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})))()},changelang:function(){0==this.lanchk?this.lanchk=1:this.lanchk=0,0==this.lantype?this.lantype=1:this.lantype=0,uni.setStorageSync("language",this.langpics[this.lantype].name),this.$i18n.locale=uni.getStorageSync("language"),this.lanpic=this.langpics[this.lantype].url}}};a.default=r}).call(this,t("0de9")["log"])},"654d":function(e,a,t){"use strict";t.r(a);var n=t("fd59"),i=t("2ee6");for(var s in i)"default"!==s&&function(e){t.d(a,e,(function(){return i[e]}))}(s);t("abd6");var r,u=t("f0c5"),c=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,"1136dca9",null,!1,n["a"],r);a["default"]=c.exports},"7a38":function(e,a,t){e.exports=t.p+"static/img/avatar.32524a47.png"},8932:function(e,a,t){var n=t("1fef");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=t("4f06").default;i("61f0b697",n,!0,{sourceMap:!1,shadowMode:!1})},"9dce":function(e,a,t){e.exports=t.p+"static/img/background.1be773c0.png"},abd6:function(e,a,t){"use strict";var n=t("8932"),i=t.n(n);i.a},ba96:function(e,a){e.exports="data:image/png;base64,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"},fd59:function(e,a,t){"use strict";var n;t.d(a,"b",(function(){return i})),t.d(a,"c",(function(){return s})),t.d(a,"a",(function(){return n}));var i=function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-view",{staticClass:"lang"},[n("v-uni-navigator",{attrs:{url:"/pages/index/index"}}),n("v-uni-image",{attrs:{src:e.lanpic},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.changelang()}}})],1),n("v-uni-view",{staticClass:"mainrow"},[n("v-uni-view",{staticClass:"userinfo"},[n("v-uni-view",{staticClass:"avatar"},[n("v-uni-navigator",{attrs:{url:"/pages/family/family"}},[n("v-uni-image",{attrs:{src:t("7a38")}})],1)],1),n("v-uni-view",{staticClass:"mainfo"},[n("v-uni-view",{staticClass:"nickname",domProps:{textContent:e._s(e.userinfo.invite_code)}}),n("v-uni-view",{staticClass:"levelname",domProps:{textContent:e._s(e.userinfo.role_name)}})],1)],1),n("v-uni-view",{staticClass:"notice"},[n("v-uni-navigator",{attrs:{url:"/pages/notice/notice"}},[n("v-uni-image",{attrs:{src:t("1bec")}})],1)],1)],1),n("v-uni-view",{staticClass:"maqueen"},[n("v-uni-view",{staticClass:"textinfo"},[n("textscroll",{attrs:{list:e.list}})],1)],1)],1),n("v-uni-view",{staticClass:"maindiv"},e._l(e.adlist,(function(a,t){return n("v-uni-view",{key:t,staticClass:"aditem"},e._l(a,(function(a,t){return n("v-uni-view",{key:t},[n("v-uni-image",{attrs:{title:a.name,src:0==e.lanchk?a.image1:a.image2,mode:"widthFix"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tourl(a.url)}}})],1)})),1)})),1)],1)},s=[]}}]);