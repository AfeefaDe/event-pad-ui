export default class Participant {
  static I_MISS = '0'
  static I_ATTEND = '1'
  static I_DONT_KNOW = '2'

  constructor () {
    this.init()
  }

  init () {
    this.id = null
    this.name = ''
    this.email = ''
    this.rsvp = Participant.I_DONT_KNOW
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.name = json.name
    this.email = json.email || ''
    this.rsvp = json.rsvp || ''
  }

  serialize () {
    const data = {
      id: this.id,
      name: this.name,
      email: this.email,
      rsvp: this.rsvp
    }
    return data
  }
}
