<template>
<div>
  <div class="topBunner">
      <h2 class="bunnerHeading">Treffen</h2>
  </div>
  <div class="content">
    <p class="landingHint">Mit Afeefa Treffen kannst du eine Übersichtseite für deine Veranstaltung erstellen. Ohne Anmeldung und kostenlos kannst du ein Treffen erstellen und den Link mit deinen potenziellen Teilnehmern teilen.</p>
    <div class="landingButton">
      <router-link to="new">Treffen erstellen</router-link>
    </div>
    <div class="footer">
      Ein Projekt von <a href="https://afeefa.de/">Afeefa.de</a>, 2017
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CreatePad',
  data () {
    return {
      memberName: '',
      title: '',
      place: '',
      description: '',
      date: ''
    }
  },
  methods: {
    createPad: function () {
      // @t0d0: create Pad
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";


.topBunner {
  height: 50vh;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position: center center;
  position: relative;
}
.bunnerHeading {
  position: absolute;
  bottom: 0%;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 7vh;
  font-weight: 800;
}
.landingHint {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  color: $gray
}
.landingButton {
  text-align: center;
  margin: 2em auto;
  a {
    padding: 0.8em 1em 0.7em 1em;
    border-radius: 3px;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 600;
    transition: background ease 0.4s;
    background: $blue;
    color: white;
    &:hover {
      background: lighten($blue, 10);
    }
  }
}
.footer {
  text-align: right;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>
