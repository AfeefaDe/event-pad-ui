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
    </div>

    <section v-if="event.description" class="description">
      <h2>Beschreibung</h2>
      <pre>{{event.description}}</pre>
    </section>

    <section>
      <div>
        Name: <input v-model="participant.name">
      </div>
      <div class="participants">
        <div class="list">
        <button class="button-green button-small button-small-margin" @click="attend()">Komme</button>
          <ul>
            <li v-for="attendent in attenders" :key="attendent.id" :class="{me: attendent.id === participant.id}">
              {{ attendent.name }}
            </li>
          </ul>
        </div>
        <div class="list not-coming">
        <button class="button-red button-small button-small-margin" @click="miss()">Komme nicht</button>
          <ul>
            <li v-for="misser in missers" :key="misser.id" :class="{me: misser.id === participant.id}">
              {{ misser.name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="todos" v-if="tasks.length">
      <h2>Benötigt</h2>
      <ul>
        <li v-for="task in tasks">{{ task.name }}</li>
      </ul>
    </section>

    <section class="discussion">
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

    <section>
      <h2>Treffen merken & verbreiten</h2>
      <event-link-clipboard :event="event"></event-link-clipboard>
    </section>

    <section class="misc-actions">
      <a :href="mailContent"><i class="material-icons">mail_outline</i><br>Per Mail senden</a>
      <span><i class="material-icons">bookmark_border</i><br>Lesezeichen speichern</span>
      <a href="webcal://afeefa.de/events" target="_blank"><i class="material-icons">event</i><br>In Kalender speichern</a>
    </section>

  </div>
</template>

<script>
// import Trianglify from 'trianglify'
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Events from '@/resources/Events'
import Participant from '@/models/Participant'

export default {
  name: 'ShowPad',
  components: {EventLinkClipboard},
  data () {
    return {
      event: null,
      participant: null,
      participants: [],
      tasks: []
    }
  },
  created () {
    Events.getEvent(this.$route.params.uri).then((loadedEvent) => {
      if (loadedEvent) {
        this.event = loadedEvent
        this.fetchParticipants()
        this.fetchTasks()
      } else {
        // @todo: trigger alert on main page
        this.$router.replace('/')
      }
    })

    this.participant = new Participant()
    this.participant.name = localStorage.getItem('participant.name') || ''
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
    }
  },
  methods: {
    fetchParticipants () {
      Events.getParticipans(this.event).then(participants => {
        this.participants = participants
        // check if the user already participates
        const storedParticipantId = localStorage.getItem('participant.id')
        if (storedParticipantId) {
          this.participants.forEach(participant => {
            if (parseInt(storedParticipantId) === participant.id) {
              this.participant = participant
            }
          })
        }
      })
    },
    fetchTasks () {
      Events.getTasks(this.event).then(tasks => {
        this.tasks = tasks
      })
    },
    setEvent: function (event) {
      console.log('SET EVENT')
      this.event = event
    },
    openLocationInGMaps: function () {
      window.open('http://maps.google.de/maps/search/' + this.event.location.replace(' ', '+'))
    },
    userAction: function () {
      let userName = prompt('Gib deinen Namen einen, mit andere dich erkennen:')
      console.debug(userName)
    },
    attend: function () {
      this.participant.rsvp = Participant.I_ATTEND
      this.updateOrAdd()
    },
    miss: function () {
      this.participant.rsvp = Participant.I_MISS
      this.updateOrAdd()
    },
    storeName () {
      localStorage.setItem('participant.name', this.participant.name)
    },
    storeParticipation () {
      // const data = {
      //   eventId: this.event.id,
      //   participantId: this.participant.id
      // }
      localStorage.setItem('participant.name', this.participant.name)
    },
    updateOrAdd () {
      if (this.participant.id) {
        Events.updateParticipant(this.event, this.participant).then(participant => {
          this.participant = participant
          this.fetchParticipants()
        })
      } else {
        Events.addParticipant(this.event, this.participant).then(participant => {
          this.participant = participant
          this.storeParticipation()
          this.fetchParticipants()
        })
      }
      this.storeName()
    }
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

.description {
  /*background: $creme;*/
}

pre {
  margin: 0;
  white-space: pre-wrap;
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

    &.not-coming {
      /*text-align: right;*/
    }
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding-left: 0;
  }
  li {
    display: inline-block;
    background-color: $creme;
    margin-bottom: .3rem;
    padding: .2rem;
    margin-left: .2rem;
  }
  li.me {
    background-color: $blue;
    color: $white;
  }
}

.todos {
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
