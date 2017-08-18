<template>
    <section class="panel" :class="cname">
        <div class="panel-hd">
            <slot name='title'></slot>
        </div>
        <div class="panel-bd">
            <slot></slot>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            title: {// 是否显示Panel标题
                type: [String, Boolean],
                default: false
            },
            cname: {
                type: null,
                default: ''
            }

        },
        created() {
        }
    }
</script>

<style lang="sass">
    @import "../../global/module/variable.scss";
    .panel{
        .panel-hd{
            padding: 0 16px;
            color: $light-gray;
            font-size: 12px;
            border-top:1px solid $border-color;
            margin-top:-1px;
            background:$white;
        }
        .panel-bd{
            border-bottom:1px solid $border-color;
            background-color: $white;
        }
    }

    .panel-form {
        .title{
            padding:12px 0 12px;
            font-size: 14px;
            font-weight: normal;
        }
        .grid-picker {
            .side {
                display: block;
            }
        }
        .grid-area {
            border-left: none;
            border-right: none;
            margin-top: -1px;
            .label {
                color: $light-gray;
            }
            .input {
                height: 100%;
                border: none;
                // width: 100%;
                flex: 1;
                display: block;
                text-align: right;
            }
        }
    }

   
</style>