<template>
<div>
  <div class="content">
    <div class="createHeader">
      <h1>Neues Treffen</h1>
    </div>
    <tabbed-form :event="null" @saveActionTriggered="createEvent" :hasValidationError="hasValidationError">
      <div slot="tab0">
        <label for="title">Was</label>
        <input type="text" id="title" v-model="newEvent.title" placeholder="Titel eingeben..." autofocus
          @blur="checkTitleEmpty()" @input="checkTitleEmpty()">
        <span class="error-message" v-if="titleError">Bitte gib einen Titel ein.</span>

        <label for="dateStart">Wann</label>
        <input type="datetime-local" v-model="dateStart" id="dateStart" placeholder="Startdatum"
          @blur="checkDateEmpty()" @input="checkDateEmpty()">
        <span class="error-message" v-if="dateError">Bitte gib eine Zeit an.</span>

        <label for="place">Wo</label>
        <input type="text" id="place" v-model="newEvent.location" placeholder="Ort">

        <!-- <label for="date_end">Wann ist Schluss?</label> -->
        <!-- <input type="datetime-local" v-model="date_end" id="date_end" placeholder="Enddatum"> -->
      </div>

      <div slot="tab1">
        <label for="description">Beschreibung</label>
        <textarea class="inputStyle" id="description" v-model="newEvent.description" rows="10" cols="20" placeholder="Agenda"></textarea>

        <label for="description">Benötigt</label>
        <input type="checkbox" value="">Bier
      </div>
    </tabbed-form>
  </div>
</div>
</div>
</template>

<script>
import TabbedForm from '@/components/TabbedForm'
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Events from '@/resources/Events'

export default {
  name: 'CreatePad',
  components: { TabbedForm, EventLinkClipboard },
  data () {
    return {
      newEvent: null,
      dateStart: null,
      titleError: false,
      dateError: false
    }
  },
  computed: {
    hasValidationError () {
      return !this.newEvent.title || !this.dateStart
    }
  },
  created () {
    this.newEvent = new Event()
    this.dateStart = this.newEvent.dateStart.toJSON().slice(0, 19)
  },
  methods: {
    checkTitleEmpty () {
      this.titleError = !this.newEvent.title
    },
    checkDateEmpty () {
      this.dateError = !this.dateStart
    },
    createEvent () {
      this.newEvent.dateStart = new Date(this.dateStart)
      Events.createEvent(this.newEvent).then(event => {
        if (!event.uri) event.uri = 'uri-not-available'
        this.$router.push({ name: 'show', params: {uri: event.uri, event: event} })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

.createHeader {
  margin-bottom: 1em;
  text-align: center;
}

.error-message {
  font-size: .9em;
  color: #ee3333;
  display: block;
  margin-top: -1.8em;
  margin-bottom: 1.5em;
}

</style>
