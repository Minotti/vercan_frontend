import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedRoutes from '@/router/AuthenticatedRoutes'
import AuthRoutes from '@/router/AuthRoutes'
import { useAuthStore } from '@/stores/auth/authStore'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/pages/[...all].vue'),
    },
    AuthenticatedRoutes,
    AuthRoutes,
  ],
})

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authRequired && !user.value) {
      authStore.returnUrl = to.fullPath

      return next({ name: 'login' })
    }
    else { next() }
  }
  else if (to.matched.some(record => record.meta.redirectIfAuthenticated)) {
    if (authStore.user)
      return next({ name: 'dashboard' })
    else next()
  }
  else {
    next()
  }
})
