<template>
  <div>
    <form @submit.prevent="createPad">
      <label for="memberName">Please enter your name, that others can recognize you</label>
      <input type="text" id="memberName" v-model="memberName" placeholder="Your Name">

      <label for="title">Title of the Event</label>
      <input type="text" id="title" v-model="title" placeholder="Event Title">

      <label for="place">Place of the Event</label>
      <input type="text" id="place" v-model="place" placeholder="Event Place">

      <label for="description">Agenda of the event</label>
      <textarea id="description" v-model="description" rows="10" cols="20"></textarea>

      <label for="date">Date of the Event</label>
      <input type="datetime-local" v-model="date" id="date" placeholder="Event Date">

      <button type="submit">Create Event</button>
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
      console.log('TODO: cretae Pad  with the name: ', this.title)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

</style>
