const AuthRoutes = {
  path: '/',
  component: () => import('@/layouts/blank.vue'),
  meta: {
    requiresAuth: false,
  },
  redirect: { name: 'dashboard' },
  children: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/login.vue'),
      meta: {
        title: 'Login',
        redirectIfAuthenticated: true,
      },
    },
  ],
}

export default AuthRoutes
