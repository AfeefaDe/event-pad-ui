<template>
  <div>
    <form @submit.prevent="createPad">
      <label for="memberName">Please enter your name, that others can recognize you</label>
      <input class="inputStyle" type="text" id="memberName" v-model="memberName" placeholder="Your Name" autofocus>

      <label for="title">Title of the Event</label>
      <input class="inputStyle" type="text" id="title" v-model="title" placeholder="Event Title">

      <label for="place">Place of the Event</label>
      <input class="inputStyle" type="text" id="place" v-model="place" placeholder="Event Place">

      <label for="description">Agenda of the event</label>
      <textarea class="inputStyle" id="description" v-model="description" rows="10" cols="20" placeholder="Event Description"></textarea>

      <label for="date">Date of the Event</label>
      <input class="inputStyle" type="datetime-local" v-model="date" id="date" placeholder="Event Date">

      <button class="inputStyle submitButton" type="submit">Create Event</button>
    </form>
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

h1 {
  color: $black;
}

label {
  display: block;
  font-size: 0.9rem;
}
input, textarea {
  display: block;
  width: 100%;
  font-size: 0.9rem;
  border: 2px solid lighten($gray, 60);
  border-radius: 4px;
  &:focus {
    border-color: $blue;
  }
}
.inputStyle {
  letter-spacing: -0.2px;
  outline: 0;
  margin: 0.5em 0 1.5em 0;
  padding: 0.7em 0.8em 0.6em 0.8em;
  border-radius: 4px;
  font-weight: 600;
}
.submitButton {
    width: auto;
    background: $blue;
    color: white;
    border-style: none;
    font-size: 0.9rem;
    padding: 0.9em 3em;
    margin-left: auto;
    margin-right: auto;
    display: block;
    cursor: pointer;
    transition: background ease 0.4s;
    &:hover {
      background: darken($blue, 10)
    }
    &:active {
      background: darken($blue, 20)
    }
  }

</style>
