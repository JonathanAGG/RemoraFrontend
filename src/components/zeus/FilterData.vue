<template>
  <!-- Filter inputs -->
                    <div class="row">
                        <div class='col-md-4 col-md-offset-1 col-sm-12'>
                            <div class="form-group">
                                <label for="date-time-input">Init Date</label>
                                <div class="input-group date">
                                    <date-picker v-model="initDate" id="date-time-input" :wrap="true" :config="configDatePicker">
                                    </date-picker>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-4 col-sm-12'>
                            <div class="form-group">
                                <label for="date-time-input">End Date</label>
                                <div class="input-group date">
                                    <date-picker v-model="endDate" id="date-time-input" :wrap="true" :config="configDatePicker">
                                    </date-picker>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='col-md-2 col-sm-12'>
                            <div class="form-group" style="margin-top: 25px;">
                                <div class="input-group date">
                                  <button type="button" class="btn btn-default" @click="filter()">Filter</button>
                                </div>
                            </div>
                        </div>
                    </div>
</template>
 
<script>
//Datetimepicker
import datePicker from "vue-bootstrap-datetimepicker";
import "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css";

import axios from "axios"; //Axios
import eventBus from "../../eventBus"; //EventBus

export default {
  name: "FilterData",
  data() {
    return {
      chart: Object,
      initDate: null,
      endDate: null,
      HTTP_SERVER_URL: process.env.HTTP_SERVER_URL,
      configDatePicker: {
        allowInputToggle: true
      }
    };
  },
  components: { datePicker },
  methods: {
    filter: function() {
      var self = this;
      /* Get Filter */
      axios
        .request({
          url: this.HTTP_SERVER_URL + "zeus/points/" + this.initDate + "&" + this.endDate,
          method: "get",
          responseType: "json",
          data: {},
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          //Emit new data to map and chart
          eventBus.$emit("filterData", response.data);
        });
    }
  }
};
</script> 