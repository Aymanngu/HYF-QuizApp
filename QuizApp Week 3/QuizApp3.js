// Array to hold quiz questions
const quizQuestions = [];
let players = []; // Array to hold player information

// Form submission handler for quiz questions
document.getElementById('quiz-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get question and options from form
    const question = document.getElementById('question').value;
    const options = [
        { text: document.getElementById('optionA').value, isCorrect: document.querySelector('input[name="correct"][value="1"]').checked },
        { text: document.getElementById('optionB').value, isCorrect: document.querySelector('input[name="correct"][value="2"]').checked },
        { text: document.getElementById('optionC').value, isCorrect: document.querySelector('input[name="correct"][value="3"]').checked },
        { text: document.getElementById('optionD').value, isCorrect: document.querySelector('input[name="correct"][value="4"]').checked }
    ];

    // Create question object
    const quizQuestion = { question, options };

    // Add question to array
    quizQuestions.push(quizQuestion);

    // Update questions list
    updateQuestionsList();

    // Reset the form
    event.target.reset();
});

// Update questions list
const updateQuestionsList = () => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear existing list

    quizQuestions.forEach((quizQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
        questionDiv.appendChild(questionText);

        const optionsList = document.createElement('ul');
        quizQuestion.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

        // Add button to reveal correct answer
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

// Search functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredQuestions = quizQuestions.filter(quizQuestion =>
        quizQuestion.question.toLowerCase().includes(searchTerm)
    );
    displayFilteredQuestions(filteredQuestions);
});

const displayFilteredQuestions = (filteredQuestions) => {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear existing list

    filteredQuestions.forEach((quizQuestion, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${quizQuestion.question}`;
        questionDiv.appendChild(questionText);

        const optionsList = document.createElement('ul');
        quizQuestion.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionsList.appendChild(optionItem);
        });
        questionDiv.appendChild(optionsList);

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

// Add players and manage scores
document.getElementById('start-quiz-button').addEventListener('click', () => {
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value;

    if (!player1Name || !player2Name) {
        alert('Please enter names for both players.');
        return;
    }

    players = [
        { name: player1Name, score: 0 },
        { name: player2Name, score: 0 }
    ];

    updatePlayerScores();
});

const updatePlayerScores = () => {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = ''; // Clear current list

    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player-item');

        const playerName = document.createElement('p');
        playerName.textContent = `${player.name}: ${player.score} points`;
        playerDiv.appendChild(playerName);

        // Correct button
        const correctButton = document.createElement('button');
        correctButton.textContent = 'Correct';
        correctButton.addEventListener('click', () => {
            players[index].score += 1;
            updatePlayerScores();
        });

        // Wrong button
        const wrongButton = document.createElement('button');
        wrongButton.textContent = 'Wrong';
        wrongButton.addEventListener('click', () => {
            const otherPlayerIndex = index === 0 ? 1 : 0;
            players[otherPlayerIndex].score += 1;
            updatePlayerScores();
        });

        playerDiv.appendChild(correctButton);
        playerDiv.appendChild(wrongButton);

        playerList.appendChild(playerDiv);
    });
};