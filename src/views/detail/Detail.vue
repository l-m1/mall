<template>
    <div class="detail"><!-- 
        <ul>
            <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
        </ul> -->
        <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
                <detail-swiper :top-images="topImages"></detail-swiper>
                <detail-base-info :goods="goods"></detail-base-info>
                <detail-shop-info :shop="shop"></detail-shop-info>
                <detail-goods-info :detail-info="detailInfo" @imageLoad = "imageLoadOver"></detail-goods-info>
                <datail-param-info :param-info="paramInfo" ref="params"></datail-param-info>
                <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
                <goods-list :goods="recommend" ref="recommend"></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DatailParamInfo from './childComps/DatailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid:null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend:[],
      ThemeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DatailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  created() {
    //1、保存传入的iid
    //console.log(this.$route.params);
    this.iid = this.$route.params.iid

    //2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1、获取顶部的图片轮播数据
      //console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages

      //2、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //3、获取商家信息
      this.shop = new Shop(data.shopInfo)

      //4、获取商品穿着信息
      this.detailInfo = data.detailInfo;
            
      //5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //5.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
        }
      })
        
      //3、获取推荐信息
      getRecommend().then(res=> {
        //console.log(res);
        this.recommend = res.data.list
      })
      //4、点击对应nav跳转到相应界面 设置防抖
      this.getThemeTopYs = debounce(() => {
        this.ThemeTopYs.push(0);
        this.ThemeTopYs.push(this.$refs.params.$el.offsetTop);
        this.ThemeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.ThemeTopYs.push(this.$refs.recommend.$el.offsetTop);
          //放入最大值 形成一个区间
          this.ThemeTopYs.push(Number.MAX_VALUE)
          //console.log(this.ThemeTopYs);
      })
    },
    mounted() { 
    },
    destroyed() {
      //console.log('destroyed');
      this.$bus.$off('imgLoadMore',this.itemImgListener)
    },
    methods: {
      imageLoadOver() {
        this.getThemeTopYs()
        this.$refs.scroll.refresh()
      },
      contentScroll(position) {
        const positionY = -position.y
        //判断是否显现BackTop
        this.isShowBackTop = positionY > 1000
        //0, 2837, 3689, 3962
        //this.positionY 当0~2837时 index为0
        //this.positionY 当2837~3639时 index为1
        //this.positionY 当3639~3692时 index为2

        //this.positionY 当大于3692时 index为3
        let length = this.ThemeTopYs.length
        for(let i=0;i<length-1;i++) {
          /* if(this.positionY > this.ThemeTopYs[i] && this.positionY < this.ThemeTopYs[i+1]) {
              console.log(i);
            } */
          if(this.currentIndex !== i && (positionY >= this.ThemeTopYs[i] && positionY < this.ThemeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
            }
          }
            /* for(let i=this.ThemeTopYs.length-1;i>=0;i--) {
                if(window.scrollY>this.ThemeTopYs[i]){
                    console.log(i);
                }
            } */
            /* switch(this.positionY) {
                case this.positionY > this.ThemeTopYs[0] && this.positionY < this.ThemeTopYs[1]:
                    this.currentIndex = 0
                    break
                case this.positionY >= this.ThemeTopYs[1] && this.positionY < this.ThemeTopYs[2]:
                    this.currentIndex = 1
                    break
                case this.positionY >= this.ThemeTopYs[2] && this.positionY < this.ThemeTopYs[3]:
                    this.currentIndex = 2
                    break
                case this.positionY = this.ThemeTopYs[3] :
                    this.currentIndex = 3
                    break
            }
            console.log(this.currentIndex); */
        },
        addToCart() {
            //1、获取购物车将要展示的信息
            const product = {}
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.newPrice;
            product.iid = this.iid;
            //2、将商品添加到购物车里
            //this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
            console.log(product);
        },
        titleClick(index) {
            //console.log(index);
            this.$refs.scroll.scrollTo(0,-this.ThemeTopYs[index],200)

        }

    }    
}
</script>
<style scoped>
    .detail {
        height: 100vh;
        position: relative;
        z-index: 1;
        background-color: #fff;
    }
    .detail-nav-bar {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px - 49px);
        position: relative;
        background-color: #fff;
    }
</style>