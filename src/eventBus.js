// const listeners = {};

// // 事件总线
// export default {
//   // 监听某一个事件
//   $on(eventName, handler) {
//     if (!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }
//     listeners[eventName].add(handler);
//   },
//   // 取消监听
//   $off(eventName, handler) {
//     if (!listeners[eventName]) {
//       return;
//     }
//     listeners[eventName].delete(handler);
//   },
//   // 触发事件
//   $emit(eventName, ...args) {
//     if (!listeners[eventName]) {
//       return;
//     }
//     for (const handler of listeners[eventName]) {
//       handler(...args);
//     }
//   },
// };
// :class="{
//     active: i === curIndex,

//   } "
import Vue from "vue";
/*
 * 事件名：handlelodin
 * 含义：点击登录按钮 弹出登录界面
 * 触发：
 * 参数：
 * -
 */
Vue.prototype.$bus = new Vue({});
