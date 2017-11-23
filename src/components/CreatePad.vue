<template>
<div>
  <div class="content">
    <div class="createHeader">
      <h2>Neues Treffen anlegen</h2>
    </div>
    <tabbed-form :event="event" @saveActionTriggered="createEvent">
      <div slot="tab0">
        <label for="title">Titel des Treffens</label>
        <input class="inputStyle" type="text" id="title" v-model="title" placeholder="Titel" autofocus>

        <label for="host">Veranstalter des Treffens</label>
        <input class="inputStyle" type="text" id="host" v-model="host" placeholder="Veranstalter" autofocus>

        <label for="place">Ort des Treffens</label>
        <input class="inputStyle" type="text" id="place" v-model="place" placeholder="Ort">

        <label for="description">Agenda des Treffens</label>
        <textarea class="inputStyle" id="description" v-model="description" rows="10" cols="20" placeholder="Agenda"></textarea>

        <label for="date_start">Startdatum des Treffens</label>
        <input class="inputStyle" type="datetime-local" v-model="date_start" id="date_start" placeholder="Startdatum">

        <label for="date_end">Enddatum des Treffens</label>
        <input class="inputStyle" type="datetime-local" v-model="date_end" id="date_end" placeholder="Enddatum">
      </div>

      <div slot="tab1">
        <label for="memberName">Wie lautet dein Name?</label>
        <input class="inputStyle" type="text" id="memberName" v-model="memberName" placeholder="Dein Name" autofocus>
      </div>

      <div slot="tab2">
        <event-link-clipboard :event="event">
        </event-link-clipboard>
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
      title: '',
      host: '',
      place: '',
      description: '',
      date_start: new Date(),
      date_end: new Date(),
      memberName: '',

      event: new Event()
    }
  },
  methods: {
    createEvent () {
      let newEvent = new Event()
      newEvent.title = this.title
      newEvent.host = this.host
      newEvent.location = this.place
      newEvent.description = this.description
      newEvent.date_start = this.date_start
      newEvent.date_end = this.date_end
      newEvent.initiator_name = this.memberName
      Events.createEvent(newEvent).then(event => {
        this.event = event
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

.createHeader {
  margin-bottom: 1em;
  h2 {
    margin: 0;
  }
  a {
    margin-left: auto;
  }
  display: flex;
  align-items: baseline;
}



</style>
