<template>
  <div>
    <div class="container-fluid" v-if="dakimakura">
        <div class="row">
            <div class="col-sm-1 col-md-3"></div>
            <div class="col-sm-7 col-md-6">
                <h1 class="title">{{dakimakura.name}}</h1>
            </div>
            <div class="col-sm-1 col-md-3">
                <router-link tag="button" class="btn btn-warning" id="button" to="/dakimakura/edit">
                Edit
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-1 col-md-3"></div>
            <div class="col-sm-7 col-md-4">
                <router-link to="dakimakura.image">
                <!-- <img class="dakiThumbnail" :alt="daki.name"  class= "link" :src="imgUrl+daki.image"  data: "{lightbox: @dakimakura.id, title: @dakimakura.name"> -->
                    <img class="dakiImage" :alt="dakimakura.name" :src="imgUrl+dakimakura.image">
                </router-link>
            </div>
            <div class="col-sm-3 col-md-2">
                <div class="dakiBrand"><label>제작 서클/브랜드: </label> <span>{{dakimakura.brand}}</span> </div>
                <div><label>가격: </label><span>{{dakimakura.price}}</span> </div>
                <div><label>재질: </label><span>{{dakimakura.material}}</span> </div>
                <div><label>발매일: </label><span>{{dakimakura.releasedate}}</span> </div>
            </div>
            <div class="col-sm-1 col-md-3">
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-1 col-md-3"></div>
            <div class="col-sm-7 col-md-6">
                <router-link :to="getPrev(dakimakura.id)">&lt;&lt; Prev </router-link>
                <router-link :to="targetUrl">Main</router-link>
                <router-link :to="getNext(dakimakura.id)"> Next &gt;&gt; </router-link>
            </div>
            <div class="col-sm-1 col-md-3"></div>
        </div>
    </div>
  </div>
</template>
<script>
    const axios = require('axios');
    // import $ from 'jquery'
    export default {
        name: "dakimakuraView",
        data(){
            return { dakimakura : '',
                targetUrl : "/dakimakura/",
                imgUrl : `${this.resourceUrl}/dakimakura/`
            }
        },
        methods: {
            getPrev(id) {
                const prevNum = id-1;
                return this.targetUrl+prevNum;
            },
            getNext(id) {
                const nextNum = id+1;
                return this.targetUrl+nextNum;

            }
        },
        mounted(){
                axios.get(`https://9twj2j205g.execute-api.ap-northeast-2.amazonaws.com/dev/dakimakura/${this.$route.params.id}`)
                    .then((response) => {
                        console.log("Download Complete");
                        this.dakimakura = response.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
    }
</script>
<style scoped>
    .dakiImage {
        width: 90%;
        height: 700px;
    }
    .dakiBrand {
        font-size: 16px;
    }
</style>