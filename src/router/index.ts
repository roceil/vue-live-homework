import { createRouter, createWebHistory } from "vue-router";
import Cookie from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ShopView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

// ====== 路由守衛 ======
router.beforeEach((to, from, next) => {
  const token = Cookie.get('hexToken')
  // 如果要前往的頁面是首頁，且已經登入，則導向商品頁面
  if (to.name === "admin-login" && token) {
    next({ name: "admin" });
  }
  // 如果要前往的頁面是 shop 但沒有 token，則導向首頁
  else if (to.name === "admin" && !token) {
    next({ name: "admin-login" });
  }
  // 其他情況則放行
  else {
    next();
  }
});

export default router;
