<template>
  <div class="dashboard">
    <Navbar/>
    <div class="container is-max-desktop dashboard-view">
      <div class="columns">
        <Sidebar class="is-one-third column"/>
        <router-view class="column dashboard-content"/>
      </div>
          <nav class="level">
            <div class="level-right">
              <small class="level-item" style="color: var(--textLight)">
                &copy; {{ year }} Foodprint. All Rights Reserved.
              </small>
            </div>
          </nav>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '../components/SideBar'
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="css">
.dashboard-view {
  margin-top: 2rem;
  max-height: 100% !important;
}

.dashboard-content {
  margin: 1rem;
  text-align: left;
}

.dashboard {
 background: var(--background);
}
</style>