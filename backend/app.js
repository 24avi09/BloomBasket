const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors")

const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));


///Routes 
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const eatAndBite = require("./routes/eatAndBiteRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", eatAndBite);



//   Middleware for Errors
app.use(errorMiddleware);


module.exports = app;