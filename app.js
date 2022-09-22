const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const todoModel = require("./model/todo");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.get("/", async (req, res) => {
  try {
    res.json({ todos: await todoModel.find({}) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    await new todoModel(req.body).save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.use((err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
});

mongoose.connect(process.env.MONGODB);

app.listen(process.env.PORT || 3000);
