const routes = (handler) => [
  {
    method: 'POST',
    path: '/auth',
    handler: (request, h) => handler.postAuthHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/auth',
    handler: (request, h) => handler.putAuthHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/auth',
    handler: (request, h) => handler.deleteAuthHandler(request, h),
  },
];

module.exports = routes;
