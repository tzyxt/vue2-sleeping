<template>
  <div class="home-conatiner">
    <Carouselitem :imagedata="data" v-loading="isLoading"/>
    <div class="home-title">
        <span>助眠推荐</span>
      </div>
    <div class="image-conatiner" >
      <div class="home-image-conatiner" v-for="item in zzdata" :key="item.id">
        <div class="home-image" >
        <router-link to="/home/Lori">
          <img :src="item.zzimg" alt="" style="border-radius: 50%; width:100%; height: 100%;">
        </router-link>
      </div>
      <div class="home-span">
        <span>{{ item.title }}</span>
      </div>
    </div>
      </div>
      
  </div>
  
</template>

<script>

import Carouselitem from './Carouselitem.vue';
import { getHome } from '@/api/homeapi';
import  fetchData from '@/mixins/fetchData.js';
export default {
  mixins:[fetchData([])],
  components:{
    Carouselitem
  },
  data(){
    return{
      zzdata:[
        {
          id:1,
          name:"Lori",
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:2,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:3,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:4,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:5,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:6,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:7,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:8,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:9,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:10,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
        {
          id:11,
          zzimg:require("./13345.jpg"),
          title:'恩七不甜',
        },
      ]
    }
  },
  methods:{
    async fetchData(){
      return await getHome();
    },
    
  }

}
</script>

<style>
.image-conatiner{
    width: 100%;
    min-width: 1500px;
    height: 100%;
}
.home-image-conatiner{
  margin-left:30px;
  margin-bottom: 10px;
  text-decoration: none;
  display: inline-block;
}
.home-image{
  height: 100px;
  width: 100px;
}
.home-title{
  margin: 20px 10px;
  display: block;
  font-size: 22px;
  font-weight: bold;
}
.home-span{
  font-size: 16px;
    /* text-align: center; */
    padding-left: 20px;
}
</style>