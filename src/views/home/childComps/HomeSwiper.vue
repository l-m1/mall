<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoadOver">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>

//import Swiper from 'components/common/swiper/Swiper.vue'
//import SwiperItem from 'components/common/swiper/SwiperItem.vue'
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
export default {
    name: 'HomeSwiper',
    data() {
        return {
            imgLoad: false
        }
    },
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imgLoadOver() {
            if(!this.imgLoad) {
                this.$emit('swiperimgLoad')
                this.imgLoad = true
            }
        }
    }
}
</script>

<style scoped>

</style>