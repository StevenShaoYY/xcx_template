<script>
import { login, getAuthorize, getOpenId, getValidateUser } from "@/api/login";
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
    this.getCode();
  },
  data() {
    return {
      openid: ""
    };
  },
  methods: {
      getCode() {
      wx.login({
        success: res => {
          let code = res.code;
          if (res.code) {
            let code = res.code; //获取code
            getAuthorize({ code: code }).then(res => {
              //获取openid
              if (res.status == 200) {
                let data = JSON.parse(res.data);
                this.openid = data.openid;
                if (data.openid) {
                  //登录认证
                  getOpenId(data.openid).then(res => {
                    console.log("res", res);
                    if (res.status == 200) {
                      console.log(mpvue)
                      //认证成功进入主页
                      // mpvue.navigateTo({
                      //   url: "/pages/index/main"
                      // });
                    } else {
                      
                      //认证失败 登录页 手动登录
                    }
                  }).catch(e => {
                    console.log(mpvue)
                      mpvue.navigateTo({
                        url: "/pages/login/main"
                      });
                  });
                }
              }
            });
          } else {
            console.log("获取失败！" + res.errMsg);
          }
        }
      });
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
/* @import './style/common.css'; */
page {
  background-color: #eee;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
