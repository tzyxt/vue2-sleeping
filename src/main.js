import"./mock";
import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less";
import "./styles/font.less";
import showMessage from "./utils/showMessage";
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./eventBus";
import vLoading from "./directives/loading";
import store from "./store"

Vue.prototype.$showMessage = showMessage;

Vue.use(ElementUI);
Vue.directive('loading', vLoading)

store.dispatch("loginUser/whoAmI")
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')

