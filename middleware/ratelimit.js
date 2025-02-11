// const rateLimit = require('express-rate-limit');
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, 
//   max: 5,
limit: 10, //with ip address per user
  message: 'Too many requests, please try again later.',
});

export default limiter;