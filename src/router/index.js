import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './utils'
import routes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        const token = localStorage.getItem('accessToken')
        if (token){
          return { name : 'brand'}
        }
        
        return { name: 'login' }
      }
    },
    ...setupLayouts(routes),

  ],
})


router.beforeEach((to,from,next) => {
  const isLoggedIn = isUserLoggedIn()

  if (isLoggedIn){
    next()
  }else{
    if (to.name === 'login') {
      next()
    }else{
      next({ path: '/login'})
    }
  }
})


export default router
