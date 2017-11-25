<template>
  <div>
    
    <div ref="header" class="header">
      <div ref="pattern" class="pattern"></div>
      <div class="header-content">
        <h1>Redaktionssitzung</h1>
        <div>
          <p>Morgen</p>
          <p>18:00</p>
        </div>
        <div>
          <p class="location" @click="openLocationInGMaps()">Impact Hub Dresden</p>
        </div>
      </div>
    </div>

    <section class="description">
      <h2>Details</h2>
      <pre>AGENDA:
- Kategorienbaum beschließen
- Orga
  - Redaktionsrhythmus
  - ÖA Event</pre>
    <p class="show-more">...</p>
    </section>

    <section class="material">
      <h2>Materialien</h2>
      ÖA-Kampagne-v2.pdf
    </section>

    <section>
      <h2>Teilnehmer</h2>
      <div class="participants">
        <div class="list">
          <span class="list-heading">Kommt:</span>
          <ul>
            <li>Anna</li>
            <li>Felix</li>
            <li>Friedrich</li>
            <li>Jens</li>
          </ul>
        </div>
        <div class="list not-coming">
          <span class="list-heading">Kommt nicht:</span>
          <ul>
            <li>Misha</li>
            <li>Ahmad</li>
          </ul>
        </div>
      </div>
    </section>

    <div class="participation-actions">
      <div class="flex">
        <button class="button-green button-small-margin" @click="userAction()">Komme!</button>
        <!-- <button class="button-small-margin" @click="userAction()">Weiß nicht</button> -->
        <button class="button-red button-small-margin" @click="userAction()">Komme nicht</button>
      </div>
    </div>

    <section class="share">
      <h2>Leute einladen</h2>
      <event-link-clipboard :event="event"></event-link-clipboard>
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
      event: new Event()
    }
  },
  created: function () {
    Events.getEvent(this.$route.params.uri).then(event => {
      this.event = event
    })
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
      window.open('http://maps.google.de')
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
  color: white;
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
    color: white;
    
    p {
      display: inline-block;
      margin: 0 1rem;
    }
  }
    .location {
      border-bottom: 1px dashed white;
      cursor: pointer;
    }

.material {
  background: $creme;
}

.description {
  /*background: $creme;*/
}
  pre {
    margin: 0;
  }
  .show-more {
    font-size: 2rem;
    color: $black;
    text-align: center;
  }
.participants {
  display: flex;
  margin-bottom: 1rem;
  
  .list {
    width: 50%;
    padding-right: 1rem;

    &.not-coming {
      /*text-align: right;*/
    }

    .list-heading {
      font-style: italic;
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

.discussion {
  background-color: $creme;
}
  .message {
    background-color: white;
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
    font-size: .8rem;
  }
  textarea {
    background-color: white;
  }

.participation-actions {
  position: relative;

  .flex {
    display: flex;
  }
}
</style>
