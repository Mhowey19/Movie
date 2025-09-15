const userInput = document.getElementById("userInput");
const form = document.getElementById("userInputForm");
const movieListDisplay = document.getElementById("movieList");
const movieSimilarDisplay = document.getElementById("movieSimilar"); // where similar movies go

document.addEventListener("DOMContentLoaded", () => {
	form.addEventListener("submit", async (e) => {
		e.preventDefault(); // stop page reload
		const movieName = userInput.value.trim();

		if (!movieName) {
			movieListDisplay.innerHTML = "<p>Please input a movie title</p>";
			return;
		}

		try {
			// ask backend for movie list
			const res = await fetch(`https://your-vercel-app.vercel.app/api/movies?name=${encodeURIComponent(movieName)}`);

			const movies = await res.json();

			if (movies.length === 0) {
				movieListDisplay.innerHTML = "<p>No Movie Found</p>";
				return;
			}

			// render searched movies
			movieListDisplay.innerHTML = movies
				.map(
					(movie) => `
						<div class="movie-container" data-id="${movie.id}">
							<img src="https://image.tmdb.org/t/p/w200${movie.img}" class="movie-img" alt="${movie.title}" />
							<h3 class="movie-title">${movie.title}</h3>
							<p class="movie-overview">${movie.overview}</p>
						</div>
					`
				)
				.join("");

			// Allows each element with the .movie-container class to become clickable
			document.querySelectorAll(".movie-container").forEach((div) => {
				div.addEventListener("click", async () => {
					const movieId = div.dataset.id; // Id of the movie clicked
					console.log("Clicked movie ID:", movieId);

					try {
						// Fetches the movie's api data to the Dom
						const res = await fetch(`/api/movies/similar?id=${movieId}`);
						const similar = await res.json(); //Data of the similar movies
						movieListDisplay.innerHTML = div.outerHTML;
						// Shows similar mvoies to the DOM
						movieSimilarDisplay.innerHTML = similar
							.map(
								(data) => `
									<div class="movie-container_similar">
										<img src="https://image.tmdb.org/t/p/w200${data.img}" alt="${data.title}" />
										<h4>${data.title}</h4>
										<p>${data.overview}</p>
									</div>
								`
							)
							.join("");
					} catch (err) {
						console.error("Error fetching similar movies:", err);
						movieSimilarDisplay.innerHTML = "<p>Error loading similar movies</p>";
					}
				});
			});
		} catch (err) {
			//Displays error message to the DOM
			console.error("Error fetching movies:", err);
			movieListDisplay.innerHTML = "<p>Error fetching movies</p>";
		}
	});
});
