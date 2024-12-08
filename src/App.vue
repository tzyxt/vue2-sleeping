<template>
  <div class="app-container" >
  <Login v-if="loginchange" @close="handleclose" @enroll="hanldeenroll" ref="loginging"/>
    <Layout >
      <template #left>
        <div class="menu">
          <LeftMenu />
        </div>
      </template>
      <template #default>
        <TopAside />
        <Playbar />
        <router-view/>
      </template>
    </Layout>
    <Register v-if="enrollchange" @close="handleenrollclose" />

  </div>
  
</template>

<script>
import LeftMenu from './components/LeftMenu/index.vue';
import Layout from './components/Layout/index.vue';
import Login from './components/Login/index.vue';
import TopAside from "@/components/TopAside/index.vue";
import Playbar from "@/components/Playbar/index.vue";
import Register from "@/components/Register/index.vue"
export default {
components:{
  LeftMenu,
  Layout,
  Login,
  TopAside,
  Playbar,
  Register,
},

created() {
  this.$bus.$on("handlelodin", this.handleChange);
  // this.$bus.$on("mainmouseenter", this.handlemainmouseenter);
},
destroyed() {
  this.$bus.$off("handlelodin", this.handleChange);

},
data(){
  return {
    list:[],
    loginchange:false,
    enrollchange:false,
  }
},

methods:{
  // 显示登录界面
  handleChange(){
    this.loginchange =!this.loginchange;
  },
  // 关闭登录界面显示注册
  hanldeenroll(){
    this.handleclose()
    this.enrollchange = !this.enrollchange
  },
  // 关闭注册
  handleenrollclose(){
    this.enrollchange = false
  },
  // 关闭登录
  handleclose(){
    this.loginchange = false;
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
