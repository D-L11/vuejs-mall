<template>
    <div class="tab-bar-item" @click="handleItemClick">
        <div>
            <slot name="item-icon" v-if="!isActive"></slot>
        </div>
        <div>
            <slot name="item-icon-active" v-if="isActive"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-name"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaBBarItem',
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'green'
        }
    },
    computed: {
        isActive () {
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle () {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        handleItemClick () {
            // let targetValue = e.target.parentNode.parentNode.lastChild.firstChild.innerText
            // this.$emit('hendleColorChange', targetValue)
            // console.log(this.path)
            this.$router.replace(this.path)
        }
    },
}
</script>

<style>
    @import '~assets/css/base.css';
    .tab-bar-item {
        display: flex;
        flex-direction: column;
        justify-content:space-evenly;
        font-size: 14px;
    }
    .tab-bar-item div {
        display: flex;
        flex-direction: column;
        justify-content:space-evenly;
        font-size: 14px;
    }
    .tab-bar-item img {
        width: 20px;
        position: relative;
        top: 15px;
        left:4px;
        vertical-align: middle;
    }
    /* .active {
        color: green;
        margin: 0;
        padding: 0;
    } */
</style>