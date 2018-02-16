<template>

<div class="row">



  <label class="title-infraction">Infractions List</label>

    <div v-for="infraction in infractions">

      <div class="card">
        <div class="container">
          <h4><b>{{infraction.initDate}}</b></h4> 
          <p>Geofence: {{infraction.geofenceName}}</p>
          <p>Distance: {{infraction.distance}}</p>
          <p>Time: {{infraction.time}}</p>
        </div>
      </div>
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
      infractions: Object
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
            "infractions/" +
            this.$route.params.id,
          method: "get",
          responseType: "json",
          data: {},
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log("inn", response.data);
          self.infractions = response.data;
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

.title-infraction{
  margin: 3%;
}
#infractions {
  margin: 2% 0% 2%;
  padding: 2%;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin:0% 3% 3% 3%
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>