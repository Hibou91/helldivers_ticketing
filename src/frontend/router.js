import { createMemoryHistory, createRouter } from 'vue-router'

import Entry from './pages/Entry.vue'
import Castle from './pages/Castle.vue'
import Library from './pages/Library.vue'
import Salon from './pages/Salon.vue'
import Garden from './pages/Garden.vue'
import Options from './pages/Options.vue'
import Documentation from './pages/Documentation.vue'

const routes = [
  { path: '/', component: Entry },
  { path: '/castle', component: Castle },
  { path: '/library', component: Library },
  { path: '/salon', component: Salon },
  { path: '/garden', component: Garden },
  { path: '/options/:backto', component: Options },
  { path: '/documentation/:backto', component: Documentation },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router