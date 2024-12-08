import * as userApi from "@/api/user";
export default {
    namespaced:true, 
    strict: true,
    state:{
        loading:false, // 是否在登录中
        user:null, // 用户的信息
    },
    mutations:{
        setLoding(state, payload){
            state.loading = payload;
        },
        setUser(state, payload){
            state.user = payload
        }
    },
    getters: {
        status(state) {
        if (state.loading) {
            return "loading";
        } else if (state.user) {
            return "login";
        } else {
            return "unlogin";
        }
        },
    },
    actions:{
        async whoAmI(ctx){
            ctx.commit("setLoding", true);
            const resp = await userApi.whoAmI();
            ctx.commit("setLoding", false);
            ctx.commit("setUser", resp);
        },
        async login(ctx, payload){
            ctx.commit("setLoding", true);
            const resp = await userApi.login(payload.loginId, payload.loginPwd);
            ctx.commit("setLoding", false);
            ctx.commit("setUser", resp);
            return resp;
        },
        async loginOut(ctx) {
            ctx.commit("setLoding", true);
            await userApi.loginOut();
            ctx.commit("setLoding", false);
            ctx.commit("setUser", null);
        },

    },
}