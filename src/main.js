import Vue from 'vue'
import App from './App'
import store from './store'
// import moment from 'moment'
import "./style/common.css"
Vue.prototype.$store = store
// Vue.prototype.$moment = moment
// moment.locale("zh-cn");

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
