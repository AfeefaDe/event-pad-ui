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
    this.host = json.host
    this.location = json.location
    this.description = json.description
    this.date_start = json.start
    this.date_end = json.end
    this.initiator_name = json.initiator_name
    this.uri = json.uri
  }

  serialize () {
    const data = {
      id: this.id,
      title: this.title,
      host: this.host,
      location: this.location,
      description: this.description,
      start: this.date_start,
      end: this.date_end,
      initiator_name: this.initiator_name,
      uri: this.uri
    }
    return data
  }
}
