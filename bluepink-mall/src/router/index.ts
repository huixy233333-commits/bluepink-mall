import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingDemo from '../views/LandingDemo.vue'
import ShowcaseDemo from '../views/ShowcaseDemo.vue'
import DashboardDemo from '../views/DashboardDemo.vue'
import PricingDemo from '../views/PricingDemo.vue'
import TestimonialsDemo from '../views/TestimonialsDemo.vue'
import FaqDemo from '../views/FaqDemo.vue'
import ComponentsDemo from '../views/ComponentsDemo.vue'
import Map2D from '../views/Map2D.vue'
import Map3D from '../views/Map3D.vue'
import MapThree from '../views/MapThree.vue'
import SceneQueryDemo from '../views/SceneQueryDemo.vue'
import EChartsDemo from '../views/EChartsDemo.vue'
import EChartsConfig from '../views/EChartsConfig.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingDemo,
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: ShowcaseDemo,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardDemo,
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingDemo,
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: TestimonialsDemo,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqDemo,
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsDemo,
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: EChartsDemo,
    },
    {
      path: '/echarts-config',
      name: 'echarts-config',
      component: EChartsConfig,
    },
    {
      path: '/map-2d',
      name: 'map-2d',
      component: Map2D,
    },
    {
      path: '/map-3d',
      name: 'map-3d',
      component: Map3D,
    },
    {
      path: '/map-three',
      name: 'map-three',
      component: MapThree,
    },
    {
      path: '/map-3d-query',
      name: 'map-3d-query',
      component: SceneQueryDemo,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
