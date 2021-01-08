import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('imgLoadMore',this.itemImgListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0,0,500)
        }
    }
}