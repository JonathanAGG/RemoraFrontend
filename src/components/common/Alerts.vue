<template>
    <div id="alerts">
    <transition name="fade">
      <div class="alert-fix alert alert-success" v-show="isSuccess">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Success!</strong> {{messageAlert}}
      </div>
  </transition>
  <transition name="fade">
      <div class="alert-fix  alert alert-danger" v-show="isDanger">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Error!</strong> {{messageAlert}}
      </div>
  </transition>
    </div>
</template>

<script>

import eventBus from "../../eventBus";
export default {
  name: "Alerts",
  components: {
  },
  data() {
    return {
      isSuccess: false,
      isDanger: false,
      messageAlert: ""
    };
  },
  methods: {
  },
  mounted() {

    let self = this;

    eventBus.$on("successAlert", function(message) {
      self.messageAlert = message;
      self.isSuccess = true;
      setTimeout(() => {
        self.messageAlert = "";
        self.isSuccess = false;
      }, 4000);
    });

    eventBus.$on("dangerAlert", function(message) {
      self.messageAlert = message;
      self.isDanger = true;
      setTimeout(() => {
        self.messageAlert = "";
        self.isDanger = false;
      }, 4000);
    });
  }
};
</script>

<style>
.alert-fix {
    position: fixed;
    bottom: 5px;
    right:10%;
    width: 80%;
    z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

#alerts{
  z-index: 2;
}
</style>
