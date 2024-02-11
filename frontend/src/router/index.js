import { createRouter, createWebHistory } from 'vue-router'
import SelectorView from '../views/SelectorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SelectorView
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue')
    }
  ] 
})

export default router
