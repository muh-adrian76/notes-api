const AuthsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, {
    authService,
    userService,
    tokenManager,
    validator,
  }) => {
    const Handler = new AuthsHandler(authService, userService, tokenManager, validator);
    server.route(routes(Handler));
  },
};
