import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {

    // document.body.appendChild(Toast.$el) 

    //创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    //new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()

    //将组件对象手动的挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    //toast.$el对应的是上面创建的div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
}

export default obj