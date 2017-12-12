import Vue from 'vue'
import Event from '@/models/Event'
import Participant from '@/models/Participant'
import Task from '@/models/Task'

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
    return Vue.http.get(`/api/events/${uri}`).then(response => {
      const event = new Event()
      event.deserialize(response.body)
      return event
    }).catch(response => {
      console.log('get hat nicht geklappt', response)
      return false
    })
  }

  static getParticipans (event) {
    return Vue.http.get(`/api/events/${event.uri}/participants`).then(response => {
      const participants = []
      for (const json of response.body) {
        const participant = new Participant()
        participant.deserialize(json)
        participants.push(participant)
      }
      return participants
    }).catch(response => {
      console.log('get hat nicht geklappt', response)
      return false
    })
  }

  static addParticipant (event, participant) {
    return Vue.http.post(`/api/events/${event.uri}/participants`, participant.serialize()).then(response => {
      return Participant.fromJson(response.body)
    }).catch(response => {
      console.log('post hat nicht geklappt', response)
      return false
    })
  }

  static updateParticipant (event, participant) {
    return Vue.http.patch(`/api/events/${event.uri}/participants/${participant.id}`, participant.serialize()).then(response => {
      return Participant.fromJson(response.body)
    }).catch(response => {
      console.log('patch hat nicht geklappt', response)
      return false
    })
  }

  static getTasks (event) {
    return Vue.http.get(`/api/events/${event.uri}/tasks`).then(response => {
      const tasks = []
      for (const json of response.body) {
        const task = new Task()
        task.deserialize(json)
        tasks.push(task)
      }
      return tasks
    }).catch(response => {
      console.log('get hat nicht geklappt', response)
      return false
    })
  }

  static addTasks (event, tasks) {
    const serializedTasks = []
    for (let task of tasks) {
      serializedTasks.push(task.serialize())
    }

    return Vue.http.post(`/api/events/${event.uri}/tasks`, serializedTasks).then(response => {
      return true
    }).catch(response => {
      console.log('post hat nicht geklappt', response)
      return false
    })
  }

  static assignTask (event, task, participant) {
    return Vue.http.post(`/api/events/${event.uri}/tasks/${task.id}/participants`, participant.serialize()).then(response => {
      return Participant.fromJson(response.body)
    }).catch(response => {
      console.log('post hat nicht geklappt', response)
      return false
    })
  }

  static leaveTask (event, task, assignee) {
    return Vue.http.delete(`/api/events/${event.uri}/tasks/${task.id}/participants/${assignee.id}`).then(response => {
      return true
    }).catch(response => {
      console.log('delete hat nicht geklappt', response)
      return false
    })
  }
}
