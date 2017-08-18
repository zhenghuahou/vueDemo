import Vue from 'vue'
import VueRouter from 'vue-router'

// import my from '../my/router.js' //我的页面
import order from '../order/router.js' //我的页面

Vue.use(VueRouter);


var routes = [].concat([],
  order
);

routes.push({
  path: '*',
  redirect: { name: 'order' },
});

// 创建和挂载根实例
const router = new VueRouter({
  mode: 'history',
  routes
});

//全局钩子 https://github.com/vuejs/vue-router/blob/dev/docs/zh-cn/advanced/navigation-guards.md
console.table(routes);

export { routes }

export default router


