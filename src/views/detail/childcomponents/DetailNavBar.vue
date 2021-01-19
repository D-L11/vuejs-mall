<template>
    <div>
        <nav-bar>
            <div slot="left" class="titles-left" @click="backClick">
                    <img src="~assets/img/detail/back black.png" alt="">
                </div>
            <div slot="center" class="titles">
                <div class="titles-items" v-for="(item, index) in titles" :key="index" @click="itemClick(index)" :class="{active: currentIndex === index}">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data () {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    props: {
        // currentIndex: {
        //     type: Number,
        //     defualt: 0
        // }
    },
    methods: {
        itemClick (index) {
            this.currentIndex = index
            this.$emit('titleClick', index)
        },
        backClick () {
            this.$router.back()
        }
    }
}
</script>

<style>
    .titles {
        width: 75%;
        display: flex;
        justify-content: space-evenly;
    }
    .titles-left {
        width: 20px;
        position: relative;
        top: 5px;
        left: -8px;
    }
    .titles-left img {
        width: 100%;
    }
    .titles-items {
        font-size: 13px;
    }
    .active {
        color: palevioletred;
    }
</style>