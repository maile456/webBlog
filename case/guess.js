

let randomNumber = Math.floor(Math.random() * 100) + 1;

let background = document.querySelector("body");
background.style.backgroundColor = "lightblue";

const guesses = document.querySelector(".guesses");

const lastResult = document.querySelector(".lastRestult");

const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");

const guessField = document.querySelector(".guessField");

function checkGuess() {
    alert("Ciallo～(∠・ω< )⌒★");
}

guessField.addEventListener('click', checkGuess);

let guessCount = 1;

let resetButton;

