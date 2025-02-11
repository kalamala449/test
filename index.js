import express from 'express'
import cors from 'cors'
import redis from 'redis'
import commentRouter from './routes/comments.js'

const app= express()
const port = 5000
const redis_port=6379
const client = redis.createClient(redis_port)


app.use(cors())

client.on('connect', ()=>{
    console.log('redis is connected');
})
client.on('error', (error)=> console.log(error))


await client.connect();

app.use(express.json())

app.get('/', (req, res)=>{
    console.log("hi");
    return res.send("hi")    
})

app.use('/comments', commentRouter)


app.listen(port , ()=>{
    console.log(`app is listening on http://localhost:${port}`);
})







// import express from 'express';
// import { createClient } from 'redis';

// const app = express();
// const port = 5000;

// (async () => {
//   const redisClient = createClient({
//     url: 'redis://localhost:6379'
//   });

//   redisClient.on('connect', () => {
//     console.log('Connected to Redis');
//   });

//   redisClient.on('error', (err) => {
//     console.error('Redis Error:', err);
//   });

//   await redisClient.connect();

//   app.get('/', async (req, res) => {
//     await redisClient.set('key', 'Hello from Redis!');
//     const value = await redisClient.get('key');
//     res.send(`Value from Redis: ${value}`);
//   });

//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// })();






