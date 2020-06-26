<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-1 col-md-4"></div>
            <div class="col-sm-7 col-md-6">
            <h1>Edit Dakimakura</h1>
            </div>
            <div class="col-sm-1 col-md-4"></div>
        </div>  
        <div class="row">
            <div class="col-sm-1 col-md-4"></div>
            <div class="col-sm-7 col-md-6">
            <form method="post" id="formTest" @submit="checkForm" action='/dakimakura/edit' enctype="multipart/form-data">
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label>이름</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <input type="text" v-model="dakimakura.name" id="name" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label>제작 서클/브랜드</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <input type="text" v-model="dakimakura.brand" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label>가격</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <input type="text" v-model="dakimakura.price" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">  
                    <label>재질</label>
                    </div>
                   
                    <div class="col-sm-9 col-md-4 inputColumn">
                  <v-select :options="materials" v-model="selectedMaterial" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label for="releasedate">발매일</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <div class="input-group date">
                       <date-picker v-model="dakimakura.releasedate" valueType="YYYY-MM-DD"></date-picker>
                    </div>
                </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                        <label>이미지</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                        <!-- <input type="checkbox" name="no_file" id="no_file">
                        <label for="no_file">준비중</label> -->
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
                    </div>
                </div>
                <div class="row">
                    <button type="submit" class= "btn btn-primary">전송</button>
                    <button type="button" class= "btn btn-primary" @click="test">TEST</button>
                    <div v-if="errorData">{{errorData}}</div>
                </div>
            </form>
        <div class="col-sm-1 col-md-3"></div>
        </div>  
        </div>
    </div>
</template>
<script> 
    
import DatePicker from 'vue2-datepicker';
// import $ from 'jquery';
import VSelect from '@alfsnd/vue-bootstrap-select';
// import BootstrapSelect from 'bootstrap-select'
import 'vue2-datepicker/index.css';
const axios = require('axios');
export default {
    name: 'dakimakuraEdit',
    components: { DatePicker, VSelect },
    data(){return {
        dakimakura: ''
    }}, 
    methods : {
        getDaki(){},
        send() {
                const formData = new FormData();
                formData.append("data", this.dakimakura);
                if(this.file) { 
                    formData.append("file", this.file, this.file.name);
                }
                axios.post('/dakimakura/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
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


</style>