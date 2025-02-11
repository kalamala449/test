import express from 'express'
import limiter from '../middleware/ratelimit.js'
import redis from 'redis'
const router = express.Router()

const redis_port = 6379
const client = redis.createClient(redis_port)


client.on('connect', () => {
    console.log('redis is connected');
})
client.on('error', (error) => console.log(error))
await client.connect();


var dataarr = []
var idadd = 0


router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log(`${id}`);
      const cacheData = await client.get(id);
  
      if (cacheData) {
        return res.status(200).send({
          mes: `Retrieved ${id} from cache`,
          data: JSON.parse(cacheData)
        });
      } else {
        console.log("Data not cached yet");
        const element = dataarr.find(element => element.id == id);
        
        if (element) {
          const data = element.name;
  
          await client.setEx(id, 1440, JSON.stringify(data));
  
          return res.status(200).send({
            mes: `Retrieved ${id} from server`,
            data: data
          });
        } else {
          return res.status(404).send({
            mes: `No data found with id=${id}`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        mes: "Internal Server Error",
      });
    }
  });
  


router.post('/add', limiter, (req, res) => {
    const data = req.body;
    data.id += idadd
    idadd = idadd + 1
    console.log(data);
    dataarr.push(data)
    res.send(dataarr)
})

router.delete('/delete_back', (req, res) => {
    dataarr.pop();
    res.send(dataarr);
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newarr = dataarr.filter((data) => data.id != id)
    res.send(newarr)
})

router.patch('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const newarr = dataarr.map((data) => {
        if (data.id == id) {

        }
    })
    res.send(newarr)
})

router.get('/', (req, res) => {
    res.send(dataarr);
})



export default router


/*
error/global error handler
response hanlder
node cluster mode -> brief
cache manager sevice in nodejs with redis


controllers

*/ 