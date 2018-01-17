<template>
</template>
<script>
import axios from "axios";
import eventBus from "../eventBus";
export default {
  name: "Lines",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjLines: Object,
      HTTP_SERVER_URL: process.env.HTTP_SERVER_URL
    };
  },
  methods: {
    _initLines: function(map) {
      var self = this;
      this.map.on("load", () => {
        /* Get Lines */
        axios
          .request({
            url: this.HTTP_SERVER_URL + "zeus/lines",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.gjLines = response.data;
            self._displayLines(response.data);
          });
      });
    },
    _displayLines: function(featureCollection) {
      this.map.addSource("scLines", { type: "geojson", data: this.gjLines });
      this.map.addLayer({
        id: "lyrLines",
        type: "line",
        source: "scLines",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 2
        }
      });
    },
    _updateLines: function(featureCollection) {
      this.map.getSource("scLines").setData(featureCollection);
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
      this._initLines();
    }
  },
  mounted() {
    var self = this;
    //RealTime
    eventBus.$on("sockNewPoint", function(point) {
      self.gjLines.features.forEach(element => {
        if (element.properties._id == point.properties.ID) {
          element.geometry.coordinates.push(point.geometry.coordinates);
        }
      });
      self._updateLines(self.gjLines);
    });
    //Evento de filtracion de datos
    eventBus.$on("filterData", function(data) {
      self._updateLines(data.gjLines);
    });
  }
};
</script>

