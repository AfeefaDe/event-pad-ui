let ID = 0

export default class Event {
  constructor () {
    this._ID = ++ID
    this._fullyLoaded = false

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

  }

  serialize () {
    const data = {
      id: this.id,
      title: this.title
    }
    return data
  }


  clone () {
    const Constructor = this.constructor
    const model = new Constructor()
    for (let key in this) {
      model[key] = this[key]
    }
    return model
  }
}
