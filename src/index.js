const path = require("path");
const express = require("express");
const app = express();
const query = require("express/lib/middleware/query");
var bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes/index");
require("dotenv").config();
const db = require("./config");
const argon2 = require("argon2");

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

const corsConfig = {
  origin: true,
  Credential: true,
};
app.use(cors(corsConfig));

db.connect();

route(app);

app.listen(PORT, () => {
  console.log(`App listening at  http://localhost:${PORT}`);
});
