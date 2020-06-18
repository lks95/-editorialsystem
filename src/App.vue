<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">WING Redaktionssystem</a>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column" id="nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">
                  <font-awesome-icon icon="home" />
                  Home
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/praxissemester" class="nav-link">
                  <font-awesome-icon icon="wrench" />
                  Praxissemester
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/auslandssemester" class="nav-link">
                  <font-awesome-icon icon="globe-americas" />
                  Auslandssemester
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/termine" class="nav-link">
                  <font-awesome-icon icon="calendar-alt" />
                  Termine
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/projekte" class="nav-link">
                  <font-awesome-icon icon="clipboard-list" />
                  Projekte
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/news" class="nav-link">
                  <font-awesome-icon icon="newspaper" />
                  News
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/team" class="nav-link">
                  <font-awesome-icon icon="users" />
                  Team
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/publikationen" class="nav-link">
                  <font-awesome-icon icon="file" />
                  Publikationen
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 pb-3">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>
