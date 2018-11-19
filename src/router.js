import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Chatroom from "./views/Chatroom.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "chatroom",
      component: Chatroom
    }
  ]
});
