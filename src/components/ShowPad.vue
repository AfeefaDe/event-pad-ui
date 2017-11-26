<template>
  <div>
    
    <div ref="header" class="header">
      <div ref="pattern" class="pattern"></div>
      <div class="header-content">
        <h1>{{event.title}}</h1>
        <p>{{event.date_start}}</p>
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
      <div class="participants">
        <div class="list">
        <button class="button-green button-small button-small-margin" @click="userAction()">Komme</button>
          <ul>
            <li>Anna</li>
            <li>Felix</li>
            <li>Friedrich</li>
            <li>Jens</li>
          </ul>
        </div>
        <div class="list not-coming">
        <button class="button-red button-small button-small-margin" @click="userAction()">Komme nicht</button>
          <ul>
            <li>Misha</li>
            <li>Ahmad</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="todos">
      <h2>Benötigt</h2>
      <ul>
        <li>Bier</li>
        <li>Essen</li>
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
      <textarea class="inputStyle" rows="3" placeholder="Nachricht schreiben" />
    </section>

    <section>
      <h2>Treffen merken & verbreiten</h2>
      <event-link-clipboard :event="event"></event-link-clipboard>
    </section>

    <section class="misc-actions">
      <a :href="mailContent"><i class="material-icons">mail_outline</i><br>Per Mail senden</a>
      <span><i class="material-icons">star_border</i><br>Lesezeichen speichern</span>
      <a href="webcal://afeefa.de/events" target="_blank"><i class="material-icons">event</i><br>In Kalender speichern</a>
    </section>

  </div>
</template>

<script>
import EventLinkClipboard from '@/components/EventLinkClipboard'
import Event from '@/models/Event'
import Events from '@/resources/Events'
import Trianglify from 'trianglify'

export default {
  name: 'ShowPad',
  components: {EventLinkClipboard},
  data () {
    return {
      event: null
    }
  },
  computed: {
    mailContent () {
      return 'mailto:?body=' + this.event.generateFullLink() + '&subject=Einladung: ' + this.event.title
    }
  },
  created: function () {
    // coming from create and event is passed over
    if (this.$route.params.event) {
      this.event = this.$route.params.event
    }

    // coming from nowhere and event needs to be fetched by its uri
    if (!this.event) {
      Events.getEvent(this.$route.params.uri).then(event => {
        if (event) this.event = new Event(event)
      })
    }

    // if still nothing found, show NOT FOUND INFO
    if (!this.event) {
      alert('event nicht gefunden')
      this.$router.push({ name: 'main' })
    }

    console.debug(this.event)
  },
  mounted () {
    var participants = 30

    var pattern = Trianglify({
      width: this.$refs.header.offsetWidth,
      height: this.$refs.header.offsetHeight,
      cell_size: 2000 / participants,
      x_colors: 'GnBu',
      y_colors: 'GnBu'
    })
    this.$refs.pattern.appendChild(pattern.svg())
    this.$el.querySelector('svg').setAttribute('opacity', 0.5)
  },
  methods: {
    openLocationInGMaps: function () {
      window.open('http://maps.google.de/maps/search/' + this.event.location.replace(' ', '+'))
    },
    userAction: function () {
      let userName = prompt('Gib deinen Namen einen, mit andere dich erkennen:')
      console.debug(userName)
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
  textarea {
    background-color: $white;
  }
</style>
