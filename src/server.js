const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // routing
  // server.route([
  //   {
  //     method: "GET",
  //     path: "/",
  //     handler: (request, h) => {
  //       return "Halaman utama!";
  //     },
  //   },
  //   {
  //     method: "GET",
  //     path: "/about",
  //     handler: (request, h) => {
  //       return "Halaman about!";
  //     },
  //   },
  // ]);

  server.route(routes); // menggunakan modularisasi

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
