<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div class="service">
                <img src="~assets/img/detail/call.jpg" alt="">
                <span class="text">客服</span>
            </div>
            <div class="shop">
                <img src="~assets/img/detail/shop.png" alt="">
                <span class="text">店铺</span>
            </div>
            <div class="collect">
                <img src="~assets/img/detail/collect.png" alt="">
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addToCart">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DetailBottomBar',
    methods: {
        addToCart() {
            this.$emit('addCart')
        }
    }
}
</script>
<style scoped>
    .bottom-bar {
        height: 49px;
        background-color: #fff;
        /* position: fixed;
        left: 0;
        bottom: 0;
        right: 0; */
        position: relative;
        display: flex;
        text-align: center;
    }
    .bar-item {
        display: flex;
        flex: 1;
    }
    .bar-item>div {
        flex: 1;
    }
    img {
        padding-top: 4px;
        display: block;
        width: 26px;
        height: 26px;
        margin: 0 auto;
    }
    .bar-left span {
        font-size: 10px;
    }
    .service {
        background-position: 0 --54px;
    }
    .shop {
        background-position: 0 --98px;
    }
    .bar-right {
        font-size: 15px;
        line-height: 58px;
        color: #fff;
    }
    .bar-right .cart {
        background-color: #ffe817;
        color: #333;
    }
    .bar-right .buy {
        background-color: #ff6699;
    }
</style>