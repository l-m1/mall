<template>
  <div class="cart-bottom-bar">
    <div class="check-item">
      <check-button :is-checked="isSelectAll" @click.native="allChecked"></check-button>
      <span>全选</span>
    </div>
    <div class="all-price">
      <span>合计: {{totalPrice}}</span>
    </div>
    <div class="count-price">
      <span>去计算({{cartLength}})</span>
    </div>
  </div>
</template>
<script>

import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: 'CartBottomBar',
  computed: {
    totalPrice() {
      return '￥' + Number(this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0)).toFixed(2)
    },
    cartLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      //1、使用filter
      //return !(this.$store.state.cartList.filter(item => !item.checked).length)

      //2、使用find函数
      //return !this.$store.state.cartList.find(item => !item.checked)

      //3、普通遍历
      for(let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  components: { 
    CheckButton 
  },
  methods: {
    allChecked() {
      if(this.isSelectAll) { //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>
<style scoped>
  .cart-bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-item {
    position: absolute;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-item .check-button {
    width: 22px;
    height: 31px;
    line-height: 31px;
  }
  .check-item span {
    padding: 0 20px;
  }
  .all-price {
    position: absolute;
    display: flex;
    align-items: center;
    margin-left: 110px;
  }
  .count-price {
    position: absolute;
    display: flex;
    align-items: center;
    margin-left: 240px;
    width: 90px;
    background-color: red;
  }
</style>