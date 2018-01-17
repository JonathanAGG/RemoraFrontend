<template>
</template>
<script>
import eventBus from "../eventBus";
import io from "socket.io-client";
export default {
  name: "Sockets",
  data() {
    return {
      socket: io(process.env.SOCKET_SERVER_URL)
    };
  },
  methods: {
  },
  mounted() {

    //Socket para realTime
    this.socket.on("newPoint", function(point) {
      eventBus.$emit("sockNewPoint", point);
    });
  }
};
</script>
