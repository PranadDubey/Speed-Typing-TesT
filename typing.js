//Intialiasing all values

let time = 60;
let quotes = [
  "",
  "Push yourself, because no one else is going to do it for you.",
  "Failure is the condiment that gives success its flavor.",
  "Wake up with determination. Go to bed with satisfaction.",
  "It's going to be hard, but hard does not mean impossible.",
  "Learning never exhausts the mind.",
  "The only way to do great work is to love what you do.",
];
let timer_text = document.querySelector(".time_left");
let accuracy_text = document.querySelector(".accuracy_result");
let error_text = document.querySelector(".error_result");
let cpm_text = document.querySelector(".cpm_result");
let wpm_text = document.querySelector(".wpm_result");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".Error");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = time;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
// let current_quote = "";
let quoteNo = -1;
let timer = null;

//randoming selecting quotes

const updateQuote = () => {
  quoteNo++;
  if (quoteNo >= quotes.length) {
    quoteNo = 0;
  }
  quote_text.textContent = null;
  // current_quote = quotes[quoteNo];
  quotes[quoteNo].split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });
  // if (quoteNo < quotes.length - 1) {
  //   // document.getElementById("quoteId").innerHTML = quotes[quoteNo++];
  // } else quoteNo = 0;
};

//checking the text,changing the colors, calculating errors, accuracy and emptying the input area after completion of one quote

const checkingAndCal = () => {
  curr_input = document.getElementById("text_box").value;
  curr_input_array = curr_input.split("");
  characterTyped++;
  errors = 0;
  quoteSpanArray = quote_text.querySelectorAll("span");
  //checking text
  quoteSpanArray.forEach((char, index) => {
    typedChar = curr_input_array[index];

    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");
      errors++;
    }
  });
  //calculating errors
  error_text.textContent = total_errors + errors;
  let correctCharacters = characterTyped - (total_errors + errors);
  //calculating accuracy
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal) + "%";
  if (curr_input.length === quotes[quoteNo].length) {
    //getting new quote after completion of one quote and emptying input area and calculating final error count
    updateQuote();
    total_errors += errors;
    input_area.value = "";
  }
};

//starting the game

const startGame = () => {
  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
};

//reseting  all values

const resetValues = () => {
  // timeLeft = time;
  // timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  accuracy_text.textContent = 100 + "%";
  timer_text.textContent = "60s";
  clearInterval(timer);
  error_text.textContent = 0;
  // restart_btn.style.display = "none";
  quote_text.innerHTML = "Paragraph to be typed will be displayed here.";
};

//updating timer

const updateTimer = () => {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  } else {
    // finish the game
    finishGame();
  }
};

const finishGame = () => {
  // stop the timer
  clearInterval(timer);

  //empty input area
  input_area.value = "";

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on start button to start a new game.";

  // calculate cpm and wpm
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
};
