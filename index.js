const express = require("express");
require("dotenv").config();
const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");
const cors = require("cors");

const {
  errorMiddleware,
} = require("./middleware");

const {
  ReferRouter,
} = require("./routes");


const app = express();
const port = process.env.PORT || 3000;
const clientUrls = process.env.CLIENT_URL?.includes(",")
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : [process.env.CLIENT_URL];

// middleware
app.use(express.json());
app.use(cors(
  {
    origin: clientUrls,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }
))

// routes
app.get("/", (req, res) => {
  res.status(StatusCodes.OK)
    .send("Welcome to Accredian landing page backend");
})
app.use("/api/ref", ReferRouter)


app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND)
    .send("Page not found");
})
app.use(errorMiddleware);


const startServer = async () => {
  try {

    app.listen(port, () => {
      console.log("Server started...");
    })

  } catch (error) {
    console.error("System failure:", error);
    process.exit(1);
  }
}


startServer();
