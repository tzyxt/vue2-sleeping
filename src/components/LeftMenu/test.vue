<template>
  <div class="test-container">
    <LeftMenu />
    <Menu />
  </div>
</template>

<script>
import LeftMenu from '../LeftMenu/index.vue';
import Menu from '../Menu/index.vue';
import "@/styles/global.less";
export default {
    components:{
        LeftMenu,
        Menu,
    }
}
</script>

<style scoped >


.test-container {
  width: 180px;
  height: 100vh;
  border: 2px solid black;
  background: black;

}
</style>