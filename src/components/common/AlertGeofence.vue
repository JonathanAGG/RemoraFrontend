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
import io from "socket.io-client";
export default {
  name: "AlertGeofence",
  data() {
    return {
      socket: io(process.env.SOCKET_SERVER_URL),
      message: ""
    };
  },
  props: [],
  components: {},
  mounted() {
    var self = this;

    //Socket para recibir las alertas
    this.socket.on("alert", function(alert) {
        self.message = 'La embarcación '+alert.point.properties.ID+' ha ingresado a la geofence '+alert.geofence.properties.description
        $("#alertModal").modal("show");
    });
  }
};
</script>