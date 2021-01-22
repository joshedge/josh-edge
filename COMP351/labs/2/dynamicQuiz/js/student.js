let allQuestions = [];
let numberOfQuestions = 0;
let currentQuestion = 1;
let score = 0;
let studentAnswers = [];
let currentScore = 0;

const beginQuizElement = document.getElementById('beginButton')
beginQuizElement.addEventListener('click', quizStart)

const questionContainerELement = document.getElementById('questionContainer')

const nextButtonElement = document.getElementById('nextButton')
nextButtonElement.addEventListener('click', nextQuestion)

const submitButtonElement = document.getElementById('submitButton')
submitButtonElement.addEventListener('click', endQuiz)

const resultsButtonElement = document.getElementById('resultsButton')
resultsButtonElement.addEventListener('click', viewResults)

const backButtonElement = document.getElementById('backButton')
const exitButtonElement = document.getElementById('exitButton')
const endOfQuizElement = document.getElementById('endOfQuiz')

const questionElement = document.getElementById('question')
const answer1Element = document.getElementById('answer1')
const answer2Element = document.getElementById('answer2')
const answer3Element = document.getElementById('answer3')
const answer4Element = document.getElementById('answer4')
let radio1Element = document.getElementById("radioButton1");
let radio2Element = document.getElementById("radioButton2");
let radio3Element = document.getElementById("radioButton3");
let radio4Element = document.getElementById("radioButton4");

const resultNextButtonElement = document.getElementById("resultNextButton")
resultNextButtonElement.addEventListener('click', nextResult)

const resultContainerElement = document.getElementById("resultContainer")
const resultQuestionElement = document.getElementById("resultQuestion")
const resultCurrentScoreElement = document.getElementById("resultCurrentScore")
const resultAnswerStatusElement = document.getElementById("resultAnswerStatus")
const resultQuestionContentElement = document.getElementById("resultQuestionContent")
const result1Element = document.getElementById('result1')
const result2Element = document.getElementById('result2')
const result3Element = document.getElementById('result3')
const result4Element = document.getElementById('result4')



function quizStart() {
    if(localStorage.getItem("storedQuestions")==null || localStorage.getItem("storedNumberOfQuestions")==null){
        window.alert("No existing local questions saved. Please create quiz questions before attempting to take the quiz.")
    }
    else {
        retrieveStorage()
        beginQuizElement.classList.add('hide')
        backButtonElement.classList.add('hide')
        exitButtonElement.classList.remove('hide')
        questionContainerELement.classList.remove('hide')
        displayQuestion()
    }
}

function retrieveStorage() {
    if(localStorage.getItem("storedQuestions")==null || localStorage.getItem("storedNumberOfQuestions")==null){
       window.alert("No existing local questions saved. If this is expected, carry on.")
    }
    else {
        let storedQuestions = localStorage.getItem("storedQuestions");
        let numOfQ = localStorage.getItem("storedNumberOfQuestions")
        allQuestions = JSON.parse(storedQuestions);
        numberOfQuestions = JSON.parse(numOfQ);
    }
}

function displayQuestion() {
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion + " out of " + numberOfQuestions;
    questionElement.innerHTML = allQuestions[currentQuestion-1].question;
    answer1Element.innerHTML = allQuestions[currentQuestion-1].answer1;
    answer2Element.innerHTML = allQuestions[currentQuestion-1].answer2;
    answer3Element.innerHTML = allQuestions[currentQuestion-1].answer3;
    answer4Element.innerHTML = allQuestions[currentQuestion-1].answer4;
    radio1Element.checked = false;
    radio2Element.checked = false;
    radio3Element.checked = false;
    radio4Element.checked = false;
}

function nextQuestion(){
    saveAnswer()
    currentQuestion++;
    if(currentQuestion < numberOfQuestions){
        displayQuestion()
    }
    if(currentQuestion == numberOfQuestions) {
        displayQuestion()
        nextButtonElement.classList.add('hide2')
    }
}

function saveAnswer(){
    let chosen = getRadioValue()
    studentAnswers[currentQuestion-1] = chosen;
    if (chosen == allQuestions[currentQuestion-1].correctAnswer){
        score++;
    }
}

function getRadioValue() {
    let radioAnswers = document.getElementsByName('answers');
      
    for(i = 0; i < 4; i++) { 
        if(radioAnswers[i].checked) 
            return i+1;
    } 
}

function endQuiz(){
    if (confirm('Are you sure you wish to save and submit the quiz?')) {
        saveAnswer()
        questionContainerELement.classList.add('hide')
        resultsButtonElement.classList.remove('hide')
        endOfQuizElement.innerHTML = "Quiz Completed.<br><br>Final score: " + score + " out of " + numberOfQuestions;
    }
}

function viewResults(){
    resultContainerElement.classList.remove('hide')
    resultsButtonElement.classList.add('hide')
    endOfQuizElement.innerHTML = ""
    currentQuestion=0;
    nextResult()
}

function nextResult(){
    currentQuestion++;
    console.log(studentAnswers[currentQuestion-1])
    let corrAnswer = allQuestions[currentQuestion-1].correctAnswer;
    let givenAnswer = studentAnswers[currentQuestion-1];
    resultQuestionElement.innerHTML = "Question " + currentQuestion + " out of " + numberOfQuestions;
    if(givenAnswer == corrAnswer){
        resultAnswerStatusElement.innerHTML = "Correct";
        currentScore++;
    }
    else {
        resultAnswerStatusElement.innerHTML = "Incorrect";
    }
    setNextQuestion()
    printResultQuestions()
    if(currentQuestion < numberOfQuestions){
        resultCurrentScoreElement.innerHTML = "Current Score: " + currentScore + " out of " + currentQuestion;
    }
    else {
        resultCurrentScoreElement.innerHTML = "Final Score: " + currentScore + " out of " + currentQuestion;
        resultNextButtonElement.classList.add('hide')
    }
    resultColor(corrAnswer, givenAnswer);
}

function setNextQuestion(){
    resultQuestionContentElement.innerHTML = allQuestions[currentQuestion-1].question;
}

function printResultQuestions(){
    result1Element.innerHTML = allQuestions[currentQuestion-1].answer1;
    result2Element.innerHTML = allQuestions[currentQuestion-1].answer2;
    result3Element.innerHTML = allQuestions[currentQuestion-1].answer3;
    result4Element.innerHTML = allQuestions[currentQuestion-1].answer4;
}

function resultColor(ans, given){
    resetColor();
    if(ans == 1){
        greenify(result1Element);
    }
    if(given == 1 && given != ans){
        redify(result1Element);
    }
    if(ans == 2){
        greenify(result2Element);
    }
    if(given == 2 && given != ans){
        redify(result2Element);
    }
    if(ans == 3){
        greenify(result3Element);
    }
    if(given == 3 && given != ans){
        redify(result3Element);
    }
    if(ans == 4){
        greenify(result4Element);
    }
    if(given == 4 && given != ans){
        redify(result4Element);
    }

}

function resetColor(){
    result1Element.style.color = "white";
    result2Element.style.color = "white";
    result3Element.style.color = "white";
    result4Element.style.color = "white";
}

function greenify(element){
    element.style.color = "#33cc33";
}

function redify(element){
    element.style.color = "#ff1a1a";
}