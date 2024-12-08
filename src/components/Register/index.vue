<template>
    <div class="login-container">
      <div class="login-box" ref="loginbox">
        <div class="form">
          <div class="login-title">
            注册账号
          </div>
          <button class="close" type="button" @click="handleenrollclose">
            <Icon type="guanbi"/>
          </button>
          <div class="form-container">
            <div class="form-item" >
            <label>账号：</label>
            <el-input v-model="loginId" id="loginingid" placeholder="请输入账号" type="text" size="100px" @blur="handleblur('loginingid',loginId)"> </el-input>
            <p class="err" ref="errorr">
            </p>
            </div>
            <div class="form-item" >
            <label>名称：</label>
            <el-input v-model="loginName" id="loginnameid" placeholder="请输入名称" type="text" size="100px" @blur="handleblur('loginnameid',loginName)"> </el-input>
            <p class="err" >
              
            </p>
            </div>
          <div class="form-item">
            <label>密码：</label>
            <el-input placeholder="请输入密码" id="loginpwdid" @blur="handleblur('loginpwdid',loginPwd)" v-model="loginPwd" show-password ></el-input>
            <p class="err">
              
            </p>
          </div>
          <div class="form-item">
            <label>密码：</label>
            <el-input placeholder="请输在输入一次密码" id="twologinpwdid" @blur="handleblur('twologinpwdid',twologinPwd)" v-model="twologinPwd" show-password></el-input>
            <p class="err">
              
            </p>
          </div>
          </div>
          <div class="form-button" >
              <el-button type="success" round @click="handlesuccess">注册</el-button>
          </div>
        </div>
      </div>
    </div> 
  
  </template>
  
  <script>
  import Icon from '@/components/Icon/index.vue';

  export default {
    components:{
      Icon,
    },
    data(){
      return {
        loginId:"",
        loginPwd:"",
        loginName:"",
        twologinPwd:"",
        loginingidresult:false,
        loginnameidresult:false,
        loginpwdidresult:false,
        twologinpwdidresult:false,
      }
    },
    methods:{
      // 失去焦点 传递文本框id还文本
      handleblur(id,e){
        // 调用开始验证
        this.handleresult(id,e)
      },
      // 验证规则
      handleverify(container,value){
        // 没有输入值的验证
        if(!value && container ==="loginingid"){          
          return '请填写账号';
        }else if(!value && container === "loginnameid"){
          return "请填写名称";
        }else if(!value && container === "loginpwdid"){
          return "请填写密码";
        }
        // 账号占用验证
        const resp = "haha"
        if(resp === value && container ==="loginingid"){
          return "该账号已被占用,请重新选择一个账号名"
        }
        // 确实密码验证
        if(value != this.loginPwd && container === "twologinpwdid"){
          return "密码不一致";
        }else if(!value && container === "twologinpwdid"){
          return "请再一次填写密码";
        }
        
      },
      // 验证结果
      handleresult(container,value){
        // console.log(document.getElementById('twologinPwdid').parentNode.nextSibling)
        // 获取到input父级元素的兄弟元素 p元素
        var dom = document.getElementById(container).parentNode.nextSibling
        // 运行验证规则
        const err = this.handleverify(container,value)
        // 有错误false，相反正确true
        if(err){
          // 动态控制p元素显示错误消息，并设置他是否验证成功的真值
          dom.innerText=err;
          this[container + 'result'] = false;
        }else{
          dom.innerText='';
          this[container + 'result'] = true;
        }
      },
      handleenrollclose(){
        this.$emit("close");
      },
      handlesuccess(){
      const results = this.loginingidresult && this.loginnameidresult && this.loginpwdidresult && this.twologinpwdidresult
      if(!results){
        this.$showMessage({
          content:"注册失败",
          type: "error",
          container:this.$refs.loginbox,
        })
  
      }else{
      }
      
      },  
    }
  
  }
  </script>
  
  <style scoped lang="less">
  @import "~@/styles/var.less";
  /* 外表透明层 */
  .login-container {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
  }
  /* 登录盒子 */
  .login-box{
      position: fixed;
      width: 500px;
      height: 360px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      border-radius: 12px;
      /* mask-image: radial-gradient(white, black); */
      background: rgb(246, 248, 250);
  
  }
  /* 账号显示 */
  .login-title{
      font-size: 20px;
      font-weight: 500;
      color: #000;
      align-items: center;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
      caret-color: transparent;
  }
  /* 登录表单 */
  .form{
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 360px;
    width: 100%;
  }
  
  /* 设置文本框宽度 */
  .el-input{
    width: 200px;
  }
 
  // input距离
  .form-item{
    position: relative;
    margin-bottom: 20px;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    border: none;
    background: none;
  }
  .err{
    font-size: 12px;
    display: block;
    left: 50px;
    position: absolute;
    width: 200px;
    color: #cc3600;
    height: 0px;
    /* top: 27px; */
    /* left: 20px; */
    bottom: -13px;
    caret-color: transparent;
  }
  label{
    caret-color: transparent;
  }
  </style>