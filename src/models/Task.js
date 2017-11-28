import Participant from './Participant'

export default class Task {
  constructor () {
    this.init()
  }

  init () {
    this.id = null
    this.name = ''

    this.assignees = []
  }

  deserialize (json) {
    this.init()

    this.id = json.id
    this.name = json.name

    for (let assigneeJson of json.assignees) {
      const assignee = new Participant()
      assignee.deserialize(assigneeJson)
      this.assignees.push(assignee)
    }
  }

  serialize () {
    const data = {
      id: this.id,
      name: this.name
    }
    return data
  }
}
