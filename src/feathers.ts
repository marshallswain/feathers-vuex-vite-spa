import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { iff, discard } from 'feathers-hooks-common'
import feathersVuex from '@feathersjs/vuex'

export function setupFeathers({ apiUrl, storage = window.localStorage }: { apiUrl: string, storage?: any }) {
  const socket = io(apiUrl, { transports: ['websocket'] })

  const apiClient = feathers()
    .configure(socketio(socket))
    .configure(
      auth({ storage }),
    )
    .hooks({
      before: {
        all: [
          // Don't send FeathersVuex temp attributes to the server.
          iff(
            context => ['create', 'update', 'patch'].includes(context.method),
            discard('__id', '__isTemp'),
          ),
        ],
      },
    })

  // Immediately authenticate over the socket connection.
  apiClient.authenticate().catch(error => {
    console.log('authenticate error', error)
  })

  // Setting up feathers-vuex
  const apiVuex = feathersVuex(apiClient, {
    serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
    idField: '_id', // Must match the id field in your database table/collection
    whitelist: ['$regex', '$options'],
  })

  return {
    apiClient,
    apiVuex,
  }
}
