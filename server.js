const colors = require("colors");
const next = require("next");
const app = require("./backend/app");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const cloudinary = require("cloudinary");
const { frontendRouteController } = require("./backend/middleware/route");

dotenv.config({
  path: "./backend/config/config.env",
});

const dev = process.env.NODE_ENV !== "production";
const serv = next({ dev });
const handle = serv.getRequestHandler();

const Port = process.env.PORT || 9000;

serv.prepare().then(() => {
  // Handling Uncaught Exception
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  // Connecting to database
  connectDB();

  // Connecting Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Frontend Route Middleware
  app.use(frontendRouteController);

  // Nextjs Server
  app.all("*", (req, res) => {
    return handle(req, res);
  });
  // Start Server
  const server = app.listen(Port, () => {
    console.log(`Server started on Port: ${Port}`.bgBlack.cyan);
  });
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
});
