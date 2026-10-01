import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import app from '../index.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET / returns the greeting', async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    message: 'Hello, World! From CI/CD',
  });
});

test('GET /health reports the service is up', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'UP' });
});

test('GET /api returns the API message', async () => {
  const response = await fetch(`${baseUrl}/api`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    message: 'This is the API endpoint',
  });
});
