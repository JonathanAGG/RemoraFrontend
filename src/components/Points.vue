<template>
</template>
<script>
import axios from "axios";
import eventBus from "../eventBus";
export default {
  name: "Points",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjPoints: Object,
      HTTP_SERVER_URL: process.env.HTTP_SERVER_URL
    };
  },
  methods: {
    _initPoints: function(map) {
      var self = this;
      this.map.on("load", () => {
        /* Get Points */
        axios
          .request({
            url: this.HTTP_SERVER_URL + "zeus/points",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.gjPoints = response.data;
            self._displayPoints(response.data);
            eventBus.$emit("initChart", response.data); //Envia los datos al componente chart para cargar el grafico
          });
      });
    },
    _displayPoints: function(featureCollection) {
      this.map.addSource("scPoints", { type: "geojson", data: this.gjPoints });
      this.map.addLayer({
        id: "lyrPoints",
        type: "symbol",
        source: "scPoints",
        layout: {
          "icon-image": "marker-15",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
          "icon-rotate": { type: "identity", property: "Head" }
        }
      });
    },
    _updatePoints: function(featureCollection) {
      this.map.getSource("scPoints").setData(featureCollection);
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
      this._initPoints();
    }
  },
  mounted() {
    var self = this;
    //RealTime
    eventBus.$on("sockNewPoint", function(point) {
      self.gjPoints.features.push(point);
      self._updatePoints(self.gjPoints);
    });
    //Evento de filtracion de datos
    eventBus.$on("filterData", function(data) {
      self._updatePoints(data.gjPoints);
    });
  }
};
</script>

