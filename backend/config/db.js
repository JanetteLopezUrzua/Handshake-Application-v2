const mongoose = require("mongoose");
const { mongoURI } = require("./default");

const db = mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      poolSize: 500,
      bufferMaxEntries: 0
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    // Exit the app with failure
    process.exit(1);
  }
};

module.exports = connectDB;
