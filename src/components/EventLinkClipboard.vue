<template>
  <div class="EventLinkClipboard">
    <input ref="linkField" :value="fullLink"/><br>
    <button class="inputStyle button" @click="copyToClipboard()"><i class="material-icons">content_copy</i></button><br>
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
  props: ['link'],
  created: function () {
    this.fullLink = 'events.afeefa.de/treffen/' + this.link
  },
  methods: {
    copyToClipboard: function () {
      this.$refs.linkField.select()
      document.execCommand('Copy')
      this.message = 'Copied to clipboard ✓'
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
