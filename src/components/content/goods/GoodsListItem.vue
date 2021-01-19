<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy="showImage" alt="" @load="imgLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    computed: {
        showImage () {
            return this.goodsItem.image || this.goodsItem.show.img  
        }
    },
    methods: {
        imgLoad () {
            //向事件总线发送一个名叫 itemImageLoad 的事件
            this.$bus.$emit('itemImageLoad')
        },
        itemClick () {
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
}
</script>

<style>
    .goods-item {
        width: 48%;
        padding-bottom: 40px;
        position: relative;
    }
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    .goods-info {
       font-size: 12px;
       position: absolute;
       bottom: 5px;
       left: 0;
       right: 0;
       overflow: hidden;
       text-align: center; 
    }
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .price {
        color: palevioletred;
        margin-right: 20px;
    }
    .collect {
        position: relative;
    }
    .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
    }
</style>