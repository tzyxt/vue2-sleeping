<template>
  <div class="video-container" ref="videocontainer">
    <div class="video-span">
      <span>
      为你推荐
    </span>
    </div>
    <Playimg :palydata="data" v-loading="isLoading"></Playimg>
  </div>
  
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import { getVideo } from '@/api/videoapi';
import Playimg from "@/components/Playimg/index.vue"
export default {
  mixins:[fetchData([])],
  components:{
    Playimg,
  },
  mounted(){
    // this.$refs.videocontainer.addEventListener('click', this.handleclick)
  },
  methods:{
    async fetchData(){
      return await getVideo();
    },
    handleclick(){
      console.log(1111)
    }
  },
}
</script>

<style lang="less" scoped>
.video-container{
  height: 100%;
  width: 100%;
}
.video-span{
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    
}
.video-container-parcel{
  display: flex;
  flex-wrap: wrap;
  min-width: 1600px;
}
.video-bofang{
  position:absolute;
  top:50%;
  left: 50%;
  z-index: 13;
  font-size: 40px;
  transition: all 0.3s;
  transform: translate(-50%, -50%) scale(0);
}
.video-container-all{
    position: relative;
    margin-bottom: 40px;
    margin-left: 60px;
    flex: none;
    border-radius: 8px;
    min-width: 216px;
    width: 230px;
}
.video-container-all:hover{
  .video-bofang{
    transform: translate(-50%, -50%) scale(1);
  }
}
.video-img{
    width: 230px;
    height: 160px;
    min-width: 216px;
    min-height: 121.5px;
    position: relative;
    display: flex;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    z-index: 12;
}

.video-href{
  width: 100%;
  height: 100%;
}
.video-img-style{
  height: 100%;
  width: 100%;
}
.video-tetle{
  width: 230px;
  height: 22px;
}

.video-tetle-span{
    margin-top: 8px;
    font-size: 16px;
    color: black;
    letter-spacing: 0px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}
</style>