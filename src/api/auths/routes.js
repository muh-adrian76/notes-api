const routes = (handler) => [
  {
    method: 'POST',
    path: '/auths',
    handler: (request, h) => handler.postAuthHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/auths',
    handler: (request, h) => handler.putAuthHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/auths',
    handler: (request, h) => handler.deleteAuthHandler(request, h),
  },
];

module.exports = routes;
