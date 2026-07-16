import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import { updateSeo } from '@/services/seo'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Mobiliario a medida' },
  },
  {
    path: '/nosotros',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Nosotros' },
  },
  {
    path: '/proyectos',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Proyectos' },
  },
  {
    path: '/proyectos/:category',
    name: 'gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { title: 'Galería' },
  },
  {
    path: '/contacto',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contacto' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
})

router.afterEach((to) => {
  updateSeo(to)
})

export default router
