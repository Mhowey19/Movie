//put method to export
const userInput = document.getElementById("userInput");
const form = document.getElementById("userInputForm");
const submitButton = document.getElementById("submitButton");
const movieListDisplay = document.getElementById("movieList");
const movieSimilarDisplay = document.getElementById("movieSimilar");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(userInput.value);
	movieListDisplay.textContent = "placeHolder";
	movieSimilarDisplay.textContent = "Placeholder2";
});
