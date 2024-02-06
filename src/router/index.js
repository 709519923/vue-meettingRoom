// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
import book from "../components/book.vue";
import queryList from "../components/queryList.vue";
Vue.use(VueRouter);

// 定义路由
const routes = [
  {
    path: "/",
    redirect: "/book",
  },
  {
    path: "/admin",
    component: queryList, // 你的首页组件路径
  },
  {
    path: "/book",
    component: book, // 你的关于页面组件路径
  },
  // 添加其他路由...
];

// 创建路由实例
const router = new VueRouter({
  routes,
});

// 导出路由实例
export default router;
