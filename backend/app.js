const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

// Error Handler Import
const errorMiddleware = require("./middleware/error");

// Rate Limit
const limiter = rateLimit({
  max: 2000,
  windowMs: 60 * 60 * 1000,
  message: "To many request from this IP! Please try again in one hour",
});

// Middlewares for Prod
// app.use(helmet());
app.use("/api", limiter);
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// -- data sanitization
app.use(mongoSanitize());

// -- data sanitization againts xss -- Dont use in nextjs
// app.use(xss());

// -- prevent parameter polution
app.use(hpp());

app.use(cookieParser());
app.use(fileUpload());
// app.disable("x-powered-by");
app.use(compression());

// Cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Route Imports
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const couponRouter = require("./routes/couponRoutes");

// Using Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", couponRouter);

// Middleware for Errors
app.use(errorMiddleware);

// Export App
module.exports = app;
