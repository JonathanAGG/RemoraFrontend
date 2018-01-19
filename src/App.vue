<template>
  <div id="app" class="container">

    <nav-bar></nav-bar>
    <router-view/>
    <sockets></sockets>
  </div>
</template>

<script>
import NavBar from './components/common/NavBar'
import Sockets from './components/common/Sockets'
export default {
  name: 'app',
  components: {
    NavBar,
    Sockets
  }
}
</script>

<style>
</style>
