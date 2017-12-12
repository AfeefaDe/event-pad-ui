<template>
  <div class="modal-container">
    <div :class="['modal-glassframe', showWindow ? 'modal-glassframe--visible' : 'modal-glassframe--invisible']"></div>

    <transition name="modal">
      <div class="modal" v-if="showWindow">
        <div class="modal__closeIcon" @click="hide()">
          <i class="material-icons">close</i>
        </div>
        <div class="modal__title">Wer bist du?</div>
        <div class="modal__content">
          <div v-if="me.name">
            <section>
              <h2>Ich bin nicht {{ me.name }}</h2>
              <button @click="resetParticipant">Person wechseln</button>
            </section>
            <section>
              <h2>Namen korrigieren</h2>
              <div class="nameInput">
                <input v-model="participantName" @keyup.enter="rename">
                <button class="button-small button-small-margin" @click="rename()">OK</button>
              </div>
            </section>
          </div>

          <div v-else>
            <section>
              <h2>Ich bin neu hier</h2>
              <div class="nameInput">
                <input ref="nameInput" v-model="participantName" @keyup.enter="add">
                <button class="button-small button-small-margin" @click="add()">OK</button>
              </div>
            </section>
            <section v-if="event.participants.length">
              <h2>Ich war schon hier</h2>
              <participant-list
                :participants="event.participants"
                :selectable="true"
                @onSelect="hide">
              </participant-list>
            </section>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import Vue from 'vue'
import currentParticipant from '@/services/CurrentParticipant'
import ParticipantList from './ParticipantList'

export default {
  props: ['event'],

  data () {
    return {
      me: currentParticipant,
      showWindow: false,
      hasCancelListeners: false,
      participantName: '',
      participantToSelect: null
    }
  },

  methods: {
    onMouseUp (event) { // click outside
      const modalDom = this.$el.querySelector('.modal')
      if (!modalDom.contains(event.target)) {
        this.cancel()
      }
    },

    onKeyUp (event) { // esc
      if (event.keyCode === 27) {
        this.cancel()
      }
    },

    show () {
      if (!this.hasCancelListeners) {
        window.addEventListener('keyup', this.onKeyUp)
        window.addEventListener('mouseup', this.onMouseUp)
        this.hasCancelListeners = true
      }

      this.participantName = this.me.name
      this.participantToSelect = null
      this.showWindow = true

      if (!this.me.name) {
        this.focusInput()
      }

      const response = {
        then: callback => {
          const handleHide = reason => {
            if (reason === 'done') {
              callback()
            }
            this.$off('hide', handleHide)
          }
          this.$on('hide', handleHide)
        }
      }

      return response
    },

    hide (reason = 'done') {
      window.removeEventListener('keyup', this.onKeyUp)
      window.removeEventListener('mouseup', this.onMouseUp)
      this.hasCancelListeners = false
      this.showWindow = false
      this.$emit('hide', reason)
    },

    cancel () {
      this.hide('cancel')
    },

    rename () {
      this.me.name = this.participantName
      this.$emit('onRename') // parent may update name on server
      this.hide()
    },

    add () {
      this.me.name = this.participantName
      this.hide()
    },

    resetParticipant () {
      this.me.resetParticipant()
      this.participantName = ''
      this.focusInput()
    },

    focusInput () {
      Vue.nextTick(() => {
        this.$refs.nameInput.focus()
      })
    }
  },

  components: {
    ParticipantList
  }
}
</script>


<style lang="scss" scoped>
@import "~variables";

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
}

.modal-glassframe {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 997;
  width: 100%;
  height: 100%;
  background-color: black;
  transition: opacity .1s ease;

  &--visible {
    opacity: .4;
  }
  &--invisible {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
}

.modal {
  $modalPaddingTop: 20px;
  position: fixed;
  z-index: 998;
  left: 50%;
  top: ($header-height*1.1);
  transform: translate(-50%, 0);
  width: 90%;
  max-width: 400px;
  border-radius: 4px;
  background: $white;
  color: $black;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  outline: 0;

  &__closeIcon {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    i {
      font-size: 30px;
    }
  }

  &__title {
    font-weight: 500;
    margin: 0;
    font-size: 1.2rem;
    padding: $modalPaddingTop 1.5em 1em;
  }

  &__content {
    width: 100%;
    font-size: 1.2rem;
    padding-bottom: 1rem;

    .nameInput {
      input {
        max-width: 200px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
}

.modal-enter-active, .modal-leave-active {
  transition: all .4s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  top: 0px;
}
</style>
