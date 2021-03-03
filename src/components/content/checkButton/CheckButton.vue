<template>
  <div class="check-button">
    <img v-if="isChecked" src="~assets/img/catery/tick.png" alt="">
    <img v-else src="~assets/img/catery/ticked.png" alt="">
  </div>
</template>
<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>
  
</style>