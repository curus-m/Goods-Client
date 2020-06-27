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
                    <input type="text" v-model="dakimakura.brand" class="form-control" >
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
                  <v-select :options="materials" v-model="selectedMaterial"/>
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
        dakimakura: '',
        materials: [],
        selectedMaterial : '',
        errorData: ''
    }}, 
    methods : {
        getDaki(){},
        checkForm: function (e) {
                let errors = [];

                if (!this.dakimakura.name) {
                    errors.push("Name required.");
                }
                if (!this.dakimakura.brand) {
                    errors.push('Email required.');
                }
                if (isNaN(this.dakimakura.price)) {
                    errors.push('Price required.');
                }
                if (isNaN(this.selectedMaterial.value)) {
                    errors.push('Material required.');
                } else {
                    this.dakimakura.material = this.selectedMaterial.value;
                }
                if (!this.dakimakura.releasedate) {
                   errors.push('ReleaseDate required.');
                }
                e.preventDefault();
                if (errors.length) {
                    this.errorData = errors;
                    
                } else {
                    this.errorData = '';
                    e.preventDefault();
                    this.send();    
                }
            },
        send() {
                const formData = new FormData();
                formData.append("data", this.dakimakura);
                if(this.file) { 
                    formData.append("file", this.file, this.file.name);
                }
                axios.put(`${this.ApiUrl}${this.dakimakuraPath}update`, formData, {
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
        setSelected(value) {
            console.log(value);
        },
    },
    mounted: function(){
        axios.get(`${this.ApiUrl}${this.dakimakuraPath}`).then((response) => {
            console.log("Material Complete");
            this.materials = response.data;            
            axios.get(`${this.ApiUrl}${this.dakimakuraPath}${this.$route.params.id}`).then((response) => {
                this.dakimakura = response.data;
                let selectedValue = this.materials.find(item => item.value == this.dakimakura.material);
                this.selectedMaterial = selectedValue;
            }).catch(function(error) {
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log(error);
            return null;
        });
    }

}
</script>
<style scoped>


</style>