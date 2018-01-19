<template>
  <div class="zeus">
      <div id="map"> 
        <control-geofence v-bind:objMap="map"></control-geofence>
      </div>

      <geofences v-bind:objMap="map"></geofences>
      <import-geofence></import-geofence>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import ControlGeofence from "./ControlGeofence";
import Geofences from "../common/Geofences";
import ImportGeofence from "./ImportGeofence"
export default {
  name: "MapGeofence",
  components: {
    Geofences,
    ControlGeofence,
    ImportGeofence
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
        style: 'mapbox://styles/mapbox/streets-v9',
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
