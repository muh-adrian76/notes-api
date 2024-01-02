const Hapi = require('@hapi/hapi')
const notes = require('./api/notes')
const NotesService = require('./services/inMemory/NotesService')
const NotesValidator = require('./validator/notes/index')
const ClientError = require('./exceptions/ClientError')

const init = async () => {
  const notesService = new NotesService()
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator
    }
  })

  server.ext('onPreResponse', (request, h) => {
    const { response } = request
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      }).code(response.statusCode)
      return newResponse
    }
    return h.continue
    // Jika error berasal dari instance ClientError, response akan mengembalikan
    // status fail, status code, dan message sesuai dengan errornya.
    // Jika error bukan ClientError,, kembalikan response apa adanya, biarlah Hapi yang menangani response secara default.
  })

  await server.start()
  console.log(`Server telah running pada ${server.info.uri}`)
}

init()
