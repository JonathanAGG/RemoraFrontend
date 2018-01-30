<template>
      <!-- MODAL -->    
       <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="ModalLabel">Delete</h4>
                </div>
                <div class="modal-body">
                  Do you really want to delete the geofence {{selectedFeature.properties.description}}?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">NO</button>
                  <button type="button" class="btn btn-primary" @click="_deleteGeofence()">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
export default {
  name: "Geofences",
  props: ["objMap", "selectedFeature"],
  data() {
    return {
      map: Object
    };
  },
  methods: {
    _deleteGeofence: function() {
      var self = this;
      axios
        .delete(process.env.HTTP_SERVER_URL+"geofences/"+this.selectedFeature.properties._id)
        .then(function(response) {

          $("#confirmDeleteModal").modal("hide");
          eventBus.$emit("successAlert", "Geofence Removed."); //Mostrar mensaje de exito
          eventBus.$emit("initGeofence"); //Volver a cargar las geofences
          self._resetZoom();
        })
        .catch(function(error) {
          eventBus.$emit("dangerAlert", error); //Mostrar mensaje de error
          console.log("err", error);
        });
    },
    _resetZoom: function() {
      this.map.flyTo({
        center: [-84.07836513337293, 9.933419690622571],
        zoom: 6,
        bearing: 0,
        speed: 2.5,
        curve: 1,
        easing: function(t) {
          return t;
        }
      });
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
    }
  }
};
</script>