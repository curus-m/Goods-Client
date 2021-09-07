<template>
    <div>
        <div class="container-fluid">
            <div class="row row-cols-1" style="text-align:center">
                <h1> {{msg}} </h1>
            </div>
            <div class="row">
                <div class="col col-lg-2 col-md-2">
                    
                </div>
                <div class="col-lg-8 col-md-8 mb-4">
                    <div class="input-group">
                        <router-link tag="button" class="btn btn-success btn-sm" id="newButton" to="/dakimakura/add/">
                            New
                        </router-link> 
                        <input type="text" name="query" class="form-control" id="searchBox" v-model="query" v-on:keyup.enter="search()">
                        <button class="btn btn-info btn-sm" id="searchButton" v-on:click="search()">
                            Search
                        </button>                       
                        <button class="btn btn-dark" id="searchClear" v-on:click="clear()" v-if="query">
                            Clear
                        </button>
                        <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off" v-on:click="toggle()"  aria-pressed="false">
                        <label v-bind:class="r18Button" for="btn-check">{{isR18Message()}}</label>
                    </div>
                </div>
                <div class="col col-lg-2">
                    
                </div>
            </div>
            <div class="row" >
                <div class="col col-lg-2">
                </div>
                <div class="row col-lg-8 col-md-11">
                    <div class="col-lg-4 col-md-4 col-sm-4" v-for="daki in dakiList" v-bind:key="daki.id">
                        <div v-if="isR18 || !daki.r18">
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
                </div>
                <div class="col col-lg-2">
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
        </div>
        
    </div>
    
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
const axios = require('axios');
export default {
    name: 'dakimakuraList',
    components: {
    InfiniteLoading
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
            thumbnailUrl: `${this.ApiUrl}/thumbnails${this.dakimakuraPath}`,
            isR18: false
            } 
    },
    methods: {
        search(){
            console.log(`query: ${this.query}`);
            this.page = 0;
            this.dakiList = [];
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        clear() {
            this.page = 0;
            this.query = "";
            this.dakiList = [];
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        infiniteHandler($state) {
            this.page = this.page+1;
            this.loading = true;
            axios.get(`${this.ApiUrl}${this.dakimakuraPath}?page=${this.page}&query=${this.query}`)
            .then((response) => {
                if(response.data.dakimakuras.length){
                    this.dakiList.push(...response.data.dakimakuras); 
                    this.pages = response.data.totalPages;
                    this.loading = false;
                    $state.loaded();    
                }
                else {
                    $state.complete();
                } 
            })
            .catch(function(error) {
                console.log(error);
                $state.complete();
            });
            
        },
        toggle() {
            this.isR18 = !this.isR18;
        },
        isR18Message() {
            return this.isR18 ? "R-18 ON"  : "R-18 OFF";
        }
        
    },
    computed: {
        r18Button: function() {
            return {
                'btn' : true,
                'btn-danger' : this.isR18,
                'btn-secondary' : !this.isR18
            }
        }
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
</style>
