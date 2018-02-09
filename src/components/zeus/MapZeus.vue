<template>
  <div class="zeus">
    <div><div id="map"> 
        <zeus-control v-bind:objMap="map"></zeus-control>
        <loader-map v-if="isLoadingMap || isLoadingPoints || isLoadingLines || isLoadingGeofences"></loader-map>
      </div>
    </div>
      
      <filter-devices v-bind:objMap="map"></filter-devices>
      <points v-bind:objMap="map"></points>
      <lines v-bind:objMap="map"></lines>
      <geofences v-bind:objMap="map"></geofences>
      <alert-geofence></alert-geofence>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

import eventBus from "../../eventBus";
import ZeusControl from "./ZeusControl";
import FilterDevices from "./FilterDevices";
import AlertGeofence from "../common/AlertGeofence";
import LoaderMap from "../common/LoaderMap";
import Points from "../common/Points";
import Lines from "../common/Lines";
import Geofences from "../common/Geofences";

export default {
  name: "MapIndex",
  components: {
    AlertGeofence,
    LoaderMap,
    Points,
    Lines,
    Geofences,
    ZeusControl,
    FilterDevices
  },
  data() {
    return {
      map: Object,
      isLoadingMap: true,
      isLoadingPoints: true,
      isLoadingLines:true,
      isLoadingGeofences:true
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

    var self = this;
    this._loadMap();

    //Captura si el mapa termino de cargar 
    this.map.on("load", () => {
      this.isLoadingMap = false;
    });

    //Captura si los puntos terminaron de cargar 
    eventBus.$on("loadedPoints", function() {
      self.isLoadingPoints = false
    });

    //Captura si las lineas terminaron de cargar 
    eventBus.$on("loadedLines", function() {
      self.isLoadingLines = false
    });

    //Captura si las geofences terminaron de cargar 
    eventBus.$on("loadedGeofences", function() {
      self.isLoadingGeofences = false
    });
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 93vh;
}
</style>
