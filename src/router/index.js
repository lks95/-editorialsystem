import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/praxissemester',
    name: 'Praxissemester',
    component: () => import('../views/Praxissemester.vue')
  },
  {
    path: '/auslandssemester',
    name: 'Auslandssemester',
    component: () => import('../views/Auslandssemester.vue')
  },
  {
    path: '/termine',
    name: 'Termine',
    component: () => import('../views/Termine.vue')
  },
  {
    path: '/projekte',
    name: 'Projekte',
    component: () => import('../views/Projekte.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/publikationen',
    name: 'Publikationen',
    component: () => import('../views/Publikationen.vue')
  }  
  
  //,
  //{
  //  path: '/about',
  //  name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
]

const router = new VueRouter({
  routes
})

export default router
