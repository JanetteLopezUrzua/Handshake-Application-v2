const express = require("express");
const connectDB = require("./config/db");
const { frontendURL } = require("./config/default");
const cors = require("cors");
const app = express();

//Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

//CORS
//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontendURL, credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Define Routes
app.use("/students", require("./routes/students"));
app.use("/companies", require("./routes/companies"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
