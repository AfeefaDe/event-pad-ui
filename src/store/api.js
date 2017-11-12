import Vue from 'vue'

export const BASE = '/api/v1/'

export default {
  namespaced: true,

  state: {
  },


  actions: {
    initApp () {
      Vue.http.interceptors.push((request, next) => {
        if (request.method === 'POST' || request.method === 'PATCH') {
          if (request.body && typeof request.body === 'object') {
            request.body = JSON.stringify(request.body)
          }
          request.headers.set('Content-Type', 'application/vnd.api+json')
        }
        next()
      })
    },


    loadingError: ({dispatch}, response) => {
      if (!response.status) { // cancelled
        return
      }
      alert('loadingError()')
      // dispatch('messages/showAlert', {
      //   isError: true,
      //   title: 'Fehler beim Laden',
      //   description: getErrorDescription(response)
      // }, {root: true})
    },


    getItem: ({dispatch}, {resource, id}) => {

      if (!id) {
        console.debug(`API: getItem(${itemCacheKey}) - keine ID gegeben.`)
        return Promise.resolve(null)
      }

      const promise = resource.http.get({id}).then(response => {
        const json = response.body.data
        let item
        // update existing cached items but not replace them!
        item = resource.createItem(json)
        item.deserialize(json)
        item._fullyLoaded = true
        return item
      }).catch(response => {
        dispatch('loadingError', response)
        console.log('error loading item', response)
        return null
      })

      promiseCache.addItem(itemCacheKey + id, promise)
      return promise
    },


    saveItem: ({dispatch}, {resource, item}) => {
      const itemCacheKey = resource.getItemCacheKey()

      return resource.http.update(
        {id: item.id}, {data: item.serialize()}
      ).then(response => {
        const cachedItem = resourceCache.getItem(itemCacheKey, item.id)
        cachedItem.deserialize(response.body.data)
        resource.itemSaved(item, cachedItem)
        dispatch('getMetaInformation') // e.g. todos may change after annotation change
        return cachedItem
      }).catch(response => {
        dispatch('messages/showAlert', {
          isError: true,
          title: 'Fehler beim Speichern',
          description: getErrorDescription(response)
        }, {root: true})
        console.log('error saving item', response)
        return null
      })
    },


    addItem: ({dispatch}, {resource, item}) => {
      const itemCacheKey = resource.getItemCacheKey()

      return resource.http.save(
        {id: item.id}, {data: item.serialize()}
      ).then(response => {
        item.deserialize(response.body.data)
        resourceCache.addItem(itemCacheKey, item)
        resource.itemAdded(item)
        dispatch('getMetaInformation')
        return item
      }).catch(response => {
        dispatch('messages/showAlert', {
          isError: true,
          title: 'Fehler beim Speichern',
          description: getErrorDescription(response)
        }, {root: true})
        console.log('error adding item', response)
        return null
      })
    },


    deleteItem: ({dispatch}, {resource, item}) => {
      return resource.http.delete({id: item.id}).then(response => {
        resource.itemDeleted(item)
        dispatch('getMetaInformation')
        return true
      }).catch(response => {
        dispatch('messages/showAlert', {
          isError: true,
          title: 'Fehler beim Löschen',
          description: getErrorDescription(response)
        }, {root: true})
        console.log('error deleting item', response)
        return null
      })
    },


    updateItemAttributes: ({dispatch}, {resource, item, type, attributes}) => {
      const data = {
        id: item.id,
        type,
        attributes
      }
      return resource.http.update({id: item.id}, {data}).then(response => {
        const itemCacheKey = resource.getItemCacheKey()
        const attributes = response.body.data.attributes
        const cachedItem = resourceCache.getItem(itemCacheKey, item.id)
        resource.itemAttributesUpdated(cachedItem, attributes)
        return attributes
      }).catch(response => {
        dispatch('messages/showAlert', {
          isError: true,
          title: 'Fehler beim Speichern',
          description: getErrorDescription(response)
        }, {root: true})
        console.log('error updating item', response)
        return null
      })
    }
  }
}
