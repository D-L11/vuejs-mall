import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
     //mutations唯一的目的就是修改 state 中的状态
    //mutations 还有一个设计原则，mutations中的每一个方法尽可能完成的事情比较单一一点
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = false
        state.cartList.push(payload)
    }
}