<template>
  <div class="EventLinkClipboard">
    <input ref="linkField" :value="fullLink"/>
    <button class="button-small button-small-margin" @click="copyToClipboard()"><i class="material-icons">content_copy</i></button>
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
      return this.event.generateFullLink()
    }
  },
  methods: {
    copyToClipboard: function () {
      this.$refs.linkField.select()
      document.execCommand('Copy')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

.EventLinkClipboard {
  display: flex;
  justify-content: flex-start;
}

input {
  height: 3rem;
  box-sizing: border-box;
  padding: .5rem;
  margin: 0;
  text-align: center;
  font-size: .75rem;
  border: none;
  background-color: $creme;
}

button {
  margin: 0 0 0 .5rem;
  height: 3rem;
  /*display: inline;*/
}

</style>
