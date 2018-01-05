import Participant from './Participant'
import Checklist from './Checklist'

export default class Event {
  constructor () {
    this.init()
  }

  init () {
    this.id = null
    this.title = ''
    this.location = ''
    this.description = ''

    this.dateStart = new Date()
    this.dateStart.setHours(this.dateStart.getHours() + 1)
    this.dateStart.setSeconds(0)
    this.dateStart.setMinutes(0)

    this.uri = ''

    this.participants = []
    this.checklists = []
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.title = json.title
    this.location = json.location
    this.description = json.description
    this.dateStart = new Date(json.dateStart)
    this.uri = json.uri

    if (json.participants) {
      for (let participantJson of json.participants) {
        const participant = new Participant()
        participant.deserialize(participantJson)
        this.participants.push(participant)
      }
    }

    if (json.checklists) {
      for (let checklistJson of json.checklists) {
        const checklist = new Checklist()
        checklist.deserialize(checklistJson)
        this.checklists.push(checklist)
      }
    }
  }

  serialize () {
    const data = {
      id: this.id,
      title: this.title,
      location: this.location,
      description: this.description,
      dateStart: this.dateStart,
      uri: this.uri
    }

    if (this.checklists.length) {
      data.checklists = []
      for (let checklist of this.checklists) {
        data.checklists.push(checklist.serialize())
      }
    }

    return data
  }

  generateFullLink () {
    return document.location.origin + '/treffen/' + this.uri
  }
}
