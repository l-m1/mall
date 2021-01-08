<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control
                :titles="['流行','新款','精选']"
                @tabclick="tabclick"
                ref="tabControl1"
                class="tab-control"
                v-show="isTabFixed"
            ></tab-control>
        <scroll class="content"
             ref="scroll" 
             :probe-type="3"
              @scroll="contentClick"
              :pull-up-load='true'
              @pullingUp='imgLoadMore'>
            <home-swiper :banners="banners" @swiperimgLoad="swiperimgLoadOver"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature></feature>
            <tab-control 
                :titles="['流行','新款','精选']"
                @tabclick="tabclick"
                ref="tabControl2">
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import Feature from './childComps/Feature.vue'


import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import {getHomeMultidata,getHomegoods} from 'network/home.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

 
export default {
    name: 'Home',
    mixins: [itemListenerMixin,backTopMixin],
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page:0,list: []},
                'new': {page:0,list: []},
                'sell': {page:0,list: []},
            },
            currentType: 'pop',
            tabOffsetTop: 0,
            offsetTop: 0,
            isTabFixed: false,
            leaveY: 0
        }
    },
    components: {
        HomeSwiper,
        RecommendView,
        Feature,
        NavBar,
        TabControl,
        GoodsList,
        Scroll
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    created() {
        //1、请求多个数据
        this.getHomeMultidata()
        //2、请求商品数据
        this.getHomegoods('pop')
        this.getHomegoods('new')
        this.getHomegoods('sell')
    },
    //监听item里面图片加载完成
    mounted() {
    },/* 使用activated与deactivated记录用户是否离开当前页面 */
    activated() {/* 用户进入当前页面 */
        //console.log('activated(');
        this.$refs.scroll.scrollTo(0,this.leaveY,0) //返回离开前的位置
        this.$refs.scroll.refresh()  //给页面进行一次刷新 防止出现直接返回顶部
    },
    deactivated() {/* 用户离开当前页面 */
        //console.log('deactivated');
        //this.leaveY = -1000  //由于scroll向下滑动，都是y轴下面 所以全是负值
        //console.log(this.$refs.scroll.scroll.y);
        /* 第一种调用scroll.y */
        //this.leaveY = this.$refs.scroll.scroll.y
        /* 第二种调用scroll.y 在Scroll.vue里面先定义方法 */
        this.leaveY = this.$refs.scroll.getscrollY()
        /* 取消全局的监听图片加载 */
        this.$bus.$off('imgLoadMore',this.itemImgListener)
    },
    methods: {
        /* 监听图片加载完成 */
        imgLoadMore() {
            this.getHomegoods(this.currentType)
        },
        /* 监听Swipper里面加载完成后的高度 */
        swiperimgLoadOver() {
            //console.log('----');
            this.offsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        /* 事件监听的方法 */
        tabclick(index) {
            //console.log(index);
            switch(index){
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
            }
            //使下方流行，新款，精选具有吸顶效果
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        contentClick(position) {
            //console.log(position.y);
            //判断是否显现BackTop
            this.isShowBackTop = (-position.y) > 1000
            //是否滑到TabControl 进行吸顶
            this.isTabFixed = (-position.y) > this.offsetTop
        },


        /* 网络请求的数据方法 */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
        })
        },
        getHomegoods(type) {
            const page = this.goods[type].page + 1
            getHomegoods(type,page).then(res =>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                //完成上拉加载更多
                this.$refs.scroll.finishPullUp()
        })
        }
    }
}
</script>
<style scoped>
    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        /* 在使用浏览器原生滚动时，为了 让导航栏不跟随一起滚动*/
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }

    /* 实现title里面的标题不动效果 原生吸顶效果 */
    /* .tab-control{
        position: sticky;
        top: 44px;
    } */

    /* 设置滑动高度第一种方法 */
    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */

    /* 设置滑动的第二种方式 */
    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        bottom: 54px;
    }
    /* 
    .fixed {
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
    } */
    .tab-control {
        position: relative;
        z-index: 9;
        top: -1px;
    }
</style>