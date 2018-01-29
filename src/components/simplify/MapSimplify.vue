<template>
  <div class="zeus">
      <div id="map">
        <simplify-control v-bind:objMap="map"></simplify-control>
      </div>
  
      <squares v-bind:objMap="map"></squares>
      <geofences v-bind:objMap="map"></geofences>
      <simplifys v-bind:objMap="map"></simplifys>
      <simplify-process></simplify-process>
      <alerts></alerts>
  </div>
</template>

<script>
import eventBus from "../../eventBus";
import mapboxgl from "mapbox-gl";

import Alerts from "../common/Alerts";
import Geofences from "../common/Geofences";
import Simplifys from "../common/Simplifys";
import Squares from "../common/Squares";
import SimplifyProcess from "./SimplifyProcess";
import SimplifyControl from "./SimplifyControl";
export default {
  name: "MapGeofence",
  components: {
    Alerts,
    Geofences,
    Simplifys,
    Squares,
    SimplifyProcess,
    SimplifyControl
  },
  data() {
    return {
      map: Object,
      simplifyFeature: Object
    };
  },
  methods: {
    _loadMap: function() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamdyYW5hZG9zIiwiYSI6ImNqNWNzMjVnMjAxc2MzMm51Yjk2ZG9oY3YifQ.6XIiaaLKqPoSxluayRcsdg";

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v9",
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
