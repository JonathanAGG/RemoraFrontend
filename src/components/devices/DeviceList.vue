<template>
<div id="deviceList">

<div class="row"> 

  <div class="col-xs-11">
    <label style="margin-bottom: 3%">Devices List</label>
  </div>
  <div class="col-xs-1">
    <router-link :to="{ name: 'AddDevice'}"  title="New Device">
      <span class="glyphicon glyphicon-plus"></span>
    </router-link>
  </div>
</div>

<table class="table table-hover">
    <tbody>
      <tr v-for="device in devices">
        <td>{{device.ID}}</td>
        <td> <router-link :to="{ name: 'DeviceDetail', params: { id: device.ID }}"  title="Details">Details</router-link></td>
        <td> <router-link :to="{ name: 'EditDevice', params: { id: device.ID }}"  title="Details">Edit</router-link></td>
        <td> 
          <a v-if="device.isOperating" href="javascript:void(0)" @click="_openStats(device.ID)" title="Stats">Stats</a>
          <div v-else>Stats</div>
        </td>
        <td><a href="javascript:void(0)" @click="_preDelete(device)" title="Delete">Delete</a></td>
        <td title="Is Operating">  
          <div v-if="device.isOperating" class="cActive"></div>
          <div v-else class="cDisabled"></div> 
        </td>
     </tr>
    </tbody>
  </table>
      <alerts></alerts>
      <stats></stats>
      <delete-device v-bind="{deleteDevice}"></delete-device>
  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import Alerts from "../common/Alerts";
import Stats from "../common/Stats";
import DeleteDevice from "./DeleteDevice";

export default {
  name: "DeviceList",
  components: {Alerts, Stats, DeleteDevice },
  data() {
    return {
      devices: Object,
      deleteDevice: Object
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
    },
    _preDelete : function(device){
      this.deleteDevice = device;
      $("#confirmDeleteModal").modal("show");

    }
  },
  mounted() {
    var self = this;
    this._initDevices();

    eventBus.$on("initDeviceList", function() {
      self._initDevices();
    });
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

.cActive {
  background-color: rgba(9, 255, 0, 0.733);
  border: 1px solid #FFF;
  border-radius: 18px;
  box-shadow: 0 0 2px #888;
  height: 8px;
  width: 8px;
}

.cDisabled {
  background-color: rgba(255, 8, 0, 0.733);
  border: 1px solid #FFF;
  border-radius: 18px;
  box-shadow: 0 0 2px #888;
  height: 8px;
  width: 8px;
}

</style>