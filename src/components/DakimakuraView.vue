<template>
  <div>
        dakiInfo ID: {{$route.params.id }}

        <div v-show="dakiMakura">
            <span> name: {{dakiMakura.name}} </span>
            <span>price : {{dakiMakura.price}}</span>
        </div>
  </div>
  
</template>
<script>
    const axios = require('axios');
    export default {
        name: "dakimakuraView",
        data(){
            return { dakiMakura : ''}
        },
        mounted(){
                axios.get(`https://9twj2j205g.execute-api.ap-northeast-2.amazonaws.com/dev/dakimakura/${this.$route.params.id}`)
                    .then((response) => {
                        console.log("Download Complete");
                        this.dakiMakura = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }

    }
</script>
<style scoped>

</style>