<template>
<div>
  <div class="content">
    <div class="createHeader">
      <h2>Neues Treffen anlegen</h2>
    </div>
    <tabbed-form :eventId="eventId" @saveActionTriggered="createEvent">
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
        @TODO: ausgeben des Links
      </div>

    </tabbed-form>
  </div>
</div>
</div>
</template>

<script>
import TabbedForm from '@/components/TabbedForm'

export default {
  name: 'CreatePad',
  components: { TabbedForm },
  data () {
    return {
      memberName: '',
      title: '',
      place: '',
      description: '',
      date_start: '',
      date_end: '',
      host: '',
      eventId: '5nfko4-redaktionstreffen'
    }
  },
  methods: {
    createEvent: function () {
      let newEvent = {
        member: this.memberName,
        title: this.title,
        place: this.place,
        description: this.description,
        date_end: this.date_end,
        date_start: this.date_start,
        host: this.host
      }
      console.log('Create Event:', newEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

label {
  display: block;
  font-size: 0.9rem;
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
