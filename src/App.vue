<template>
  <div id="app" class="container">

    <nav-bar></nav-bar>
    <router-view/>
    <sockets></sockets>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Sockets from './components/Sockets'
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
