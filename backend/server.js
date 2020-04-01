const express = require("express");
const connectDB = require("./config/db");
const { frontendURL } = require("./config/default");
const cors = require("cors");
const app = express();
const multer = require("multer");

//multer
app.use(express.static("public"));

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
app.use("/students", require("./routes/studentProfile"));
app.use("/companies", require("./routes/companies"));

// Photos and Resumes
const storage = multer.diskStorage({
  destination: "./public/resumesandimages",
  filename(req, file, callback) {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.fieldname}.${
        file.mimetype.split("/")[1]
      }`
    );
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Req Body : ", req.body);
  console.log("file", req.file.filename);

  res.writeHead(200, {
    "Content-Type": "application/json"
  });

  res.end(req.file.filename);
});

// app.post("/resumes", (req, res) => {
//   console.log("Saving resumes file names to db");
//   // console.log(req.body);
//   if (req.body.student_id !== undefined) {
//     connection.query(
//       `insert into resumes values ('${req.body.job_id}', '${req.body.student_id}', '${req.body.file}', "Pending", '${req.body.appdate}')`,
//       (err, result) => {
//         if (err) res.end("Can't insert information");
//         else {
//           console.log("Last insert ID:", result.insertId);

//           res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });

//           res.end("Succesful insert");
//         }
//       }
//     );
//   }
// });

const PORT = 3001;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
