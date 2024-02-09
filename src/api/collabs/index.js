const CollabsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collabsService, notesService, validator }) => {
    const Handler = new CollabsHandler(collabsService, notesService, validator);
    server.route(routes(Handler));
  },
};
