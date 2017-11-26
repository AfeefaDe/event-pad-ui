import Vue from 'vue'
import Event from '@/models/Event'

export default class EventsResource {
  static createEvent (event) {
    return Vue.http.post('/api/events', event.serialize()).then(response => {
      const event = new Event()
      event.deserialize(response.body)
      return event
    }).catch(response => {
      console.log('post hat nicht geklappt', response)
    })
  }

  static getEvent (uri) {
    return Vue.http.get('/api/events?uri=' + uri).then(response => {
      const event = new Event()
      event.deserialize(response.body)
      return event
    }).catch(response => {
      console.log('get hat nicht geklappt', response)
    })
  }
}
