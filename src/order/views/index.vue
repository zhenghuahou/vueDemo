<template>
	<div class='order-page'>
		<header class="header">
			<a href="" class="goback"></a>
			<h2>我的订单</h2>
		</header>
		<ul class='nav'>
			<li class="cur">
				<span>全部</span>
			</li>
			<li>
				<span>待付款</span>
				<i class='count'>2</i>
			</li>
			<li>
				<span>待评价</span>
			</li>
			<li>
				<span>待收货</span>
			</li>
		</ul>

		<ul class="order-lists">
			<order-item :list="item" v-for='(item,index) in orderLists' :key='index'></order-item>
		</ul>
	</div>
</template>

<script>
import Api from '../api';
import orderItem from '../component/order-item'


export default {
	name: 'myorder',
	components: {
		[orderItem.name]: orderItem
	},
	data() {
		// console.log(" index:",this);
		return {
			orderLists: []//订单列表
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			const cb = (res) => {
				// console.warn(' res:',res);
				if (res.status === 1) {
					this.orderLists = res.orderLists;
				}
			}
			let data = {
				orderId: 3012,
			}
			//发送数据请求
			Api('getOrderList')(data)(cb);
		}
	}
}
</script>


<style lang='less' >
@import '../assets/base.less';
@import '../assets/myOrder.less';
</style>

