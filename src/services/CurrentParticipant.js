import Participant from '@/models/Participant'

class CurrentParticipant {
  constructor () {
    this.event = null
    this.participant = new Participant()
  }

  // Participant interface

  get id () {
    return this.participant.id
  }

  get name () {
    return this.participant.name
  }

  set name (name) {
    this.participant.name = name
    this._storeParticipation()
  }

  get rsvp () {
    return this.participant.rsvp
  }

  set rsvp (rsvp) {
    this.participant.rsvp = rsvp
  }

  serialize () {
    return this.participant.serialize()
  }

  // CurrentParticipant

  authenticateForEvent (event) {
    this.event = event
    const participantId = localStorage.getItem(`event-${event.uri}`)
    if (participantId) {
      const participant = event.participants.find(participant => participant.id === parseInt(participantId))
      if (participant) {
        this.setParticipant(participant)
      } else {
        this._storeParticipation()
      }
    }
    this.participant.name = this.participant.name || localStorage.getItem('name') || ''
  }

  setParticipant (participant) {
    this.participant = participant
    this._storeParticipation()
  }

  resetParticipant (participant) {
    this.participant = new Participant()
    this._storeParticipation()
  }

  _storeParticipation () {
    if (this.participant.id) {
      localStorage.setItem(`event-${this.event.uri}`, this.participant.id)
    } else {
      localStorage.removeItem(`event-${this.event.uri}`)
    }

    if (this.participant.name) {
      localStorage.setItem('name', this.participant.name)
    } else {
      localStorage.removeItem('name')
    }
  }
}

export default new CurrentParticipant()
