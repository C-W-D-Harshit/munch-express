require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  apps: [
    {
      name: "munch-express",
      script: "server.js", // Replace 'server.js' with the name of your custom server file
      exec_mode: "cluster",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        // Add other environment variables from your .env file here
        PORT: process.env.PORT,
        LINK: process.env.LINK,
        RSP: process.env.RSP,
        // ...
      },
    },
  ],
};
