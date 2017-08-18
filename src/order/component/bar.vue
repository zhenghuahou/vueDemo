<template>
	<div class="bar" :class="[cname]">
		<span>{{label}}</span>
		<slot></slot>
	</div>
</template>

<script>

export default {
	name: 'bar',
	props: {
		cname: {
			type: [String],
			default: ''
		},
		label: {
			type: String
		}
	}
}
</script>

<style lang="less"></style>

