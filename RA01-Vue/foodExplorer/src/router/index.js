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
      path: "/receptes",
      name: "receptes",
      component: () => import('@/views/Recipes.vue'),
    },
    {
      path: "/receptes/:id",
      name: "recipeDetail",
      component: () => import('@/views/RecipeDetail.vue')
    },
    {
      path: "/provide",
      name: "provide",
      component: () => import('@/views/Provide.vue')
    }
  ],
})

export default router