import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: 'A freelance web developer',
        description: `A 20y/o freelance fullstack web developer from Italy`
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

    document.title = `Emiliano Maccaferri — ${to.meta.title as string}`;
    next();

})

export default router
