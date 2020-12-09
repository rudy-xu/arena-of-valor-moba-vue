import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemEdit from "../views/ItemEdit.vue";
import ItemList from "../views/ItemList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mian',
    component: Main,
    children: [
      //category
      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/edit/:id", component: CategoryEdit, props: true },
      { path: "/categories/list", component: CategoryList },
      
      //items
      { path: "/items/create", component: ItemEdit },
      { path: "/items/edit/:id", component: ItemEdit, props: true },
      { path: "/items/list", component: ItemList },

      //heroes
      { path: "/heroes/create", component: HeroEdit },
      { path: "/heroes/edit/:id", component: HeroEdit, props: true },
      { path: "/heroes/list", component: HeroList }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
