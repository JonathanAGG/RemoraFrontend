import Vue from 'vue'
import Router from 'vue-router'
import Zeus from '@/components/Zeus'
import DashGeofence from '@/components/DashGeofence'

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
      name: 'DashGeofence',
      component: DashGeofence
    },
    {
      path: '/simplify',
      name: 'Simplify',
      component: DashGeofence
    }
  ]
})
