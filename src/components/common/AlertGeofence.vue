<template>
    <!-- MODAL -->    
       <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Alert</h4>
                </div>
                <div class="modal-body">
                    <p>{{message}}</p>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import eventBus from "../../eventBus";
export default {
  name: "AlertGeofence",
  data() {
    return {
      message: ""
    };
  },
  props: [],
  components: {},
  mounted() {
    var self = this;

    //Socket que recibe las alertas de violacion de geofences
    eventBus.$on("sockAlertGeofence", function(alert) {
      self.message = 'La embarcación '+alert.point.properties.ID+' ha ingresado a la geofence '+alert.geofence.properties.description
      $("#alertModal").modal("show");
    });
  }
};
</script>