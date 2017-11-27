<template>
<div>
  <div class="topBunner">
      <h2 class="bunnerHeading">Treffen</h2>
  </div>
  <div class="content">
    <p class="title"><strong>Mit TREFFEN von Afeefa<br>organisierst du Treffen effizienter</strong></p>

    <p class="subtitle">Alle mit den wichtigsten Infos versorgen und wissen, wer kommt. Ohne Anmeldung,  kostenlos und nach Belieben anonym.</p>

    <router-link tag="button" class="button-primary button-block button-center" to="new">Treffen</router-link>

    <div class="footer">
      <p>Ein Projekt von <a href="https://facebook.com/afeefa.de/" target="_blank">Afeefa</a></p>
      <a href="mailto:team@afeefa.de" style="display: block"><i class="material-icons">mail_outline</i></a>
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
  bottom: 0;
  margin: 0;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: $white;
  font-size: 20vw;
  line-height: 13vw;
  font-weight: 800;
}
.title, .subtitle {
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  /*color: $gray;*/
}
  .title {
    margin-bottom: 1em;
    font-size: 1.2rem;
  }
  .subtitle {
  }
.footer {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;

  & > p {
    display: inline-block;
    border-top: 1px dotted $lightGray;
    font-size: 1rem;
    line-height: 3rem;
  }
  .material-icons {
    font-size: 2rem;
  }
}
</style>
