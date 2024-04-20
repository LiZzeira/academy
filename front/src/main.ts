import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import '@/style.scss'

import DashboardLayout from '@/components/DashboardLayout.vue'
import EmptyLayout from '@/components/EmptyLayout.vue'

createApp(App)
  .use(store)
  .component('DefaultLayout', DashboardLayout)
  .component('EmptyLayout', EmptyLayout)
  .use(router)
  .use(vuetify)
  .mount('#app')
