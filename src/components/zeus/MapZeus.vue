<template>
  <div class="zeus">
      <div id="map"> 
        <zeus-control v-bind:objMap="map"></zeus-control>
      </div>
      <points v-bind:objMap="map"></points>
      <lines v-bind:objMap="map"></lines>
      <geofences v-bind:objMap="map"></geofences>
      <stats></stats>
      <alert-geofence></alert-geofence>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import Stats from "./Stats";
import AlertGeofence from "../common/AlertGeofence";
import ZeusControl from "./ZeusControl";
import Points from "../common/Points";
import Lines from "../common/Lines";
import Geofences from "../common/Geofences";

export default {
  name: "MapIndex",
  components: {
    Stats,
    AlertGeofence,
    Points,
    Lines,
    Geofences,
    ZeusControl
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
        style: "mapbox://styles/mapbox/light-v9",
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
