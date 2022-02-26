const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "adminadmin",
        database: "movies_db",
    },
    console.log(`Connected to the books_db database.`)
);

// GET MOVIES
app.get("/api/movies", (req, res) => {
    // return movies list as an array of json
    db.query("SELECT * FROM movies", function (err, rows) {
        res.json({ data: rows });
    });
});

// JOIN MOVIES & REVIEWS
app.get("/api/movies-reviews", (req, res) => {
    // return movies list as an array of json
    db.query("SELECT * FROM reviews JOIN movies ON reviews.movie_id = movies.id", function (err, rows) {
        res.json({ data: rows });
    });
});

// POST MOVIES
app.post("/api/movies", (req, res) => {
    const movieName = req.body.movieName;
    // return movies list as an array of json
    db.query("INSERT INTO movies (movie_name) VALUES (?)", movieName, function (err, rows) {
        res.json({ message: "Successfully added a movie!" });
    });
});

// DELETE MOVIES
app.delete("/api/movies", (req, res) => {
    const movieID = req.body.id;
    // return movies list as an array of json
    db.query("DELETE FROM movies WHERE id = ?", movieID, function (err, rows) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "Successfully deleted a movie!" });
    });
});

// UPDATE MOVIES
app.put("/api/movies", (req, res) => {
    const movieID = req.body.id;
    const movieName = req.body.movieName;
    // return movies list as an array of json
    db.query("UPDATE movies SET movie_name = ? WHERE id = ?", [movieName, movieID], function (err, rows) {
        res.json({ message: "Successfully updated a movie!" });
    });
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
