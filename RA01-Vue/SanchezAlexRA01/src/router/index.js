import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('@/views/Home.vue')
    },
    {
      path: "/foods",
      name: "foods",
      component: () => import('@/views/FoodHome.vue')
    },
    {
      path: "/training",
      name: "training",
      component: () => import('@/views/TrainingPanel.vue')
    }
  ],
})

export default router
