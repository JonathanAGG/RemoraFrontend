<template>
    <!-- MODAL -->    
       <div class="modal fade" id="importGeofenceModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="modalLabel">Import</h4>
                </div>
                <div class="modal-body">
                  <input type="file" accept=".zip" id="inputFile" @change="_importFile($event)">
                  <loader-process v-if="isLoading"></loader-process>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" v-show="showImportBtn" @click="_parseToGeojson()">Import</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import eventBus from "../../eventBus";
import LoaderProcess from "../common/LoaderProcess";

import axios from "axios";
import shpToGeojson from "../../assets/libs/shp2geojson/shpToGeojson";

export default {
  name: "ImportGeofence",
  props: [],
  components: {LoaderProcess},
  data() {
    return {
      file: Object,
      showImportBtn: false,
      isSuccess: false,
      isLoading: false
    };
  },
  methods: {
    _importFile: function(event) {
      var self = this;
      this.file = null;
      this.file = event.target.files[0];
      this.showImportBtn = true;
    },

    _parseToGeojson: function() {
      let self = this;
      let round = true;
      shpToGeojson.loadshp(
        {
          url: this.file,
          encoding: "big5",
          EPSG: 3826
        },
        function(geojson) {
          if (round == true) {
            self._saveGeofences(geojson);
            round = false;
          }
        }
      );
    },
    _saveGeofences: function(featureCollection) {
      let self = this;
      this.isLoading =true;
      //Envia la geofence al server para almacenarla
      axios
        .post(process.env.HTTP_SERVER_URL + "geofences", featureCollection)
        .then(function(response) {
          self.isLoading =false;
          $("#importGeofenceModal").modal("hide");
          eventBus.$emit("initGeofence"); //Actializa el mapa
          eventBus.$emit("successAlert", "Saved Geofence."); //Mostrar mensaje de exito
        })
        .catch(function(error) {
          $("#importGeofenceModal").modal("hide");
          eventBus.$emit("dangerAlert", error); //Mostrar mensaje de error
          console.log("err", error);
        });
    }
  }
};
</script>