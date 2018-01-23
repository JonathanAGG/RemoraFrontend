<template>
  <div class="zeus">
      <div class="alert alert-success" v-show="isSuccess">
          <strong>Success!</strong> {{messageAlert}}
      </div>
      <div class="alert alert-danger" v-show="isDanger">
          <strong>Error!</strong> {{messageAlert}}
      </div>
      <div id="map"> 
        <geofence-control v-bind:objMap="map"></geofence-control>
      </div>

      <geofences v-bind:objMap="map"></geofences>
      <import-geofence></import-geofence>

  </div>
</template>

<script>
import eventBus from "../../eventBus";
import mapboxgl from "mapbox-gl";

import GeofenceControl from "./GeofenceControl";
import Geofences from "../common/Geofences";
import ImportGeofence from "./ImportGeofence";

export default {
  name: "MapGeofence",
  components: {
    Geofences,
    GeofenceControl,
    ImportGeofence
  },
  data() {
    return {
      map: Object,
      isSuccess: false,
      isDanger: false,
      messageAlert: ""
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
    let self = this;
    this._loadMap();

    eventBus.$on("gefenceSuccessAlert", function(message) {
      self.messageAlert = message;
      self.isSuccess = true;
      setTimeout(() => {
        self.messageAlert = "";
        self.isSuccess = false;
      }, 3000);
    });

    eventBus.$on("gefenceDangerAlert", function(message) {
      self.messageAlert = message;
      self.isDanger = true;
      setTimeout(() => {
        self.messageAlert = "";
        self.isDanger = false;
      }, 3000);
    });
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 93vh;
}

.alert {
  margin-bottom: 0px;
}
</style>
