<template>
      <div class="content">
       
        <div id="dash-rigth">
            <button class="btn btn-default" title="Draw Lines" @click="drawLines">
                <span class="glyphicon glyphicon-resize-horizontal"></span>
            </button>
            <button class="btn btn-default" title="Zoom Out" @click="resetZoom">
                <span class="glyphicon glyphicon-fullscreen"></span>
            </button>
        </div>
    </div>
</template>

<script>
import eventBus from "../../eventBus"; //EventBus

export default {
  name: "ZeusControl",
  props: ["objMap"],
  data() {
    return {
      map: Object
    };
  },
  methods: {
    drawLines: function() {
      let visibility = this.map.getLayoutProperty("lyrLines", "visibility");
      this.map.setLayoutProperty("lyrLines","visibility", visibility === "visible" ? "none" : "visible");
    },
    resetZoom: function() {
      this.map.flyTo({
        center: [-84.07836513337293, 9.933419690622571],
        zoom: 7,
        bearing: 0,
        speed: 2.5,
        curve: 1,
        easing: function(t) {
          return t;
        }
      });
    }
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
    }
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
