<template>
  <div class="home">
    <div>This app running in {{mode}} mode</div>
    <div>Total {{count}} Items</div>
  </div>
</template>

<script>
// @ is an alias to /src

const axios = require('axios');
export default {
  
  name: 'Home',
  components: {
  },
  mounted(){
    axios.get(`${this.ApiUrl}${this.dakimakuraPath}count`)
    .then((response) => {
        this.count = response.data.count;
    })
    .catch(function(error) {
        console.log(error);
    });
  },
  data() {
    return { 
      count : 0,
      tempData: {},  
      mode: process.env.NODE_ENV,
      message: this.config[process.env.NODE_ENV].message 
    };
  }
}
</script>
