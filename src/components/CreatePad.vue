<template>
  <div>
    <h1>Event Pad - Create</h1>
    <form>
      <label for="memberName">Please enter your name, that others can recognize you</label>
      <input type="text" id="memberName" name="memberName" placeholder="Your Name">

      <label for="title">Title of the Event</label>
      <input type="text" id="title" name="title" placeholder="Event Title">

      <label for="place">Place of the Event</label>
      <input type="text" id="place" name="place" placeholder="Event Place">

      <label for="description">Agenda of the event</label>
      <textarea id="description" name="description" rows="10" cols="20"></textarea>

      <label for="date">Date of the Event</label>
      <input type="datetime-local" name="date" id="date" placeholder="Event Date">

    </form>
    <!-- todo: list events -->
  </div>
</template>

<script>
export default {
  name: 'CreatePad'
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $black;
}

</style>
