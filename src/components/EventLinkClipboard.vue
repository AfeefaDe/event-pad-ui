<template>
  <div class="EventLinkClipboard">
    <input ref="linkField" :value="fullLink"/>
    <button class="button-small-margin" @click="copyToClipboard()"><i class="material-icons">content_copy</i></button>
    <a class="button button-small-margin" :href="mailContent"><i class="material-icons">mail</i></a>
    <span style="display: block" v-if="message">{{message}}</span>
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
    },
    mailContent () {
      return 'mailto:?body=' + this.event.uri + '&subject=Einladung: ' + this.event.title
    }
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
  width: 100%;
  display: inline;
  padding: .5rem;
  text-align: center;
  font-size: .75rem;
  border: none;
  background-color: $creme;
}

button {
  display: inline;
}

</style>
