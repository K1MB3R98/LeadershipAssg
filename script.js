// JS for consolidation form submissions
const consolidationForm = document.getElementById("consolidationForm");

async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("consolidationFormStatus");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: consolidationForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            consolidationForm.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form."
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form."
    });
}
consolidationForm.addEventListener("submit", handleSubmit);

// JS fo reflection form submissions
async function handleSubmit2(event) {
    event.preventDefault();
    var status = document.getElementById("reflectionFormStatus");
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: reflectionForm.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your submission!";
            reflectionForm.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form."
                }
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form."
    });
}
reflectionForm.addEventListener("submit", handleSubmit2);

// JS for Module Quiz
// Build the quiz and display each question with it's possible answers
function createQuiz() {
    // store HTML to display in variable = empty array
    const toScreen = [];

    // loop through quiz questions array and for each question in the array do:
    quizQuestions.forEach((currentQuestion, questionNumber) => {
        // store answer options in variable = empty array
        const answerOptions = [];
        // get a question and add a radio button to each answer option from the array
        for(letter in currentQuestion.answerOptions){
            answerOptions.push(
                // create the <label>
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${currentQuestion.answerOptions[letter]}
                    <br>
                </label>`
            );
        }
        // add question and answer options to HTML to be displayed variable
        toScreen.push(
            `<div class="question"> 
                <h6>${currentQuestion.question}</h6> 
            </div>
            <div class="answerOptions"> 
                ${answerOptions.join('')} 
            </div>
            <div class="responses" id="responses"></div>`
        );
    });

    // join question and answer options parts, then display on page
    quizContainer.innerHTML = toScreen.join('');
};

// check user's answers:
    // display the feedback & overall results
function showResults() {
    // target the necessary HTML containers
    const answerContainers = quizContainer.querySelectorAll('.answerOptions');
    const responseContainers = quizContainer.querySelectorAll('.responses');

    // # of user's correct answers
    let numCorrect = 0;

    // loop through each question and check if user's answer is correct or not
    quizQuestions.forEach((currentQuestion, questionNumber) =>{
        // get current question
        const answerContainer = answerContainers[questionNumber];
      
        // check for which option was chosen
        const selector = `input[name=question${questionNumber}]:checked`;

        // error check in case of skipped question
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
 
        // Evaluate user answer choices:
        if (userAnswer === currentQuestion.correctAnswer){
            // increase # correct score
            numCorrect++;

            // color correct answer chosen mnessage
            responseContainers[questionNumber].style.color = 'darkgreen';

            // display 'correct' response message
            responseContainers[questionNumber].innerHTML = `<h5>You are correct!</h5><p>${currentQuestion.responses[userAnswer]}</p>`;

        } else if (userAnswer === undefined) {
            // if missing user answer input:
            // colour missing answer message
            responseContainers[questionNumber].style.color = 'cadetblue';

            // add decorative background
            responseContainers[questionNumber].style.backgroundColor = 'white';



            // display 'missing' response message
            responseContainers[questionNumber].innerHTML = `<h5>Whoops!</h5><p> You forgot to choose an answer!</p>`;
        } else {
            // if incorrect answer is chosen:
            // colour 'incorrect' response message
            responseContainers[questionNumber].style.color = 'maroon';

            // display 'incorrect' response message
            responseContainers[questionNumber].innerHTML = `<h5>Sorry, that is incorrect.</h5><p>${currentQuestion.responses[userAnswer]}</p>`;
        }
    });
    
    // Autoscroll to overall score and results message
    jumpToResults = document.querySelector(".results");
    jumpToResults.scrollIntoView({behaviour: "smooth"});

    // display # of correct answers + message
    if (numCorrect >= 4) {
        return resultsContainer.innerHTML = 
        `<div>
            <h5>You got ${numCorrect} out of ${quizQuestions.length} correct!</h5> <h6>You really know your leadership styles!</h6></div>`;
    } else if (numCorrect >= 2) {
        return resultsContainer.innerHTML = 
        `<div>
            <h5>You got ${numCorrect} out of ${quizQuestions.length} correct.</h5>
            <p>Not bad!</p>
        </div>`;
    } else {
        return resultsContainer.innerHTML = 
        `<div>
            <h5>You got ${numCorrect} out of ${quizQuestions.length} correct.</h5>
            <p>Please review the module materials and try the quiz again.</p>
        </div>`;
    }
};

const quizContainer = document.getElementById('questions');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const quizQuestions = [
    // Question 1:
    {
        question: '1. What is "Leadership"?',
        answerOptions: {
            a: "The art of influencing behaviour so as to achieve a goal.",
            b: "Anyone responsible for influencing human behaviour and for the achievement of a goal by a group.",
            c: "A sea-faring vessel full of leaders."
        },
        correctAnswer: "a",
        responses: {
            a: 'Although some consider it a "craft" because it is part art, part science.',
            b: "You're close, but this more accurately describes a leader rather than leadership.",
            c: "Funny, but no. 😉"
        }
    },

    // Question 2:
    {
        question: "2. According to the lesson, a person's leadership style is often influenced by:",
        answerOptions: {
            a: "Beliefs and personality",
            b: "The current situation",
            c: "All of the above",
            d: "Phase of the moon"
        },
        correctAnswer: "c",
        responses: {
            a: "There is a more correct answer.",
            b: "There is a more correct answer.",
            c: "Leadership style is influenced by a person's beliefs, personality, experiences, environment, and their current situation.",
            d: "While some do not discount the influence of celestial forces in our lives, there is a more correct answer."
        }
    },

    // Question 3:
    {
        question: '3. Which leadership style is best described by the following statement: "My way, or the highway!"',
        answerOptions: {
            a: "Free-Rein",
            b: "Democratic",
            c: "Autocratic"
        },
        correctAnswer: "c",
        responses: {
            a: "A free-rein leader would never make this sort of demand.",
            b: "A democratic leader would ask for input from their team.",
            c: "Autocratic leaders often make choices for thier teams with little to no input from their followers."
        }
    },

    // Question 4:
    {
        question: '4. A leader who says, "Do what you think is necessary", might best be described as using which style of leadership?',
        answerOptions: {
            a: "Autocratic",
            b: "Free-Rein",
            c: "Democratic"
        },
        correctAnswer: "b",
        responses: {
            a: "An autocratic leader would not let their followers choose for themselves.",
            b: "Giving followers free choice on the methods to accomplish a task is typical of the free-rein leadership style.",
            c: "Democratic leaders would give direction, but entertain suggestions for alternative methods."
        }
    },

    // Question 5:
    {
        question: "5. Which of the following is -not- an example of a leader?",
        answerOptions: {
            a: "Military Officer",
            b: "Jedi Knight",
            c: "Civil Servant",
            d: "Padawan"
        },
        correctAnswer: "d", 
        responses: {
            a: "If there is gold on the shoulder, they are a leader.",
            b: "Although they answer to the Jedi council, a Jedi Knight also has prodigies that they must lead and mentor in the ways of The Force.",
            c: "Contrary to what the name suggests, these people are considered to be leaders of the public.",
            d: "Star Wars fans will know that this the name given to young apprentices of the Jedi Knights. Padawans are followers and leaders-in-training."
        }
    }
];
// Call function to start quiz
createQuiz();

// Event Listener: When "submit" button pressed --> show responses and total correct
submitButton.addEventListener('click', showResults);