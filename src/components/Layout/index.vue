<template>
    <div class="layout-container">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="main">
        <slot></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped lang="less">
  .layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    
    .left,
    .right {
      background: black;
      flex: 0 0 auto;
      overflow: hidden;
      z-index: 100;
      
    }
    .main {
      // background-image: linear-gradient(0deg, rgba(20, 20, 20, 0.00) 1%, rgba(20, 20, 20, 0.60) 99%);
      // background:#A7B4A7;
     
      flex: 1 1 auto;
      overflow: hidden;
    }
  }
  </style>
  