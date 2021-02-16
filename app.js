/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let formData = req.body;
  let movies = formData.movies;
  let databaseOfMovies = movies.split(",");
  res.render("pages/index", { movieList: databaseOfMovies });
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1;
  let movie2 = req.query.movie2;
  let databaseOfMovies = [movie1, movie2];
  res.render("pages/index", { movieList: databaseOfMovies });
});

app.get("/search/:movieName", (req, res) => {
  // 1. get a request
  let movieName = req.params.movieName;
    //  res.send(`<p>Hi ${firstName} ${lastName}</p>`)

  // 2. get text file contents
  let fileContents = fs.readFileSync('./movieDescriptions.txt', 'utf-8')

  // 3. convert the contents to object file
  let fileContentsList = fileContents.split("\n");
  let obj = {}
  for (let line of fileContentsList) {
    let title = line.split(":")[0]
    obj[title] = line.split(":")[1]
  };

  // 4. search title
  let objResult = {}
  for (let title in obj) {
    if (title.toLowerCase().includes(movieName.toLowerCase())) {
      objResult[title] = obj[title]
    }
  }

  // 5. send the result to searchResult.ejs
  res.render("pages/searchResult", { result: objResult });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});