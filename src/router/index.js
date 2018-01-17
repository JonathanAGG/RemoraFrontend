import Vue from 'vue'
import Router from 'vue-router'
import Zeus from '@/components/Zeus'
import Geofence from '@/components/Geofence'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Zeus',
      component: Zeus
    },
    {
      path: '/geofence',
      name: 'Geofence',
      component: Geofence
    },
    {
      path: '/simplify',
      name: 'Simplify',
      component: Geofence
    }
  ]
})
