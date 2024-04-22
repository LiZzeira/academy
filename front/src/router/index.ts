import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import StudentsForms from '@/views/StudentsForms.vue'
import PageLogin from '@/views/PageLogin.vue'
import store from '@/store'

async function requireAuth(
  _: RouteLocationNormalized,
  __: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isAuthenticated = await store.getters.getIsAuthenticated
  if (!isAuthenticated) {
    return next({ path: '/login' })
  }
  next()
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: PageLogin,
    meta: { layout: 'empty' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    beforeEnter: requireAuth
  },
  {
    path: '/forms',
    name: 'Forms',
    component: StudentsForms,
    beforeEnter: requireAuth,
    children: [
      {
        path: ':id',
        name: 'FormsId',
        component: StudentsForms,
        beforeEnter: requireAuth
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
