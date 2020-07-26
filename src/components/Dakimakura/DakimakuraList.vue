<template>
    <div class="container-fluid">
        <div class="row row-cols-1" style="text-align:center">
            <h1> {{msg}} </h1>
        </div>
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
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div class="row" v-if="!loading">
            <div class="col col-lg-1">
            
            </div>
            <div class="row col-lg-10 col-md-11" >
                <div class="col-lg-2 col-md-4 col-sm-4" v-for="daki in dakiList" v-bind:key="daki.id">
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
        <div class="row">
            <div class="col col-lg-1"></div>
            <div class="row col-lg-10 col-md-11"> 
                <span v-for="pageNum in pages" v-bind:key="pageNum" >
                    <span v-on:click="getDakimakuras(pageNum)" v-if="pageNum != page" class="dakiPage_active">
                        <router-link :to="pageUrl+pageNum">
                            {{pageNum}}
                        </router-link>
                    </span>
                    <span v-else class="dakiPage">
                        {{pageNum}} 
                    </span>
                </span>
            </div>
            <div class="col col-lg-1"></div>
        </div>
        
    </div>
</template>

<script>

const axios = require('axios');
export default {
    name: 'dakimakuraList',
    data() {
        return { 
            msg: "Daki System", 
            dakiList : [],
            targetUrl : this.dakimakuraPath,
            imgUrl : `${this.imageResourceUrl}${this.dakimakuraPath}`,
            pages: 0,
            page: 0,
            pageUrl: `${this.dakimakuraPath.slice(0,-1)}?page=`,
            loading: true
            }
    },
    methods: {
        getDakimakuras(pageNum){
            this.page = pageNum;
            this.loading = true;
            axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${pageNum}`)
            .then((response) => {
                this.dakiList = response.data.dakimakuras;
                this.pages = response.data.totalPages;
                this.loading = false;
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        
    },
    mounted(){
        let page = this.$route.query.page ? this.$route.query.page : 1;
        this.page = page;
        let query = this.$route.query.query ? this.$route.query.query: '';
        let category = this.$route.query.category ? this.$route.query.category : 0;
        // console.log (`page : ${page} , query: ${query}`);
        axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${page}&query=${query}&category=${category}`)
            .then((response) => {
                this.dakiList = response.data.dakimakuras;
                this.pages = response.data.totalPages;
                this.loading = false;
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
.dakiPage_active{
    font-size: 13px;
    color: blue;
    margin: 0 10px 0 10px;
    cursor: pointer;
}
.dakiPage {
    font-size: 13px;
    color: black;
    margin: 0 10px 0 10px;
}
.loading{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
