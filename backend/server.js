const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/students", require("./Routes/students"));
app.use("/companies", require("./Routes/companies"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
