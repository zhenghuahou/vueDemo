/*
	鹊桥贷是入口文件
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import App from './app'

// vue 项目基本配置
Vue.use(VueResource);

//全局引入mini-ui组件,不推荐,现在做法是按需引入所需组件
// import Mint from 'mint-ui' //vue ui组件
// Vue.use(Mint);

//form表单 post请求的时候需要emulateJSON为true
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request,next)=>{
    // check output
    next((response) => {
      if(typeof response.body ==='string'){
        response.body = JSON.parse(response.body);
      }
    })
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('.mod-app')

