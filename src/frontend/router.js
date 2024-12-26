import { createMemoryHistory, createRouter } from 'vue-router'

import Entry from './pages/Entry.vue'
import Castle from './pages/Castle.vue'
import Library from './pages/Library.vue'

const routes = [
  { path: '/', component: Entry },
  { path: '/castle', component: Castle },
  { path: '/library', component: Library },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router