import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
// import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(auth.currentUser);
  // if (to.path === "/" && auth.currentUser) {
  //   next("/dashboard");
  //   return;
  // }
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === null
    ) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
