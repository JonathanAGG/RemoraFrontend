<template>
<div style="margin-top:2%">
<table class="table table-hover">
    <thead>
      <tr>
        <th>Devices List</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="feature in gjPoints.features">
        <td>{{feature.properties.description}}</td>
        <td> <a href="javascript:void(0)" @click="_flyToFeature(feature)"><span class="glyphicon glyphicon-eye-open"></span></a> </td>
        <!-- <td> <a href="javascript:void(0)" @click="_preDelete(feature)"><span class="glyphicon glyphicon-trash"></span></a> </td> -->
      </tr>
    </tbody>
  </table>


  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";

export default {
  name: "DevicesList",
  props: ["objMap"],
  components:{},
  data() {
    return {
      map: Object,
      gjPoints: Object,
      selectedFeature: {
        type: "feature",
        geometry: {},
        properties: {
          _id: "",
          description: ""
        }
      }
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
    eventBus.$on("initDevicesList", function(featureCollection) {
        console.log('initD', featureCollection)
      self.gjPoints = featureCollection;
    });
  }
};
</script>