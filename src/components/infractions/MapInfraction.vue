<template>
  <div class="zeus">
      <!-- MODAL -->    
       <div class="modal fade" id="infractionModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">Infraction</h4>
                </div>
                <div class="modal-body">

                    <div id="infractionMap"></div>
                           
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div> 
    <geofences v-bind:objMap="map"></geofences>
  </div>
</template>

<script>
import eventBus from "../../eventBus";
import Geofences from "../common/Geofences";

import axios from "axios";
import mapboxgl from "mapbox-gl";
import visvalingam from "vis-why";

export default {
  name: "SimplifyProcces",
  components: {
    Geofences
  },
  data() {
    return {
      map: Object,
      percent: 100,
      countPoints: 0,
      gjPoints: {
        type: "FeatureCollection",
        features: []
      },
      gjLines: {
        type: "FeatureCollection",
        features: []
      }
    };
  },
  methods: {
    _loadMap: function() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiamdyYW5hZG9zIiwiYSI6ImNqNWNzMjVnMjAxc2MzMm51Yjk2ZG9oY3YifQ.6XIiaaLKqPoSxluayRcsdg";

      let self = this;

      self.map = new mapboxgl.Map({
        container: "infractionMap",
        style: "mapbox://styles/mapbox/dark-v9",
        center: [-84.07836513337293, 9.933419690622571],
        zoom: 4
      });

      self.map.on("load", () => {
        //Resize Map
        $("#infractionModal").on("shown.bs.modal", function() {
          self.map.resize();
        });

        //Reset Simplify
        $("#infractionModal").on("hidden.bs.modal", function() {
          self.map.setZoom(4);
        });

        //Init Lines
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

        //Init Points
        this.map.addSource("scPoints", {type: "geojson",data: this.gjPoints});
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
      });
    },
    _openModal: function(infraction) {
      console.log('oM');
      
      //Open modal
      $("#infractionModal").modal("show");
      let self = this;
      this.gjPoints = infraction.gjPoints;
      this.gjLines = infraction.gjLines;

      //Load data
      self.map.getSource("scPoints").setData(self.gjPoints);
      self.map.getSource("scLines").setData(self.gjLines);

      //Fly to geofence
      setTimeout(() => {
        var bbox = turf.bbox(infraction.gjLines);
        self.map.fitBounds(bbox, {
          padding: { top: 50, bottom: 50, left: 50, right:50 }
        });
      }, 500);
    }
  },
  mounted() {
    var self = this;
    this._loadMap();

    //InitSimplify
    eventBus.$on("viewMapInfraction", function(infraction) {
      self._openModal(infraction);
    });
  }
};
</script>

<style>
#infractionMap {
  width: 100%;
  height: 65vh;
}
</style>
