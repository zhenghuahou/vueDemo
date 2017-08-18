<template>
    <a  class='submit-btn' @click='onClick' :class='[cname,color]'>{{text}}</a>
</template>

<script>

export default {
    props:{
        text:'',
        cname:'',
        color: '',
    },
    created(){

    },
    methods:{
       onClick(event){
            this.$emit('onSubmit',event);
       }
    }
   
}
</script>

<style lang="sass">
    @import '../../global/module/variable.scss';
    .submit-btn{
        display: block;
        margin:24px 16px;
        line-height: 40px;
        height: 40px;
        background-color:$orange;
        text-align: center;
        border-radius:5px;
        font-size: 16px;
        color:$white;
        flex: 1;
        border:1px solid $orange;
        box-sizing: border-box;
        &.disable{
            // color:rgba(255,255,255,.54);
            opacity:0.3;
        }
        &.transparent{
            color: $orange;
            background: none;
        }
    }

</style>
