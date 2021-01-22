let allQuestions = []
let numberOfQuestions = 0;
let currentQuestion = 0;

const beginButtonElement = document.getElementById('beginButton')
beginButtonElement.addEventListener('click', startQuiz)
const questionEditorElement = document.getElementById('questionEditor')

const addButtonElement = document.getElementById('addButton')
addButtonElement.addEventListener('click', addQuestion)

const saveButtonElement = document.getElementById('saveButton')
saveButtonElement.addEventListener('click', saveQuestion)

const deleteButtonElement = document.getElementById('deleteButton')
deleteButtonElement.addEventListener('click', deleteQuestion)

const prevQuestionButtonElement = document.getElementById('prevQuestionButton')
prevQuestionButtonElement.addEventListener('click', prevQuestion)

const nextQuestionButtonElement = document.getElementById('nextQuestionButton')
nextQuestionButtonElement.addEventListener('click', nextQuestion)

let questionInputElement = document.getElementById("questionInput");
let answer1Element = document.getElementById("answer1");
let answer2Element = document.getElementById("answer2");
let answer3Element = document.getElementById("answer3");
let answer4Element = document.getElementById("answer4");
let questionCurrentNumberElement = document.getElementById("questionCurrentNumber");
let radio1Element = document.getElementById("radioButton1");
let radio2Element = document.getElementById("radioButton2");
let radio3Element = document.getElementById("radioButton3");
let radio4Element = document.getElementById("radioButton4");

function startQuiz(){
    beginButtonElement.classList.add('hide')
    retrieveStorage()
    addQuestion()
    questionEditorElement.classList.remove('hide')
}

function retrieveStorage() {
    if(localStorage.getItem("storedQuestions")==null || localStorage.getItem("storedNumberOfQuestions")==null){
       window.alert("No existing local questions saved. If this is expected, carry on.")
    }
    else {
        let storedQuestions = localStorage.getItem("storedQuestions");
        let numOfQ = localStorage.getItem("storedNumberOfQuestions")
        //console.log(storedQuestions); //for testing
        allQuestions = JSON.parse(storedQuestions);
        numberOfQuestions = JSON.parse(numOfQ);
    }
}

function addQuestion(){
    numberOfQuestions++;
    currentQuestion = numberOfQuestions;
    clearFields()
    pushQuestion()
}

function saveQuestion(){
    let question = document.getElementById("questionInput").value
    let answer1 = document.getElementById("answer1").value
    let answer2 = document.getElementById("answer2").value
    let answer3 = document.getElementById("answer3").value
    let answer4 = document.getElementById("answer4").value
    let correctAnswer = getRadioValue()

    allQuestions[currentQuestion-1].question = question;
    allQuestions[currentQuestion-1].answer1 = answer1;
    allQuestions[currentQuestion-1].answer2 = answer2;
    allQuestions[currentQuestion-1].answer3 = answer3;
    allQuestions[currentQuestion-1].answer4 = answer4;
    allQuestions[currentQuestion-1].correctAnswer = correctAnswer;
    localStorage.setItem("storedQuestions", JSON.stringify(allQuestions));
    localStorage.setItem("storedNumberOfQuestions", JSON.stringify(numberOfQuestions));
}

function pushQuestion(){
    allQuestions.push({
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: ""
    });
}

function getRadioValue() {
    let radioAnswers = document.getElementsByName('answers');
      
    for(i = 0; i < 4; i++) { 
        if(radioAnswers[i].checked) 
            return i+1;
    } 
}

function printAnswer(){
    questionInputElement.value = allQuestions[currentQuestion-1].question;
    answer1Element.value = allQuestions[currentQuestion-1].answer1;
    answer2Element.value = allQuestions[currentQuestion-1].answer2;
    answer3Element.value = allQuestions[currentQuestion-1].answer3;
    answer4Element.value = allQuestions[currentQuestion-1].answer4;
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion;
    let x = allQuestions[currentQuestion-1].correctAnswer;
    radio1Element.checked = false;
    radio2Element.checked = false;
    radio3Element.checked = false;
    radio4Element.checked = false;
    if(x==1){
        radio1Element.checked = true;
    }
    if(x==2){
        radio2Element.checked = true;
    }
    if(x==3){
        radio3Element.checked = true;
    }
    if(x==4){
        radio4Element.checked = true;
    }
}

function clearFields(){
    questionInputElement.value = "";
    answer1Element.value = "";
    answer2Element.value = "";
    answer3Element.value = "";
    answer4Element.value = "";
    document.getElementById("questionCurrentNumber").innerHTML = "Question " + currentQuestion;
    radio1Element.checked = false;
    radio2Element.checked = false;
    radio3Element.checked = false;
    radio4Element.checked = false;
}

function nextQuestion(){
    if(currentQuestion < numberOfQuestions){
        currentQuestion++;
        printAnswer();
    }
    else{
        window.alert("No subsequent questions!")
    }
}

function prevQuestion(){
    if(currentQuestion > 1){
        currentQuestion--;
        printAnswer();
    }
    else {
        window.alert("No prior questions!")
    }
}

function deleteQuestion(){
    if (confirm('Are you sure you want to delete the current question?')) {
        currentQuestion--;
        numberOfQuestions--;
        allQuestions.splice(currentQuestion,1);
        printAnswer();
        localStorage.setItem("storedQuestions", JSON.stringify(allQuestions));
        localStorage.setItem("storedNumberOfQuestions", JSON.stringify(numberOfQuestions));
    }
}
