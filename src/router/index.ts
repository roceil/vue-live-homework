import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/ShopView.vue"),
    },
  ],
});

// ====== 路由守衛 ======
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);

router.beforeEach((to, from, next) => {
  if (to.name === "home" && token) {
    next({ name: "shop" });
  } else {
    next();
  }
});

export default router;
