<template>
  <ul class="participant-tags">
    <li v-for="participant in participants" :key="participant.id"
      :class="['participant-tag', {me: participant.id === me.id}]">
      {{ participant.name }}
    </li>
  </ul>
</template>

<script>
import currentParticipant from '@/services/CurrentParticipant'

export default {
  props: ['participants'],

  data () {
    return {
      me: currentParticipant
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
