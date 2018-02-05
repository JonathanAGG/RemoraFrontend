<template>
<div id="geofencesList">
<table class="table table-hover">
    <thead>
      <tr>
        <th>Geofences List</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="feature in gjGeofences.features">
        <td>{{feature.properties.description}}</td>
        <td> <a href="javascript:void(0)" @click="_flyToFeature(feature)">View</a> </td>
        <td> <a href="javascript:void(0)" @click="_preDelete(feature)">Delete</a> </td>
      </tr>
    </tbody>
  </table>
  <delete-geofence v-bind="{objMap:map, deleteGeofence}"></delete-geofence>

  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import DeleteGeofence from "./DeleteGeofence"
export default {
  name: "GeofencesList",
  props: ["objMap"],
  components:{DeleteGeofence},
  data() {
    return {
      map: Object,
      gjGeofences: Object,
      deleteGeofence: ''
    };
  },
  methods: {
    _flyToFeature: function(feature) {
      var self = this;
      //Fly to geofence
      setTimeout(() => {
        var bbox = turf.bbox(feature);

        self.map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 15, right: 5 }
        });
      }, 500);
    },
    _preDelete: function(feature) {
      var self = this;
      this.deleteGeofence = feature.properties;
      //Fly to geofence
      var bbox = turf.bbox(feature);
      self.map.fitBounds(bbox, {
        padding: { top: 10, bottom: 25, left: 15, right: 5 }
      });
      //Open confirm modal
        $("#confirmDeleteModal").modal("show");
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
    }
  },
  mounted() {
    var self = this;
    //Recibe los datos desde [GeofencesComponent] para cargar la lista
    eventBus.$on("initGeofenceList", function(featureCollection) {
      self.gjGeofences = featureCollection;
    });
  }
};
</script>
<style>
#geofencesList {
  margin: 2% 0% 2%;
  padding: 2%;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
}
</style>
