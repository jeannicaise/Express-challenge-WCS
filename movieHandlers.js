const database = require("./database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {

  database
  .query("select * from movies")
  .then(([movies]) => {
    res.json(movies);
  })
  .catch((err) => {
    console.error(err);
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);


  database
  .query(`select * from movies where id = ?`,[id])
  .then(([movies]) => {
  const movie = movies.find((movie) => movie.id === id);
    if (movie != null) {
      res.json(movie);
    } else {
      res.status(404).send("Not Found");
    }

  })
  .catch((err) => {
    console.error(err);
  });


  
};

module.exports = {
  getMovies,
  getMovieById,
};
