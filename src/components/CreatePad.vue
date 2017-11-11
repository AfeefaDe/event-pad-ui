<template>
<div>
  <div class="content">
    <div class="createHeader">
      <h2>Neues Treffen anlegen</h2>
      <a href="/"><i class="material-icons">cancel</i></a>
    </div>
    <tabbed-form :eventId="eventId">
      <div slot="tab0">
        <label for="title">Title of the Event</label>
        <input class="inputStyle" type="text" id="title" v-model="title" placeholder="Event Title" autofocus>

        <label for="place">Place of the Event</label>
        <input class="inputStyle" type="text" id="place" v-model="place" placeholder="Event Place">

        <label for="description">Agenda of the event</label>
        <textarea class="inputStyle" id="description" v-model="description" rows="10" cols="20" placeholder="Event Description"></textarea>

        <label for="date">Date of the Event</label>
        <input class="inputStyle" type="datetime-local" v-model="date" id="date" placeholder="Event Date">
      </div>

      <div slot="tab1">
        <label for="memberName">Please enter your name, that others can recognize you</label>
        <input class="inputStyle" type="text" id="memberName" v-model="memberName" placeholder="Your Name" autofocus>
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
      date: '',
      eventId: '5nfko4-redaktionstreffen'
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
