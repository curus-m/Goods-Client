<template>
    <div>
        <vue-loading v-bind:isShow="loading"></vue-loading>   
        <div class="container-fluid" v-if="!loading">
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
                    <form method="put" id="dakimakuraForm" @submit="checkForm" accept-charset="UTF-8">
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
                                <input type="file" id="file" ref="file">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3 col-md-4 labelColumn">
                                <label>메모</label>
                            </div>
                            <div class="col-sm-9 col-md-4 inputColumn">
                                <textarea v-model="dakimakura.description" class="form-control">
                                </textarea>
                            </div>
                        </div>
                        <div class="row">
                            <button type="submit" class= "btn btn-primary">전송</button>
                            <router-link tag="button" class="btn btn-info" id="button" to="/dakimakura/">
                                뒤로
                            </router-link>
                            <div v-if="errorData">{{errorData}}</div>
                        </div>
                    </form>
                    <div class="col-sm-1 col-md-3"></div>
                </div>  
            </div>
        </div>
    </div>
</template>
<script> 
    
import DatePicker from 'vue2-datepicker';
import VSelect from '@alfsnd/vue-bootstrap-select';
import VueLoading from "../etc/Loading.vue";
import 'vue2-datepicker/index.css';
const axios = require('axios');
export default {
    name: 'dakimakuraEdit',
    components: { DatePicker, VSelect, VueLoading },
    data(){return {
        dakimakura: '',
        materials: [],
        selectedMaterial : '',
        errorData: '',
        loading: true
    }}, 
    methods : {
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
                    this.sendData();
                }
            },
            sendData() {
                const self = this;
                const formData = new FormData();
                this.file = this.$refs.file.files[0];
                this.loading = true;
                formData.append("file", this.file);
                formData.append("data", JSON.stringify(this.dakimakura));
                axios.put(`${this.ApiUrl}${this.dakimakuraPath}${this.$route.params.id}`, formData)
                    .then(function () {
                        console.log("Upload OK!");
                        // redirect
                        self.$router.push(`${self.dakimakuraPath}${self.$route.params.id}`)
                    }, function (error) {
                        console.log(error);
                });
            }
    },
    mounted: function(){
        const self = this;
        axios.get(`${this.ApiUrl}${this.materialUrl}`).then((response) => {
            self.materials = response.data;
            self.loading = false;
            const material  = self.materials.find(item => item.text == self.dakimakura.material);
            self.selectedMaterial = material;
        })
        .catch(function(error) {
            console.log(error);
            return null;
        });
        axios.get(`${this.ApiUrl}${this.dakimakuraPath}${this.$route.params.id}`)
                .then((response) => {
                    console.log("Download Complete");
                    self.dakimakura = response.data;
                    const material  = self.materials.find(item => item.text == self.dakimakura.material);
                    self.selectedMaterial = material;
                    self.dakimakura.originalImage = response.data.image; 
                })
                .catch(function(error) {
                    console.log(error);
                });
    }
}
</script>
<style scoped>


</style>