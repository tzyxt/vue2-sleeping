<template>
    <div class="test-container">
      <Menu />
    </div>
  </template>
  
  <script>
  import Menu from "./";
  import "@/styles/global.less";
  export default {
    components: {
      Menu,
    },
  };
  </script>
  
  <style>
  .test-container {
    width: 180px;
    height: 100%;
    border: 2px solid black;
    background: #000;
    margin: 0 auto;
  }
  </style>
  