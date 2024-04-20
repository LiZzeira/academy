import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import StudentsForms from '@/views/StudentsForms.vue'
import StudentsTables from '@/views/StudentsTables.vue'
import UIElements from '@/views/UIElements.vue'
import PageLogin from '@/views/PageLogin.vue'
import DataModal from '@/views/DataModal.vue'
import DataCard from '@/views/DataCard.vue'
import DataBlank from '@/views/DataBlank.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: PageLogin,
    meta: { layout: 'empty' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/forms',
    name: 'Forms',
    component: StudentsForms
  },
  {
    path: '/cards',
    name: 'Cards',
    component: DataCard
  },
  {
    path: '/tables',
    name: 'Tables',
    component: StudentsTables
  },
  {
    path: '/ui-elements',
    name: 'UIElements',
    component: UIElements
  },
  {
    path: '/modal',
    name: 'Modal',
    component: DataModal
  },
  {
    path: '/blank',
    name: 'Blank',
    component: DataBlank
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
