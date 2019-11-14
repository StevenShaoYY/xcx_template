import Vue from 'vue'
import App from './index'

Vue.config.errorHandler = function(err) {
  if (console && console.error) {
    console.error('error:',err)
  }
}

const app = new Vue(App)
app.$mount()