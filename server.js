const http = require("https");
const express = require("express");
const app = express();
const path = require("path");
const { movieSimilar, movieList } = require("./src/utils/utils");
require("dotenv").config();

//Variables Index.html

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/movies", async (req, res) => {
	const movieName = req.query.name || req.query.query; // read ?name= or ?query=
	if (!movieName) return res.json([]);

	try {
		const movies = await movieList(movieName); // calls TMDB API
		res.json(movies); // send array back to frontend as JSON
	} catch (err) {
		console.error(err);
		res.status(500).json([]);
	}
});

app.listen(3000, () => {
	console.log("server is running on port 3000");
});

const publicDir = path.join(__dirname, "/public");
app.use(express.static(publicDir));

//create a function that converts the movie name to the movie id using search

// movieSimilar(242);

//Will house the movies name and shows a list of the apis linked to that movie

//returns the id of the movie
//.then((json) => console.log(json.results[1].id))

const selectedMovie = () => {};

const movieToId = (movie) => {};
