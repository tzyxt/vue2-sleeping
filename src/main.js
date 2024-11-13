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




Vue.prototype.$showMessage = showMessage;

// Vue.prototype.$animate = animate;
Vue.use(ElementUI);
Vue.directive('loading', vLoading)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

