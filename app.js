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
//make a .env file for my api key
const api = process.env.apiKey;

//json:true parses the json data
const movieSimilar = (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api}`,
		},
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error(err));
};
movieSimilar(242);
