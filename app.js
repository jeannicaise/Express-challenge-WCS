require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());//express can read req json routes sont capables de lire un corps de requête au format JSON.
const port = process.env.APP_PORT ?? 5000;


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);//page d'acccueil


const { hashPassword, verifyPassword } = require("./auth.js");


const movieHandlers = require("./movieHandlers");
const userHandlers = require("./usersHandler");




app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext,
verifyPassword);

app.put("/api/users/:id", hashPassword,userHandlers.updateUsers);
app.post("/api/users", hashPassword,userHandlers.postUsers);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUsers);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.post("/api/movies", movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);//route tous les films
app.get("/api/movies/:id", movieHandlers.getMovieById);//route pour un film defini

app.get("/api/users", userHandlers.getUsers);//route tous les films
app.get("/api/users/:id", userHandlers.getUsersById);//route pour un film defini

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
