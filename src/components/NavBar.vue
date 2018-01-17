<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <img src="../assets/RemoraLogo.gif" alt="" style="width: 100px; height: 50px; margin: 0px 10px">
      <!-- <a class="navbar-brand" href="#">REMORA</a> -->
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/geofence">Geofence</router-link></li>
        <li><router-link to="/simplify">Simplify</router-link></li>
        
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>
<script>
export default {
  name: "NavBar"
};
</script>
<style>
.navbar {
    margin-bottom: 0px;
}
</style>