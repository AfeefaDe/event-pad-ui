<template>
<div>
  <div class="content">
    <div class="createHeader">
      <h1>Neues Treffen</h1>
    </div>
    <tabbed-form :event="null" @saveActionTriggered="createEvent">
      <div slot="tab0">
        <label for="title">Was</label>
        <input class="inputStyle" type="text" id="title" v-model="newEvent.title" placeholder="Titel eingeben..." autofocus>

        <label for="date_start">Wann</label>
        <input class="inputStyle" type="datetime-local" v-model="newEvent.date_start" id="date_start" placeholder="Startdatum">

        <label for="place">Wo</label>
        <input class="inputStyle" type="text" id="place" v-model="newEvent.location" placeholder="Ort">

        <!-- <label for="date_end">Wann ist Schluss?</label> -->
        <!-- <input class="inputStyle" type="datetime-local" v-model="date_end" id="date_end" placeholder="Enddatum"> -->
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
      newEvent: null
    }
  },
  created () {
    this.newEvent = new Event()
  },
  methods: {
    createEvent () {
      console.log('Create Event: ', this.newEvent)
      Events.createEvent(this.newEvent).then(event => {
        console.log(event)
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



</style>
