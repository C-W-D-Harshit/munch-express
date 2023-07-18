const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Munch-Express",
    });

    console.log(
      `MongoDB connected: ${connection.connection.host}`.bgBlack.green
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
