<template>
</template>

<script>
import eventBus from "../../eventBus"; //EventBus
import mapboxgl from "mapbox-gl";

import MapboxDraw from "mapbox-gl-draw";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";

export default {
  name: "drawControl",
  props: ["objMap", "showManualDraw"],
  data() {
    return {
      map: Object,
      draw: Object,
      HTTP_SERVER_URL: process.env.HTTP_SERVER_URL
    };
  },
  methods: {
    _initDrawControl: function() {
      var self = this;
      this.map.on("load", () => {
        self.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true
          }
        });
        this.map.addControl(this.draw);

        //Estilos para el drawControl de mapbox personificado
        var btn = document.createElement("BUTTON");
        var span = document.createElement("SPAN");
        span.setAttribute("class", "glyphicon glyphicon-floppy-disk");
        btn.setAttribute("title", "Save Geofences");
        btn.addEventListener("click", this._saveGeofences);
        btn.appendChild(span);

        $(".mapboxgl-ctrl-group").append(btn);
        $(".mapboxgl-ctrl-top-right").hide();

        $(".mapboxgl-ctrl-top-right").css({
          "background-color": "rgba(255, 255, 255, 0.4)",
          top: "95px",
          right: "10px",
          "border-radius": "5px"
        });
        $(".mapboxgl-ctrl-top-right .mapboxgl-ctrl").css("margin", "15px");
        $(".mapboxgl-ctrl-top-right .content-draw-manual").css(
          "margin",
          "5px 5px"
        );
      });
    },
    _hideManualDraw: function() {
      $(".mapboxgl-ctrl-top-right").hide("fast");
      this.draw.deleteAll().getAll();
    },
    _saveGeofences: function(featureCollection) {
      console.log("save", featureCollection);
      if (this.draw.getAll().features.length == 0) {
        eventBus.$emit("dangerAlert", "Debe dibujar el poligono primero"); //Mostrar mensaje de error
      } else {
        let self = this;
        //Envia la geofence al server para almacenarla
        axios
          .post(self.HTTP_SERVER_URL + "geofences", this.draw.getAll())
          .then(function(response) {
            eventBus.$emit("newGeofence", self.draw.getAll()); //Actializa el mapa
            eventBus.$emit("successAlert", "Saved Geofence."); //Mostrar mensaje de exito
            self.draw.deleteAll().getAll();
          })
          .catch(function(error) {
            console.log("err", error);
          });
      }
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
      this._initDrawControl();
    },
    showManualDraw: function(showManualDraw) {
      this.showManualDraw
        ? $(".mapboxgl-ctrl-top-right").show("fast")
        : this._hideManualDraw();
    }
  }
};
</script>
