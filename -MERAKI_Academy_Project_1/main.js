const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const randomWords = [
  "appreciate",
  "observation",
  "export",
  "interstaller",
  "programming",
  "sunrise",
  "hustle",
  "forest",
  "happiness",
  "tesla",
];
const images = [
  { id: 1, src: "./images/Screenshot_1-removebg-preview.png" },
  { id: 2, src: "./images/Screenshot_2-removebg-preview.png" },
  { id: 3, src: "./images/Screenshot_3-removebg-preview.png" },
  { id: 4, src: "./images/Screenshot_4-removebg-preview.png" },
  { id: 5, src: "./images/Screenshot_5-removebg-preview.png" },
  { id: 6, src: "./images/Screenshot_6-removebg-preview.png" },
  { id: 7, src: "./images/Screenshot_7-removebg-preview.png" },
  { id: 8, src: "./images/Screenshot_9-removebg-preview (1).png" },
];

const hints = [
  "act of showing showing gratitude ",
  "when you look deeply into something",
  "has x letter ",
  "very famous sci-fi movie ",
  "when u learn computer languages ",
  "action related to the sun",
  "synonums with work hard",
  "has many trees ",
  "has double p letters :)",
  "a very famous car modle",
];

const randomSingleWord =
  randomWords[Math.floor(Math.random() * randomWords.length)];
let indexRandomWord = randomWords.indexOf(randomSingleWord);

let buttonText;
let wrongAttempts;
let wordCharacters;
let maxNumberOfWrongAttempts;
let gameFinished;
let alphabetContainer;
let correctWordContainer;
let imageContainer;
let textContainer;
let alphabetCounter;
let hintContainer;

const body = document.querySelector("body");

alphabetContainer = document.getElementById("alphabet-container");
correctWordContainer = document.getElementById("the-Display-Text");
imageContainer = document.getElementById("image-container");
textContainer = document.getElementById("text-container");
alphabetCounter = document.getElementById("alphabetCount");
hintContainer = document.getElementById("hint-container");
const buttonAudioContainer = document.getElementById("buttonAudio");
const audioButton = document.createElement("audio");
audioButton.src = "./audio/button sound.wav";
audioButton.preload = "auto";
buttonAudioContainer.append(audioButton);
const gameContainer = document.getElementById("game-container");
const startHangMan = document.getElementById("start-game");
const resultContainer = document.getElementById("result-container");

const startGame = () => {
  const music = document.getElementById("music");
  const endbutton = document.getElementById("endBS");
  music.style.display = "none";
  endbutton.style.display = "none";
  wrongAttempts = 0;
  maxNumberOfWrongAttempts = 9;
  gameFinished = false;
  const welcomeText = document.createElement("h2");
  welcomeText.innerText = "Welcome to the Hang-man Game";
  startHangMan.appendChild(welcomeText);
  const startButton = document.getElementById("starBS");
  startHangMan.appendChild(startButton);

  startHangMan.appendChild(startButton);
  startButton.addEventListener("click", () => {
    startHangMan.innerHTML = "";
    music.style.display = "block";
    renderAlphabetButtons();
    displayCorrectWord();
  });
};
startGame();

const renderAlphabetButtons = () => {
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const alphabetButtons = document.createElement("button");
    alphabetButtons.innerText = letter;
    alphabetContainer.append(alphabetButtons);

    alphabetButtons.addEventListener("click", () => {
      handleButtonClick(letter);
      audioButton.currentTime = 0;
      audioButton.play();
    });
  }
};
console.log(randomSingleWord);
const displayCorrectWord = () => {
  for (let i = 0; i < randomSingleWord.length; i++) {
    const alphabetSpan = document.createElement("span");
    alphabetSpan.innerText = "_";
    correctWordContainer.appendChild(alphabetSpan);
  }
  const alphabetNum = document.createElement("p");
  alphabetNum.innerText = `the length of the word equal =${randomSingleWord.length}`;
  alphabetCounter.appendChild(alphabetNum);
};

const handleButtonClick = (letter) => {
  if (gameFinished) {
    return;
  }

  const splitWord = randomSingleWord.split("");
  wordCharacters = splitWord;
  console.log(`the splited word array is ${wordCharacters}`);
  console.log(`the random word array :${wordCharacters}`);

  if (wordCharacters.includes(letter)) {
    revealCorrectAlphabet(letter);
  } else {
    console.log(`the alphabet ${letter} doesnot exsist in the random word`);
    wrongAttempts++;
    displayHangmanImage(wrongAttempts);
    checkAttempts();
  }
  event.target.disabled = true;
};

const revealCorrectAlphabet = (letter) => {
  for (let i = 0; i < wordCharacters.length; i++) {
    if (wordCharacters[i] === letter) {
      correctWordContainer.children[i].innerText = letter;
    }
  }
  if (correctWordContainer.innerText === randomSingleWord) {
    const textWon = document.createElement("h2");
    textWon.innerText = `Congratulations! You won with ${wrongAttempts} wrong attempts.`;
    textContainer.appendChild(textWon);
    gameFinished = true;
    disableAlphabetButtons();
    displayResult();
  }
};

const displayHangmanImage = (wrongAttempts) => {
  console.log("Displaying hangman image:", wrongAttempts);
  const adjustImgIndex = Math.min(wrongAttempts, images.length);
  console.log("Displaying hangman image:", adjustImgIndex);
  if (adjustImgIndex > 0 && adjustImgIndex <= images.length) {
    const hangmanImage = document.createElement("img");
    hangmanImage.setAttribute("src", images[adjustImgIndex - 1].src);
    imageContainer.innerHTML = "";
    imageContainer.append(hangmanImage);
  }
};
const checkAttempts = () => {
  if (wrongAttempts >= maxNumberOfWrongAttempts) {
    const textLost = document.createElement("h2");
    textLost.innerText = `Sorry, you lost with ${wrongAttempts} wrong attempts.`;
    textContainer.append(textLost);
    gameFinished = true;
    displayResult();
    disableAlphabetButtons();
  } else if (wrongAttempts === 4) {
    const hintText = document.createElement("p");
    hintText.innerText = `the hint for the word is : ${hints[indexRandomWord]}`;
    hintContainer.appendChild(hintText);
  }
};

const disableAlphabetButtons = () => {
  const alphabetButton = alphabetContainer.querySelectorAll("button");
  alphabetButton.forEach((button) => {
    button.disabled = true;
  });
};

const displayResult = () => {
  const resultMessgae = document.createElement("h2");
  let resultText = "";
  if (gameFinished) {
    if (wrongAttempts < maxNumberOfWrongAttempts) {
      resultText = `Congratulations! You won with ${wrongAttempts} wrong attempts.
      and your word is  ${randomSingleWord}`;
    } else {
      resultText = `Sorry, you lost with ${wrongAttempts} wrong attempts.
      the correct word is ${randomSingleWord}`;
    }
  }
  resultMessgae.innerText = resultText;
  gameContainer.innerHTML = "";
  resultContainer.appendChild(resultMessgae);

  const endbutton = document.getElementById("endBS");
  resultContainer.appendChild(endbutton);
  endbutton.style.display = "block";

  endbutton.addEventListener("click", () => {
    console.log("palyAgainCheck");
    window.location.reload();

    renderAlphabetButtons();
    displayCorrectWord();
  });
  resultContainer.appendChild(endbutton);
};

const radioIcon = document.getElementById("boot-icon");
const audio = document.getElementById("bgMusic");
let playing = false;
radioIcon.addEventListener("click", () => {
  if (playing) {
    audio.pause();
  } else {
    audio.play();
  }
  playing = !playing;
});
