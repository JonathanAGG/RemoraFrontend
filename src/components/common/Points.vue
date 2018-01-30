<template>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import mapboxgl from "mapbox-gl";
export default {
  name: "Points",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjPoints: Object
    };
  },
  methods: {
    _initPoints: function(map) {
      var self = this;
      this.map.on("load", () => {
        /* Get Points */
        axios
          .request({
            url: process.env.HTTP_SERVER_URL + "zeus/points",
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
      this._createPopUps()
    },
    _createPopUps: function() {

      var self = this;

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

       self.map.on("mouseenter", "lyrPoints", function(e) {

        var dRemora = e.features[0].properties.dateRemora,
          dServer = e.features[0].properties.dateServer;

        self.map.getCanvas().style.cursor = "pointer";

        popup
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(
            "<strong>Date Remora: </strong>" +
              dRemora.slice(8, 10) +
              "/" +
              dRemora.slice(5, 7) +
              "/" +
              dRemora.slice(0, 4) +
              " - " +
              dRemora.slice(11, 16) +
              "<br><strong>Date Server: </strong>" +
              dServer.slice(8, 10) +
              "/" +
              dServer.slice(5, 7) +
              "/" +
              dServer.slice(0, 4) +
              " - " +
              dServer.slice(11, 16) +
              "<br><strong>GPS View: </strong>" +
              e.features[0].properties.GPSView +
              "<br><strong>GPS Used: </strong>" +
              e.features[0].properties.GNSS_used +
              "<br><strong>Motor: </strong>" +
              e.features[0].properties.Motor +
              "<br><strong>Qt: </strong>" +
              e.features[0].properties.QuadTree +
              "<br><strong>Lat: </strong>" +
              e.features[0].geometry.coordinates[1].toFixed(6) +
              "<br><strong>Lon: </strong>" +
              e.features[0].geometry.coordinates[0].toFixed(6) +
              "<br><strong>Δ Time: </strong>" +
              e.features[0].properties.deltaTime +
              " min" +
              "<br><strong>Δ Distance: </strong>" +
              e.features[0].properties.deltaDistance.toFixed(3) +
              " km"
          )
          .addTo(self.map);
      });

      self.map.on("mouseleave", "lyrPoints", function() {
        self.map.getCanvas().style.cursor = "";
        popup.remove();
      });
    },
    _updatePoints: function(featureCollection) {
      this.map.getSource("scPoints").setData(featureCollection);
      this._createPopUps()
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

