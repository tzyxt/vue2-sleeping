import Vue from 'vue';
import VueRouter from "vue-router";
import routes from './router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history'
}); 

router.beforeEach((to, from, next)=>{
    if (to.meta.auth) {
        const status = store.getters["loginUser/status"];
        if (status === "loading") {
          next({
            path: "/lodding",
            query: {
              returnurl: to.fullPath,
            },
          });
          return;
        } else if (status === "unlogin") {
          alert("你没有登录，请先登录");
          return;
        }
      }
      next();
}
)

export default router;




