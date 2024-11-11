<template>
    <div class="topaside-container" >
        <div class="list-container" ref="listcontainer">
            <a>
                <Avatar src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0807%2Fc863485bj00shtw5m001rd200u000u0g003i003i.jpg&thumbnail=660x2147483647&quality=80&type=jpg" :size="50" ></Avatar>
            </a>
            <div class="login">
                <div class="logining" ref="loginingcontainer">
                    立即登录
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../Avatar/index.vue";

export default {
components:{
    Avatar,
},
data(){
    return {
        loginchange:true,
    }
},
beforeDestroy() {
    this.$refs.loginingcontainer.removeEventListener("click", this.handclick);


},
mounted(){
    this.$refs.loginingcontainer.addEventListener("click", this.handclick);


},
methods:{
    handclick(){
        console.log("点击了");
        this.$bus.$emit("handlelodin", this.$refs.loginingcontainer);
    },
}
}
</script>

<style scoped lang="less">
.topaside-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 84px;
    min-width: 750px;
    z-index: 99;
    display: flex;
    background-image: linear-gradient(0deg, rgba(20, 20, 20, 0.00) 1%, rgba(20, 20, 20, 0.60) 99%);
    
    
}
.list-container{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40px;
    cursor: pointer;
    

}
.list-container:hover{
   .login{
    transform: scale(1);
   }

}
.logining{
    height: 42px;
    line-height: 42px;
    background: #FF6022;
    text-align:center;
    border-radius: 30px;
    font-weight: 500;
    font-size: 16px;

}
.login{
    position: absolute;
    top: 62px;
    right: -20px;
    padding: 20px 16px 19px;
    width: 150px;
    background: #000;
    border-radius: 16px;
    text-align: center;
    cursor: pointer;
    color: #fff; 
    transform: scale(0);
    /* transform-origin:center center; */
    transition: all 0.5s;
}
.login::after{
    content: "";
        position: absolute;
        transform: translateX(-50%) rotate(45deg);
        width: 8px;
        height: 8px;
        background:black;
        top: -4px;
        right: 20%;
}

</style>