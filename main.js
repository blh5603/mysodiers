
// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import util from 'utils/util'
import screenTextScroll from 'components/screenTextScroll/screenTextScroll.vue'


Vue.use(VueI18n)

Vue.prototype.$util = util;
Vue.config.productionTip = false
Vue.component('textscroll',screenTextScroll)

App.mpType = 'app'

const app = new Vue({
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