import Vue from 'vue'
import Router from 'vue-router'
import ShowPad from '@/components/ShowPad'
import CreatePad from '@/components/CreatePad'
import LandingPage from '@/components/LandingPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: LandingPage
    },
    {
      path: '/new',
      name: 'new',
      component: CreatePad
    },
    {
      path: '/treffen/:uri',
      name: 'show',
      component: ShowPad
    }
  ]
})
