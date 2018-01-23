<template>
      <div class="content">

        <div id="dash-rigth" style="margin: 1% 10px">
            <button class="btn btn-default" title="Import Shapefile" data-toggle="modal" data-target="#importGeofenceModal">Import</button>
            <button class="btn btn-default" id="drawManual" @click="showManualDraw=!showManualDraw">Manual</button>
            <draw-control v-bind="{objMap, showManualDraw}"></draw-control>
        </div>
    </div>
</template>

<script>
import eventBus from "../../eventBus"; //EventBus
import mapboxgl from "mapbox-gl";

import MapboxDraw from "mapbox-gl-draw";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from './DrawControl'

export default {
  name: "GeofenceControl",
  props: ["objMap"],
  components:{DrawControl},
  data() {
    return {
      map: Object,
      draw: Object,
      showManualDraw: false
    };
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
    }
  },
  mounted() {
  }
};
</script>
<style>
/* Others */
.content * {
  display: block;
  position: relative;
}

#dash-rigth {
  margin: 1%;
  float: right;
  z-index: 1;
}

#dash-left {
  margin: 1%;
  float: left;
}

#dash-rigth *,
#dash-left * {
  margin-bottom: 9%;
}
</style>
