<template>
  <div class="zeus">
      <!-- MODAL -->    
       <div class="modal fade" id="simplifyModal" tabindex="-1" role="dialog" aria-labelledby="statsModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="statsModalLabel">Simplify</h4>
                </div>
                <div class="modal-body">
                    <div class="slidecontainer">
                        <input type="range" min="0" max="100" value="0" class="slider" id="toleranceRange">
                        <p>Value:{{percent}}%</p>
                        <p>Points:{{countPoints}}</p>
                    </div>  
                    <div id="simplifyMap"></div>
                                        
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="_saveSimplify()">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <alerts></alerts>  
  </div>
</template>

<script>
import eventBus from "../../eventBus";
import Geofences from "../common/Geofences";
import Alerts from "../common/Alerts";

import axios from "axios";
import mapboxgl from "mapbox-gl";
import visvalingam from "vis-why";

export default {
  name: "SimplifyProcces",
  components: {
    Geofences,
    Alerts
  },
  data() {
    return {
      map: Object,
      percent: 100,
      countPoints: 0,
      gjSimplify: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: []
        }
      },
      gjOriginal: {
        type: "FeatureCollection",
        features: []
      }
    };
  },
  props: ["simplifyFeature"],
  methods: {
    _loadMap: function() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamdyYW5hZG9zIiwiYSI6ImNqNWNzMjVnMjAxc2MzMm51Yjk2ZG9oY3YifQ.6XIiaaLKqPoSxluayRcsdg";

      let self = this;

      self.map = new mapboxgl.Map({
        container: "simplifyMap",
        style: "mapbox://styles/mapbox/dark-v9",
        center: [-84.07836513337293, 9.933419690622571],
        zoom: 4
      });

      self.map.on("load", () => {
        //Resize Map
        $("#simplifyModal").on("shown.bs.modal", function() {
          self.map.resize();
        });

        //Reset Simplify
        $("#simplifyModal").on("hidden.bs.modal", function() {
          var slider = document.getElementById("toleranceRange");
          slider.value = 0;
          self.percent = 100;
          self.map.setZoom(4);
        });

        //Load original geofence
        self.map.addSource("scOriginal", {
          type: "geojson",
          data: self.gjOriginal
        });
        self.map.addLayer({
          id: "lyrOriginal",
          type: "fill",
          source: "scOriginal",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.8
          }
        });

        //Load geofence
        self.map.addSource("scSimplify", {
          type: "geojson",
          data: self.gjOriginal
        });
        self.map.addLayer({
          id: "lyrSimplify",
          type: "fill",
          source: "scSimplify",
          layout: {},
          paint: {
            "fill-color": "#AE9B00",
            "fill-opacity": 0.8
          }
        });
      });
    },
    _openModal: function(feature) {
      let self = this;
      self.gjOriginal = feature;

      let featureLength = self.gjOriginal.geometry.coordinates[0].length;
      self.countPoints = featureLength;
      console.log('OModal')
      document
        .getElementById("toleranceRange")
        .setAttribute("max", featureLength);

      //Load data
      self.map.getSource("scOriginal").setData(self.gjOriginal);
      self.map.getSource("scSimplify").setData(self.gjOriginal);

      //Open modal
      $("#simplifyModal").modal("show");

      //Fly to geofence
      setTimeout(() => {
        var bbox = turf.bbox(feature);
        self.map.fitBounds(bbox, {
          padding: { top: 10, bottom: 25, left: 15, right: 5 }
        });
      }, 500);
    },
    _processingSimplification: function(sliderTolerance) {
      let self = this;
      let featureLength = self.gjOriginal.geometry.coordinates[0].length;

      let simplify = visvalingam(
        self.gjOriginal.geometry.coordinates[0],
        featureLength - sliderTolerance
      );

      if (simplify.length > 4) {
        self.gjSimplify.geometry.coordinates[0] = simplify;
        self.map.getSource("scSimplify").setData(self.gjSimplify);
        self.countPoints = self.gjSimplify.geometry.coordinates[0].length;
      }
      self.percent = Math.trunc(100 - sliderTolerance / featureLength * 100);
    },
    _saveSimplify: function() {
      var self =this;
      //Envia la geofence simplificada al server para almacenarla
      axios
        .put(process.env.HTTP_SERVER_URL + "geofences/"+this.gjOriginal.properties._id+"/simplifys", this.gjSimplify)
        .then(function(response) {
          $("#simplifyModal").modal("hide");
          eventBus.$emit("newSimplify", self.gjSimplify); //Actializa el mapa
          eventBus.$emit("successAlert", "Saved Simplify."); //Mostrar mensaje de exito 
        })
        .catch(function(error) {
          eventBus.$emit("dangerAlert", error); //Mostrar mensaje de error
          console.log("err", error);
        });
    }
  },
  watch: {
    simplifyFeature: function(simplify) {
      console.log("simplify", simplify);
    }
  },
  mounted() {
    var self = this;
    this._loadMap();

    //InitSimplify
    eventBus.$on("initSimplify", function(feature) {
      self._openModal(feature);
    });

    //Event Slider - processingSimplification
    var slider = document.getElementById("toleranceRange");
    slider.oninput = function() {
      self._processingSimplification(this.value);
    };
  }
};
</script>

<style>
#simplifyMap {
  width: 100%;
  height: 65vh;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}
</style>
