import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast)

//给 vue 的原型添加一个 $bus(事件总线)
//之后给它赋值一个 vue 实例，这样可以让他 emit 事件
Vue.prototype.$bus = new Vue()

//使用懒加载的插件
Vue.use(VueLazyLoad, {
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
