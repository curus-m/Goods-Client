<template>
  <div class="home">
    <div>This app running in {{mode}} mode</div>
    <!-- <div>{{message}}</div> -->
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  },
  mounted(){
    console.log(process.env.NODE_ENV)
  },
  data() {
    return { 
      mode: process.env.NODE_ENV,
    message: this.config[process.env.NODE_ENV].message };
  }
}
</script>
