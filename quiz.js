const data = [
  {
    id: 1,
    question: "Which of these fish is actually a fish ?",
    answers: [
      { answer: "Swordfish", isCorrect: true },
      { answer: "Jellyfish", isCorrect: false },
      { answer: "Starfish", isCorrect: false },
      { answer: "CrayFish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of ? ",
    answers: [
      { answer: "Bees", isCorrect: false },
      { answer: "Penguins", isCorrect: false },
      { answer: "Butterflies", isCorrect: true },
      { answer: "Camels", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "A group of which animals is referred to as a wake ?",
    answers: [
      { answer: "Bats", isCorrect: false },
      { answer: "Vultures", isCorrect: true },
      { answer: "Ants", isCorrect: false },
      { answer: "Camels", isCorrect: false },
    ],
  },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".results");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
  qIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  total = 0;
  showQuestion(qIndex);
};

play.addEventListener("click", () => {
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
  playAgain();
});

const showResult = () => {
  resultScreen.style.display = "block";
  gameScreen.style.display = "none";
  resultScreen.querySelector(
    ".correct"
  ).textContent = `Correct Answers: ${correctCount}`;
  resultScreen.querySelector(
    ".wrong"
  ).textContent = `Wrong Answers: ${wrongCount}`;
  resultScreen.querySelector(".score").textContent = `Score: ${
    correctCount - wrongCount * 100
  }`;
};

const showQuestion = (qNumber) => {
  if (qIndex === data.length) return showResult();
  selectedAnswer = null;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers
    .map(
      (item, index) =>
        `
    <div class="answer">
    <input
      name="answer"
      type="radio"
      id=${index}
      value=${item.isCorrect}
    />
    <label for="answer1">${item.answer}</label>
  </div>
    `
    )
    .join("");

  selectAnswer();
};

const selectAnswer = () => {
  answersContainer.querySelectorAll("input").forEach((el) => {
    el.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    });
  });
};

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctCount++ : wrongCount++;
      qIndex++;
      showQuestion(qIndex);
    } else {
      alert("Select your answer");
    }
  });
};

showQuestion(qIndex);
submitAnswer();
