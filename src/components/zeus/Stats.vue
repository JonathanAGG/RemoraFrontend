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

                  <filterData></filterData>  
                  <Chart v-bind="{gjPoints, newPoint}"></Chart>

                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>   
</template>

<script>

import eventBus from '../../eventBus'; //EventBus
import FilterData from "./FilterData"
import Chart from "./Chart"

export default {
  name: "Stats",
  props: ["gjPoints", "newPoint"],
  components: {FilterData, Chart}
};
</script>