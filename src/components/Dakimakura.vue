<template>
    <div class="container-fluid">
        <div class="row row-cols-1" style="text-align:center">
            <h1> {{msg}} </h1>
        </div>
        <!-- <button v-on:click="fetchData">get data</button> -->
        <div class="row">
            <div class="buttons col-sm-8 col-md-10">
            </div>
            <div class="buttons col-sm-4 col-md-2">
                <router-link tag="button" class="btn btn-danger" id="button" to="/dakimakura/new">
                  New
                </router-link>
                <router-link tag="button" class="btn btn-info" id="button" to="/dakimakura/search">
                  search
                </router-link>
                
                
            </div>
        </div>
        <div class="row">
            <div class="col col-lg-1">
            
            </div>
            <div class="row col-lg-10 col-md-11" >
                <div class="col-lg-2 col-md-4 col-sm-4" v-for="daki in dakiList" v-bind:key="daki.id">
                    <!-- <%=link_to(image_tag(getDakiUrl(daki.image), class: "dakiThumbnail", alt: daki.name), "dakimakura/#{daki.id}", class: "link")%> -->
                    <router-link  :to="getTargetUrl(daki.id)" >
                        <img  class="dakiThumbnail" :alt="daki.name" :src="getDakiUrl(daki.image)">
                    </router-link>
                    <div class="dakiName">
                    <label>
                        {{daki.name}}
                    </label>
                    </div>
                </div>
            </div>
            <div class="col col-lg-1">
        
            </div>
        </div>
    </div>
</template>

<script>

const axios = require('axios');
export default {
    name: 'dakimakura',
    // props: {
    // msg: String
    // },
    data() {
        return { msg: "Daki System", dakiList : []}
    },
    methods: {
      
        getDakiUrl(url) {
            const base = "http://goods-resources.s3-ap-northeast-1.amazonaws.com/resources/dakimakura/";
            return base+url;
        },
        getTargetUrl(id) {
            return `/dakimakura/${id}`;
        }
    },
    mounted(){
            axios.get('https://9twj2j205g.execute-api.ap-northeast-2.amazonaws.com/dev/dakimakura/')
                .then((response) => {
                    console.log("Download Complete");
                    this.dakiList = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dakiThumbnail {
    width: 100%;
    height: 285px;
}
.dakiName {
    text-align: center;
    font-size: 13px;
}
.dakiImage {
    width: 90%;
    height: 700px;
}
.dakiBrand {
    font-size: 16px;
}
div.btn-group {
    width: 100%;
    button {
        width: 100%;
    }
}

</style>
