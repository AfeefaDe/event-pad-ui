<template>
  <div>
    <router-link to="new">
      <div class="newArea">
        <i class="material-icons">add</i>
        <div class="hint">Create a new Event Pad</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MainView'
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

p {
  margin: 0;
}

.material-icons {
  color: $blue;
  font-size: 5vh;
}

.hint {
  color: $gray;
}

.newArea {
  margin-top: 3em;
  background: lighten($gray, 70);
  display: inline-block;
  padding: 1em;
  border-radius: 1em;
}
</style>
