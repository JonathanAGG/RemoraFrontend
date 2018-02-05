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
                  Do you really want to delete the device {{deleteDevice.ID}}?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">NO</button>
                  <button type="button" class="btn btn-primary" @click="_deleteDevice()">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
export default {
  name: "DeleteDevice",
  props: ["deleteDevice"],
  data() {
    return {};
  },
  methods: {
    _deleteDevice: function() {
      var self = this;
      axios
        .delete(process.env.HTTP_SERVER_URL+"devices/"+this.deleteDevice.ID)
        .then(function(response) {
          $("#confirmDeleteModal").modal("hide");
          eventBus.$emit("successAlert", "Device Removed."); //Mostrar mensaje de exito
          eventBus.$emit("initDeviceList"); // Reinicia La Lista de dispositivos [DeviceList]
        })
        .catch(function(error) {
          eventBus.$emit("dangerAlert", error.response.data.message); //Mostrar mensaje de error
          console.log("err", error.response.data.message);
        });
    }
  }
};
</script>