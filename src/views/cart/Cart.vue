<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{addCart}})</div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name: 'Cart',
    components: {
        NavBar
    }
}
</script>
<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: white;
    }
</style>