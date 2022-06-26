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
            </div>`
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
    // # of user's correct answers
    let numCorrect = 0;

    // loop through each question and check if user's answeer is correct or not
    quizQuestions.forEach((currentQuestion, questionNumber) =>{
        // get current question
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        // error check in case of skipped question ^

        // if answer choice = correct
        if(userAnswer === currentQuestion.correctAnswer){
            // increase # correct score
            numCorrect++;
            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
            console.log("correctAnswer: ", currentQuestion.correctAnswer);
            console.log("user answer: ", userAnswer);

        } else {
            // if incorrect answer or missing input
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // display # of correct answers + message
    if (numCorrect >= 4) {
        return resultsContainer.innerHTML = `<div><h5>You got ${numCorrect} out of ${quizQuestions.length} correct!</h5> <h6>You really know your leadership styles!</h6></div>`;
    } else if (numCorrect >= 2) {
        return resultsContainer.innerHTML = `<div><h5>You got ${numCorrect} out of ${quizQuestions.length} correct.</h5> <p>Not bad!</p></div>`;
    } else {
        return resultsContainer.innerHTML = `<div><h5>You got ${numCorrect} out of ${quizQuestions.length} correct.</h5> <p>Please review the module materials and try the quiz again.</p></div>`,
        responseContainer.innerHTML = `<p>test of response return</p>`;
    }
};

const quizContainer = document.getElementById('questions');
const resultsContainer = document.getElementById('results');
const responseContainer = document.getElementById('responses');
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
            a: 'Correct! Although some consider it a "craft" because it is part art, part science.',
            b: "Not quite. This more accurately describes a leader rather than leadership.",
            c: "Funny, but no."
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
            a: "True, but there is a more correct answer.",
            b: "True, but there is a more correct answer.",
            c: "Correct! Leadership style is influenced by a person's beliefs, personality, experiences, environment, and their current situation.",
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
            a: "Incorrect. A free-rein leader would never demand this.",
            b: "Incorrect. A democratic leader would ask for input from their team.",
            c: "Correct! Autocratic leaders often make choices for thier teams with little to no input from their followers."
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
            a: "Incorrect. An autocratic leader would not let their followers choose for themselves.",
            b: "Correct! Giving followers free choice on the methods to accomplish a task is typical of the free-rein leadership style.",
            c: "Incorrect. Democratic leaders would give direction, but entertain suggestions for alternative methods."
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
            a: "Incorrect. If there is gold on the shoulder, they are a leader.",
            b: "Incorrect. Although they answer to the Jedi council, a Jedi Knight also has prodigies that they must lead and mentor in the ways of The Force.",
            c: "Incorrect. Contrary to what the name suggests, these people are considered to be leaders of the public.",
            d: "Correct! Star Wars fans will know that this the name given to young apprentices of the Jedi Knights. Padawans are followers and leaders-in-training."
        }
    }
];
// Call function to start quiz
createQuiz();

// Event Listener: When "submit" button pressed --> show answers and total correct
submitButton.addEventListener('click', showResults);