require("dotenv").config(); //enable dotenv

const express = require("express");
const fileUpload = require("express-fileupload");
const router = require("./route");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp", // if you're using GCP App Engine please don't comment this, because the ./tmp directory is read only and we need write too so we use /tmp
  })
);
app.use(express.static("public"));

app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));