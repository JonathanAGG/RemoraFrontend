<template>
      <div class="content">
       
        <div id="dash-rigth" style="color:#D4CDCD">

            <div id='checksLayer' @mouseover="isHoverLayer = true" @mouseleave="isHoverLayer = false">

                <span v-if="!isHoverLayer" class="glyphicon glyphicon-bookmark"></span>

                <div v-show="isHoverLayer"> 
                    <label> Layers</label>
                    <div class="form-check">
                        <input v-model="originalCheck" type="checkbox" checked class="form-check-input">
                     <label class="form-check-label"> Original</label>
                    </div>

                    <div class="form-check">
                        <input v-model="simplifyCheck" type="checkbox" checked class="form-check-input">
                        <label class="form-check-label"> Simplify</label>
                    </div>

                    <div class="form-check">
                        <input v-model="squaresCheck" type="checkbox" checked class="form-check-input">
                        <label class="form-check-label"> Squares</label>
                    </div>
                </div>
    
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "../../eventBus"; //EventBus

export default {
  name: "SimplifyControl",
  props: ["objMap"],
  data() {
    return {
      map: Object,
      isHoverLayer: false,
      originalCheck: true,
      simplifyCheck: true,
      squaresCheck: true
    };
  },
  watch: {
    objMap: function(objMap) {
      this.map = objMap;
    },
    originalCheck: function(check) {
      let visibility = this.map.getLayoutProperty("lyrGeofences", "visibility");
      this.map.setLayoutProperty(
        "lyrGeofences",
        "visibility",
        check ? "visible" : "none"
      );
    },
    simplifyCheck: function(check) {
      let visibility = this.map.getLayoutProperty("lyrSimplifys", "visibility");
      this.map.setLayoutProperty(
        "lyrSimplifys",
        "visibility",
        check ? "visible" : "none"
      );
    },
    squaresCheck: function(check) {
      let visibility = this.map.getLayoutProperty("lyrSquares", "visibility");
      this.map.setLayoutProperty(
        "lyrSquares",
        "visibility",
        check ? "visible" : "none"
      );
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

#checksLayer {
  background-color: rgba(255, 255, 255, 0.24);
  padding: 15px;
  border-radius: 5px;
  color: black;
}

#checksLayer {
  color: white;
}
#checksLayer .form-check {
  display: flex;
}

#checksLayer .form-check .form-check-input {
  margin-right: 5px;
}
</style>
