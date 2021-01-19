import {debounce} from 'common/utils'
import BackTop from 'components/content/backtop/BackTop'
 
export const itemListenerMixin = {
    data () {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted () {
        //1.图片加载完成的事件监听
        this.newRefresh = debounce(this.$refs.scroll.refresh, 200)

        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data () {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        //点击返回顶部
     backClick () {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
       //当达到临界值时，显示和隐藏回到顶部按钮
       contentScroll (pos) {
        //判断BackTop是否显示
        pos.y < -1000 ? this.isShowBackTop = true : this.isShowBackTop = false 
  
        //2.决定tabControl是否吸顶
        this.isTabFixed = (-pos.y) > this.tabOffsetTop
       },
    }
}