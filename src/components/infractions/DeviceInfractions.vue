<template>

<div>

  <label class="title-infraction">Infractions List</label>

    <div v-for="infraction in infractions">

      <div class="card">
        <div class="container">

          <h4><b>{{infraction.initDate}}</b></h4> 

          <div class="row">
          <div style="margin-left:4%" class="col-sm-5">
            <p>Distance: {{infraction.distance}}</p>
            <p>Time: {{infraction.time}}</p>
            <p>Geofence: {{infraction.geofenceName}}</p>
          </div>

          <div style="margin-left:4%" class="col-sm-5">
            <p>Start date: {{infraction.initDate}}</p>
            <p>End date: {{infraction.endDate}}</p>
            <a href="javascript:void(0)" @click="_viewMap(infraction)" title="View map">View map</a>
          </div>
          </div>

          
        </div>
      </div>
    </div>
    <map-infraction></map-infraction>
</div>

</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import Alerts from "../common/Alerts";
import MapInfraction from "./MapInfraction"

export default {
  name: "DeviceDetail",
  components: { Alerts ,MapInfraction},
  data() {
    return {
      infractions: Object
    };
  },
  methods: {
    _viewMap: function(infraction) {
      eventBus.$emit('viewMapInfraction', infraction)
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
.title-infraction {
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
  margin: 0% 3% 3% 3%;
  position: relative;
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