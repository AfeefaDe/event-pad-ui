import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'
import ShowPad from '@/components/ShowPad'
import CreatePad from '@/components/CreatePad'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/pad/:id',
      name: 'show',
      component: ShowPad
    },
    {
      path: '/new',
      name: 'new',
      component: CreatePad
    }
  ]
})
