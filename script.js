// ========== SESSION STORAGE SETUP ==========

// Get previous progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Reference to main containers
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ========== RENDER QUESTIONS ==========

function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionElement = document.createElement("div");
    questionElement.appendChild(
      document.createTextNode(question.question)
    );

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // ✅ Restore checked state using ATTRIBUTE (important for Cypress)
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", "true");
      }

      // Save progress when user selects
      choiceElement.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(
        document.createTextNode(choice)
      );
    }

    questionsElement.appendChild(questionElement);
  }
}

// ========== SUBMIT LOGIC ==========

submitButton.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.innerText = `Your score is ${score} out of 5.`;

  // ✅ Store only number as string (Cypress expects "3")
  localStorage.setItem("score", score.toString());
});

// ========== RESTORE SAVED SCORE ==========

const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of 5.`;
}

// Initial render
renderQuestions();