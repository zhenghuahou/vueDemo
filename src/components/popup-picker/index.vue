<template>
    <div class='popup-picker-wrap'>
        <mt-popup v-model="visible"
                  position="bottom"
                  class="mint-popup-picker">
            <mt-picker :valueKey='valueKey'
                       :slots="slots"
                       @change="onChange"
                       :visible-item-count="visibleItemCount"
                       :name="name"
                       show-toolbar>
                <span class="mint-action mint-cancel"
                      @click.stop="cancle">{{ cancelText }}</span>
                <span class="mint-action mint-confirm"
                      @click.stop="confirm">{{ confirmText }}</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { Picker, Popup } from 'mint-ui'

export default {
    name: 'popup-picker',
    components: {
        [Picker.name]: Picker,
        [Popup.name]: Popup,
    },
    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        name: String,
        confirmText: {
            type: String,
            default: '确定'
        },
        custom: {
            type: Boolean,
            default: false
        },
        visibleItemCount: {
            type: Number,
            default: 3
        },
        valueKey: String,
        value: null,//接受父组件传递过来的v-model的值
        slots: {
            type: Array
        },
    },

    data() {
        return {
            $picker: null,
            visible: false,
            values: [], //picker数组滚轴列表当前选中的值
            selectedValues: [] //当前选择的值,点击取消的时候改值不变,点击确认按钮时值会改变
        };
    },
    created() {
    },
    mounted() {
        this.$picker = this.$children[0].$children[0];
        //监听slotvalue值是否改变
        this.$on('slotValueUpdate', this.slotValueUpdate);
        this.initValues();
    },
    methods: {
        slotValueUpdate(index,value) {
            // console.error(' this.$picker:',this.$picker,
            // ' this.values:',this.values,'  children.currentValue:',this.$picker.$children[0].currentValue,' -------> value:',value);
            this.$picker.setSlotValue(index,value);
        },
        open() {
            this.visible = true;
        },
        initValues() {
            let { values } = this;
            this.slots.forEach((slot, index) => {
                values[index] = slot.values[slot.defaultIndex];
            });
            this.selectedValues = values;
        },
        //点击取消的时候,重置picker的值为当前选择的值(selectedValues)
        doCancle() {
            this.selectedValues.forEach((item, index, arr) => {
                this.$picker.setSlotValue(index, item);
            });
        },
        cancle() {
            this.visible = false;
            this.doCancle();
        },
        confirm() {
            this.visible = false;
            this.selectedValues = [...this.values];
            this.$emit.apply(this, ['confirm', this.values, this.name]);
        },
        onChange(picker, values) {
            this.values = picker.values;
            this.$emit.apply(this, ['change', ...arguments]);
        },
    }
}
</script>

<style lang="sass">
     @import "../../global/module/variable.scss";
    .mint-popup-picker{
        width:100%;
    }
    .mint-action{
        display: inline-block;
        width: 50%;
        text-align: left;
        line-height: 40px;
        font-size: 16px;
        color:#26a2ff;
        box-sizing:border-box;
    }
    .mint-cancel{
        float: left;
        padding-left: 16px;
    }
    .mint-confirm{
        float: right;
        text-align: right;
        padding-right:16px;
    }
    .picker-value-box {
        display: flex;
        justify-content: flex-end;
        align-items:center;
        transition:color .3s ;
        .iconfont {
            margin-left: 5px;
            width: 16px;
        }
        &.default {
            color: $gray;
        }
    }

</style>