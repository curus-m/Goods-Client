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
                <router-link tag="button" class="btn btn-danger" id="button" to="/dakimakura/add/">
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
                    <router-link :to="targetUrl+daki.id" >
                        <img class="dakiThumbnail" :alt="daki.name" :src="imgUrl+daki.image">
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
    name: 'dakimakuraList',
    // props: {
    // msg: String
    // },
    data() {
        return { 
            msg: "Daki System", 
            dakiList : [],
            targetUrl : this.dakimakuraPath,
            imgUrl : `${this.imageResourceUrl}${this.dakimakuraPath}`
            }
    },
    methods: {
    },
    mounted(){
        let page = this.$route.query.page;
        let query = this.$route.query.query;
        console.log (`page : ${page} , query: ${query}`);
        console.log()
            axios.get(`${this.ApiUrl}${this.dakimakuraPath}`)
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
div.btn-group {
    width: 100%;
    button {
        width: 100%;
    }
}

</style>
