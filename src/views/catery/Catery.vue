<template>
    <div class="wrapper" ref="aaa">
        <ul class="content">
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
        <li>分类</li>
    </ul>
    </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
    name: 'Catery',
    data() {
        return {
            scroll: null
        }
    },
    /* 在组件创建完成时调用，但模板还没有加载 */
    crated() {},
    /* 模板已经加载完成 */
    mounted() {
        console.log(this.$refs.aaa);
        console.log(document.querySelector('.wrapper'));
        this.scroll = new BScroll(document.querySelector('.wrapper'),{

        })
    }
}
</script>
<style scoped>
    .wrapper{
        height: 150px;
        background-color: red;
        /* 给原生设置局部可滚动 */
        overflow: hidden;
        /* overflow-y: scroll; */
    }
</style>