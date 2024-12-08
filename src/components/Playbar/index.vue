<template>
  <div class="playbar-container" ref="playbarcontainer">
    <audio
      :src="musickUrl"
      ref="audio"
      @timeupdate="updataProgress"
      @ended="end"
      @loadedmetadata="loadedmetadata"
      @play="audioplay(true)"
      @pause="audioplay(false)"
      :autoplay="autoplay"
      controls
      style="display: none"
    ></audio>
    <div class="music-img">
      <img :src="imgurl" class="img-contaienr" />
    </div>
    <div class="music-titel" >
      <div class="text">{{ musickTitle }}</div>
    </div>
    <!-- 歌曲中间控件 -->
    <div class="music-contetnt">
      <!-- 进度条 -->
      <div class="mkusic-time">
        <!-- 歌曲当前播放时间 -->
        <div class="opentime">
          <span>{{ transTime(current) }}</span>
          
        </div>
        <!-- 进度条 -->
        <el-slider
          @change="progressChange"
          :format-tooltip="realFormatSecond"
          v-model="current"
          style="display: inline-block; width: 70%; height: 25px"
          :max="duration"
        >
        </el-slider>
        <div class="endtime">
          <span>/</span>
          <span>{{ transTime(duration) }}</span>
        </div>
      </div>
    </div>
    <!--控制按钮-->
    <div class="btnplay">
      <!--上一首-->
      <div class="musickup" @click="switchmusick('up')">
        <Icon type="last"></Icon>
      </div>
      <!--播放/暂停按钮 -->
      <div class="music-start" @click="audioplay(false)" v-if="isplay">
        <Icon type="start"></Icon>
      </div>
      <div class="music-stop" @click="audioplay(true)" v-if="!isplay">
        <Icon type="stop"></Icon>
      </div>
      <!--下一首-->
      <div class="musickdown" @click="switchmusick('dowm')">
        <Icon type="next"></Icon>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "../Icon/index.vue";
import debounce from "@/utils/debounce";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      // 当前播放音乐的地址
      musickUrl: "",
      // 播放当前音乐的图片地址
      imgurl: [],
      // 音乐是否播放
      isplay: false,
      // 当前点击音乐id
      musickid:0,
      // 自动播放
      autoplay: false,
      // 当前播放音乐的标题
      musickTitle: "",
      // 当前播放时长
      current: 0,
      // 播放总时长
      duration: 0,
      // 进度条位置
      cacheCurrent: 0,
      // 动画是否在进行
      mouseselect:false,
      // 容器高度
      appheight:0,
      // 音乐列表
      listmusick:[]
    };
  },
  created() {
    this.$bus.$on("musicstart", this.handlemusick);
    this.$bus.$on("musicklist", this.handlelistmusic);
    this.$bus.$on("musickplay", this.handleplay);
  },
  mounted(){
    this.setSelectBebounce = debounce(this.handlemouseleave, 1000);
    window.addEventListener('mousemove', this.handleMouseMove);
    this.$refs.playbarcontainer.addEventListener("mouseleave", this.setSelectBebounce );
  },
  beforeDestroy(){
    this.$refs.playbarcontainer.removeEventListener("mouseleave", this.setSelectBebounce );
  },
  destroyed() {
    this.$bus.$off("musicstart", this.handlemusick);
    this.$bus.$off("musicklist", this.handlelistmusic);
    this.$bus.$off("musickplay", this.handleplay);
  },
  methods: {
    // 初始化播放信息
    // 获取点击歌曲id
    handlemusick(e) {
      this.musickid = e - 1;
    },
    // 获取被点击音乐的地址
    handlelistmusic(e) {
      this.listmusick = e;
      if(this.musickid >= 0){
      this.musickUrl = e[this.musickid].mp3Url;
      this.musickTitle = e[this.musickid].title;
      this.imgurl = e[this.musickid].midImg;
      }
    },
    // 播放当前点击的音乐e
    handleplay() {
      // 缓存音乐
      if(this.musickid >= 0){
        setTimeout(() => {
        this.$refs.audio.play();
      },500);
      }
    },
    // 播放/暂停
    audioplay(start) {
      if (start) {
        this.$refs.audio.play();
        this.isplay = true;
      } else {
        this.$refs.audio.pause();
      }
      this.isplay = start;
    },

    // 切换音乐
    switchmusick(key) {
      // 判断是否是第一首是则倒叙循环播放，不是则上一首
      if (key === "up") {
        this.musickid = this.musickid - 1;
        if (this.musickid > -1) {
          this.isplay = false;
          setTimeout(() => {
            this.musickUrl = this.listmusick[this.musickid].mp3Url;
            this.musickTitle = this.listmusick[this.musickid].title;
            this.imgurl = this.listmusick[this.musickid].midImg;
            this.autoplay = true;
          }, 500);
        } else {
          this.musickid = this.listmusick.length - 1;
          this.isplay = false;
          setTimeout(() => {
            this.musickUrl = this.listmusick[this.musickid].mp3Url;
            this.musickTitle = this.listmusick[this.musickid].title;
            this.imgurl = this.listmusick[this.musickid].midImg;
            this.autoplay = true;
          }, 500);
        }
      } else {
        // 判断是不是最后一首，不是则下一首
        this.musickid = this.musickid + 1;
        this.isplay = false;
        if (this.musickid < this.listmusick.length) {
          setTimeout(() => {
            this.musickUrl = this.listmusick[this.musickid].mp3Url;
            this.musickTitle = this.listmusick[this.musickid].title;
            this.imgurl = this.listmusick[this.musickid].midImg;
            this.autoplay = true;
          }, 500);
        } else {
          this.musickid = 0;
          this.isplay = false;
          setTimeout(() => {
            this.musickUrl = this.listmusick[this.musickid].mp3Url;
            this.musickTitle = this.listmusick[this.musickid].title;
            this.imgurl = this.listmusick[this.musickid].midImg;
            this.autoplay = true;
          }, 500);
        }
      }
    },
    // 更新进度条与当前播放时间
    updataProgress(e) {
      this.current = e.target.currentTime;
    },
    // 拖动进度滚动条
    progressChange () {
      this.$refs.audio.currentTime = this.cacheCurrent
      this.current = this.cacheCurrent
    },
    // 实时返回当前进度位置
    realFormatSecond (second) {
      this.cacheCurrent = second
      return this.transTime(second)
    },
    // 音频结束
    end (e) {
      this.isPlay = false
      this.switchmusick('down')
    },
    // 获取音频总时长
    loadedmetadata (e) {
      this.duration = e.target.duration
    },

    // 补零
    formatTime(value) {
      var time = "";
      var s = value.split(":");
      var i = 0;
      for (; i < s.length - 1; i++) {
        time += s[i].length === 1 ? "0" + s[i] : s[i];
        time += ":";
      }
      time += s[i].length === 1 ? "0" + s[i] : s[i];
      return time;
    },
    // 音频时间格式化显示
    transTime (value) {
      let that = this
      var time = ''
      var h = parseInt(`${value / 3600}`)
      value %= 3600
      var m = parseInt(`${value / 60}`)
      var s = parseInt(`${value % 60}`)
      if (h > 0) {
        time = that.formatTime(h + ':' + m + ':' + s)
      } else {
        time = that.formatTime(m + ':' + s)
      }
      return time
    },
    handleMouseMove(event){
      this.appheight = document.documentElement.clientHeight - 10
      const { clientX, clientY } = event;
      if(clientX >185 && clientY >= this.appheight){
        this.handlemovuse(0)
      }
    },
    handlemouseleave(){
      this.handlemovuse(84)
    },
    handlemovuse(value){
      if(this.mouseselect){
        return;
      }
      this.mouseselect = true;
      var dom = document.querySelector('.playbar-container');
      dom.style.bottom = -value + 'px';
      setTimeout(()=>{
        this.mouseselect = false;
      },360)
    }
  },
};
</script>

<style lang="less" scoped>
/* 音乐制作 */
.playbar-container {
  position: absolute;
  bottom: 0;
  width: 90%;
  height: 84px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* font-size: 20px; */
  border: 3px solid black;
  box-sizing: border-box;
  padding: 8px 16px;
  min-width: 1500px;
  transition: 350ms;
}

/* 开始播放 */
.music-start,
.music-stop {
  position: absolute;
  left: 50%;
  bottom: 0px;
  margin: 1px 1px;
  font-size: 35px;
  cursor: pointer;
}

// 上一首
.musickup {
  position: absolute;
  left: 45%;
  bottom: 0px;
  margin: 1px 1px;
  font-size: 35px;
  cursor: pointer;
}

// 下一首
.musickdown {
  position: absolute;
  left: 55%;
  bottom: 0px;
  margin: 1px 1px;
  font-size: 35px;
  cursor: pointer;
}

// 音频图片
.img-contaienr {
  position: absolute;
  left: 5%;;
  top: 12px;
  margin: 1px 1px;
  cursor: pointer;
  width: 50px;
  height: 50px;
}
// 音乐标题
.music-titel {
  position: absolute;
  left: 10%;
  top: 12px;
  width: 10%;
  overflow: hidden;
  white-space: nowrap;
 
  margin: 1px 5px;
  font-size: 15px;
}

.btnplay {
  text-align: center;
  font-size: 35px;
}

.music-contetnt {
  position: absolute;
  left: 25%;
  top: 10%;
  width: 70%;
}

.opentime{
  position: absolute;
  right: 26%;
  top: 30%;
}
.endtime{
  position: absolute;
  right: 21.5%;
  top: 30%;
}

.text {
  /* 设置动画，X轴上的滚动 */
  display: inline-block;
  padding-left: 100%;
  animation: scroll 10s linear infinite;
}
 
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>