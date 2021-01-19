<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item, index) in topImages" :key="index">
            <img :src="item" alt="" @load="swiperImgLoad">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name: 'DetailSwiper',
     components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            counter: 0,
            imagesLength: 0
        }
    },
    methods: {
        swiperImgLoad () {
            if (++this.counter === this.imagesLength) {
                this.$emit('swiperImgLoad')
            }
        }
    },
    watch: {
        topImages () {
            this.imagesLength = this.topImages.length
        }
    }
}
</script>

<style scoped>
    .detail-swiper {
        width: 100%;
        height: 300px;
        /* overflow: hidden; */
    }
    .detail-swiper img {
        /* height: 100%; */
        width: 100%;
    }
</style>
