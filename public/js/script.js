// const userInput = document.getElementById("userInput").value;
// const form = document.getElementById("userInputForm");
// const submitButton = document.getElementById("submitButton");
// const movieListDisplay = document.getElementById("movieList");
// const movieSimilarDisplay = document.getElementById("movieSimilar");

// form.addEventListener("submit", async (e) => {
// 	e.preventDefault();

// 	const movieName = userInput;
// 	if (!movieName) {
// 		movieListDisplay.innerHTML = "<p>Please input a movie title</p>";
// 		return;
// 	}

// 	try {
// 		const res = await fetch(`/movies?query=${encodeURIComponent(movieName)}`);
// 		const movies = await res.json();

// 		if (movies.length === 0) {
// 			movieListDisplay.innerHTML = "<p>No Movie Found</p>";
// 			return;
// 		}

// 		console.log(movie);
// 	} catch (err) {
// 		console.error(err);
// 		movieListDisplay.innerHTML = "<p>Error fetching movies</p>";
// 	}
// });
document.addEventListener("DOMContentLoaded", () => {
	const userInput = document.getElementById("userInput");
	const form = document.getElementById("userInputForm");
	const movieListDisplay = document.getElementById("movieList");

	form.addEventListener("submit", async (e) => {
		e.preventDefault(); // stop page from refreshing
		const movieName = userInput.value.trim(); // read input
		if (!movieName) {
			movieListDisplay.innerHTML = "<p>Please input a movie title</p>";
			return;
		}

		try {
			// ask the backend for movies
			const res = await fetch(`/movies?name=${encodeURIComponent(movieName)}`);
			const movies = await res.json();

			if (movies.length === 0) {
				movieListDisplay.innerHTML = "<p>No Movie Found</p>";
				return;
			}

			// render movies as HTML
			movieListDisplay.innerHTML = movies
				.map((movie) => {
					return `
            <div class="movie-container">
              <img src="https://image.tmdb.org/t/p/w200${movie.img}" class='movie-img' alt="${movie.title}" />
              <h3 class='movie-title'>${movie.title}</h3>
              <p class='movie-overview'>${movie.overview}</p>
            </div>
          `;
				})
				.join("");
		} catch (err) {
			console.error(err);
			movieListDisplay.innerHTML = "<p>Error fetching movies</p>";
		}
	});
});
