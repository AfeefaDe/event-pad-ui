<template>
  <ul class="participant-tags">
    <template v-if="selectable">
      <li v-for="participant in participants"
        :key="participant.id"
        :class="['participant-tag', 'selectable', {me: isMe(participant)}]"
        @mouseover="participantToSelect = participant"
        @mouseout="participantToSelect = null"
        @click="selectParticipant(participant)">
          {{ participant.name }}
      </li>
    </template>
    <template v-else>
      <li v-for="participant in participants"
        :key="participant.id"
        :class="['participant-tag', {me: isMe(participant)}]">
          {{ participant.name }}
      </li>
    </template>
  </ul>
</template>

<script>
import currentParticipant from '@/services/CurrentParticipant'

export default {
  props: ['participants', 'selectable'],

  data () {
    return {
      me: currentParticipant,
      participantToSelect: null
    }
  },

  methods: {
    selectParticipant (participant) {
      this.me.setParticipant(participant)
      this.$emit('onSelect')
    },

    isMe (participant) {
      if (participant.id === this.me.id) {
        return true
      }

      if (this.participantToSelect && this.participantToSelect.id === participant.id) {
        return true
      }

      return false
    }
  }
}
</script>
