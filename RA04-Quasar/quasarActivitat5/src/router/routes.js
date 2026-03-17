const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'admin', name: 'admin', component: () => import('pages/AdminPage.vue'), meta: { requiresAuth: true } },
      { path: 'equips', name: 'equips', component: () => import('pages/EquipsPage.vue'), meta: { requiresAuth: true } },
      { path: 'crearEquip', name: 'crearEquip', component: () => import('pages/CrearEquipPage.vue'), meta: { requiresAuth: true } },
      { path: 'editarEquip', name: 'editarEquip', component: () => import('pages/EditarEquipPage.vue'), meta: { requiresAuth: true } }
    ]
  }
]

export default routes