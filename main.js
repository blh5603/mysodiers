
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import util from 'utils/util'
import screenTextScroll from 'components/screenTextScroll/screenTextScroll.vue'

// 多语言
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'zh',
	messages:{
		'zh': require('./langs/zh.js'),
		'en': require('./langs/en.js')
	}
});
Vue.prototype._i18n = i18n;
Vue.prototype.$util = util;
Vue.config.productionTip = false
Vue.component('textscroll',screenTextScroll)

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif