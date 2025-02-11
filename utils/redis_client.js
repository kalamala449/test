import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Error:', err);
});

await client.connect();

export default client;
