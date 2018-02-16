<template>
<div id="deviceList">

<label style="margin-bottom: 3%">Filter Devices</label>
<filter-date></filter-date>
<loader-process v-if="isLoading"></loader-process>
<table class="table table-hover">
<!--     <thead>
      <tr>
        <th>Devices List</th>
      </tr>
    </thead> -->
    <tbody>
      <tr v-for="device in devices">
        <td>
          <div class="form-check">
               <input type="checkbox" class="form-check-input" v-model="selectedDevices" :value="device.ID" @change="_checkEvent">
          </div>
        </td>
        <td>{{device.ID}}</td>
        <td> <a href="javascript:void(0)" @click="_openStats(device.ID)" title="Stats">Stats</a> </td>
        <td> <a href="javascript:void(0)" @click="_flyToFeature(device.ID)" title="View">View</a> </td>
        <!-- <td> <router-link :to="{ name: 'DeviceDetail', params: { id: device.ID }}"  title="Details">Details</router-link></td> -->
      </tr>
      <tr>
        <td>
          <div class="form-check">
               <input type="checkbox" class="form-check-input" v-model="selectAll" @change="_checkEvent">
          </div>
        </td>
        <td>All</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

    </tbody>
  </table>
       <div class="col-lg-2 col-lg-offset-5 " style="margin-top: 25px; float: none">
             <button type="button" class="btn btn-default" @click="_filter">Filter</button>
      </div>
      <alerts></alerts>
      <stats></stats>
  </div>
</template>
<script>
import axios from "axios";
import eventBus from "../../eventBus";
import FilterDate from "./FilterDate";
import Alerts from "../common/Alerts";
import Stats from "../common/Stats";
import LoaderProcess from "../common/LoaderProcess";
export default {
  name: "FilterDevices",
  components: { FilterDate, Alerts, Stats, LoaderProcess },
  data() {
    return {
      devices: Object,
      selectedDevices: [],
      initDate: "",
      endDate: "",
      isLoading: true
    };
  },
  methods: {
    _checkEvent: function() {
      console.log("_checkEvent", this.selectedDevices);
    },
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
            self.selectAll = true;
            self.isLoading = false;
          });
    },
    _filter: function() {
      var self = this;
      let request = {
        initDate: self.initDate,
        endDate: self.endDate,
        devices: self.selectedDevices
      };
      axios
        .post(process.env.HTTP_SERVER_URL + "zeus/filter", request)
        .then(function(response) {
          eventBus.$emit("filterData", response.data);
          eventBus.$emit("successAlert", ""); //Mostrar mensaje de exito
        })
        .catch(function(error) {
          eventBus.$emit("dangerAlert", error); //Mostrar mensaje de error
          console.log("err", error);
        });
    },
    _openStats: function(deviceId) {
      eventBus.$emit("initStats", deviceId);
    },
    _flyToFeature: function(deviceId){
      eventBus.$emit('flyToFeature', deviceId);
    }
  },
  mounted() {
    var self = this;
    this._initDevices();
    //Recibe las fechas de componente [FilterDate]
    eventBus.$on("refreshDates", function(dates) {
      self.initDate = dates.initDate;
      self.endDate = dates.endDate;
    });
  },

  computed: {
    selectAll: {
      get: function() {
        return this.devices
          ? this.selectedDevices.length == this.devices.length
          : false;
      },
      set: function(value) {
        var selectedDevices = [];

        if (value) {
          this.devices.forEach(function(device) {
            selectedDevices.push(device.ID);
          });
        }

        this.selectedDevices = selectedDevices;
      }
    }
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