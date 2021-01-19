<template>
  <div id="home">
    <nav-bar class="home-nav">
      <!-- <div slot="left">后退</div> -->
      <div slot="center">购物街</div>
      <!-- <div slot="right">右边</div> -->
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"> 
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 
      如果想要对组件进行事件监听，必须加上：
        native（原生）修饰符
     -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from './childComponents/HomeSwiper'
import Recommend from './childComponents/Recommend'
import Feature from './childComponents/Feature'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'


import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin'



export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [], 
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    //保存 y 值，用于返回首页的时候位置不会自动返回到顶部
    this.saveY = this.$refs.scroll.scroll.y

    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created () {
    //1.请求多个数据
   this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop') 
    this.getHomeGoods('new') 
    this.getHomeGoods('sell') 

  },
  mounted () {
    
  },
  methods: {
    //点击分类按钮是，通过更改变量来更改渲染的数据
     tabClick(index) {
       switch (index) {
         case 0:
           this.currentType = 'pop'
           break
         case 1:
           this.currentType = 'new'
           break
         case 2:
           this.currentType = 'sell'
           break
       }
       this.$refs.tabControl1.currentIndex = index
       this.$refs.tabControl2.currentIndex = index
     },
     
     //监听滚动到底部
     loadMore () {
       //滚动到底部时请求对应的数据
       this.getHomeGoods(this.currentType)
     },
     swiperImageLoad () {
       //2.获取tabControl的 offsetTop
       //所有的组件都有一个属性叫 $el: 用于获取组件中的元素的
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
     },
     getHomeMultidata () {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          console.log(res)
          // this.banners = res.data.banner
          // this.recommends = res.data.recommend
          this.$refs.scroll.scroll.refresh()       
        })
     },
     getHomeGoods (type) {
       const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          console.log(res + '111')
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //当数据请求过来之后，调用scroll对象的refresh函数，使得scroll重新计算可滚动区域的高度
          this.$refs.scroll.scroll.refresh()

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
     },
  }
}
</script>

<style scoped>
   #home {
     /* padding-top: 44px; */
     height: 100vh;
     /* vh -> viewport height 视口高度 */
     position: relative;
     background-color: #fff;
   }
  .home-nav {
    background-color: pink;
    color: white;

    position: relative;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }
  .content {
    /* height: 300px; */
    /* overflow: hidden; */
    /* background-color: red; */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
 /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */
  .tab-control {
    position: relative;
    z-index: 10;
  }
</style>