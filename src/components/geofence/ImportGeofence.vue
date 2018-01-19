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

                  <input type="file" accept=".zip" @change="processFile($event)">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" style="display: none;" id="importSHP">Importar</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import eventBus from "../../eventBus";

import shpToGeojson from "../../assets/libs/shp2geojson/shpToGeojson";


export default {
  name: "ImportGeofence",
  props: [],
  components: {},
  data() {
    return {
      file: Object
    };
  },
  methods: {
    processFile(event) {
      
      var self = this;
      this.file = event.target.files[0];

      shpToGeojson.loadshp(
        {
          url: self.file,
          encoding: "big5",
          EPSG: 3826
        },
        function(geojson) {
          console.log("responseSHP2geoJson", geojson);
        }
      );
    }
  }
};
</script>