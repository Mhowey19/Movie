require("dotenv").config();
const api = process.env.apiKey; // Make sure this is your v4 access token!

// Get list of movies by search
const movieList = async (movie) => {
	const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
		movie
	)}&include_adult=false&language=en-US&page=1`;

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api}`, // must be v4 token
		},
	};

	try {
		const res = await fetch(url, options);
		const json = await res.json();
		//if there is not data within json it will return an empty array
		if (!json.results) return [];

		//returns the first 10 movies searched with their id, title, img, and overview/description
		return json.results.slice(0, 10).map((data) => ({
			id: data.id,
			title: data.title,
			img: data.poster_path,
			overview: data.overview,
		}));
	} catch (err) {
		//if try catches an error it will log the error and return an empty array
		console.error("Error in movieList:", err);
		return [];
	}
};

// Get similar movies by movieId
const movieSimilar = async (movieId) => {
	const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${api}`,
		},
	};

	try {
		const res = await fetch(url, options);
		const json = await res.json();
		//if there is not data within json it will return an empty array
		if (!json.results) return [];

		//Return the first 10 movie's id, title, img, and overview/description
		return json.results.slice(0, 10).map((data) => ({
			id: data.id,
			title: data.title,
			img: data.poster_path,
			overview: data.overview,
		}));
	} catch (err) {
		//Returns a error if there is an error
		console.error("Error in movieSimilar:", err);
		return [];
	}
};

//exports the movieList and movieSimilar functions for use within the frontend js
module.exports = { movieList, movieSimilar };
