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
      this.$emit('onSelect', participant)
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

<style lang="scss" scoped>
@import '~variables';
@import '~mixins';

.participant-tag {
  @include user-select();

  display: inline-block;
  background-color: $creme;
  margin-bottom: .3rem;
  padding: 0 .4rem;
  margin-left: .2rem;
  &:first-child {
    margin-left: 0;
  }

  &.me {
    background-color: $blue;
    color: $white;
  }

  &.selectable {
    cursor: pointer;
  }
}

.participant-tags {
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}
</style>