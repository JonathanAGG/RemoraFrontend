<template>
  <div class="zeus">
      <div id="map">
        <simplify-control v-bind:objMap="map"></simplify-control>
        <loader-map v-if="isLoadingMap || isLoadingGeofences || isLoadingSimplifys || isLoadingSquares"></loader-map>
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

import LoaderMap from "../common/LoaderMap";
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
    SimplifyControl,
    LoaderMap
  },
  data() {
    return {
      map: Object,
      simplifyFeature: Object,
      isLoadingMap: true,
      isLoadingGeofences:true,
      isLoadingSimplifys:true,
      isLoadingSquares:true
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
      self.isLoadingMap = false;
    });

    //Captura si las geofences terminaron de cargar 
    eventBus.$on("loadedGeofences", function() {
      self.isLoadingGeofences = false
    });

    //Captura si las geofences simplificadas terminaron de cargar 
    eventBus.$on("loadedSimplifys", function() {
      self.isLoadingSimplifys = false
    });

    //Captura si los cuadros terminaron de cargar 
    eventBus.$on("loadedSquares", function() {
      self.isLoadingSquares = false
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
