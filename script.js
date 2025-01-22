// Global variables for quiz questions and players
let quizQuestions = [];
let players = [];

// Fetch quiz data from the JSON file
async function fetchQuizData() {
    try {
        // Fetch the JSON file from the provided API URL
        const response = await fetch('https://raw.githubusercontent.com/aymanngu/aymanngu.github.io/main/data/quiz-data.json');
        if (!response.ok) throw new Error(`Error loading file: ${response.status}`);
        
        // Parse the response data as JSON
        quizQuestions = await response.json();
        console.log('Quiz data loaded:', quizQuestions);
        
        // Update the list of questions displayed on the page
        updateQuestionsList();
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        alert('Could not load the quiz data. Please check the file path.');
    }
}

// Initialize quiz data on page load
fetchQuizData();

// Display the list of quiz questions dynamically
const updateQuestionsList = () => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear the existing list

    // Loop through all quiz questions and add them to the DOM
    quizQuestions.forEach((quizQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item'); // CSS class for styling

        // Display the question text
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
        questionDiv.appendChild(questionText);

        // Display options as a list
        const optionsList = document.createElement('ul');
        quizQuestion.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

        // Button to reveal the correct answer(s)
        const revealButton = document.createElement('button');
        revealButton.textContent = 'Reveal Correct Answer';
        revealButton.addEventListener('click', () => {
            const correctOptions = quizQuestion.options
                .filter(option => option.isCorrect) // Filter correct options
                .map(option => option.text) // Extract text of correct options
                .join(', ');
            alert(`Correct Answer(s): ${correctOptions}`);
        });
        questionDiv.appendChild(revealButton);

        questionsList.appendChild(questionDiv);
    });
};

// Wait until the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add a new question via the form
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page reload

            // Retrieve input values from the form
            const question = document.getElementById('question').value;
            const options = [
                { text: document.getElementById('optionA').value, isCorrect: document.querySelector('input[name="correct"][value="1"]').checked },
                { text: document.getElementById('optionB').value, isCorrect: document.querySelector('input[name="correct"][value="2"]').checked },
                { text: document.getElementById('optionC').value, isCorrect: document.querySelector('input[name="correct"][value="3"]').checked },
                { text: document.getElementById('optionD').value, isCorrect: document.querySelector('input[name="correct"][value="4"]').checked }
            ];

            // Create a new question object and add it to the quizQuestions array
            quizQuestions.push({ question, options });

            // Update the question list display
            updateQuestionsList();

            // Reset the form inputs for new entries
            event.target.reset();
        });
    }

    // Search functionality for filtering questions
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            
            // Filter questions based on the search term
            const filteredQuestions = quizQuestions.filter(q => q.question.toLowerCase().includes(searchTerm));
            
            // Display the filtered questions
            displayFilteredQuestions(filteredQuestions);
        });
    }

    // Display filtered questions dynamically
    const displayFilteredQuestions = (filteredQuestions) => {
        const questionsList = document.getElementById('questions-list');
        questionsList.innerHTML = ''; // Clear the existing list

        filteredQuestions.forEach((quizQuestion, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-item');

            // Display the question text
            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
            questionDiv.appendChild(questionText);

            // Display options as a list
            const optionsList = document.createElement('ul');
            quizQuestion.options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.textContent = option.text;
                optionsList.appendChild(optionItem);
            });
            questionDiv.appendChild(optionsList);

            // Reveal correct answer button
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

    // Sorting functionality (alphabetical or random)
    const sortOptions = document.getElementById('sort-options');
    if (sortOptions) {
        sortOptions.addEventListener('change', () => {
            const sortOption = sortOptions.value;

            if (sortOption === 'alphabetical') {
                quizQuestions.sort((a, b) => a.question.localeCompare(b.question));
            } else if (sortOption === 'random') {
                quizQuestions.sort(() => Math.random() - 0.5);
            }

            // Update the question list display after sorting
            updateQuestionsList();
        });
    }

    // Add players and start the quiz
    const startQuizButton = document.getElementById('start-quiz-button');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', () => {
            const player1Name = document.getElementById('player1-name').value;
            const player2Name = document.getElementById('player2-name').value;

            // Validate player names
            if (!player1Name || !player2Name) {
                alert('Please enter names for both players.');
                return;
            }

            // Initialize players
            players = [
                { name: player1Name, score: 0 },
                { name: player2Name, score: 0 }
            ];

            updatePlayerScores(); // Update player scores display
        });
    }

    // Update player scores dynamically
    const updatePlayerScores = () => {
        const playerList = document.getElementById('player-list');
        playerList.innerHTML = ''; // Clear the existing list

        players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player-item');

            const playerName = document.createElement('p');
            playerName.textContent = `${player.name}: ${player.score} points`;
            playerDiv.appendChild(playerName);

            // Button to increment the player's score for a correct answer
            const correctButton = document.createElement('button');
            correctButton.textContent = 'Correct';
            correctButton.addEventListener('click', () => {
                players[index].score += 1;
                updatePlayerScores();
            });

            // Button to increment the opponent's score for a wrong answer
            const wrongButton = document.createElement('button');
            wrongButton.textContent = 'Wrong';
            wrongButton.addEventListener('click', () => {
                const opponentIndex = index === 0 ? 1 : 0;
                players[opponentIndex].score += 1;
                updatePlayerScores();
            });

            playerDiv.appendChild(correctButton);
            playerDiv.appendChild(wrongButton);

            playerList.appendChild(playerDiv);
        });
    };
});
