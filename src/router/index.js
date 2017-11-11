import Vue from 'vue'
import Router from 'vue-router'
import ShowPad from '@/components/ShowPad'
import CreatePad from '@/components/CreatePad'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: CreatePad,
      meta: { navTitle: 'Create New Event Pad' }
    },
    {
      path: '/pad/:id',
      name: 'show',
      component: ShowPad,
      meta: { navTitle: 'Show Event Pad' }
    }
  ]
})
