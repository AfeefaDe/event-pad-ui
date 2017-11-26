<template>
  <div>
    <div class="progressTab" v-show="currentTabNumber == 0">

        <slot name="tab0"></slot>

        <div class="tabFooter">
          <button class="button-block button-primary" @click="saveEvent">Fertig</button>
<!--           <router-link tag="button" :to="{name: 'show', params: {uri: event.uri}}" class="">Fertig</router-link>
 -->          <button class="button-block" @click="increaseProgress()">Details ergänzen</button>
        </div>

    </div>
    <div class="progressTab" v-show="currentTabNumber == 1">

        <slot name="tab1"></slot>

        <div class="tabFooter">
          <button class="button-block button-primary" @click="saveEvent">Fertig</button>
        </div>
        <button class="button-block" @click="decreaseProgress()">Zurück</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbedForm',
  props: ['event'],
  data () {
    return {
      tabNames: ['Informationen zum Treffen', 'Persönliche Information', 'Übersicht'],
      currentTabNumber: 0,
      currentTabCount: 2
    }
  },
  created: function () {

  },
  computed: {
    progressBarClass: function () {
      return `third${this.currentTabNumber}`
    }
  },
  methods: {
    increaseProgress: function () {
      if (this.currentTabNumber < this.currentTabCount) {
        this.currentTabNumber++
      }
    },
    decreaseProgress: function () {
      if (this.currentTabNumber > 0) {
        this.currentTabNumber--
      }
    },
    saveEvent: function () {
      this.$emit('saveActionTriggered')
      // this.increaseProgress()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

.tabFooter {
  /*display: flex;*/
  /*justify-content: space-between;*/
}

.progressArea {
  margin-bottom: 2em;
}
.progressHeader {
  margin-bottom: 0.4em;
  display: flex;
  font-weight: 600;
  font-size: 0.9rem;
  .progressNumber {
    margin-left: auto;
  }
}
.progressBarContainer {
  width: 100vw;
  position: relative;
  left: -2vw;
  /*border-radius: 10px;*/
  /*border:  2px solid $lightGray;*/
  background-color: $lightGray;
  height: 20px;
  overflow: hidden;
  position: relative;
  .progressBar {
    position: relative;
    transition: width ease 0.6s;
    bottom: 0;
    left: 0;
    height: 20px;
    width: 0;
    background: $black;
  }
  .third0 {
    width: 5%;
  }
  .third1 {
    width: 50%;
  }
  .third2 {
    width: 100%;
    background: $green;
  }
}
</style>
