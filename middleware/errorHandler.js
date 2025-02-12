function errorHandler(err, req, res, next) {
    console.error("lol "+err.stack);
    res.status(500).json({ error: 'Internal Server Error lol', message: err.message, 
        stack: err.stack,  });
  }
  export default errorHandler;