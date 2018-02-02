<template>
<div id="deviceList">

<label style="margin-bottom: 3%">Devices List</label>
<table class="table table-hover">
<!--     <thead>
      <tr>
        <th>Devices List</th>
      </tr>
    </thead> -->
    <tbody>
      <tr v-for="device in devices">
        <td>{{device.ID}}</td>
        <td> <a href="javascript:void(0)" @click="_openStats(device.ID)" title="Stats">Stats</a> </td>
        <td> <router-link :to="{ name: 'DeviceDetail', params: { id: device.ID }}"  title="Details">Details</router-link></td>
        <td> <router-link :to="{ name: 'DeviceEdit', params: { id: device.ID }}"  title="Details">Edit</router-link></td>
      </tr>
    </tbody>
  </table>
      <alerts></alerts>
      <stats></stats>
  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import Alerts from "../common/Alerts";
import Stats from "../common/Stats";
export default {
  name: "DeviceList",
  components: {Alerts, Stats },
  data() {
    return {
      devices: Object,
      selectedDevices: []
    };
  },
  methods: {
    _initDevices: function() {
      var self = this;
        /* Get Points */
        axios
          .request({
            url: process.env.HTTP_SERVER_URL + "devices",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.devices = response.data;
            self.selectAll = true;
          });
    },
    _openStats: function(deviceId) {
      eventBus.$emit("initStats", deviceId);
    }
  },
  mounted() {
    var self = this;
    this._initDevices();
  }
};
</script>
<style>
#deviceList {
  margin: 2% 0% 2%;
  padding: 2%;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
}
</style>