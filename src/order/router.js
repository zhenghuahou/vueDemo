//协议页面
const order = r => require.ensure([], () => r(require('./views/index.vue')), 'order')
// const customer = r => require.ensure([], () => r(require('./views/customer.vue')), 'customer')

        
export default [{
    path: '/',
    name: 'order',
    meta:{
      title:'我的订单',
    },
    component: order,
  },
  // {
  //   path: '/order',
  //   name: 'order',
  //   meta:{
  //     title: '业绩详情'
  //   },
  //   component: customer
  // }
]