import express from 'express'
import cors from 'cors'
import commentRouter from './routes/comments.js'
import Connection from './utils/db.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
const port = 5000

Connection()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    console.log("hi");
    return res.send("hi")
})

app.use('/comments', commentRouter)

app.use(errorHandler);


process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);

    process.exit(1); 
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    process.exit(1);
  });

app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
})