const routes = (handler) => [
  {
    method: '*',
    path: '/{any*}', // any* = routing dinamis, prioritasnya kedua (setelah request spesifik)
    handler: (request, h) => 'Halaman tidak ditemukan'
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) =>
      //   return "Homepage";
      h
        .response('success')
        .code(200)
        .type('text/plain')
        .header('X-Custom', 'Lek Jung')
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
        .header('X-Custom', 'Lek Jung')
      return response
    }
  },
  // testing CRUD
  {
    method: 'POST',
    path: '/notes', // objek username menjadi opsional
    handler: handler.postNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler
  }
]

module.exports = routes
