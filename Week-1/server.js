const http = require("http");
const fs = require("fs");

let server = http.createServer(function (req, res) {
  let contentType = "";
  let path = "./";

  switch (req.url) {
    case "/":
      res.statusCode = 200;
      contentType = "text/html";
      path = "./index.html";
      break;
    case "/index.js":
      res.statusCode = 200;
      contentType = "text/js";
      path = "./index.js";
      break;
    case "/style.css":
      res.statusCode = 200;
      contentType = "text/css";
      path = "./style.css";
  }

  res.setHeader("Content-Type", contentType);
  fs.readFile(path, (error, data) => {
    if (error) {
      res.statusCode = 404;
      res.end("Sorry, can not find the page!");
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000);
