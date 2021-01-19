<template>
    <!-- 
        ref 如果是绑定在组件中的，那么通过this,$refs.xxxx获取到的是一个组件对象
        ref 如果是绑定在一个普通的元素中，那么通过this.$refs.xxx获取到的就是这个元素对象
     -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,
            disableMouse: false,
            // disableTouch: false,
            mouseWheel: true,
            pullUpLoad: this.pullUpLoad, 
            // scrollbar: true,
            pullDownRefresh: true,
            click: true,
            observeDOM: true
        })
        //监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (pos) => {
                this.$emit('scroll', pos)
            })
        }
        //3.监听 scroll 滚动到底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        }
    },
    methods: {
        scrollTo (x, y, time = 300) {
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp () {
            this.scroll.finishPullUp()
        },
        refresh () {
            this.scroll.refresh()
        }
    }
}
</script>

<style>
    /* .wrapper {
        height: 200px;
    } */
</style>