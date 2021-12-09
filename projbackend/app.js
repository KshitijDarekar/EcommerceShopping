const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const express = require("express");
const app = express();
require("dotenv").config();
const port = 5000;
// const bodyParser = require('body-parser')
// import 'body-parser';
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//  MY Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

app.use(cors());

//DB Connection
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error = " + err.message);
  });

//===Middleware==//
/*  #==> using express > 4.16, you can use express.json() and express.urlencoded() <==#
  The express.json() and express.urlencoded() middleware have been added to provide request body parsing support out-of-the-box.
  This uses the expressjs/body-parser module module underneath,
  so apps that are currently requiring the module separately can switch to the built-in parsers.
*/
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
// load the cookie-parsing middleware
app.use(cookieParser());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

//Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
