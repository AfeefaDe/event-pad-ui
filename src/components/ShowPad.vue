<template>

  <div v-if="event">

    <div ref="header" class="header">
      <div ref="pattern" class="pattern"></div>
      <div class="header-content">
        <h1>{{ event.title }}</h1>
        <p>{{ event.dateStart.toLocaleDateString() }} {{ event.dateStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</p>
        <p>
          <span class="location" @click="openLocationInGMaps()">{{event.location}}</span>
        </p>
      </div>
      <div class="name-button">
        <a v-if="participant.name" href="" @click.prevent="changeName">{{ participant.name }} <i class="material-icons">mode_edit</i></a>
        <a v-else href="" @click.prevent="changeName">Wer bist du?</a>
      </div>
    </div>

    <section v-if="event.description" class="description">
      <h2>Beschreibung</h2>
      {{event.description}}
    </section>

    <section>
      <h2>Teilnahme</h2>
      <div class="participants">
        <div class="list">
        <button class="button-green button-small button-small-margin" @click="attend">Komme</button>
          <ul class="participant-tags">
            <li v-for="attendent in attenders" :key="attendent.id"
              :class="['participant-tag', {me: attendent.id === participant.id}]">
              {{ attendent.name }}
            </li>
          </ul>
        </div>
        <div class="list unsure">
          <button class="button-default button-small button-small-margin" @click="unsure()">Weiß nicht</button>
          <ul class="participant-tags">
            <li v-for="unsurer in unsurers" :key="unsurer.id"
              :class="['participant-tag', {me: unsurer.id === participant.id}]">
              {{ unsurer.name }}
            </li>
          </ul>
        </div>
        <div class="list not-coming">
          <button class="button-red button-small button-small-margin" @click="miss()">Komme nicht</button>
          <ul class="participant-tags">
            <li v-for="misser in missers" :key="misser.id"
              :class="['participant-tag', {me: misser.id === participant.id}]">
              {{ misser.name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="todos" v-if="tasks.length">
      <h2>Aufgaben</h2>
      <div v-for="task in tasks" :key="task.id">
        {{ task.name }}
        <button class="button-green button-xs" href="" @click.prevent="takeTask(task)" v-if="!haveTask(task)">Ich mach das</button>
        <button class="button-red button-xs" href="" @click.prevent="leaveTask(task)" v-if="haveTask(task)">Ich mach das doch nicht</button>
        <ul class="participant-tags">
          <li v-for="assignee in task.assignees" :key="assignee.id"
            :class="['participant-tag', {me: assignee.id === participant.id}]">
            {{ assignee.name }}
          </li>
        </ul>
      </div>
    </section>

    <section class="discussion" v-if="false">
      <h2>Diskussion</h2>
      <div class="message">
        <p class="author">Misha um 15:20</p>
        <p>Ich schaff's leider nicht heute. Bin noch länger beim Klienten :/</p>
      </div>
      <div class="message">
        <p class="author">Felix um 17:09</p>
        <p>So schönes Wetter! Wir verlegen die Sitzung auf die Wiese vorm Hub.</p>
      </div>
      <div class="message">
        <p class="author">Jens um 17:43</p>
        <p>Wird 10 Min später bei mir.</p>
      </div>
      <div class="message event-start">- 18:00 Start -</div>
      <div class="message">
        <p class="author">Jens um 23:35</p>
        <p>Wir sind echt ein geiles Team! Sorry für die vielen Details.</p>
      </div>
      <div class="user-message-input">
        <textarea rows="3" placeholder="Nachricht schreiben" />
        <button class="button-small"><i class="material-icons">send</i></button>
      </div>
    </section>

    <section v-if="false">
      <h2>Merken & Verbreiten</h2>
      <event-link-clipboard :event="event"></event-link-clipboard>
    </section>

    <section class="misc-actions" v-if="false">
      <a :href="mailContent"><i class="material-icons">mail_outline</i><br>Per Mail senden</a>
      <span><i class="material-icons">bookmark_border</i><br>Lesezeichen speichern</span>
      <a href="webcal://afeefa.de/events" target="_blank"><i class="material-icons">event</i><br>In Kalender speichern</a>
    </section>

    <name-selection
      :participants="participants"
      :participant="participant"
      ref="nameSelection"
      @onRename="onRenamePerson"
      @onAdd="onAddPerson"
      @onReset="onResetPerson"
      @onChange="onChangePerson">
    </name-selection>

  </div>
</template>

<script>
import EventLinkClipboard from './EventLinkClipboard'
import Events from '@/resources/Events'
import Participant from '@/models/Participant'
import NameSelection from './NameSelection'

export default {
  name: 'ShowPad',
  data () {
    return {
      event: null,
      participant: null,
      participants: [],
      tasks: []
    }
  },
  created () {
    this.participant = new Participant()

    Events.getEvent(this.$route.params.uri).then(event => {
      if (event) {
        this.event = event
        this.participants = event.participants
        this.tasks = event.tasks
        this.recoverParticipantFromStorage()
      } else {
        // @todo: trigger alert on main page
        // this.$router.replace('/')
        alert('event nicht gefunden ' + this.$route.params.uri)
      }
    })
  },
  computed: {
    mailContent () {
      return 'mailto:?body=' + this.event.generateFullLink() + '&subject=Einladung: ' + this.event.title
    },
    attenders () {
      return this.participants.filter(p => p.rsvp === Participant.I_ATTEND)
    },
    missers () {
      return this.participants.filter(p => p.rsvp === Participant.I_MISS)
    },
    unsurers () {
      return this.participants.filter(p => p.rsvp === Participant.I_DONT_KNOW)
    }
  },
  methods: {
    changeName () {
      this.$refs.nameSelection.show()
    },

    recoverParticipantFromStorage () {
      const participantId = localStorage.getItem(`event-${this.event.uri}`)
      if (participantId) {
        const participant = this.participants.find(participant => participant.id === parseInt(participantId))
        if (participant) {
          this.participant = participant
        } else {
          localStorage.removeItem(`event-${this.event.uri}`)
        }
      }
      this.participant.name = this.participant.name || localStorage.getItem('name') || ''
    },

    fetchParticipants () {
      return Events.getParticipans(this.event).then(participants => {
        this.participants = participants
      })
    },

    fetchTasks () {
      Events.getTasks(this.event).then(tasks => {
        this.tasks = tasks
      })
    },

    openLocationInGMaps: function () {
      window.open('http://maps.google.de/maps/search/' + this.event.location.replace(' ', '+'))
    },

    attend () {
      this.participant.rsvp = Participant.I_ATTEND
      this.updateOrAddParticipant()
    },

    miss () {
      this.participant.rsvp = Participant.I_MISS
      this.updateOrAddParticipant()
    },

    unsure () {
      this.participant.rsvp = Participant.I_DONT_KNOW
      this.updateOrAddParticipant()
    },

    haveTask (task) {
      return task.assignees.some(p => p.id === this.participant.id)
    },

    storeParticipation () {
      localStorage.setItem(`event-${this.event.uri}`, this.participant.id)
      localStorage.setItem('name', this.participant.name)
    },

    takeTask (task) {
      if (!this.participant.name) {
        this.$refs.nameSelection.show().then(() => {
          this.takeTask(task)
        })
        return
      }

      Events.assignTask(this.event, task, this.participant).then(participant => {
        if (participant) {
          this.participant = participant
          this.storeParticipation()
        }
        this.fetchTasks()
        this.fetchParticipants()
      })
    },

    leaveTask (task) {
      Events.leaveTask(this.event, task, this.participant).then(() => {
        this.fetchTasks()
      })
    },

    updateOrAddParticipant (participant = this.participant) {
      if (!this.participant.name) {
        this.$refs.nameSelection.show().then(() => {
          this.updateOrAddParticipant(this.participant)
        })
        return
      }

      let promise
      if (this.participant.id) {
        promise = Events.updateParticipant(this.event, participant)
      } else {
        promise = Events.addParticipant(this.event, participant)
      }
      promise.then(participant => {
        if (participant) {
          this.participant = participant
          this.storeParticipation()
        }
        this.fetchParticipants()
        this.fetchTasks()
      })
    },

    onRenamePerson (name) {
      this.participant.name = name
      this.updateOrAddParticipant()
    },

    onAddPerson (name) {
      this.participant.name = name
      this.updateOrAddParticipant()
    },

    onResetPerson () {
      localStorage.removeItem(`event-${this.event.uri}`)
      localStorage.removeItem('name')
      this.participant = new Participant()
    },

    onChangePerson (participant) {
      this.participant = participant
      this.storeParticipation()
    }
  },

  components: {
    EventLinkClipboard,
    NameSelection
  }
}
</script>

<style lang="scss" scoped>
@import "~variables";

h1 {
  color: $white;
  font-size: 1.3rem;
  display: inline-block;
  text-transform: uppercase;
  border: none;
  margin-bottom: .5em;
}

p {
  margin: 0;
}

.header {
  width: 100%;
  height: auto;
  background-color: $black;
  position: relative;
}

.pattern {
  position: absolute;
  top: 0;
  z-index: 5;
}

.name-button {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 11;

  a {
    background-color: $green;
    padding: 2px 8px;
    border-radius: 2px;
    color: white;
    text-decoration: none;
    display: block;
  }

  i {
    vertical-align: middle;
    font-size: 1.2em;
    position: relative;
    top: -2px;
  }
}

.header-content {
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
  color: $white;
}

.location {
  border-bottom: 1px dashed white;
  cursor: pointer;
}

.participants {
  display: flex;
  margin-bottom: 1rem;

  button {
    width: 11em;
  }

  .list {
    width: 50%;
    padding-right: 1rem;
  }
}

.misc-actions {
  /*background-color: $creme;*/
  display: flex;
  justify-content: space-evenly;

  span, a {
    display: block;
    margin: 0 1em;

    font-size: .8rem;
    line-height: 1rem;
    /*color: lighten($black, 40);*/
    text-align: center;
    text-decoration: none;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
    i {
      font-size: 2.5rem;
      color: $black;
      padding-bottom: .2em;
    }
  }
}

.discussion {
  background-color: $creme;
}

.message {
  background-color: $white;
  margin-bottom: 1rem;
  padding: .5rem;
  line-height: 1.2rem;

  &.event-start {
    background-color: inherit;
    font-style: italic;
    text-align: center;
  }
}

.author {
  color: lighten($black, 40);
  font-size: .8rem;
}

.user-message-input {
  display: flex;
  align-items: flex-end;

  textarea {
    background-color: $white;
    height: 3rem;
    margin: 0;
    padding: .5em;
    font-size: 1rem;
  }

  button {
    background-color: $white;
    margin: 0 0 0 .5em;
    height: 3rem;
  }
}
</style>
