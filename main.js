import Vue from 'vue'
import App from './App'
// 网络请求
import WXrequest from './utils/wx_request.js'
Vue.prototype.$wxhttp = WXrequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
