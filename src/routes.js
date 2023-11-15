const {
  addNoteHandler,
  getAllNotes,
  getNotesbyID,
  editNoteById,
  deleteNoteById,
} = require("./handler");

const routes = [
  {
    method: "*",
    path: "/{any*}", // any* = routing dinamis, prioritasnya kedua (setelah request spesifik)
    handler: (request, h) => "Halaman tidak ditemukan",
  },
  {
    method: "GET",
    path: "/",
    handler: (request, h) =>
      //   return "Homepage";
      h
        .response("success")
        .code(200)
        .type("text/plain")
        .header("X-Custom", "Lek Jung"),
  },
  {
    method: "*", // * = seluruh method/verb
    path: "/",
    handler: (request, h) => {
      //   return "Halaman tidak dapat diakses dengan method tersebut";
      const response = h
        .response("gagal")
        .code(400)
        .type("text/plain")
        .header("X-Custom", "Lek Jung");
      return response;
    },
  },
  {
    method: "GET",
    path: "/users/{username?}", // objek username menjadi opsional
    handler: (request, h) => {
      const { username = "stranger" } = request.params; // jika username tidak terisi
      const { lang } = request.query;
      if (lang == "id") {
        return `Halo, ${username}`; // jika username terisi
      }
      return `Hello, ${username}`;
    },
  },
  {
    method: "GET",
    path: "/login", // objek username menjadi opsional
    handler: (request, h) => {
      const { username, password } = request.payload;
      const { lang } = request.query;
      if (lang == "id") {
        return `Halo, ${username}`; // jika username terisi
      }
      return `Hello, ${username}`;
    },
  },

  // testing CRUD
  {
    method: "POST",
    path: "/notes", // objek username menjadi opsional
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotes,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNotesbyID,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteById,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteById,
  },
];

module.exports = routes;
