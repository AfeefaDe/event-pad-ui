<template>
<div>
  <div class="content">
    <header>
      <h1>Neues Treffen</h1>
    </header>
    <tabbed-form :event="null" @saveActionTriggered="createEvent" :hasValidationError="hasValidationError">
      <div slot="tab0">

        <!-- <label for="title">Was</label> -->
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
        <textarea class="inputStyle" id="description" v-model="newEvent.description" placeholder="Details eingeben..."></textarea>

        <label>Aufgaben zu verteilen</label>

        <div class="checklist-list">
          <div class="checklist-list__item" v-for="(checklist, index) in newEvent.checklists" :key="index">
            <div>
              <i class="material-icons">playlist_add_check</i></a> {{ checklist.title }}
              <a href="" @click.prevent="removeChecklist(checklist)">Löschen</a>
            </div>

            <div class="task-list">
              <div class="task-list__item" v-for="(task, index) in checklist.tasks" :key="index">
                <div>
                  <i class="material-icons">check_box_outline_blank</i></a> {{ task.name }}
                  <a href="" @click.prevent="removeTask(checklist, task)">Löschen</a>
                </div>
              </div>
            </div>

            <div class="task-create">
              <div class="task-input-link" v-if="!taskInputActive(checklist)">
                <a href="" @click.prevent="activateTaskInput(checklist)">Aufgabe hinzufügen</a>
              </div>
              <div class="task-input" v-else>
                <input type="text" v-model="newTaskName" @keyup.enter="addTask(checklist)" placeholder="Neue Aufgabe" :ref="'taskinput' + checklist.__ID">
                <br>
                <a href="" @click.prevent="addTask(checklist)"><i class="material-icons">add_circle_outline</i></a>
                <a href="" @click.prevent="activeTaskInput = null"><i class="material-icons">close</i></a>
              </div>
            </div>

          </div>
        </div>

        <div class="checklist-create">
          <div class="checklist-input-link" v-if="!checklistInputActive">
            <a href="" @click.prevent="activateChecklistInput()">Aufgabenliste hinzufügen</a>
          </div>
          <div class="checklist-input" v-else>
            <input type="text" v-model="newChecklistTitle" @keyup.enter="addChecklist" placeholder="Neue Aufgabenliste" ref="checklistInput">
            <br>
            <a href="" @click.prevent="addChecklist"><i class="material-icons">add_circle_outline</i></a>
            <a href="" @click.prevent="checklistInputActive = false"><i class="material-icons">close</i></a>
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
import Vue from 'vue'
import TabbedForm from '@/components/TabbedForm'
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Task from '@/models/Task'
import Checklist from '@/models/Checklist'
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
      newChecklistTitle: '',
      tasks: [],
      checklistInputActive: false,
      activeTaskInput: null
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
      Events.createEvent(this.newEvent).then(event => {
        this.$router.push({ name: 'show', params: {uri: event.uri, event: event} })
      })
    },
    activateChecklistInput () {
      this.checklistInputActive = true
      Vue.nextTick(() => {
        this.$refs.checklistInput.focus()
      })
    },
    addChecklist () {
      if (!this.newChecklistTitle.trim()) {
        return
      }
      const checklist = new Checklist()
      checklist.title = this.newChecklistTitle
      this.newEvent.checklists.push(checklist)
      this.newChecklistTitle = ''
      this.checklistInputActive = false
    },
    removeChecklist (checklist) {
      this.newEvent.checklists = this.newEvent.checklists.filter(theChecklist => {
        return theChecklist !== checklist
      })
    },
    activateTaskInput (checklist) {
      this.activeTaskInput = checklist
      Vue.nextTick(() => {
        this.$refs['taskinput' + checklist.__ID][0].focus()
      })
    },
    taskInputActive (checklist) {
      return this.activeTaskInput === checklist
    },
    addTask (checklist) {
      if (!this.newTaskName.trim()) {
        return
      }
      const task = new Task()
      task.name = this.newTaskName
      checklist.tasks.push(task)
      this.newTaskName = ''
      this.activeTaskInput = null
    },
    removeTask (checklist, task) {
      checklist.tasks = checklist.tasks.filter(theTask => {
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
  margin: 0 0 3em;
}

i {
  color: $darkGray;
}

label {
  margin-top: 2rem;
}
.error-message {
  position: absolute;
  /*top: 0;*/
  font-size: .9em;
  color: #ee3333;
}

.checklist-list__item {
  margin-top: 1em;
  margin-bottom: 1em;
}

.task-list, .task-create {
  margin-left: 30px;
}

.task-list {
}

</style>
