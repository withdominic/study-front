import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Home from "@/viewer/Home";
import Login from "@/viewer/Login";
import Register from "@/viewer/Register";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("@/viewer/Profile")
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("@/viewer/BoardAdmin")
    },
    {
      path: "/mod",
      name: "moderator",
      // lazy-loaded
      component: () => import("@/viewer/BoardModerator")
    },
    {
      path: "/upload",
      name: "upload",
      // lazy-loaded
      component: () => import("@/viewer/ExcelUpload")
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: () => import("@/viewer/BoardUser")
    }
  ]
});
