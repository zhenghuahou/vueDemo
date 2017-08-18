<template>
    <div class='grid-area' :class="[cname]">
        <div class="grid-cell"
             >
            <span class="label">{{label,cname}}</span>
            <div class="side">
                <slot></slot>
            </div>
        </div>
        <slot name='tips'></slot>
    </div>
</template>

<script>
export default {
    props: {
        cname: {
            type: [String],
            default: ''
        },
        label: {
            type: String
        },
        txt: {
            type: String
        }
    },
    mounted(){
    }
}

</script>

<style lang="sass">

     @import '../../global/module/variable.scss';
    .grid-area{
        position:relative;
        border-top:1px solid $border-color;
        padding:12px 16px;
        line-height:20px;
        min-height: 20px;
        background: $white;
        &.necessary{
            padding-left:22px;
        }
        &.necessary:before{
            position:absolute;
            content:'*';
            left:16px;
            top:16px;
            color:$orange;
        }
        &.noflex{
            .grid-cell{
                display:block
            }
        }
    }
    .grid-cell{
      
        display: flex;
        .label{
            display: block;
        }
        .side{
            flex: 1;
            word-wrap: break-word;
            overflow:auto;
            display:flex;
            font-size: 14px;
           justify-content:space-between;
        }
    
    }
    
    
</style>