<template>
     <tab-bar>
    
     <!-- <tab-bar-item @hendleColorChange="colorChange" path="/home">
        <img slot="item-icon" src="./assets/img/tabbar/home.png" alt="" v-if="isActive !== '首页'">
        <img slot="item-icon-active" src="./assets/img/tabbar/home-active.png" alt="" v-if="isActive === '首页'">
        <span slot="item-name" :class="{active: isActive === '首页'}">首页</span>
     </tab-bar-item>
     <tab-bar-item @hendleColorChange="colorChange" path="/catelog">
        <img slot="item-icon" src="./assets/img/tabbar/catelog.png" alt="" v-if="isActive !== '分类'">
        <img slot="item-icon-active" src="./assets/img/tabbar/catelog-active.png" alt="" v-if="isActive === '分类'">
        <span slot="item-name" :class="{active: isActive === '分类'}">分类</span>
     </tab-bar-item>
     <tab-bar-item @hendleColorChange="colorChange" path="/cart">
        <img slot="item-icon" src="./assets/img/tabbar/cart.png" alt="" v-if="isActive !== '购物车'">
        <img slot="item-icon-active" src="./assets/img/tabbar/cart-active.png" alt="" v-if="isActive === '购物车'">
        <span slot="item-name" :class="{active: isActive === '购物车'}">购物车</span>
     </tab-bar-item>
     <tab-bar-item @hendleColorChange="colorChange" path="/profile">
        <img slot="item-icon" src="./assets/img/tabbar/profile.png" alt="" v-if="isActive !== '我的'">
        <img slot="item-icon-active" src="./assets/img/tabbar/profile-active.png" alt="" v-if="isActive === '我的'">
        <span slot="item-name" :class="{active: isActive === '我的'}">我的</span>
     </tab-bar-item> -->


     <tab-bar-item path="/myhome" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
        <span slot="item-name">首页</span>
     </tab-bar-item>
     <tab-bar-item path="/catelog" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/catelog.png" alt="">
        <img slot="item-icon-active" src="~/assets/img/tabbar/catelog-active.png" alt="">
        <span slot="item-name">分类</span>
     </tab-bar-item>
     <tab-bar-item path="/cart" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/cart.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/cart-active.png" alt="">
        <span slot="item-name">购物车</span>
     </tab-bar-item>
     <tab-bar-item path="/profile" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.png" alt="">
        <span slot="item-name">我的</span>
     </tab-bar-item>
   </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
    name: 'mainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>