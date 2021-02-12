<template>
  <div id="theme">
    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-8 is-offset-2 register">
          <div class="columns">
            <slot></slot> 
          </div>
        </div>
        <div class="column is-8 is-offset-2">
          <br />
          <nav class="level">
            <div class="level-right">
              <small class="level-item" style="color: var(--textLight)">
                &copy; {{ year }} Foodprint. All Rights Reserved.
              </small>
            </div>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'theme',
  components: {
  },
  data() {
    return {
      year: new Date().getFullYear(),
    }
  }
}
</script>

<style>
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  background: var(--background);
  height: 100vh;
  color: var(--textDark);
}

#theme {
  background-color: var(--background) !important;
}

.field:not(:last-child) {
  margin-bottom: 1rem;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}

#des {
  text-align: left !important;
}
</style>
