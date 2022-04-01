require("dotenv").config();

// api.connection._config.connectionTimeout = 3e4;

const express = require("express");
const app = express();
const routes = require("./routes/fungible.routes");

app.use(express.json());
app.use("/", routes); //to use the routes

app.get("/", function (req, res) {
  res.json({ message: "Hello world!" });
});

app.get("/", (req, res) => {
  res.send("Successful response.");
});

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Sever is listening on http://localhost:${port}/`)
);
