// Array to hold quiz questions (fetched from a JSON file)
let quizQuestions = [];
let players = []; // Array to hold player information

// Fetch quiz data from the JSON file
async function fetchQuizData() {
    try {
        // Load the JSON file using its raw URL
        const response = await fetch('https://raw.githubusercontent.com/aymanngu/aymanngu.github.io/main/data/quiz-data.json');

        // Check if the file was loaded correctly
        if (!response.ok) {
            throw new Error(`Error loading file: ${response.status}`);
        }

        // Convert the loaded data into a JavaScript object
        quizQuestions = await response.json();

        // Show the data in the console (for testing)
        console.log('Quiz data loaded:', quizQuestions);

        // Update the list of questions on the page
        updateQuestionsList();
    } catch (error) {
        // If something goes wrong, show an error in the console
        console.error('Error fetching quiz data:', error.message);

        // Show a message to the user
        alert('Could not load the quiz data. Please check the file path.');
    }
}

// Call the fetch function to initialize quiz data
fetchQuizData();

// Handle form submission to add a new quiz question
document.getElementById('quiz-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the page from refreshing

    // Get the question and options from the form inputs
    const question = document.getElementById('question').value;
    const options = [
        { text: document.getElementById('optionA').value, isCorrect: document.querySelector('input[name="correct"][value="1"]').checked },
        { text: document.getElementById('optionB').value, isCorrect: document.querySelector('input[name="correct"][value="2"]').checked },
        { text: document.getElementById('optionC').value, isCorrect: document.querySelector('input[name="correct"][value="3"]').checked },
        { text: document.getElementById('optionD').value, isCorrect: document.querySelector('input[name="correct"][value="4"]').checked }
    ];

    // Create a new quiz question object
    const quizQuestion = { question, options };

    // Add the new question to the quizQuestions array
    quizQuestions.push(quizQuestion);

    // Update the list of questions on the page
    updateQuestionsList();

    // Reset the form for new input
    event.target.reset();
});

// Display the list of quiz questions on the page
const updateQuestionsList = () => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear the existing list

    quizQuestions.forEach((quizQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item'); // Add a CSS class for styling

        // Display the question text
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
        questionDiv.appendChild(questionText);

        // Display the options as a list
        const optionsList = document.createElement('ul');
        quizQuestion.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

        // Button to reveal the correct answer
        const revealButton = document.createElement('button');
        revealButton.textContent = 'Reveal Correct Answer';
        revealButton.addEventListener('click', () => {
            const correctOptions = quizQuestion.options
                .filter(option => option.isCorrect)
                .map(option => option.text)
                .join(', ');
            alert(`Correct Answer(s): ${correctOptions}`);
        });

        questionDiv.appendChild(revealButton);
        questionsList.appendChild(questionDiv);
    });
};

// Search for questions based on user input
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Get the search term
    const filteredQuestions = quizQuestions.filter(quizQuestion =>
        quizQuestion.question.toLowerCase().includes(searchTerm) // Check if the term matches
    );
    displayFilteredQuestions(filteredQuestions); // Display the matching questions
});

// Display filtered questions based on the search
const displayFilteredQuestions = (filteredQuestions) => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear the existing list

    filteredQuestions.forEach((quizQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item'); // Add a CSS class for styling

        // Display the question text
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
        questionDiv.appendChild(questionText);

        // Display the options as a list
        const optionsList = document.createElement('ul');
        quizQuestion.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

        // Button to reveal the correct answer
        const revealButton = document.createElement('button');
        revealButton.textContent = 'Reveal Correct Answer';
        revealButton.addEventListener('click', () => {
            const correctOptions = quizQuestion.options
                .filter(option => option.isCorrect)
                .map(option => option.text)
                .join(', ');
            alert(`Correct Answer(s): ${correctOptions}`);
        });

        questionDiv.appendChild(revealButton);
        questionsList.appendChild(questionDiv);
    });
};

// Handle adding players and starting the quiz
document.getElementById('start-quiz-button').addEventListener('click', () => {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;

    if (!player1Name || !player2Name) {
        alert('Please enter names for both players.'); // Ensure both names are entered
        return;
    }

    players = [
        { name: player1Name, score: 0 },
        { name: player2Name, score: 0 }
    ];

    updatePlayerScores(); // Display the player scores
});

// Update the display of player scores
const updatePlayerScores = () => {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Clear the current list

    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-item'); // Add a CSS class for styling

        const playerName = document.createElement('p');
        playerName.textContent = `${player.name}: ${player.score} points`;
        playerDiv.appendChild(playerName);

        // Button to increment score for a correct answer
        const correctButton = document.createElement('button');
        correctButton.textContent = 'Correct';
        correctButton.addEventListener('click', () => {
            players[index].score += 1; // Increment score
            updatePlayerScores(); // Update the scores
        });

        // Button to increment score for the opponent when wrong
        const wrongButton = document.createElement('button');
        wrongButton.textContent = 'Wrong';
        wrongButton.addEventListener('click', () => {
            const otherPlayerIndex = index === 0 ? 1 : 0;
            players[otherPlayerIndex].score += 1; // Increment opponent's score
            updatePlayerScores(); // Update the scores
        });

        playerDiv.appendChild(correctButton);
        playerDiv.appendChild(wrongButton);

        playerList.appendChild(playerDiv);
    });
};
