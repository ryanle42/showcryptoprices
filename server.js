const express = require("express");
const fs = require("fs");
const app = express();
app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/coinData", (req, res) => {
  var contents = fs.readFileSync("./coinTestSet.json");
  var coinData = JSON.parse(contents);
  res.json(coinData);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});