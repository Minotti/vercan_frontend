const AuthenticatedRoutes = {
  path: '/',
  meta: {
    requiresAuth: true,
  },
  redirect: '/dashboard',
  component: () => import('@/layouts/default.vue'),
  children: [
    {
      name: 'dashboard',
      path: 'dashboard',
      meta: {
        headerTitle: 'Dashboard',
      },
      component: () => import('@/pages/dashboard.vue'),
    },
    {
      path: 'fornecedores',
      component: () => import('@/pages/suppliers/Index.vue'),
      children: [
        {
          name: 'suppliers',
          path: '',
          component: () => import('@/pages/suppliers/Suppliers.vue'),
        },
        {
          name: 'supplier.read',
          path: ':id/ver',
          component: () => import('@/pages/suppliers/Read.vue'),
        },
        {
          name: 'supplier.edit',
          path: ':id/editar',
          component: () => import('@/pages/suppliers/Edit.vue'),
        },
        {
          name: 'supplier.create',
          path: 'novo',
          component: () => import('@/pages/suppliers/Create.vue'),
        },
      ],
    },
  ],
}

export default AuthenticatedRoutes
