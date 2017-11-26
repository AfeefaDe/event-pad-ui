export default class Task {
  constructor () {
    this.init()
  }

  init () {
    this.id = null
    this.name = ''
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.name = json.name
  }

  serialize () {
    const data = {
      id: this.id,
      name: this.name
    }
    return data
  }
}
