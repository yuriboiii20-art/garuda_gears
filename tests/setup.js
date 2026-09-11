import { preview } from 'vite';

// An in-process preview server avoids platform-specific child-process teardown.
export default async function setup() {
  const server = await preview({ preview: { host: '127.0.0.1', port: 4173, strictPort: true } });
  return async () => {
    server.httpServer.closeAllConnections();
    await new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()));
  };
}
