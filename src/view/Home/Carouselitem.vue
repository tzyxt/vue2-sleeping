<template>
  <div class="carousel-item-container" ref="carouselitemcontainer" @mouseenter="onMouseOver()" @mouseleave="onMouseOut()" :style="{width: screenWidth + 'px'}">
      <div class="carousel-item"  :style=" {
      width: allwidth
    }">
  
      <img :src="item.midImg" alt=""   class="carousel-item-img" v-for="item in imagedata" :key="item.id" :style="{width: screenWidth + 'px'}">
      </div>
    <div class="carousel-porter">
      <div class="carousel-letf" @click="prev()">
        <Icon type="left" />
      </div>
      <div class="carousel-right" @click="next()">
        <Icon type="rigth" />
      </div>
    </div>
    <div class="carousel-handoff"  ref="carouselhandoff">
      <div :class="{
          active: i === curIndex,

        } " class="carousel-switch" v-for="(item, i) in imagedata.slice(0 ,imagedata.length -1)" :key="item.id" @click="switchTo(i)">
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon/index.vue";
export default {
  props:{
    imagedata:{
      type:Array,
      default:()=>[],
    }
  },
    components:{
      Icon,
    },
    data(){
      return{
          timer:false,
          screenWidth: document.body.clientWidth, // 窗口宽度
          timerId:null, // 鼠标是否在图片上
          carouselitem:[],
          isPlaying:false, // 当前是否有动画在进行
          curIndex:0, //当前切换的第几张图片
          containerwidth: 0, // 整个容器的高度
        }
    },
    computed:{
      // 设置图片容器夸度能排在一行
    allwidth(){
    return this.imagedata.length + "00%";
    },
    },
    // 计算承载看到图片容器的宽度
    mounted() {
      window.onresize = () => {
          return (() => {
              window.screenWidth = document.body.clientWidth
              this.screenWidth = window.screenWidth
          })()
      }
    this.containerwidth = this.$refs.carouselitemcontainer.clientWidth;
    this.timerId = setInterval(this.next, 2000); // 是否开始自动播放
  },
  beforeDestroy(){
    clearInterval(this.timerId);
    this.timerId = null;
  },
    methods:{
  // 点击会切换到下一张图片
    next() {
      var newIndex = this.curIndex+1; // 下一张图片
      var dom = document.querySelector(".carousel-item"); // 获取到容器的dom元素 更方便操作
      // 当点击的超过最后一张图片时
      if(newIndex ===this.imagedata.length-1){
        // 没有动画切换设置第一个为活动
        if(!this.isPlaying){
          this.$refs.carouselhandoff.children[0].className= 'carousel-switch active'; // 设置 第一个为活动
        }
        setTimeout(()=>{
          dom.style.marginLeft = 0; // 切换到第一张图片
          dom.style.transition=NaN;// 取消动画过渡
          this.curIndex =0;
        },500)
        
    }
    // 调用
      this.moveTo(newIndex)
    
  },
  // 点击上一张图片
  prev(){
    var newIndex = this.curIndex -1; // 上一张图片
    var dom = document.querySelector(".carousel-item"); // 获取到容器的dom元素 更方便操作
    if(newIndex  === -1){
      dom.style.transition=NaN; // 取消动画过渡
      setTimeout(() => {
        var index = this.imagedata.length -2; //切换到最后二张图片
        dom.style.marginLeft = - index * this.containerwidth + 'px';
        this.curIndex = this.imagedata.length-2
        dom.style.transition = '500ms';
      },500);
    }
    this.moveTo(newIndex)
  },
  // 移动的第几张图片 和它的距离
    moveTo(newIndex) {
    var dom = document.querySelector(".carousel-item");
    if (this.isPlaying || newIndex === this.curIndex) {
      return; // 有动画进行 或 切换目标和当前一致，不做任何事情
    }
    // 判断是不是第一次点击了下一张图片
    if ( newIndex === -1){
    var maxindex = this.imagedata.length-1 // 最后一张
    dom.style.marginLeft = - maxindex * this.screenWidth + 'px'
    }else{
      var margin = -newIndex * this.screenWidth + 'px';
      dom.style.marginLeft =  margin;
      this.curIndex = newIndex;// 更改当前显示的图片索引
      dom.style.transition = '500ms';
    }
    // 关锁
    this.isPlaying =true;
    setTimeout(()=>{
      // 等动画进行完成后 开锁
    this.isPlaying =false;
    },500)
  },
  // 点击横线切换对应的图片
    switchTo(index){
      this.moveTo(index)
    },
    // 鼠标移入暂停循环
    onMouseOver(){
      clearInterval(this.timerId);
      this.timerId = null;
    },
    // 鼠标移出开始自动切换
    onMouseOut(){
      if(this.timerId){
      return;
    }
    this.timerId = setInterval(this.next, 2000);
    },
    },
    watch: {
    screenWidth(val) {
          this.screenWidth = val 
      }

}


}
</script>

<style lang="less" scoped>
.carousel-item-container{
  height: 28.2222222222vw;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  display: block;
}
.carousel-item{
  height: 100%;
  transition: 300ms;
}
.carousel-item-img{

  height: 100%;
  float: left;
  object-fit:cover;
}

.carousel-letf {
  left: 0;
}
.icon-container{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-right,.carousel-letf{
  height: 100%;
  width: 50px;
  background: rgba(0, 0,0, 0.5);
  position: absolute;
  top: 0;
  font-size: 30px;
  cursor: pointer;
  opacity: 0;
}
.carousel-right{
  right:0;
}
.carousel-letf:hover,.carousel-right:hover{
  opacity: 1;
}
.carousel-handoff{
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  caret-color: transparent;
}
.carousel-switch{
  height: 10px;
  width: 30px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  margin: 0 10px;
}
.carousel-switch.active{
  background: #ffa44f;
}
</style>