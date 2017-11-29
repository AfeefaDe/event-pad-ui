import Vue from 'vue'

export default new Vue({
  methods: {
    show (dialog) {
      if (!dialog.yesButton) {
        dialog.yesButton = 'Ja'
      }
      if (!dialog.noButton) {
        dialog.noButton = 'Nein'
      }

      const promise = new Promise((resolve, reject) => {
        dialog.yes = () => {
          resolve('yes')
          this.$emit('hide')
        }
        dialog.no = () => {
          resolve('no')
          this.$emit('hide')
        }
        dialog.cancel = () => {
          resolve('cancel')
          this.$emit('hide')
        }
      })

      this.$emit('show', dialog)
      return promise
    },

    hide () {
      this.$emit('hide')
    }
  }
})
