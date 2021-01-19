<template>
    <div class="recommend">
        <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                    <img :src="item.image" alt="">
                    <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
       recommends: {
            type: Array,
            default () {
                return []
            }
       }
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .recommend {
        display: flex;
        width: 100%;
        justify-content: space-around;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }

    .recommend-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .recommend-item img {
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
    .recommend-item div {
        text-align: center;
    }
</style>