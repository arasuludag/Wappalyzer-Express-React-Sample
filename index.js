const express = require("express");
const app = express();
const port = 5000;

const wappalyzer = require("./wappalyzer");

app.get("/api/analyze/:website", wappalyzer.getAnalyzation);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
