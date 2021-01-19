<template>
    <div class="back-top">
        <img src="~assets/img/backtop/backtop.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'BackTop',
    methods: {
        //回到顶部
        // backClick () {
        //     console.log('backtop')
        // }
    }
}
</script>

<style>
    .back-top {
        position: fixed;
        right: 10px;
        bottom: 80px;
        z-index: 110
    }
    .back-top img {
        width: 43px;
    }
</style>