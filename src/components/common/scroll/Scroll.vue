<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    data() {
        return {
            scroll: null
        }
    },
    props: {
        probeType: {
            type: Number,
            default() {
                probeType: 1
            }
        },
        pullUpLoad: {
            type:Boolean,
            default: false
        }
    },
    mounted() {
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        /* this.scroll.scrollTo(0,0) */

        //监听滚到的位置
        if(this.probeType === 2 || this.probeType ===3){
            this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        })
        }
        
        //监听滑到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() => {
            //console.log('加载更多');
            this.$emit('pullingUp')
        })
        }

        
    },
    methods: {
        scrollTo(x,y,time) {/* scrollTo记录当前所在的位置 */
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        getscrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>