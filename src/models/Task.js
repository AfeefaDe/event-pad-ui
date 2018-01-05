import Participant from './Participant'

let ID = 0

export default class Task {
  constructor () {
    this.__ID = ++ID
    this.init()
  }

  init () {
    this.id = null
    this.name = ''
    this.checked = false

    this.assignees = []
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.name = json.name
    this.checked = json.checked

    for (let assigneeJson of json.assignees) {
      const assignee = new Participant()
      assignee.deserialize(assigneeJson)
      this.assignees.push(assignee)
    }
  }

  serialize () {
    const data = {
      id: this.id,
      name: this.name,
      checked: this.checked
    }
    return data
  }
}
