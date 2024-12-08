<template>
  <div class="login-container">
    <div class="login-box" ref="loginbox">
      <div class="form">
        <div class="login-title">
          账号登录
        </div>
        <button class="close" type="button" @click="handleclick">
          <Icon type="guanbi"/>
        </button>
        <div class="login-desc">
          请输入您的账号和密码
        </div>
        <div class="form-container">
          <div class="form-item" >
          <label>账号：</label>
          <el-input v-model="loginId" placeholder="手机号或邮箱" type="text" size="100px" > </el-input>
          <p class="err" >
              
            </p>
        </div>
        <div class="form-item">
          <label>密码：</label>
          <el-input placeholder="请输入密码" v-model="loginPwd" show-password></el-input>
          <p class="err" >
              
            </p>
        </div>
        </div>
        <!-- <div class="form-Code">
          <label>验证码：</label>
          <el-input placeholder="请输入密码" v-model="loginPwd" show-password></el-input>
        </div> -->
        <div class="form-button" >
          <el-button type="success" round @click="submit">登录</el-button>
        
            <el-button type="success" round @click="openNewTab">注册</el-button>
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
    }
  },
  methods:{
    async submit(){
      const resp = await this.$store.dispatch("loginUser/login",{
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      })
      if (resp) {
        this.handleclick()
      } else {
        this.$showMessage({
          content:"账号或密码错误",
          type: "error",
          container:this.$refs.loginbox,
        })
      }
      
  },
  handleclick(){
    this.$emit("close");
  },
  openNewTab(){
    this.$emit("enroll")
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
/* 请输入设置 */
.login-desc{
    color: @gray;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 24px;
}
// input距离
.form-item{
  margin-bottom: 20px;
  position: relative;
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
</style>