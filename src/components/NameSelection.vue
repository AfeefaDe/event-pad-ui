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
          <div v-if="participant.name">
            <section>
              <h2>Ich bin nicht {{ participant.name }}</h2>
              <button @click="resetPerson">Person wechseln</button>
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
            <section>
              <h2>Ich war schon hier</h2>
              <ul class="participant-tags">
                <li v-for="participant in participants" :key="participant.id"
                  :class="['participant-tag', {me: participantToSelect === participant}]"
                  @mouseover="participantToSelect = participant"
                  @mouseout="participantToSelect = null"
                  @click="selectParticipant(participant)">
                  {{ participant.name }}
                </li>
              </ul>

            </section>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import Vue from 'vue'

export default {
  props: ['participants', 'participant'],

  data () {
    return {
      showWindow: false,
      hasCancelListeners: false,
      participantName: '',
      participantToSelect: null,
      promiseResolve: null
    }
  },

  methods: {
    onMouseUp (event) {
      const modalDom = this.$el.querySelector('.modal')
      if (!modalDom.contains(event.target)) {
        this.hide()
      }
    },

    onKeyUp (event) {
      if (event.keyCode === 27) {
        this.hide()
      }
    },

    show () {
      if (!this.hasCancelListeners) {
        window.addEventListener('keyup', this.onKeyUp)
        window.addEventListener('mouseup', this.onMouseUp)
        this.hasCancelListeners = true
      }

      this.participantName = this.participant.name
      this.showWindow = true

      if (!this.participant.name) {
        this.focusInput()
      }

      return new Promise((resolve, reject) => {
        this.$on('hide', resolve)
      })
    },

    hide () {
      window.removeEventListener('keyup', this.onKeyUp)
      window.removeEventListener('mouseup', this.onMouseUp)
      this.hasCancelListeners = false
      this.showWindow = false
      this.$emit('hide')
    },

    rename () {
      this.$emit('onRename', this.participantName)
      this.hide()
    },

    add () {
      this.$emit('onAdd', this.participantName)
      this.hide()
    },

    resetPerson () {
      this.$emit('onReset')
      this.participantName = ''
      this.focusInput()
    },

    selectParticipant (participant) {
      this.$emit('onChange', participant)
      this.hide()
    },

    focusInput () {
      Vue.nextTick(() => {
        this.$refs.nameInput.focus()
      })
    }
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

    .participant-tag {
      cursor: pointer;
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
