<template>

  <div class="app-container">
  <Login v-if="loginchange" @close="handleclose"/>
    <Layout >
      <template #left>
        <div class="menu">
          <LeftMenu />
        </div>
      </template>
      <template #default>
        <TopAside />
        <Playbar :listmusick="list"/>
        <router-view @songlist="songmusick"/>
      </template>
    </Layout>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu/index.vue';
import Layout from './components/Layout/index.vue';
import Login from './components/Login/index.vue';
import TopAside from "@/components/TopAside/index.vue";
import Playbar from "@/components/Playbar/index.vue";
export default {
components:{
  LeftMenu,
  Layout,
  Login,
  TopAside,
  Playbar,
},

created() {
  this.$bus.$on("handlelodin", this.handleChange);
  this.$bus.$on("mainmouseenter", this.handlemainmouseenter);
},
destroyed() {
  this.$bus.$off("handlelodin", this.handleChange);

},
data(){
  return {
    list:[],
    loginchange:false,
  }
},

methods:{
  songmusick(e){
    this.list = e;
  },
  handleChange(){
    console.log(111)
    this.loginchange =!this.loginchange;
  },
  handleclose(){
    this.loginchange = false;
  },
  handlemainmouseenter(){
  console.log(2222)
  },
}
}
</script>

<style scoped lang="less">
@import url('./styles/global.less');
@import url('./styles/var.less');
.menu{
  width: 180px;
  height: 100vh;
}
</style>
