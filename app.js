const http = require("https");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.get("", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html")); // serve hi.html
});

app.listen(3000, () => {
	console.log("server is running on port 3000");
});

//create a function that converts the movie name to the movie id using search

const api = process.env.apiKey;

//Shows the movies similar to the movie picked
const movieSimilar = (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api}`,
		},
	};
	//data will be injected into the data similar
	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error(err));
};
// movieSimilar(242);

//Will house the movies name and shows a list of the apis linked to that movie
const movieList = (movie) => {
	const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api}`,
		},
	};

	//data would be injected into the body html for movie list
	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error(err));
};

movieList("Cars");
