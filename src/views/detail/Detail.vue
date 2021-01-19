<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" :currentIndex="currentIndex" ref="nav"></detail-nav-bar>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <div class="content">
                <detail-swiper :top-images="topImages" @swiperImgLoad="swiperImgLoad"></detail-swiper>
                <detail-base-info :goods="goods"></detail-base-info>
                <detail-shop-info :shop="shop"></detail-shop-info>
                <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
                <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
                <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
                <goods-list :goods="recommends" ref="recommend"></goods-list>
            </div>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <toast :message="message" :show="show"></toast> -->
    </div>
</template>

<script>
import DetailNavBar from './childcomponents/DetailNavBar'
import DetailSwiper from './childcomponents/DetailSwiper'
import DetailBaseInfo from './childcomponents/DetailBaseInfo'
import DetailShopInfo from './childcomponents/DetailShopInfo'
import DetailGoodsInfo from './childcomponents/DetailGoodsInfo'
import DetailParamInfo from './childcomponents/DetailParamInfo'
import DetailCommentInfo from './childcomponents/DetailCommentInfo'
import DetailBottomBar from './childcomponents/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'


import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, shop, GoodsParams, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'

import Toast from 'components/common/toast/Toast'







export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll,
        // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data () {
    
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            // message: '',
            // show: false
        }
    },
    methods: {
        ...mapActions(['addCart']),
        imgLoad () {
            this.newRefresh()
            // console.log(this.$refs.scroll.scroll.scrollerHeight)
            this.getThemeTopY()
        },
        swiperImgLoad () {
            console.log('轮播图图片已加载完毕')
            this.$refs.scroll.refresh()
        },
        titleClick (index) {
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
        },
        contentScroll (position) {
            const positionY = -position.y
            let length = this.themeTopYs.length
            for (let i = 0; i < length - 1; i++) {
                // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[parseInt(i) + 1]) {
                //     console.log(i)
                // }
                // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                //     this.currentIndex = i
                //     this.$refs.nav.currentIndex = this.currentIndex
                //     console.log('kkk')
                // }
                if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY
                < this.themeTopYs[i + 1])) {
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            position.y < -1000 ? this.isShowBackTop = true : this.isShowBackTop = false
        },
        addToCart () {
            //获取购物车需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid
            product.count = 1
            console.log(product)
            //将商品添加到购物车里面
            // this.$store.cartList.push(product)
            // this.$store.commit('addCart', product)

            // this.$store.dispatch('addCart', product).then(res=> {
            //     console.log(res)
            // })
            //通过映射 actions 直接获取调用actions中的方法
            this.addCart(product).then(res=> {
                // this.show = true
                // this.message = res
                // setTimeout(() => {
                //     this.show = false,
                //     this.message = ''
                // }, 1500)
                console.log(this.$toast)
                this.$toast.show(res, 1500)
            })
        }
    },
    created () {
        //保存传入的的iid
        this.iid = this.$route.params.iid

        //2.根据 iid 请求详情数据
        getDetail(this.iid).then(res => {
            console.log(res)
            //获取顶部的图片轮播数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            
            //2.获取商品数据
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //3.创建店铺信息的对象
            this.shop = new shop(data.shopInfo)

            //4.保存商品的详情数据
            this.detailInfo = data.detailInfo  
            console.log(this.detailInfo) 

            //5.获取参数信息
            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

            //6.获取评论数据
            if (data.rate.cRate != 0) {
                this.commentInfo = data.rate.list[0]
            }

            console.log('详情页数据请求完毕')

            this.$refs.scroll.refresh()
        })
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs)
        })

        // this.$nextTick(() => {
        //     //根据最新的数据，对应的DOM是已经被渲染出来了
        //     //但是图片依然是没有加载完的
        //     //offsetTop的值不对，就是因为图片加载的问题
        //     this.themeTopYs = []
        //     this.themeTopYs.push(0)
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs)
        // })

        
    },
    mounted () {
       
    },
    updated () {
        
    },
    //deactivated只会在将有缓存时才会调用
    //就是把组件攘括在 keep-alive 里面时才会调用
    destroyed () {
        this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
}
</script>

<style scoped>
    #detail {
        height: 100vh;
        position: relative;
        z-index: 11;
        background-color: #fff;
        overflow: hidden;
     }
    .wrapper {
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 11;
        background-color: #fff;
    }
   .content {
       height: calc(100% - 44px); 
       /* height: 12000px */
    }
</style>