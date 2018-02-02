<template>
    <!-- MODAL -->    
       <div class="modal fade" id="statsModal" tabindex="-1" role="dialog" aria-labelledby="statsModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="statsModalLabel">Stats</h4>
                </div>
                <div class="modal-body">
                  <div id="container" style="height: 700px;"></div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import eventBus from "../../eventBus"; //EventBus
import axios from "axios";

//Highcharts
var Highcharts = require("highcharts/highstock");
require("highcharts/modules/map")(Highcharts);

export default {
  name: "Stats",
  props: ["gjPoints", "newPoint"],
  components: {},
  methods: {
    formatData: function(features) {
      return new Promise(function(resolve, reject) {
        let arrSpeed = [],
          arrAlt = [];

        features.map(function(e) {
          arrSpeed.push([
            new Date(e.properties.dateRemora).getTime(),
            e.properties.vel
          ]);
          arrAlt.push([
            new Date(e.properties.dateRemora).getTime(),
            e.properties.alt
          ]);
        });
        resolve({ arrSpeed, arrAlt });
      });
    },
    drawCharts: function(jsonData) {
      var self = this;
      // Create the chart
      this.chart = new Highcharts.stockChart("container", {
        chart: {
          renderTo: "chart_content",
          zoomType: "xy"
        },
        rangeSelector: {
          buttons: [
            {
              type: "day",
              count: 1,
              text: "1D"
            },
            {
              type: "day",
              count: 5,
              text: "5D"
            },
            {
              type: "day",
              count: 10,
              text: "10D"
            },
            {
              type: "all",
              count: 1,
              text: "All"
            }
          ],
          selected: 1,
          inputEnabled: false
        },

        title: {
          text: ""
        },
        tooltip: {
          valueDecimals: 2
        },
        yAxis: [
          //Speed
          {
            labels: { align: "right", x: -3 },
            title: { text: "Vel" },
            height: "17%",
            lineWidth: 2
          },
          //RAM
          {
            labels: { align: "right", x: -3 },
            title: { text: "RAM" },
            top: "20%",
            height: "17%",
            offset: 0,
            lineWidth: 2
          },
          //RSSI
          {
            labels: { align: "right", x: -3 },
            title: { text: "RSSI" },
            top: "40%",
            height: "17%",
            offset: 0,
            lineWidth: 2
          },
          //Height
          {
            labels: { align: "right", x: -3 },
            title: { text: "Alt" },
            top: "60%",
            height: "17%",
            offset: 0,
            lineWidth: 2
          },
          //Fuel
          {
            labels: { align: "right", x: -3 },
            title: { text: "Fuel" },
            top: "80%",
            height: "17%",
            offset: 0,
            lineWidth: 2
          }
        ],

        series: [
          {
            id: "speed",
            name: "Vel",
            data: jsonData.arrAlt
          },
          {
            name: "RAM",
            data: jsonData.arrAlt,
            yAxis: 1
          },
          {
            name: "RSSI",
            data: jsonData.arrAlt,
            yAxis: 2
          },
          {
            name: "Alt",
            data: jsonData.arrAlt,
            yAxis: 3
          },
          {
            name: "Fuel",
            data: jsonData.arrAlt,
            yAxis: 4
          }
        ]
      });
    },
    updateChart: function(jsonData) {
      this.chart.series[0].addPoint(jsonData.arrAlt[0], true, false); //Speed
      this.chart.series[1].addPoint(jsonData.arrAlt[0], true, false); //RAM
      this.chart.series[2].addPoint(jsonData.arrAlt[0], true, false); //RSSI
      this.chart.series[3].addPoint(jsonData.arrAlt[0], true, false); //Alt
      this.chart.series[4].addPoint(jsonData.arrAlt[0], true, false); //Fuel */
    }
  },
  mounted() {
    var self = this;

    //Evento desde DeviceList para cargar el chart con los datos del despositivo seleccionado
    eventBus.$on("initStats", function(deviceId) {
      //Obtiene los datos del dispositivo seleccionado
      axios
        .request({
          url: process.env.HTTP_SERVER_URL + "devices/" + deviceId+"/features",
          method: "get",
          responseType: "json",
          data: {},
          header: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          self.formatData(response.data.features).then(data => {
            self.drawCharts(data);
          });
          $("#statsModal").modal("show");
        });
    });
  }
};
</script>