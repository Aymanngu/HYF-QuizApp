// Array to hold quiz questions
const quizQuestions = [];

// Form submission handler
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
