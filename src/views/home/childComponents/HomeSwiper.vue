<template>
  <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
              <img :src="item.image" alt="" @load="imageLoad">
          </a> 
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
    name: 'HomeSwiper',
    dara () {
      return {
        isload: false
      }
    },
    props: {
        banners: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
      imageLoad () {
            if (!this.isload) {
              this.$emit('swiperImageLoad')
              this.isload = true
            }
        }
    }
}
</script>

<style>

</style>