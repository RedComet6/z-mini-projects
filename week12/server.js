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

// route shold be /api/movies
app.get("/api/movies", (req, res) => {
    // return movies list as an array of json
    db.query("SELECT * FROM movies", function (err, rows) {
        console.log(rows);
        res.json({ data: rows });
    });
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
