<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" :key="index" 
        class="tab-control-item" :class="{active: index === currentIndex}" @click="handleClick(index)">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabControl',
    props: {
        titles: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        // handleTabControlSwitch (e) {
        //     let target = e.target.innerHTML
        //     switch (target) {
        //         case '流行':
        //             this.currentIndex = 0
        //             break
        //         case '新款':
        //             this.currentIndex = 1
        //             break
        //         case '精选':
        //             this.currentIndex = 2
        //             break
        //     }
        // }
        handleClick (index) {
            this.currentIndex = index
            this.$emit('tabClick', index)
        }
    }
}
</script>

<style>
    .tab-control {
        display: flex;
        width: 100%;
        background-color: #fff;
        justify-content: space-around;
        /* text-align: center; */
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        z-index: 10;
    }
    /* .tab-control-item {
        
    } */
    .active {
        color: palevioletred;
        border-bottom: 1px solid;
    }
</style>