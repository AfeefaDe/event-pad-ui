<template>
  <div>
    <div class="progressArea">
      <div class="progressHeader">
        <span>{{tabNames[currentTabNumber]}}</span>
        <span class="progressNumber">{{currentTabNumber+1}}/{{currentTabCount+1}}</span>
      </div>
      <div class="progressBarContainer">
        <div v-bind:class="['progressBar', progressBarClass]"></div>
      </div>
    </div>

    <div class="progressTab" v-show="currentTabNumber == 0">

        <slot name="tab0"></slot>

        <div class="tabFooter">
          <router-link tag="button" to="/" class="inputStyle button prevButton">Abrechen</router-link>
          <button class="inputStyle button nextButton" @click="increaseProgress()">Weiter</button>
        </div>
    </div>
    <div class="progressTab" v-show="currentTabNumber == 1">

        <slot name="tab1"></slot>

        <div class="tabFooter">
          <button class="inputStyle button prevButton" @click="decreaseProgress()">Zurück</button>
          <button class="inputStyle button nextButton" @click="saveEvent">Weiter</button>
        </div>
    </div>
    <div class="progressTab" v-show="currentTabNumber == 2">

        <slot name="tab2"></slot>

        <div class="tabFooter">
          <button class="inputStyle button prevButton" @click="decreaseProgress()">Zurück</button>
          <router-link tag="button" :to="{name: 'show', params: {id: eventId}}" class="inputStyle button">Fertig</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabbedForm',
  props: ['eventId'],
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
      this.increaseProgress()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";



.tabFooter {
  display: flex;
  justify-content: space-between;
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
  width: 100%;
  border-radius: 10px;
  border:  2px solid $lightGray;
  height: 20px;
  overflow: hidden;
  position: relative;
  .progressBar {
    position: relative;
    transition: width ease 0.3s;
    bottom: 0;
    left: 0;
    height: 20px;
    width: 0;
    background: $gray;
  }
  .third0 {
    width: 33%;
  }
  .third1 {
    width: 66%;
  }
  .third2 {
    width: 100%;
    background: $green;
  }
}
.nextButton {
  background: $blue;
  color: white;
  &:hover {
    background: darken($blue, 10)
  }
  &:active {
    background: darken($blue, 20)
  }
}
.prevButton {
  background: $gray;
  color: white;
  &:hover {
    background: lighten($gray, 10)
  }
  &:active {
    background: lighten($gray, 20)
  }
}
</style>
