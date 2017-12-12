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
        <a v-if="me.name" href="" @click.prevent="changeName">{{ me.name }} <i class="material-icons">mode_edit</i></a>
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
          <participant-list :participants="attendingPersons"></participant-list>
        </div>
        <div class="list unsure">
          <button class="button-default button-small button-small-margin" @click="unsure">Weiß nicht</button>
          <participant-list :participants="unsurePersons"></participant-list>
        </div>
        <div class="list not-coming">
          <button class="button-red button-small button-small-margin" @click="miss">Komme nicht</button>
          <participant-list :participants="missingPersons"></participant-list>
        </div>
      </div>
    </section>

    <section class="todos" v-if="event.tasks.length">
      <h2>Aufgaben</h2>
      <div v-for="task in event.tasks" :key="task.id">
        {{ task.name }}
        <button class="button-green button-xs" href="" @click.prevent="takeTask(task)" v-if="!haveTask(task)">Ich mach das</button>
        <button class="button-red button-xs" href="" @click.prevent="leaveTask(task)" v-if="haveTask(task)">Ich mach das doch nicht</button>
        <participant-list :participants="task.assignees"></participant-list>
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
      :event="event"
      ref="nameSelection"
      @onRename="onRenameParticipant">
    </name-selection>

  </div>
</template>

<script>
import EventLinkClipboard from './EventLinkClipboard'
import ParticipantList from './ParticipantList'
import Events from '@/resources/Events'
import Participant from '@/models/Participant'
import NameSelection from './NameSelection'
import currentParticipant from '@/services/CurrentParticipant'

export default {
  name: 'ShowPad',

  data () {
    return {
      event: null,
      me: currentParticipant
    }
  },

  created () {
    this.loadEvent()
  },

  computed: {
    mailContent () {
      return 'mailto:?body=' + this.event.generateFullLink() + '&subject=Einladung: ' + this.event.title
    },

    attendingPersons () {
      return this.event.participants.filter(p => p.rsvp === Participant.I_ATTEND)
    },

    missingPersons () {
      return this.event.participants.filter(p => p.rsvp === Participant.I_MISS)
    },

    unsurePersons () {
      return this.event.participants.filter(p => p.rsvp === Participant.I_DONT_KNOW)
    }
  },

  methods: {
    loadEvent () {
      Events.getEvent(this.$route.params.uri).then(event => {
        if (event) {
          this.event = event
          this.me.authenticateForEvent(event)
        } else {
          // @todo: trigger alert on main page
          // this.$router.replace('/')
          alert('event nicht gefunden ' + this.$route.params.uri)
        }
      })
    },

    changeName () {
      this.$refs.nameSelection.show()
    },

    fetchParticipants () {
      return Events.getParticipans(this.event).then(participants => {
        this.event.participants = participants
      })
    },

    fetchTasks () {
      Events.getTasks(this.event).then(tasks => {
        this.event.tasks = tasks
      })
    },

    openLocationInGMaps: function () {
      window.open('http://maps.google.de/maps/search/' + this.event.location.replace(' ', '+'))
    },

    attend () {
      this._saveParticipation(Participant.I_ATTEND)
    },

    unsure () {
      this._saveParticipation(Participant.I_DONT_KNOW)
    },

    miss () {
      this._saveParticipation(Participant.I_MISS)
    },

    checkName () {
      if (this.me.name) {
        return Promise.resolve()
      } else {
        return new Promise((resolve, reject) => {
          this.$refs.nameSelection.show().then(() => {
            resolve()
          })
        })
      }
    },

    _saveParticipation (rsvp) {
      this.checkName().then(() => {
        this.me.rsvp = rsvp

        let promise
        if (this.me.id) {
          promise = Events.updateParticipant(this.event, this.me)
        } else {
          promise = Events.addParticipant(this.event, this.me)
        }
        promise.then(participant => {
          this.me.setParticipant(participant)
          this.fetchParticipants()
        })
      })
    },

    haveTask (task) {
      return task.assignees.some(p => p.id === this.me.id)
    },

    takeTask (task) {
      this.checkName().then(() => {
        Events.assignTask(this.event, task, this.me).then(participant => {
          this.me.setParticipant(participant)
          this.fetchTasks()
          this.fetchParticipants() // in case a new participant has been added to the participation list
        })
      })
    },

    leaveTask (task) {
      Events.leaveTask(this.event, task, this.me).then(() => {
        this.fetchTasks()
      })
    },

    onRenameParticipant () {
      if (this.me.id) { // save new name to db
        Events.updateParticipant(this.event, this.me).then(participant => {
          this.me.setParticipant(participant)
          this.fetchTasks() // show new name in tasks
          this.fetchParticipants() // show new name in participants list
        })
      }
    }
  },

  components: {
    ParticipantList,
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
