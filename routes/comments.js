import express from 'express'
import limiter from '../middleware/ratelimit.js'
import {findbyid, addComment, deleteComment, updateComment, getAll} from '../controllers/comment.js'
const router = express.Router()


router.get('/', getAll);

router.get('/:id', findbyid);
  
router.post('/add', limiter, addComment)

router.delete('/delete/:id', deleteComment)

router.patch('/update/:id', updateComment);


export default router


/*
error handler -  {tick} correct
global error handler - tick correct 
response handler -  {code} not tick
node cluster mode -> brief - leave
cache manager sevice in nodejs with redis


controllers

*/ 