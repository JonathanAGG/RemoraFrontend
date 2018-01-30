<template>
  <div class="zeus">
      
      <div id="map"> 
        <geofence-control v-bind:objMap="map"></geofence-control>
      </div>
      <geofences v-bind:objMap="map"></geofences>
      <geofence-list v-bind:objMap="map"></geofence-list>
      <import-geofence></import-geofence>
      <alerts></alerts>
  </div>
</template>

<script>
import eventBus from "../../eventBus";
import mapboxgl from "mapbox-gl";

import Alerts from "../common/Alerts";
import Geofences from "../common/Geofences";
import ImportGeofence from "./ImportGeofence";
import GeofenceControl from "./GeofenceControl";
import GeofenceList from "./GeofenceList";
export default {
  name: "MapGeofence",
  components: {
    Alerts,
    Geofences,
    GeofenceControl,
    ImportGeofence,
    GeofenceList
  },
  data() {
    return {
      map: Object
    };
  },
  methods: {
    _loadMap: function() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamdyYW5hZG9zIiwiYSI6ImNqNWNzMjVnMjAxc2MzMm51Yjk2ZG9oY3YifQ.6XIiaaLKqPoSxluayRcsdg";

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [-84.07836513337293, 9.933419690622571],
        zoom: 6
      });
    }
  },
  mounted() {
    this._loadMap();
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 93vh;
}
</style>
