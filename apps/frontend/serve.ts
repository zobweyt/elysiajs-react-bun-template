import index from "./src/app/index.html";

const server = Bun.serve({
  port: process.env.PORT ?? 8000,
  routes: {
    "/": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`Listening at http://${server.hostname}:${server.port}`);
