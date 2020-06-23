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
            <form method="post" action='/dakimakura'>
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
                    <!-- <%= select_tag(:material, options_for_select([['-재질 선택-', ''], ['2Way Tricot', 0], ['A&J ライクトロン', 1],['A&J アクアプレミア',2],['白もうふ', 3]]), class: "selectpicker", data: {style: "btn-primary"}, name: "dakimakura[material]") %> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3 col-md-4 labelColumn">
                    <label for="releasedate">발매일</label>
                    </div>
                    <div class="col-sm-9 col-md-4 inputColumn">
                    <div class="input-group date">
                    <input type="text" v-model="dakimakura.releasedate" class="form-control datePicker">
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-3 col-md-4 labelColumn">
                <label>이미지</label>
                </div>
                <div class="col-sm-9 col-md-4 inputColumn">
                    <!-- <%= file_field_tag 'imageFile' %>
                    <%= check_box_tag(:no_file) %>
                    <%= label_tag(:no_file, "준비중") %> -->
                </div>
                </div>
                <div class="row">
                <button type="submit" class= "btn btn-primary">전송</button>
                {{errorData}}
                </div>
            </form>
        <div class="col-sm-1 col-md-3"></div>
        </div>  
        </div>
    </div>
</template>
<script>
export default {
     name: 'dakimakuraAdd',
     data() { return { 
        dakimakura: '',
        errorData: ''
     }}
}
</script>
<style scoped>
</style>