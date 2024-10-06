var countQues = 0;
var score = 0;
var answers = []; // Array to hold answers for results

var HTMLquestions = [
    { question: "Which method to observe exoplanets is mostly used by scientists?", choices: ["Direct imaging", "Radial velocity", "Transit", "Network Protocol"], answer: 2},
    { question: "What is the purpose of habitable zone?", choices: ["To determine life expectancy of exoplanet", "Determine the black hole location", "Find signs of life", "Detect orbital attraction"], answer: 2 },
    { question: "What is characteristic of Super-Earth?", choices: ["There are animals", " there are plants", "it is rocky planet", " there is ozone layer"], answer: 2 },
    { question: "Which of these planets is more habitable?", choices: [" 61 Virgins d", " 51 Pegasi b", "Proxima Centauri b", "Trappist-1 d"], answer: 2 },
    { question: "Choose a Neptun-like planet", choices: ["61 Virginis d", "Proxima Centauri b", "HIP 65426 b", "51 Pegasi b"], answer: 0 },
    { question: "Choose a gas-giant planet", choices: ["Trappist-1 d", "61 Virgins d", "Proxima Centauri b", "51 Pegasi b"], answer: 3 },];

document.querySelector(".final-result").style.display = "none";

document.querySelector(".choose-lang").addEventListener("click", function() {
    document.querySelector("#wrapper").style.display = "none"; // Hide start button
    document.querySelector(".quiz").style.display = "block"; // Show quiz
    loadQuestion(); // Load the first question
    updateScore(); // Initialize score display
});

document.querySelector(".submit-answer").addEventListener("click", function() {
    var selectedOption = document.querySelector('input[name="options"]:checked');
    if (selectedOption) {
        var answerIndex = parseInt(selectedOption.id.charAt(3)); // Get the index of the selected option
        answers.push(answerIndex); // Store selected answer

        if (answerIndex === HTMLquestions[countQues].answer) {
            score += 10;
        } else {
            score -= 5;
        }

        countQues++;
        updateScore();

        if (countQues < HTMLquestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer before submitting.");
    }
});

document.getElementById("restart").addEventListener("click", function() {
    location.reload();
});

function loadQuestion() {
    document.querySelector(".question").innerHTML = "<h1>" + HTMLquestions[countQues].question + "</h1>";
    for (var i = 0; i < 4; i++) {
        document.getElementById("opt" + i).value = HTMLquestions[countQues].choices[i];
        document.getElementById("lb" + i).innerHTML = HTMLquestions[countQues].choices[i];
    }
    // Clear previous selections
    document.querySelectorAll('input[name="options"]').forEach(input => {
        input.checked = false;
    });
}

function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("ques-left").textContent = "Question: " + (countQues + 1) + "/" + HTMLquestions.length;
}

function showResults() {
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".final-result").style.display = "block";
    document.querySelector(".solved-ques-no").textContent = "You solved " + HTMLquestions.length + " questions.";
    document.querySelector(".right-wrong").textContent = "You got " + (score / 10) + " right out of " + HTMLquestions.length + ".";
    document.getElementById("display-final-score").textContent = "Your final score is: " + score;
    let remark = score > 50 ? "Remark: Good Job!" : "Remark: Need to work harder.";
    document.querySelector(".remark").textContent = remark;
}