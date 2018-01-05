import Vue from 'vue'
import Event from '@/models/Event'
import Participant from '@/models/Participant'
import Checklist from '@/models/Checklist'

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

  static getChecklists (event, checklist) {
    return Vue.http.get(`/api/events/${event.uri}/checklists`).then(response => {
      const checklists = []
      for (const json of response.body) {
        const checklist = new Checklist()
        checklist.deserialize(json)
        checklists.push(checklist)
      }
      return checklists
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
      console.log('create hat nicht geklappt', response)
      return false
    })
  }

  static assignTask (event, checklist, task, participant) {
    return Vue.http.post(`/api/events/${event.uri}/checklists/${checklist.id}/tasks/${task.id}/assignees`, participant.serialize()).then(response => {
      return Participant.fromJson(response.body)
    }).catch(response => {
      console.log('assign hat nicht geklappt', response)
      return false
    })
  }

  static updateTask (event, checklist, task) {
    return Vue.http.patch(`/api/events/${event.uri}/checklists/${checklist.id}/tasks/${task.id}`, task.serialize()).then(response => {
      return true
    }).catch(response => {
      console.log('update hat nicht geklappt', response)
      return false
    })
  }

  static leaveTask (event, checklist, task, assignee) {
    return Vue.http.delete(`/api/events/${event.uri}/checklists/${checklist.id}/tasks/${task.id}/assignees/${assignee.id}`).then(response => {
      return true
    }).catch(response => {
      console.log('delete hat nicht geklappt', response)
      return false
    })
  }
}
