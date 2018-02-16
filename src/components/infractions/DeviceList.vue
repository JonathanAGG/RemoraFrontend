<template>
<div id="deviceList">

<label style="margin-bottom: 3%">Devices List</label>
<loader-process v-if="isLoading"></loader-process>
<table class="table table-hover">
<!--     <thead>
      <tr>
        <th>Devices List</th>
      </tr>
    </thead> -->
    <tbody>
      <tr v-for="device in devices">
        <td>{{device.ID}}</td>
        <td> <router-link :to="{ name: 'DeviceInfractions', params: { id: device.ID }}"  title="Infractions">Infractions</router-link></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import LoaderProcess from "../common/LoaderProcess";
export default {
  name: "DeviceListInfractions",
  components: { LoaderProcess },
  data() {
    return {
      devices: Object,
      isLoading: true
    };
  },
  methods: {
    _initDevices: function() {
      var self = this;
        /* Get Points */
        axios
          .request({
            url: process.env.HTTP_SERVER_URL + "devices/operating",
            method: "get",
            responseType: "json",
            data: {},
            header: {
              "Content-Type": "application/json"
            }
          })
          .then(response => {
            self.devices = response.data;
            self.isLoading = false;
          });
    }
  },
  mounted() {
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