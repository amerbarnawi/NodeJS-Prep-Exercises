const express = require("express");
const app = express();

// YOUR CODE GOES IN HERE

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

const fs = require("fs");

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  const existBlog = fs.existsSync(`./blogs/${title}`);

  if (existBlog) {
    res.status(200).send({ Message: "This blog is already exist!" });
    return;
  }

  if ((title, content)) {
    fs.writeFileSync(`./blogs/${title}`, content);
    res.end("ok");
  } else {
    res
      .status(400)
      .send({ Message: "Please, send the title and the content!" });
  }
});

app.put("/posts/:title", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res
      .status(404)
      .send({ message: "Please, check if you sent the title and content!" });
    return;
  }
  const existFile = fs.existsSync(`./blogs/${title}`);
  if (existFile) {
    fs.writeFileSync(`./blogs/${title}`, content);
    res.end("ok");
  } else {
    res.status(404).send({ message: "Sorry, can not find the blog!" });
  }
});

app.delete("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const existFile = fs.existsSync(`./blogs/${title}`);

  if (existFile) {
    fs.unlinkSync(`./blogs/${title}`);
    res.end("ok");
  } else {
    res.status(404).send({
      message: "Sorry, can not find blog in this name!",
    });
  }
});

app.get("/blogs/:title", (req, res) => {
  const title = req.params.title;
  const existsFile = fs.existsSync(`./blogs/${title}`);

  if (existsFile) {
    const fileContent = fs.readFileSync(`./blogs/${title}`);
    res.status(200).send(fileContent);
  } else {
    res.status(404).send({ Message: "Sorry, can not find the blog!" });
  }
});

app.get("/blogs", (req, res) => {
  const blogs = "./blogs/";
  const blogsTitles = [];

  fs.readdir(blogs, (err, files) => {
    files.forEach((blog) => {
      blogsTitles.push({ title: blog });
    });

    if (blogsTitles[0]) {
      res.status(200).send(blogsTitles);
    } else {
      res.status(404).send({ Message: "Sorry, can not find blogs!" });
    }
  });
});

app.listen(3000);
