(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-strategy-strategy"],{"029e":function(t,i,a){"use strict";var n=a("8f98"),e=a.n(n);e.a},"18af":function(t,i,a){"use strict";(function(t){var n=a("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;n(a("7aef"));var e={data:function(){return{username:"Sodier GH",levelname:"V1",lantype:0,lanpic:"",lanchk:0,langpics:[{name:"CN",url:"../../static/images/lang-CN.png"},{name:"EN",url:"../../static/images/lang-EN.png"}],noticename:["攻略","STRATEGY"],noticelist:[{id:1,title:"中国向欧方提出严正交涉",details:"中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉",status:0},{id:2,title:"中国向欧方提出严正交涉方提出严正",details:"中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉",status:0},{id:3,title:"中国向欧方提出严正交涉国向欧方提",details:"中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉中国向欧方提出严正交涉",status:0}]}},onLoad:function(){this.lanpic=this.langpics[this.lantype].url},methods:{tourl:function(i){t("log",i," at pages/strategy/strategy.vue:100"),this.$util.Tips(i)},changelang:function(){0==this.lantype?this.lantype=1:this.lantype=0,t("log",this.lantype," at pages/strategy/strategy.vue:113"),this.lanpic=this.langpics[this.lantype].url},chekstatus:function(t){0==t.status?t.status=1:t.status=0}}};i.default=e}).call(this,a("0de9")["log"])},"1bec":function(t,i,a){t.exports=a.p+"static/img/noticelogo.7648f8e3.png"},"1de5":function(t,i,a){"use strict";t.exports=function(t,i){return i||(i={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),i.hash&&(t+=i.hash),/["'() \t\n]/.test(t)||i.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"273f":function(t,i,a){"use strict";var n;a.d(i,"b",(function(){return e})),a.d(i,"c",(function(){return s})),a.d(i,"a",(function(){return n}));var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"header"},[n("v-uni-view",{staticClass:"lang"},[n("v-uni-navigator",{staticClass:"backbtn",attrs:{url:"../index/index"}}),n("v-uni-image",{attrs:{src:t.lanpic},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.changelang()}}})],1),n("v-uni-view",{staticClass:"mainrow"},[n("v-uni-view",{staticClass:"userinfo"},[n("v-uni-view",{staticClass:"avatar"},[n("v-uni-image",{attrs:{src:a("7a38")}})],1),n("v-uni-view",{staticClass:"mainfo"},[n("v-uni-view",{staticClass:"nickname"},[t._v(t._s(t.username))]),n("v-uni-view",{staticClass:"levelname"},[t._v(t._s(t.levelname))])],1)],1),n("v-uni-view",{staticClass:"notice"},[n("v-uni-image",{attrs:{src:a("1bec")}})],1)],1)],1),n("v-uni-view",{staticClass:"maindiv"},[n("v-uni-view",{staticClass:"maintitle"},[t._v(t._s(t.noticename[t.lantype]))]),n("v-uni-view",{staticClass:"noticelist"},t._l(t.noticelist,(function(i,a){return n("v-uni-view",{key:a,staticClass:"noticeitem"},[n("v-uni-view",{staticClass:"shortinfo"},[n("v-uni-view",{staticClass:"arrow"}),n("v-uni-view",{staticClass:"title"},[t._v(t._s(i.title))]),n("v-uni-view",{staticClass:"switch",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.chekstatus(i)}}},[1==i.status?n("v-uni-view",{staticClass:"open iconfont icon-xiangshang"}):t._e(),0==i.status?n("v-uni-view",{staticClass:"close iconfont icon-xiangxia"}):t._e()],1)],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1==i.status,expression:"item.status==1"}],staticClass:"details"},[n("v-uni-view"),n("v-uni-view",[t._v(t._s(i.details))]),n("v-uni-view")],1)],1)})),1)],1)],1)},s=[]},3382:function(t,i,a){"use strict";a.r(i);var n=a("18af"),e=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(i,t,(function(){return n[t]}))}(s);i["default"]=e.a},"3a81":function(t,i,a){t.exports=a.p+"static/img/title.c47f25dc.png"},"7a38":function(t,i,a){t.exports=a.p+"static/img/avatar.19d299ca.png"},"8cca":function(t,i,a){var n=a("24fb"),e=a("1de5"),s=a("9dce"),c=a("919c"),o=a("3a81");i=n(!1);var l=e(s),r=e(c),d=e(o);i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-564f1a0d]{width:100%;height:100%;background:url('+l+") no-repeat fixed top;background-size:100%}.container[data-v-564f1a0d]{padding:%?20?%;font-size:%?14?%;line-height:%?24?%}.backbtn[data-v-564f1a0d]{width:%?260?%;height:%?120?%;margin-left:%?-20?%;background:url("+r+") no-repeat 0 0;background-size:60%}.maindiv .maintitle[data-v-564f1a0d]{text-align:center;font-size:%?48?%;font-family:黑体;font-weight:650;letter-spacing:%?20?%;margin-top:%?10?%;line-height:%?80?%}.maindiv .noticelist[data-v-564f1a0d]{margin-top:%?30?%}.maindiv .noticelist .noticeitem[data-v-564f1a0d]{display:table;width:94%;border:%?2?% solid #00a8ff;background-color:#fff;border-radius:%?30?%;margin-top:%?20?%;padding:%?20?%}.maindiv .noticelist .noticeitem .shortinfo[data-v-564f1a0d]{display:table-row;height:%?140?%}.maindiv .noticelist .noticeitem .shortinfo .arrow[data-v-564f1a0d]{background:url("+d+") no-repeat 50%;background-size:90%;width:20%;display:table-cell}.maindiv .noticelist .noticeitem .shortinfo .title[data-v-564f1a0d]{width:70%;font-size:%?40?%;line-height:%?60?%;padding-left:%?20?%;display:table-cell;vertical-align:middle}.maindiv .noticelist .noticeitem .shortinfo .switch[data-v-564f1a0d]{display:table-cell;vertical-align:bottom;width:5%}.maindiv .noticelist .noticeitem .shortinfo .switch .open[data-v-564f1a0d]{color:#1095ff;width:%?16?%;height:%?16?%}.maindiv .noticelist .noticeitem .shortinfo .switch .close[data-v-564f1a0d]{color:#1095ff;width:%?16?%;height:%?16?%}.maindiv .noticelist .noticeitem .details[data-v-564f1a0d]{display:table-row;width:100%;font-size:%?30?%;color:#777;line-height:%?40?%}.maindiv .noticelist .noticeitem .details uni-view[data-v-564f1a0d]{display:table-cell}body.?%PAGE?%[data-v-564f1a0d]{background:url("+l+") no-repeat fixed top;background-size:100%}",""]),t.exports=i},"8f98":function(t,i,a){var n=a("8cca");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=a("4f06").default;e("52f96f83",n,!0,{sourceMap:!1,shadowMode:!1})},"919c":function(t,i,a){t.exports=a.p+"static/img/back.6a5a9a71.png"},"9dce":function(t,i,a){t.exports=a.p+"static/img/background.309dc8fa.png"},efdb:function(t,i,a){"use strict";a.r(i);var n=a("273f"),e=a("3382");for(var s in e)"default"!==s&&function(t){a.d(i,t,(function(){return e[t]}))}(s);a("029e");var c,o=a("f0c5"),l=Object(o["a"])(e["default"],n["b"],n["c"],!1,null,"564f1a0d",null,!1,n["a"],c);i["default"]=l.exports}}]);