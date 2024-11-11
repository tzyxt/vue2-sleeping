<template>
    <div class="mod_songlist" >
      <ul class="songlist__header">
        <li class="songlist__header_id">#</li>
        <li class="songlist__header_title">标题</li>
        <li class="songlist__header_author">作者</li>
        <li class="songlist__header_time">时长</li>
      </ul>
      <ul  class="songlist__list" ref="musiccontainer">
        <li
          class="hongshui hvr-float-shadow"
          v-for="item in list"
          :key="item.id"
        >
         <div class="songlist__item" >
            <div  class="songlist__id"  @click="handleclick" ref="songlistid">
              <Icon type="stop" :data-name="item.id"/>
              <span >{{ item.id }}</span>
            </div>
            <div class="songlist__songtitle">
              <span class="songlist__songtitle_text">
                {{ item.title }}
              </span>
            </div>
            <div class="songlist__author">
              {{ item.artist }}
            </div>
            <div class="songlist__time">
              <span class="songlist__time_text">
                {{ item.time }}
              </span>
            </div>
         </div>
        </li>
      </ul>
      
    </div>
    
  
</template>

<script>
import Icon from "@/components/Icon/index.vue";
import Playbar from "@/components/Playbar/index.vue";

export default {
    components: {
    Icon,
    Playbar,
  },
  props:{
    list:{
      type:Array,
      default:()=>[],
    }
  },
 methods: {
  handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.musiccontainer);
  },
  handleclick(){
    this.$emit("datamusick", this.list);
  },
    // 歌曲列表
    musicklist() {
      this.$bus.$emit("musicklist", this.list);
    },
    // 点击第几个歌曲id
    musickclick(e) {
      this.$bus.$emit("musicstart", e.target.dataset.name);
    },

    // 开始播放
    musickstart() {
      this.$bus.$emit("musickplay");
    },
  },
  mounted() {
    this.$refs.musiccontainer.addEventListener("scroll", this.handleScroll);
    this.$refs.musiccontainer.addEventListener("click", this.musickclick);
    this.$refs.musiccontainer.addEventListener("click", this.musicklist);
    this.$refs.musiccontainer.addEventListener("click", this.musickstart);
  },
  beforeDestroy() {
    this.$refs.musiccontainer.removeEventListener("scroll", this.handleScroll);
    this.$refs.musiccontainer.removeEventListener("click", this.musickclick);
    this.$refs.musiccontainer.removeEventListener("click", this.musicklist);
    this.$refs.musiccontainer.removeEventListener("click", this.musickstart);
  },
}
</script>


<style lang="less" scoped>

.mod_songlist{
  padding-bottom: 60px;
  font-size: 14px;
}

.songlist__header{
  height: 50px;
  line-height: 50px;
  background-color: #fbfbfd;
  background-color: rgba(0, 0, 0, .01);
  color: #999;
  
}

.songlist__header, .songlist__item{
  position: relative;
  padding-right: 95px;

}

.songlist__header_id, .songlist__id{
  width: 10%;
  float: left;
  color:black;
  width: 36px;
  padding: 0px 10px;
}

.songlist__header_author, .songlist__author{
  width: 20%;
  float: left;
  padding-left: 15px;
  width: 25.5%;
  box-sizing: border-box;
}
.songlist__header_time{
  width: 20%;
  float: left;
 
}
.songlist__header_time, .songlist__time {
    position: absolute;
    top: 0;
    right: 38px;
    width: 50px;
}

ul {
  list-style-type: none;
  
  // padding: 0 20px;
  // margin-top: 20px;
}

.synopsis-container {
  width: 1300px;
  height: 200px;
  position: relative;
  border-bottom:1px solid black ;

}

// li动态设置
.hongshui {
  width: 100%;
  color:black;
  opacity: 0.5;
  margin-top: 15px;
}
// li滑动效果
/* Float Shadow */
.hvr-float-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-float-shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: "";
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(
    center,
    ellipse,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 80%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 80%
  );
  /* W3C */
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}
.hvr-float-shadow:hover,
.hvr-float-shadow:focus,
.hvr-float-shadow:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}
.hvr-float-shadow:hover:before,
.hvr-float-shadow:focus:before,
.hvr-float-shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}


.songlist__list{
  // overflow: hidden;
  clear: both;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 300px);
  scrollbar-color: rgba(225, 94, 50, 0.381) transparent;
  scrollbar-width: thin;
}
.songlist__item{
  clear: both;
  overflow: hidden;
  
}

.songlist__songtitle, .songlist__header_title{
    float: left;
    position: relative;
    white-space: normal;
    width: 54%;
}

.songlist__author, .songlist__id, .songlist__songtitle, .songlist__time {
    line-height: 50px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.icon-container{
  float: right;
  cursor: pointer;
}
</style>