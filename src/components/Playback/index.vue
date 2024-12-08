<template>
  <div class="playback-container" v-loading="isLoading">
    <div class="playback-video-container" >
      <video
        ref="veoRef"
        :src="playurl"
        controls
        playsinline="true"
        class="playback-viedo"
        :poster="veoPoster"
        :muted="autoplay || muted"
        :autoplay="autoplay"
        @click.prevent.once="onPlay"
        v-if="haiden"
      ></video>
    </div>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData.js";
import { getVideo } from '@/api/videoapi';
export default {
  mixins:[fetchData([])],
  data(){
    return{
      veoPoster:'',// 视频封面
      playurl:'', // 播放地址
      loop:false,// 视频播放完成后，是否循环播放
      autoplay:false,// 视频就绪后是否马上播放
      muted:false,// 是否静音
      haiden:false, // 加载数据
    }
  },
  computed:{
    routeInfo() {
      // 路由中获取id 然后在数据中找到对应的播放地址
      var categoryId = +this.$route.params.playid -1;
      var playobject = this.data[categoryId]
      for (const item in playobject) {
        if(item === 'vidurl'){
          this.playurl = playobject[item]
        }
        if(item === 'midImg'){
          this.veoPoster = playobject[item]
        }
      }
    },
  },
  methods:{
    async fetchData(){
      return await getVideo();
    },
    onPlay () {
        if (this.autoplay) {
          this.$refs.veoRef.pause()
        } else {
          this.$refs.veoRef.play()
        }
      },
  },
  watch:{
    isLoading: function(oldV,newV){
      this.routeInfo
      this.haiden = newV
    }
  }
};
</script>

<style lang="less" scoped>
.playback-container {
  width: 100%;
  height: 100%;
}

.playback-video-container {
  width: 1400px;
  margin: 0 auto;
  height: 700px;
}

.playback-viedo {
  width: 100%;
  height: 100%;
  object-fit: fill,
}
</style>