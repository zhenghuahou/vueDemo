<template>
	<li class="item">
		<bar :label="list.title" :cname='status.cname'>
			<span class="status">{{status.txt}}</span>
		</bar>
		<a :href="list.linkUrl" class="order-descri">
			<div class="info-box">
				<img :src="product.imgUrl" v-for='(product,index) in list.productLists' :key='index' />
				<p class='txt' v-if='list.descri'>{{list.descri}}</p>
				<i class='omission' v-if='!list.descri && list.productLists.length > 3'>...</i>
			</div>
			<div class="price-box">
				<em class="price">￥{{list.price}}</em>
				<p>共计{{list.num}}件商品</p>
			</div>
		</a>
		<bar :label="list.orderTime">
			<span class='btn-box'>
				<a class="mod-btn" :class="{'buy-btn': list.status ==`3`}">{{list.status ==`3`?`再次购买`:`查看物流`}}</a>
				<a class="mod-btn pay-btn" v-if="list.status ==`1`">立即支付</a>
			</span>
		</bar>
	</li>
</template>

<script>
import bar from './bar'

export default {
	name: 'order-item',
	components: {
		[bar.name]: bar,
	},
	props: {
		list: Object//订单列表
	},
	data() {
		return {
		}
	},
	computed: {
		status() { 
			let cname ='', txt;
			const { type, list: { status } } = this
			switch (status) {
				case 1:
					cname = 'bar-paying';
					txt = '立即支付'
					break
				case 2:
					cname = 'bar-receipt'
					txt = '待收货'
					break
				case 3:
					txt='已完成'
					break
				default:
					txt = '提交申请'
			}
			return { cname, txt }
		}
	},

	methods: {
	}
}
</script>

