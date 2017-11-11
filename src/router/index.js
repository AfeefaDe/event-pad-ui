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
      component: MainView,
      meta: { navTitle: 'Event Pad' }
    },
    {
      path: '/pad/:id',
      name: 'show',
      component: ShowPad,
      meta: { navTitle: 'Show Event Pad' }
    },
    {
      path: '/new',
      name: 'new',
      component: CreatePad,
      meta: { navTitle: 'Create new Event Pad' }
    }
  ]
})
