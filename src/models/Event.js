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
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.title = json.title
    this.location = json.location
    this.description = json.description
    this.dateStart = new Date(json.dateStart)
    this.uri = json.uri
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
    return data
  }

  generateFullLink () {
    return document.location.origin + '/treffen/' + this.uri
  }
}
