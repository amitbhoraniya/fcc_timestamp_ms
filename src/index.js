const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// app.get("/", (req, res) => res.send("Hello World Amit!"));

app.use("/", express.static(__dirname + "/public"));
app.listen(port, () =>
  console.log(`TimeStamp App listening at http://localhost:${port}`)
);
