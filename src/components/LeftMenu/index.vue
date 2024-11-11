<template>
  <div class="left-menu-container">
    <a>
      <div class="svg-container">
        <div class="img-container">
          <img src="@/assets/logo.svg">   
        </div>
        <span>甜甜助眠</span>
      </div>
    </a>
    <Menu />
  </div>
</template>

<script>
import Menu from '../Menu/index.vue';
export default {
  components:{
    Menu,
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/font.less";

.left-menu-container{
  width: 180px;
  height: 84px;
  display: block;

}
a{
    display: inline-block;
    width: 158px;
    height: 40px;
    margin-left: 24px;
    margin-top: 26px;
    position: relative;
    cursor: pointer;
}
.svg-container{
      width: 126px;
      height: 32px;
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      .img-container{
        width: 32px;
        
      }
  }

span{
  font-family: "阿里妈妈刀隶体 Regular";
  font-size: 22px;
  color: #e89abe;
  padding-left: 3px;
}
</style>