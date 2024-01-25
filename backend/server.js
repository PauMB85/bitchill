const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const vottunRouter = require("./apis/vottun");
const dextoolsRouter = require("./apis/dextools");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.send("I am live!");
});

app.use("/vottun", vottunRouter);
app.use("/dextools", dextoolsRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
