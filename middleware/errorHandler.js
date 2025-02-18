function errorHandler(err, req, res, next) {
    console.error(" Error:  "+ err.stack);
    res.status(500).json({ error: 'Internal Server Error -> ', message: err.message, 
        stack: err.stack});
  }
  export default errorHandler;