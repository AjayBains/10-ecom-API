require("dotenv").config();
require("express-async-errors");
// express
const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");

const cookieParser = require("cookie-parser");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");

// middleware

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
//   console.log("cookies", req.cookies);
  console.log("cookies", req.signedCookies);

  res.send("e-commerce-API");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is Listering on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};

start();