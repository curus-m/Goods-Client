<template>
    <div>
        <div class="container-fluid">
            <div class="row row-cols-1" style="text-align:center">
                <h1> {{msg}} </h1>
            </div>
            <div class="row">
                <div class="col col-lg-1">
                
                </div>
                <div class="row col-lg-10 col-md-11 buttons">
                    <button class="btn btn-warning" id="searchClear" v-on:click="clear()" v-if="query">
                        Clear
                    </button>
                    <button class="btn btn-info" id="searchButton" v-on:click="search()">
                        Search
                    </button>
                    <input type="text" name="query" class="form-control" id="searchBox" v-model="query" v-on:keyup.enter="search()">
                    <router-link tag="button" class="btn btn-danger" id="newButton" to="/dakimakura/add/">
                        New
                    </router-link> 
                    
                </div>
                <div class="col col-lg-1">
                    
                </div>
            </div>
            <vue-loading v-bind:isShow="loading"></vue-loading>   
            <div class="row" v-if="!loading">
                <div class="col col-lg-2">
                
                </div>
                <div class="row col-lg-8 col-md-11" >
                    <div class="col-lg-6 col-md-6 col-sm-6" v-for="daki in dakiList" v-bind:key="daki.id">
                        <router-link :to="targetUrl+daki.id" >
                            <img class="dakiThumbnail" :alt="daki.name" :src="thumbnailUrl+daki.image">
                        </router-link>
                        <div class="dakiName">
                            <label>
                                {{daki.name}}
                            </label>
                        </div>
                    </div>
                    
                </div>
                
                <div class="col col-lg-2">
            
                </div>
            </div>
            
            <!-- <div class="row">
                <div class="col col-lg-1"></div>
                <div class="row col-lg-10 col-md-11"> 
                    <span v-for="pageNum in pages" v-bind:key="pageNum" >
                        <button v-on:click="getDakimakuras(pageNum)" v-if="pageNum != page" class="dakiPage_active btn btn-link">
                            <router-link :to="pageUrl+pageNum" >
                                {{pageNum}}
                            </router-link>
                        </button>
                        <button v-else class="dakiPage btn btn-link">
                            {{pageNum}} 
                        </button>
                    </span>
                </div>
                <div class="col col-lg-1"></div>
            </div> -->
        </div>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
    
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import VueLoading from "../etc/Loading.vue";
const axios = require('axios');
export default {
    name: 'dakimakuraList',
    components: {
        VueLoading, InfiniteLoading
    },
    data() {
        return { 
            msg: "Daki System", 
            dakiList : [],
            targetUrl : this.dakimakuraPath,
            imgUrl : `${this.imageResourceUrl}${this.dakimakuraPath}`,
            pages: 0,
            page: 0,
            pageUrl: `${this.dakimakuraPath.slice(0,-1)}?page=`,
            loading: true,
            query: "",
            thumbnailUrl: `${this.ApiUrl}/thumbnails${this.dakimakuraPath}`
            }
    },
    methods: {
        // getDakimakuras(pageNum){
        //     this.page = pageNum;
        //     this.loading = true;
        //     axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${pageNum}`)
        //     .then((response) => {
        //         this.dakiList = response.data.dakimakuras;
        //         this.pages = response.data.totalPages;
        //         this.loading = false;
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // },
        search(){
            console.log(`query: ${this.query}`);        
            window.location.href=`${this.dakimakuraPath}?&query=${this.query}`;
        },
        clear() {
            this.query = "";
            window.location.href=`${this.dakimakuraPath}?&query=${this.query}`;
        },
        infiniteHandler($state) {
            this.page = this.page+1;
            this.loading = true;
            axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${this.page}`)
            .then((response) => {
                this.dakiList.push(...response.data.dakimakuras);                
                this.pages = response.data.totalPages;
                this.loading = false;
                $state.loaded();    
            })
            .catch(function(error) {
                console.log(error);
                $state.complete();
            });
            
        },
        
    },
    mounted(){
        let page = this.$route.query.page ? this.$route.query.page : 0;
        this.page = page;
        let searchQuery = this.$route.query.query ? this.$route.query.query: '';
        // let category = this.$route.query.category ? this.$route.query.category : 0;
        this.query = searchQuery;
        // console.log (`page : ${page} , query: ${query}`);
        /*axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${page}&query=${searchQuery}&category=${category}`)
            .then((response) => {
                this.dakiList = response.data.dakimakuras;
                this.pages = response.data.totalPages;
                this.loading = false;
            })
            .catch(function(error) {
                console.log(error);
        });*/
        }
    
}
</script>
<style scoped lang="scss">
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
#searchBox {
    width: 40%;
    margin-right: 5px;
    height: 45px;
}
#searchClear {
    height: 45px;
}
.buttons {
    height: 50px;
    display: flex;
    position: relative;
    flex-direction: row-reverse;
}
#searchButton {
    height: 45px;
}
#newButton {
    margin-right: 5px;
    height: 45px;
}
</style>
