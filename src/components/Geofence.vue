<template>
  <div class="geofence">
      {{message}}
      <div id="map"></div>
  </div>
</template>

<script>
export default {
  name : 'Geofence',
  data(){
      return{
          message: 'Demo de geofence'
      }
  },
  mounted: ()=>{
      alert('Mounted')
  }
}
</script>

