import Task from './Task'

let ID = 0

export default class Checklist {
  constructor () {
    this.__ID = ++ID
    this.init()
  }

  init () {
    this.id = null
    this.title = ''

    this.tasks = []
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.title = json.title

    for (let taskJson of json.tasks) {
      const task = new Task()
      task.deserialize(taskJson)
      this.tasks.push(task)
    }
  }

  serialize () {
    const data = {
      id: this.id,
      title: this.title
    }

    if (this.tasks.length) {
      data.tasks = []
      for (let task of this.tasks) {
        data.tasks.push(task.serialize())
      }
    }

    return data
  }
}
