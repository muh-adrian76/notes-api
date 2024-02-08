const routes = (handler) => [
  {
    method: '*',
    path: '/{any*}', // any* = routing dinamis, prioritasnya kedua (setelah request spesifik)
    handler: () => 'Halaman tidak ditemukan',
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => h.response('success') //   return "Homepage";
      .code(200)
      .type('text/plain')
      .header('X-Custom', 'Lek Jung'),
  },
  {
    method: '*', // * = seluruh method/verb
    path: '/',
    handler: (request, h) => {
      //   return "Halaman tidak dapat diakses dengan method tersebut";
      const response = h
        .response('gagal')
        .code(400)
        .type('text/plain')
        .header('X-Custom', 'Lek Jung');
      return response;
    },
  },
  // testing CRUD
  {
    method: 'POST',
    path: '/notes', // objek username menjadi opsional
    handler: (request, h) => handler.postNoteHandler(request, h),
    options: { auth: 'notesapp_jwt' },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: (request, h) => handler.getNotesHandler(request, h),
    options: { auth: 'notesapp_jwt' },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: (request, h) => handler.getNoteByIdHandler(request, h),
    options: { auth: 'notesapp_jwt' },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: (request, h) => handler.putNoteByIdHandler(request, h),
    options: { auth: 'notesapp_jwt' },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: (request, h) => handler.deleteNoteByIdHandler(request, h),
    options: { auth: 'notesapp_jwt' },
  },
];

module.exports = routes;
