require('dotenv').config();

const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

// notes
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes/index');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // const notesService = new NotesService();
  // const usersService = new UsersService();

  await server.register([
    {
      plugin: notes,
      options: {
        service: new NotesService(),
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: new UsersService(),
        validator: UsersValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      }).code(response.statusCode);
      return newResponse;
    }
    return h.continue;
    // Jika error berasal dari instance ClientError, response akan mengembalikan
    // status fail, status code, dan message sesuai dengan errornya.
    // Jika error bukan ClientError,kembalikan response apa adanya.
  });

  await server.start();
  console.log(`Server telah running pada ${server.info.uri}`);
};

init();
