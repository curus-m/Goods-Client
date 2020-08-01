<template>
  <div class="loading" v-if="isShow">
    Loading...
  </div>
</template>

<script>
export default {
  name: 'vue-loading',
  components: {
  
  },
  props: { 
    isShow : Boolean
  }
}
</script>
<style>

.loading{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>