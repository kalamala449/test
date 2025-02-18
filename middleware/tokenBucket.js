
class tokenBucket {
    constructor(rate, capacity) {
        this.fill_rate = rate;
        this.bucket_capacity = capacity
        this.tokens = capacity
        this.last_refill_time = Date.now();
    }

    allow_request () {
        const now = Date.now()
        this.tokens += ((now - this.last_refill_time)/1000) * this.fill_rate
        console.log(now, this.tokens);
        
        this.tokens = Math.min(this.tokens, this.bucket_capacity)
        this.last_refill_time = now

        if (this.tokens >= 1) {
            this.tokens -= 1
            return true
        }
        else {
            throw new Error("too many request wait for a second  ")
        }
    }
}

export default tokenBucket;


// const bucket = new tokenBucket(1, 5)

// // console.log("Hi i will run");

// for (let i =0; i<20; i++){
//     const res=  bucket.allow_request();
//     console.log("index  ", i,  res);
    
//     if (res){
//         console.log("Allowed for Request No. %d", (i))
//     }
//     else{
//         await new Promise(resolve => setTimeout(resolve, 500)); 
//         console.log("Blocked for %d" ,  (i))
//     }
// }
