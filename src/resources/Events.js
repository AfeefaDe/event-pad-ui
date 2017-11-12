import Vue from 'vue'
import Event from '@/models/Event'

export default class EventsResource {
  static createEvent (event) {
    return Vue.http.post('http://backend.afeefa.dev:3002/events', event.serialize()).then(response => {
      const event = new Event()
      event.deserialize(response.body)
      return event
    }).catch(response => {
      console.log('post hat nicht geklappt', response)
    })
  }

  static getEvent (uri) {
    return Vue.http.get('http://backend.afeefa.dev:3002/events/' + uri).then(response => {
      const event = new Event()
      event.deserialize(response.body)
      return event
    }).catch(response => {
      console.log('get hat nicht geklappt', response)
    })
  }
}
