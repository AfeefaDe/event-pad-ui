<template>
  <div class="EventLinkClipboard">
    <input ref="linkField" :value="fullLink"/><br>
    <button class="inputStyle button" @click="copyToClipboard()"><i class="material-icons">content_copy</i></button>
    <button class="inputStyle button" @click="sendMail()"><i class="material-icons">mail</i></button><br>
    <span v-if="message">{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'EventLinkClipboard',
  data () {
    return {
      message: ''
    }
  },
  props: ['event'],
  computed: {
    fullLink () {
      return 'events.afeefa.de/treffen/' + this.event.uri
    }
  },
  methods: {
    copyToClipboard: function () {
      this.$refs.linkField.select()
      document.execCommand('Copy')
      this.message = 'Copied to clipboard ✓'
    },
    sendMail: function () {
      alert('Einladung per Mail versenden')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

.EventLinkClipboard {
  /*display: block;*/
  text-align: center;
  /*display: flex;*/
}

input {
  width: 90%;
  display: inline;
  padding: .5rem;
  text-align: center;
  font-size: .75rem;
}

button {
  display: inline;
}

</style>
