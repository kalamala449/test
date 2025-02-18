import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379'
});

// client.on('connect', () => {
//   console.log('Connected to Redis');
// });

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis connection failed:', error.message);
  }
};


client.on('error', (err) => {
  console.error('Redis Error:', err);
});


// await client.connect();


connectRedis();

export default client;
