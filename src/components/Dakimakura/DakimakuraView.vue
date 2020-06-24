<template>
  <div> ID : {{ this.$route.params.id}}
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
                  <vue-pure-lightbox :thumbnail="imgUrl+dakimakura.image"
                        :images="[
                        imgUrl+dakimakura.image
                        ]">
                </vue-pure-lightbox>
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
                <a :href="getPrev(dakimakura.id)">&lt;&lt; Prev </a>
                <!-- <router-link :to="getPrev(dakimakura.id)">&lt;&lt; Prev </router-link> -->
                <router-link :to="targetUrl">Main</router-link>
                <a :href="getNext(dakimakura.id)"> Next &gt;&gt; </a>
                <!-- <router-link :to="getNext(dakimakura.id)"> Next &gt;&gt; </router-link> -->
            </div>
            <div class="col-sm-1 col-md-3"></div>
        </div>
    </div>
  </div>
</template>
<script>
    const axios = require('axios');
    import VuePureLightbox from 'vue-pure-lightbox'
    // import $ from 'jquery'
    export default {
        name: "dakimakuraView",
        data(){
            return { dakimakura : '',
                targetUrl : "/dakimakura/",
                imgUrl : `${this.resourceUrl}/dakimakura/`,
                id: this.$route.params.id
            }
        },
        components : { VuePureLightbox },
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
          watch: {
            // 질문이 변경될 때 마다 이 기능이 실행됩니다.
            id: function (newVal) {
            console.log("id changed: "+newVal)
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
<style src="vue-pure-lightbox/dist/VuePureLightbox.css"></style>
<style scoped>
    .dakiImage {
        width: 90%;
        height: 700px;
    }
    .dakiBrand {
        font-size: 16px;
    }
</style>