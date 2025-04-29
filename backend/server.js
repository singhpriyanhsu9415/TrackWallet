const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

require('dotenv').config();
//!Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

//! Cors config
app.use(cors({
  origin: 'https://track-wallet-one.vercel.app',
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],
  credentials: true
}));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`Server is running on this port... ${PORT} `)
);