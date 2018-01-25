<template>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
export default {
  name: "Simplifys",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      gjSimplifys: Object
    };
  },
  methods: {
    _initSimplify: function(map) {
      var self = this;
      this.map.on("load", () => {
        /* Get Geofences */
        axios
          .request({
            url: process.env.HTTP_SERVER_URL + "geofences/simplifys",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.gjSimplifys = response.data;
            self._displaySimplifys(response.data);
          });
      });
    },
    _displaySimplifys: function(featureCollection) {
      this.map.addSource("scSimplifys", {
        type: "geojson",
        data: featureCollection
      });
      this.map.addLayer({
        id: "lyrSimplifys",
        type: "fill",
        source: "scSimplifys",
        layout: {},
        paint: {
          "fill-color": "#AE9B00",
          "fill-opacity": 0.8
        }
      });
    },
/*     _observerEvents: function() {
      var self = this;
      self.map.on("load", () => {
        self.map.on("click", "lyrSimplifys", function(event) {
          self.gjSimplifys.features.forEach(function(feature, i) {
            if (event.features[0].properties._id == feature.properties._id) {
              console.log('ak7',feature)
              eventBus.$emit("initSimplify", feature);//Iniciar el proceso de simplificacion
            }
          });
        });
      });
    }, */
    _updateSimplifys: function(featureCollection) {
      this.map.getSource("scSimplifys").setData(featureCollection);
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
      this._initSimplify();
      //this._observerEvents();
    }
  },
  mounted() {
    var self =this;
    //Actualiza el mapa cuando se crea una nueva geofence
    eventBus.$on("newSimplify", function(feature) {

      self.gjSimplifys.features.push(feature);
      self._updateSimplifys(self.gjSimplifys);
    });
  }
};
</script>

