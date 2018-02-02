<template>
  <!-- Filter inputs -->
                    <div class="row">
                        <div class='col-md-5 col-md-offset-1 col-sm-12'>
                            <div class="form-group">
                                <div class="input-group date">
                                    <date-picker placeholder="Initial Date" v-model="initDate" id="date-time-input" :wrap="true" :config="configDatePicker">
                                    </date-picker>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-5 col-sm-12'>
                            <div class="form-group">
                                <div class="input-group date">
                                    <date-picker placeholder="Final Date" v-model="endDate" id="date-time-input" :wrap="true" :config="configDatePicker">
                                    </date-picker>
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </div>
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
          url: process.env.HTTP_SERVER_URL+ "zeus/points/" + this.initDate + "&" + this.endDate,
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
  },
  watch : {

      initDate: function(newInitDate){
         eventBus.$emit("refreshDates", {initDate:newInitDate, endDate:this.endDate});
      },
      endDate: function(newEndDate){
         eventBus.$emit("refreshDates", {initDate:this.initDate, endDate:newEndDate});
      }
  }
};
</script> 