import express from 'express'
import tokenBucketMiddleware from '../middleware/tokenBucketMiddleware.js'

import {getComment, addComment, deleteComment, updateComment, getAllComments} from '../controllers/comment.js'




const router = express.Router()


router.get('/', getAllComments);

router.get('/:id', getComment);
  
router.post('/add', tokenBucketMiddleware, addComment)

router.delete('/delete/:id', deleteComment)

router.patch('/update/:id', updateComment);


export default router









/*
error handler -  {tick} correct
global error handler - tick correct 
response handler -  {code} not tick
node cluster mode -> brief - tick correct
cache manager sevice in nodejs with redis - {tick} correct maybe
controllers -  tick
rate limit - tick

*/ 