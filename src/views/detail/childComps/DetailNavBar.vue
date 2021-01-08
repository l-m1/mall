<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.png" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in title" :key="index" class="title-item" :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name: 'DetailNavBar',
    data() {
        return {
            title: ['商品','参数','评论','推荐'],
            currentIndex: 0
        }
    },
    components: {
        NavBar
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index
            this.$emit('titleClick',index)
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>
<style scoped>
    .nav-bar {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .back {
        margin-top: 5px;
    }
    .title {
        display: flex;
        font-size: 14px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
</style>