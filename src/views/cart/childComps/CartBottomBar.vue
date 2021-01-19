<template>
  <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
          <div class="choose-all">全选</div>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>

      <div class="calculate">
        去结账：({{checkLength}})
        {{isSelectAll}}
      </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'

export default {
    name: 'CartBottomBar',
    components: {
        checkButton
    },
    computed: {
        totalPrice () {
            return '￥' + this.$store.state.cartList.filter(item => !item.checked)
                .reduce((prevalue, item) => {
                    return prevalue + item.price * item.count
                }, 0).toFixed(2)
        },
        checkLength () {
            return this.$store.state.cartList.filter(item => !item.checked).length
        },
        isSelectAll () {
            return !(this.checkLength === this.$store.state.cartList.length)
        }
    },
    methods: {
        checkClick () {
            if (this.isSelectAll) {
                this.$store.state.cartList.forEach(element => {
                    element.checked = false
                });
            } else {
                this.$store.state.cartList.forEach(element => {
                    element.checked = true
                })
            }
        }
    }
}
</script>


<style>
    .bottom-bar {
        height: 40px;
        width: 100%;
        background-color: #eee;
        position: fixed;
        bottom: 50px;
        display: flex;
        align-items: center;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }
    .check-Button {
       width: 20px;
       height: 22px;
       line-height: 22px;
       margin-right: 5px;
    }
    .price {
        margin-left: 20px;
        flex: 1;
    }
    .calculate {
        width: 85px;
    }
</style>