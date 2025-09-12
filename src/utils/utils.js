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

		if (!json.results) return [];

		return json.results.slice(0, 10).map((m) => ({
			id: m.id,
			title: m.title,
			img: m.poster_path,
			overview: m.overview,
		}));
	} catch (err) {
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
			Authorization: `Bearer ${api}`, // must be v4 token
		},
	};

	try {
		const res = await fetch(url, options);
		const json = await res.json();

		if (!json.results) return [];

		return json.results.slice(0, 10).map((m) => ({
			id: m.id,
			title: m.title,
			img: m.poster_path,
			overview: m.overview,
		}));
	} catch (err) {
		console.error("Error in movieSimilar:", err);
		return [];
	}
};

module.exports = { movieList, movieSimilar };
