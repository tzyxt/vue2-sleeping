<template>
  <div class="scroll-bar">
    <nav class="menu-container" >
    <router-link  :exact="item.exact" :to="{ name: item.name}" v-for="item in items" :key="item.link"  active-class="selected"
    exact-active-class="">
    <div class="text">
      <span>{{item.title}}</span>
    </div>
      <div class="icon">
        <Icon :type="item.icon"></Icon>
      </div>
    </router-link>
  </nav>
  </div>
  
</template>

<script>
import Icon from '../Icon/index.vue'
export default {
    components:{
        Icon,
    },
    data(){
        return {
            items:[
                {
                    name:'Home',
                    title:'首页',
                    icon:'home',
                    exact: true,  
                },
                {
                    name:"Video",
                    title:'视频专区',
                    icon:'video',
                    exact: false,   
                },
                {
                    name:'Ear',
                    title:'采耳',
                    icon:'sleep',
                    exact: true,  
                },
                {
                    name:"Asmr",
                    title:'触发音',
                    icon:'asmr',
                    exact: true,  
                },
                
                {
                    name:"Hong",
                    title:'哄睡',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Plot",
                    title:'剧情',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Silent",
                    title:'无人声助眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Chew",
                    title:'咀嚼音',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Aloeveragel",
                    title:'芦荟胶',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Scavenging",
                    title:'耳朵吹气',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Loly",
                    title:'萝莉音',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Double",
                    title:'双人',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Heartbeat",
                    title:'心跳声',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },
                {
                    name:"Hypnosis",
                    title:'催眠',
                    icon:'ufo',
                    exact: true,  
                },

            ]
        }
    },
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.scroll-bar {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 120px);
    direction: rtl;
    scrollbar-color: rgba(255, 255, 255, .4) transparent;
    scrollbar-width: thin;
}
.menu-container {
  overflow-y: auto;
  overflow-x: hidden;
  direction: rtl;
  color: @gray;
  // margin: 24px 0;
  a {
    &.selected {
      color:@Selected !important;
      background: darken(@words, 3%);
    }
    width: 160px;
    height: 48px;
    border-radius: 9px;
    font-size: 16px;
    line-height: 32px;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .icon {
      width: 24px;
    }

    &:hover {
      color: #fff;
    }
  }
  .text {
    margin-left: 15px;
  }
}
</style>