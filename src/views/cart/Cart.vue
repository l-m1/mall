<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部全选 -->
    <div class="cart-bottom-bar">
      <cart-bottom-bar></cart-bottom-bar>
    </div>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
    name: 'Cart',
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
      cartLength() {
        return this.$store.getters.cartLength
      }
    }
}
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
  .cart-bottom-bar {
    position: fixed;
    left: 0%;
    right: 0%;
    bottom: 49px;
  }
</style>