<template>
    <div id="deviceEdit" class="row">

<form class="form-horizontal col-md-offset-1 col-md-9" v-on:submit="_onSubmit" action="#" autocomplete="off">

  <div class="form-group">
    <label class="control-label col-sm-2" for="shipName">Ship name:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="shipName" v-model="device.shipName">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="captaincyNumber">Captaincy number:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="captaincyNumber" v-model="device.captaincyNumber">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="incopescaLicense">Incopesca license:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="incopescaLicense" v-model="device.incopescaLicense">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="ciatNumber">CIAT number:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="ciatNumber" v-model="device.ciatNumber">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="record">Record:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="record" v-model="device.record">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="owner">Owner:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="owner" v-model="device.owner">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="registrationPlace">Registration place:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="registrationPlace" v-model="device.registrationPlace">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="fishingZone">Fishing zone:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="fishingZone" v-model="device.fishingZone">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="shipType">Ship type:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="shipType" v-model="device.shipType">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="autonomy">Autonomy:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="autonomy" v-model="device.autonomy">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="eslora">Eslora (mts):</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="eslora" v-model="device.eslora">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="requestReason">Reason for request:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="requestReason" v-model="device.requestReason">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="littoralZone">Littoral zone:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="littoralZone" v-model="device.littoralZone">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="fleet">Fleet:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="fleet" v-model="device.fleet">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="power">Power:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="power" v-model="device.power">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="grossTM">Gross TM:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="grossTM" v-model="device.grossTM">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="netTM">Net TM:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="netTM" v-model="device.netTM">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="fishingAllowed">Fishing allowed:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="fishingAllowed" v-model="device.fishingAllowed">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="issueDate">Issue date:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="issueDate" v-model="device.issueDate">
    </div>
  </div>

  <div class="form-group">
    <label class="control-label col-sm-2" for="expirationDate">Expiration date:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="expirationDate" v-model="device.expirationDate">
    </div>
  </div>
  
  <div class="form-group"> 
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Edit</button>
    </div>
  </div>
</form>
<alerts></alerts>

    </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import Alerts from "../common/Alerts";
export default {
  name: "EditDevice",
  components: { Alerts },
  data() {
    return {
      device: Object
    };
  },
  methods: {
    _onSubmit: function(e) {
      e.preventDefault();

      let self = this;
      axios
        .put(process.env.HTTP_SERVER_URL + "devices/"+ this.$route.params.id, self.device)
        .then(function(response) {
          eventBus.$emit("successAlert", "Device updated."); //Mostrar mensaje de exito
        })
        .catch(function(error) {
          eventBus.$emit("dangerAlert", error); //Mostrar mensaje de error
          console.log("err", error);
        });
    },
    _initDetail: function() {
      var self = this;
      /* Get Detail */
      axios
        .request({
          url:
            process.env.HTTP_SERVER_URL +
            "devices/" +
            this.$route.params.id +
            "/details",
          method: "get",
          responseType: "json",
          data: {},
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          self.device = response.data[0];
        });
    }
  },
  mounted() {
    var self = this;
    this._initDetail();
  }
};
</script>
<style>
#deviceEdit {
  margin: 2% 0% 2%;
  padding: 2%;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
}

.detailList div {
  margin-top: 2%;
}
</style>