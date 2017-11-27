<template>
<div>
  <div class="content">
    <header>
      <h1>Neues Treffen</h1>
    </header>
    <tabbed-form :event="null" @saveActionTriggered="createEvent" :hasValidationError="hasValidationError">
      <div slot="tab0">

        <label for="title">Was</label>
        <input type="text" id="title" v-model="newEvent.title" autofocus
          @blur="checkTitleEmpty()" @input="checkTitleEmpty()" placeholder="Titel eingeben...">
        <span class="error-message" v-if="titleError">Bitte gib einen Titel ein.</span>

        <label for="dateStart">Wann</label>
        <input type="datetime-local" v-model="dateStart" id="dateStart"
          @blur="checkDateEmpty()" @input="checkDateEmpty()">
        <span class="error-message" v-if="dateError">Bitte gib eine Zeit an.</span>

        <label for="place">Wo</label>
        <input type="text" id="place" v-model="newEvent.location" placeholder="Ort eingeben...">

        <label for="description">Details</label>
        <textarea class="inputStyle" id="description" v-model="newEvent.description" placeholder="..."></textarea>

        <label>Aufgaben zu verteilen</label>
        <div class="task-input">
          <input type="text" v-model="newTaskName" @keyup.enter="addTask">
          <a href="" @click.prevent="addTask"><i class="material-icons">add_circle_outline</i></a>
        </div>
        <div class="task-list">
          <div class="task-list__item" v-for="(task, index) in tasks" :key="index">
            <div>{{ index + 1 }}. {{ task.name }}</div>
            <a href="" @click.prevent="removeTask(task)"><i class="material-icons">remove_circle_outline</i></a>
          </div>
        </div>
      </div>

      <div slot="tab1">
        <label for="description">Benötigt</label>
        <input type="checkbox" value="">Bier
      </div>
    </tabbed-form>
  </div>
</div>
</div>
</template>

<script>
import TabbedForm from '@/components/TabbedForm'
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Task from '@/models/Task'
import Events from '@/resources/Events'
import autosize from 'autosize'

export default {
  name: 'CreatePad',
  components: { TabbedForm, EventLinkClipboard },
  data () {
    return {
      newEvent: null,
      dateStart: null,
      titleError: false,
      dateError: false,
      newTaskName: '',
      tasks: []
    }
  },
  computed: {
    hasValidationError () {
      return !this.newEvent.title.trim() || !this.dateStart
    }
  },
  created () {
    this.newEvent = new Event()
    this.dateStart = this.newEvent.dateStart.toJSON().slice(0, 19)
  },
  mounted () {
    autosize(this.$el.querySelector('#description'))
  },

  methods: {
    checkTitleEmpty () {
      this.titleError = !this.newEvent.title.trim()
    },
    checkDateEmpty () {
      this.dateError = !this.dateStart
    },
    createEvent () {
      this.newEvent.dateStart = new Date(this.dateStart)
      this.newEvent.tasks = this.tasks
      Events.createEvent(this.newEvent).then(event => {
        Events.addTasks(event, this.tasks).then(tasks => {
          this.$router.push({ name: 'show', params: {uri: event.uri, event: event} })
        })
      })
    },
    addTask () {
      if (!this.newTaskName.trim()) {
        return
      }
      const task = new Task()
      task.name = this.newTaskName
      this.tasks.push(task)
      this.newTaskName = ''
    },
    removeTask (task) {
      this.tasks = this.tasks.filter(theTask => {
        return theTask !== task
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

header {
  text-align: center;
  margin: 0 0 2em;
}

i {
  color: $darkGray;
}

.error-message {
  font-size: .9em;
  color: #ee3333;
}

.task-input, .task-list__item {
  > * {
    display: inline-block;
  }
  > *:first-child {
    width: 60%;
    margin-right: 10px;
  }
  > *:last-child {
    font-size: 2rem;
    vertical-align: middle;
    width: 10%;
  }
}

.task-list {
  margin-top: 1em;
}

</style>
