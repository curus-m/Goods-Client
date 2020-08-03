<template>
    <div>
        <vue-loading v-bind:isShow="loading"></vue-loading>
        <div class="container-fluid" v-if="dakimakura">
            <div class="row">
                <div class="col-sm-1 col-md-3"></div>
                <div class="col-sm-7 col-md-6">
                    <h1 class="title">{{dakimakura.name}}</h1>
                </div>
                <div class="col-sm-1 col-md-3">
                    <router-link tag="button" class="btn btn-warning" id="button" :to="editUrl+dakimakura.id">
                    Edit
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-1 col-md-3"></div>
                <div class="col-sm-7 col-md-4">
                    <vue-pure-lightbox :thumbnail="imgUrl+dakimakura.image"
                            :images="[
                            imgUrl+dakimakura.image
                            ]">
                    </vue-pure-lightbox>
                </div>
                <div class="col-sm-3 col-md-2">
                    <div class="row">
                        <div class="dakiBrand col-sm-4 col-md-4">
                            <label>제작 서클/브랜드</label> 
                        </div>
                        <div class="col-sm-8 col-md-8">
                            <span>{{dakimakura.brand}}</span> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="dakiBrand col-sm-4 col-md-4">
                            <label>가격</label>
                        </div>
                        <div class="col-sm-8 col-md-8"> 
                            <span>{{dakimakura.price}}</span> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="dakiBrand col-sm-4 col-md-4">
                            <label>재질</label>
                        </div>
                        <div class="col-sm-8 col-md-8"> 
                            <span>{{dakimakura.material}}</span> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="dakiBrand col-sm-4 col-md-4">
                            <label>발매일</label>
                        </div>
                        <div class="col-sm-8 col-md-8">
                            <span>{{dakimakura.releasedate}}</span> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="dakiBrand col-sm-3 col-md-4">
                            <label>메모</label>
                        </div>
                        <div class="col-sm-9 col-md-4 inputColumn">
                            <span>{{dakimakura.description}}</span> 
                        </div>
                    </div>
                </div>
                <div class="col-sm-1 col-md-3">
                </div>
            </div>
            
            <div class="row">
                <div class="col-sm-1 col-md-3"></div>
                <div class="col-sm-7 col-md-6">
                    <a :href="getPrev(dakimakura.id)">&lt;&lt; Prev </a>
                    <router-link :to="targetUrl">Main</router-link>
                    <a :href="getNext(dakimakura.id)"> Next &gt;&gt; </a>
                </div>
                <div class="col-sm-1 col-md-3"></div>
            </div>
        </div>
    </div>
</template>
<script>
    
    const axios = require('axios');
    import VuePureLightbox from 'vue-pure-lightbox'
    import VueLoading from "../etc/Loading.vue";  
    // import $ from 'jquery'
    export default {
        name: "dakimakuraView",
        data(){
            return { dakimakura : '',
                targetUrl : `${this.dakimakuraPath}`,
                editUrl: `${this.dakimakuraPath}edit/`,
                imgUrl : `${this.imageResourceUrl}${this.dakimakuraPath}`,
                id: this.$route.params.id,
                loading: true
            }
        },
        components : { VuePureLightbox, VueLoading },
        methods: {
            getPrev(id) {
                const prevNum = id-1;
                return this.targetUrl+prevNum;
            },
            getNext(id) {
                const nextNum = id+1;
                return this.targetUrl+nextNum;
            },
            getData(dakimakura) {
                return `{lightbox: ${dakimakura.id}, title: ${dakimakura.name}}`
            }
        },
        mounted(){
                axios.get(`${this.ApiUrl}${this.dakimakuraPath}${this.$route.params.id}`)
                    .then((response) => {
                        console.log("Download Complete");
                        this.dakimakura = response.data;
                        this.loading = false;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
    }
</script>
<style src="vue-pure-lightbox/dist/VuePureLightbox.css"></style>
<style scoped>
    .dakiImage {
        width: 90%;
        height: 700px;
    }
    .dakiBrand {
        font-size: 16px;
        font-weight: 700;
    }
</style>