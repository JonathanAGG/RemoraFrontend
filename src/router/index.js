import Vue from 'vue'
import Router from 'vue-router'
import MapZeus from '@/components/zeus/MapZeus'
import MapGeofence from '@/components/geofence/MapGeofence'
import MapSimplify from '@/components/simplify/MapSimplify'

import DeviceList from '@/components/devices/DeviceList'
import DeviceDetail from '@/components/devices/DeviceDetail'
import EditDevice from '@/components/devices/EditDevice'
import AddDevice from '@/components/devices/AddDevice'

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
      name: 'MapSimplify',
      component: MapSimplify
    },
    {
      path: '/devices',
      name: 'DeviceList',
      component: DeviceList
    },
    {
      path: '/devices/new',
      name: 'AddDevice',
      component: AddDevice
    },
    {
      path: '/devices/:id',
      name: 'DeviceDetail',
      component: DeviceDetail
    },
    {
      path: '/devices/:id/edit',
      name: 'EditDevice',
      component: EditDevice
    }
  ]
})
