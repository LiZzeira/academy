import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import StudentsForms from '@/views/StudentsForms.vue'
import PageLogin from '@/views/PageLogin.vue'
import store from '@/store'

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
    beforeEnter: async (_, __, next) => {
      const res = await store.getters.getIsAuthenticated
      if (!res) {
        return next({ path: '/login' })
      }
      next()
    }
  },
  {
    path: '/forms',
    name: 'Forms',
    component: StudentsForms,
    beforeEnter: async (_, __, next) => {
      const res = await store.getters.getIsAuthenticated
      if (!res) {
        return next({ path: '/login' })
      }
      next()
    }
  },
  {
    path: '/forms/:id',
    name: 'FormsId',
    component: StudentsForms,
    beforeEnter: async (_, __, next) => {
      const res = await store.getters.getIsAuthenticated
      if (!res) {
        return next({ path: '/login' })
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
