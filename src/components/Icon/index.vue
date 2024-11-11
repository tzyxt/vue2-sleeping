<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
// iconfont 图标库
const classMap ={
  home: "icon-roomline",
  asmr: "icon-asmr",
  sleep: "icon-shuimianmoshi",
  video: "icon-shipin",
  audio:"icon-yinpin",
  search:"icon-sousuo",
  game:"icon-youxi",
  guanbi:"icon-guanbi",
  kongtai:"icon-kongtai-qita",
  ufo:"icon-ufo",
  start:"icon-bofang1",
  next:"icon-24gf-nextCircle",
  last:"icon-forback",
  stop:"icon-bofang",
  success: "icon-icon-zhengque",
  error: "icon-icon_cuowu",
  info: "icon-news",
  warn: "icon-Icon_jinggao",
  left:"icon-left",
  leftactive:"icon-bg-left",
  rigth:"icon-right",
  rightactive:"icon-bg-right",

}
export const types = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed:{
    fontClass(){
      return classMap[this.type];

    }
  }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4650136_dgh1jz2oeh.css";
.iconfont{
  font-size: inherit;
}
</style>

