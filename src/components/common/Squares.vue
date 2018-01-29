<template>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
export default {
  name: "Squares",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjSquares: {
        type: "FeatureCollection",
        features: []
      }
    };
  },
  methods: {
    _initSquares: function() {
      var self = this;

      /* Get Geofences */
      axios
        .request({
          url: process.env.HTTP_SERVER_URL + "geofences/squares",
          method: "get",
          responseType: "json",
          data: {},
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          let arrSquares = [];
          response.data.forEach(element => {
            element.squares.features.forEach(feature => {
              arrSquares.push(feature);
            });
          });
          self.gjSquares.features = arrSquares;
          self._displaySquares(self.gjSquares);
        });
    },
    _displaySquares: function(featureCollection) {
      var self = this;

      if (this.map.getSource("scSquares")) {
        this._updateSquares(featureCollection);
      } else {
        this.map.addSource("scSquares", {
          type: "geojson",
          data: featureCollection
        });
        this.map.addLayer({
          id: "lyrSquares",
          type: "fill",
          source: "scSquares",
          layout: {},
          paint: {
            "fill-color": "#C70A0A",
            "fill-opacity": 0.8
          }
        });
      }
    },
    _updateSquares: function(featureCollection) {
      this.map.getSource("scSquares").setData(featureCollection);
      
    }
  },
  watch: {
    objMap: function(objMap) {
      var self = this;
      this.map = objMap;
      this.map.on("load", () => {
        this._initSquares();
      });
    }
  },
  mounted() {
    var self = this;

    //Actualiza el mapa cuando se crea una nueva geofence
    eventBus.$on("sockNewSquares", function(featureCollection) {
      console.log("ddgg", featureCollection);
      self._initSquares();
    });
  }
};
</script>

