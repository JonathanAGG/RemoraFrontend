<template>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
export default {
  name: "Geofences",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjGeofences: Object,
      HTTP_SERVER_URL: process.env.HTTP_SERVER_URL
    };
  },
  methods: {
    _initGeofences: function(map) {
      var self = this;
      this.map.on("load", () => {
        /* Get Geofences */
        axios
          .request({
            url: this.HTTP_SERVER_URL + "geofences",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.gjGeofences = response.data;
            self._displayGeofences(response.data);
          });
      });
    },
    _displayGeofences: function(featureCollection) {
      this.map.addSource("scGeofences", {
        type: "geojson",
        data: this.gjGeofences
      });
      this.map.addLayer({
        id: "lyrGeofences",
        type: "fill",
        source: "scGeofences",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8
        }
      });

      if (
        this.map.getLayer("lyrSquares") &&
        this.map.getLayer("lyrSimplifys")
      ) {
        this.map.moveLayer("lyrSimplifys", "lyrSquares");
        this.map.moveLayer("lyrGeofences", "lyrSimplifys");
      }
      if (this.map.getLayer("lyrSimplifys")) {
        this.map.moveLayer("lyrGeofences", "lyrSimplifys");
      }
    },
    _observerEvents: function() {
      var self = this;
      self.map.on("load", () => {
        self.map.on("click", "lyrGeofences", function(event) {
          self.gjGeofences.features.forEach(function(feature, i) {
            if (event.features[0].properties._id == feature.properties._id) {
              eventBus.$emit("initSimplify", feature); //Iniciar el proceso de simplificacion
            }
          });
        });
      });
    },
    _updateGeofences: function(featureCollection) {
      this.map.getSource("scGeofences").setData(featureCollection);
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
      this._initGeofences();
      this._observerEvents();
    }
  },
  mounted() {
    var self = this;
    //Actualiza el mapa cuando se crea una nueva geofence
    eventBus.$on("newGeofence", function(featureCollection) {
      featureCollection.features.forEach(feature => {
        self.gjGeofences.features.push(feature);
      });
      self._updateGeofences(self.gjGeofences);
    });
  }
};
</script>

