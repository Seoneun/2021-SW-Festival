<template>
<div>
  <label for="original">원본 이미지</label>
  <input
    type="file"
    id="original"
    ref="originalImg"
    accept="image/png, image/jpeg, image/jpg"
  />
  <label for="style">스타일 이미지</label>
  <input
    type="file"
    id="style"
    ref="styleImg"
    accept="image/png, image/jpeg, image/jpg"
  />
  <button @click="uploadImages">업로드하기</button>
   <hr/>
  <div class="images">
    <img :src="originalImg">
    <img :src="styleImg">
  </div>

    <label for="search">스타일 이미지 검색</label>
    <input type="text" v-model="keyword" id="search">
    <button type="button" @click="searchImages">검색하기</button>
    <div class="rec_images">
        <div v-for="(url,index) in urls" :key="index">
            <img :src="url">
        </div>
       
    </div>
  </div>

  
</template>

<script>
import axios from "axios";
export default {
  data() {
      return {
          urls:[],
          originalImg: '',
          styleImg: '',
          keyword:''
      }
  },
  methods: {
    async uploadImages() {
       
      if (
        this.$refs.originalImg.files.length > 0 &&
        this.$refs.styleImg.files.length > 0
      ) {
        const originalData = new FormData();
        const styleData = new FormData(); 
        const originalImg = this.$refs.originalImg.files[0];
        const styleImg = this.$refs.styleImg.files[0];
        originalData.append("original_img", originalImg);
        styleData.append("style_img", styleImg);
        const promises = [
            axios.post("http://localhost:4000/api/image/original",originalData),
            axios.post("http://localhost:4000/api/image/style",styleData)
        ]
        // 비동기 병렬처리
        const responses = await Promise.all(promises);
        responses.forEach((response)=>{
            if(response.data.sort){
                if(response.data.sort == 'styleImg'){
                    this.styleImg = response.data.url
                } else {
                    this.originalImg = response.data.url
                }
            } else {
                alert('error');
            }
        })
      } else {
        return;
      }
    },
    async searchImages(){
        try{
            const keyword = this.keyword;
            const response = await axios.get(`http://localhost:5000/api/images?keyword=${keyword}`);
            this.urls = response.data.urls;            
        } catch(error){
            console.log(error); 
        }
      }
  },
};
</script>

<style>
.images{
    display: flex;
}
.images img{
    width: 300px;
    border:1px solid red;
}
.rec_images{
    border:1px solid red;
    display: flex;
    flex-wrap: wrap;
}
.rec_images div{
    border: 1px solid blue;
}
</style>