<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-1 col-md-4"></div>
            <div class="col-sm-7 col-md-6">
            <h1>New Dakimakura</h1>
            </div>
            <div class="col-sm-1 col-md-4"></div>
        </div>  
        <div class="row">
            <div class="col-sm-1 col-md-4"></div>
            <div class="col-sm-7 col-md-6">
            <form method="post" id="dakimakuraForm" @submit="checkForm" accept-charset="UTF-8">
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
                    <input type="text" name="brand" v-model="dakimakura.brand" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label>가격</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <input type="text" name="price" v-model="dakimakura.price" class="form-control">
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
                        <input type="file" id="file" ref="file" >
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
    import VSelect from '@alfsnd/vue-bootstrap-select';
    import 'vue2-datepicker/index.css';
    const axios = require('axios');
    export default {
        name: 'dakimakuraAdd',
        components: { DatePicker, VSelect },
        data() { return { 
            file : '',
            dakimakura: {
                name: '',
                brand: '',
                price : '',
                releasedate : '',
                material: 0
            },
            errorData: '',
            selectedMaterial : '',
            materials: [ ],
            imageUploadUrl: '',
            imageUploadForm: ''
        }},
        methods: {
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
                    this.sendImage();    
                }
            },
            sendData() {
                const self = this;
                if(this.file) { 
                    this.dakimakura.fileName = this.file.name;
                } else {
                    this.dakimakura.fileName = null;
                }
                axios.post(`${this.ApiUrl}${this.dakimakuraPath}`, JSON.stringify(this.dakimakura))
                .then(function (response) {
                    console.log(response);
                    self.$router.push(`${self.dakimakuraPath}`);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            sendImage() {
                const self = this;
                this.file = this.$refs.file.files[0];
                if(!this.file) { 
                    self.sendData();
                    return; 
                }
                const body = { "fileName": this.file.name , "fileType": this.file.type};
                axios.post(this.preSignUrl, JSON.stringify(body)).then((response) => {

                    this.imageUploadUrl = response.data;
                    const header = { headers : 
                        { 'Content-Type': this.file.type }
                    }
                    axios.put(this.imageUploadUrl, this.file, header).then(function() {
                        self.sendData();
                    });
                });
            }
        },
        mounted: function(){
            axios.get(`${this.ApiUrl}${this.material}`).then((response) => {
                this.materials = response.data;            
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