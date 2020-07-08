<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mr-3 border-bottom">
      <h1 class="h2">Home</h1>
    </div>
    <div class="d-inline-flex flex-wrap justify-content-center justify-content-md-start">
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="wrench" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Praxissemester</h5>
          <router-link to="/praxissemester" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="globe-americas" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Auslandssemester</h5>
          <router-link to="/auslandssemester" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="calendar-alt" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Termine</h5>
          <router-link to="/termine" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="clipboard-list" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Projekte</h5>
          <router-link to="/projekte" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="newspaper" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">News</h5>
          <router-link to="/news" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="users" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Team</h5>
          <router-link to="/team" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
      <div class="card m-3" style="width: 18rem;">
        <div style="height: 8em;" class="card-img-top d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="file" style="font-size: 5em;" class="text-secondary" />
        </div>
        <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 8em;">
          <h5 class="card-title">Publikationen</h5>
          <router-link to="/publikationen" class="btn btn-primary mt-3">Bearbeiten<font-awesome-icon icon="chevron-right" class="ml-3" /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>