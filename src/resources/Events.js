import axios from 'axios'

export default class EventsResource {
  constructor () {
    this.init(arguments)
  }

  init () {
    // this.http = Vue.resource(BASE + 'events{/id}', {}, {update: {method: 'PATCH'}})
  }

  
  findItem (id) {
    axios.get()
  }


  // creates a new model based on the given json response
  // @see Todos or Search
  createItem (json) {
  }


  transformList (items) {
  }

  // deserialized the current item
  // @see Search
  // @see Todos or Search
  deserialize (item, json) {
    item.deserialize(json)
  }

  // called after an item has been added
  // to enable custom resource cache treatment
  itemAdded (item) {
  }

  // called after an item has been deleted
  // to enable custom resource cache treatment
  itemDeleted (item) {
  }

  // called after an item has been changed
  // to enable custom resource cache treatment
  // use the old item to access the item relations
  // that have been present prior saving
  itemSaved (itemOld, item) {
  }

  // called after attributes of an item have been changed
  // to enable custom resource cache treatment
  itemAttributesUpdated (item, attributes) {
  }
}