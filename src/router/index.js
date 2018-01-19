import Vue from 'vue'
import Router from 'vue-router'
import MapZeus from '@/components/zeus/MapZeus'
import MapGeofence from '@/components/geofence/MapGeofence'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapZeus',
      component: MapZeus
    },
    {
      path: '/geofence',
      name: 'MapGeofence',
      component: MapGeofence
    },
    {
      path: '/simplify',
      name: 'Simplify',
      component: MapGeofence
    }
  ]
})
