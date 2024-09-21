
document.querySelector("body").addEventListener("click", function () {
    alert("别戳我，我怕疼。");
});

let randomNumber = Math.floor(Math.random() * 100) + 1;

let background = document.querySelector("body");
background.style.backgroundColor = "lightblue";

const guesses = document.querySelector(".guesses");

const lastResult = document.querySelector(".lastRestult");

const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");

const guessField = document.querySelector(".guessField");

let guessCount = 1;

let resetButton;

function checkGuess()
{
    alert("I am a placeholder");
}