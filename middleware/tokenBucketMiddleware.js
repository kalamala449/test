import tokenBucketlimiter from '../middleware/tokenBucket.js';

const tokenBucketlimiterInstance= new tokenBucketlimiter(1, 5);

const tokenBucketMiddleware = (req, res, next) => {
    const response= tokenBucketlimiterInstance.allow_request();
    console.log(response);
    
    if (res) {
        next();
    } else {
        res.json({ error: "Too many requests. Wait for a second." }); 
    }
};

export default tokenBucketMiddleware;
