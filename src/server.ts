import { Server as Engine } from '@socket.io/bun-engine';
import { serve } from "bun";
import { Server } from 'socket.io';
import homepage from "./index.html";

const io = new Server();

const engine = new Engine({
  path: '/socket.io/',
  maxHttpBufferSize: 1e7,
});

io.bind(engine);


const { fetch: sioFetch, websocket } = engine.handler();
serve({
  port: 3000,

  websocket,

  routes: {
    '/socket.io/*': (req, server) => sioFetch(req, server),
    '/api/health': {
      GET() {
        return Response.json({
          status: 'ok',
          timestamp: new Date().toISOString(),
        });
      },
    },
    "/*": homepage,

  },

  // development: {
  //   hmr: true,
  //   console: true,
  // },

});

console.log('Server running on http://localhost:3000');
