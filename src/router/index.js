import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import getPortfolio from '@/modules/getPortfolio'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: "About"
      }
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
      meta: {
        title: "Portfolio"
      }
    },
    
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/PortfolioDetailView.vue'),
      meta: {
        dynamicTitle: true 
      }
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  document.title = `KW Portfolio | ${to.meta.title}`
  next()
}) */

router.beforeEach((to, from, next) => {
  if (to.meta.dynamicTitle) {
    const portfolioItem = getPortfolio()
      .portfolioItems.value
      .find(item => item.id == to.params.id)
      if(portfolioItem) {
        document.title = `Daniel Pincu | ${portfolioItem.title}`
      }
    }
    else {
      document.title = `Daniel Pincu | ${to.meta.title}`
    }
    next()
})

export default router
