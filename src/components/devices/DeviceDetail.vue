<template>

<div id="deviceDetail" class="row">

  <label style="margin-bottom: 3%">Details</label>

  <div class=" list">
      
      <div class="col-md-6"><strong>Device ID:</strong>  {{detail.ID}}</div>
      <div class="col-md-6"><strong>Ship name:</strong>  {{detail.shipName}}</div>

      <div class="col-md-6"><strong>Captaincy number:</strong>  {{detail.captaincyNumber}}</div>
      <div class="col-md-6"><strong>Incopesca License:</strong>  {{detail.incopescaLicense}}</div>

      <div class="col-md-6"><strong>CIAT number:</strong>  {{detail.ciatNumber}} </div>
      <div class="col-md-6"><strong>Record:</strong>  {{detail.record}} </div>

      <div class="col-md-6"><strong>Owner:</strong>  {{detail.owner}} </div>
      <div class="col-md-6"><strong>Registration place:</strong>  {{detail.registrationPlace}} </div>

      <div class="col-md-6"><strong>Fishing zone:</strong>  {{detail.fishingZone}} </div>
      <div class="col-md-6"><strong>Ship type:</strong>  {{detail.shipType}} </div>

      <div class="col-md-6"><strong>Autonomy:</strong>  {{detail.autonomy}} </div>
      <div class="col-md-6"><strong>Eslora (mts):</strong>  {{detail.length}} </div>

      <div class="col-md-6"><strong>Reason for request:</strong>  {{detail.requestReason}} </div>
      <div class="col-md-6"><strong>Littoral zone:</strong>  {{detail.littoralZone}} </div>

      <div class="col-md-6"><strong>Fleet:</strong>  {{detail.fleet}} </div>
      <div class="col-md-6"><strong>Power:</strong>  {{detail.power}} </div>

      <div class="col-md-6"><strong>Gross TM:</strong>  {{detail.grossTM}} </div>
      <div class="col-md-6"><strong>Net TM:</strong>  {{detail.netTM}} </div>

      <div class="col-md-6"><strong>Fishing allowed:</strong>  {{detail.fishingAllowed}} </div>
      <div class="col-md-6"><strong>Issue date:</strong>  {{detail.issueDate}} </div>

      <div class="col-md-6"><strong>Expiration date:</strong>  {{detail.expirationDate}} </div>
      <div class="col-md-6"><strong>Status:</strong>  {{detail.status}} </div>

    </div>
</div>

</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import Alerts from "../common/Alerts";
export default {
  name: "DeviceDetail",
  components: { Alerts },
  data() {
    return {
      detail: Object
    };
  },
  methods: {
    _checkEvent: function() {
      console.log("_checkEvent", this.selectedDevices);
    },
    _initDetail: function() {
      var self = this;
      /* Get Points */
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
          self.detail = response.data[0];
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
#deviceDetail {
  margin: 2% 0% 2%;
  padding: 2%;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
}

#deviceDetail div {
  /* margin-top: 2%; */
}

.list div{

  border-bottom: solid 1px rgba(223, 221, 221, 0.644);
  padding: 1% 3%
}

.list div strong {
  margin-right: 5%
}
</style>