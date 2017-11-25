export default class Event {
  constructor () {
    this.init()
  }

  init () {
    this.id = null
    this.title = ''
  }


  deserialize (json) {
    this.init()
    this.id = json.id
    this.title = json.title
    this.location = json.location
    this.description = json.description
    this.dateStart = json.dateStart
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
}
