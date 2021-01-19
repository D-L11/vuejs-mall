<template>
 <div id="tab-bar">
    <slot></slot>    
 </div>  
</template>

<script>
export default {
   name: 'TabBar'
}
</script>

<style>
 #tab-bar {
        background-color:#f6f6f6;
        display: flex;
        justify-content: space-around;
        height: 49px;
        line-height: 49px;
        position: fixed;
        left: 0px;
        bottom: 0px;
        right: 0px;
        box-shadow: 0 -1px 1px rgba(100, 100, 100, .2);
        z-index: 10;
    }
</style>