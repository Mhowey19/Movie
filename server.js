const express = require("express");
const path = require("path");
const { movieSimilar, movieList } = require("./src/utils/utils");
require("dotenv").config();

const app = express();
// serve static files from /public
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// serve the homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(publicDir, "index.html"));
});

// search movies by name
app.get("/api/movies", async (req, res) => {
	const movieName = req.query.name || req.query.query;
	if (!movieName) return res.json([]);

	try {
		const movies = await movieList(movieName); // TMDB API
		res.json(movies);
	} catch (err) {
		console.error("Error fetching movie list:", err);
		res.status(500).json({ error: "Failed to fetch movies" });
	}
});

//fetch similar movies by id
app.get("/api/movies/similar", async (req, res) => {
	const movieId = req.query.id;
	if (!movieId) return res.json([]);

	try {
		const movies = await movieSimilar(movieId); // your utils function
		res.json(movies);
	} catch (err) {
		console.error(err);
		res.status(500).json([]);
	}
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
