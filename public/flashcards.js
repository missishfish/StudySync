// Flashcards array to store flashcards
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Function to save a flashcard
function saveFlashcard(event) {
    event.preventDefault();
    
    const term = document.getElementById('term').value;
    const definition = document.getElementById('definition').value;
    
    const flashcard = {
        term: term,
        definition: definition
    };
    
    // Add the new flashcard to the array
    flashcards.push(flashcard);
    
    // Save flashcards back to localStorage
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    
    // Clear the form
    document.getElementById('flashcardForm').reset();
    
    // Display the flashcards
    displayFlashcards();
}

// Function to display flashcards
function displayFlashcards() {
    const flashcardsDisplay = document.getElementById('flashcardsDisplay');
    flashcardsDisplay.innerHTML = ''; // Clear existing flashcards
    
    // Loop through each flashcard and display it
    flashcards.forEach((flashcard) => {
        const flashcardDiv = document.createElement('div');
        flashcardDiv.classList.add('flashcard');
        
        flashcardDiv.innerHTML = `
            <h3>${flashcard.term}</h3>
            <p class="definition">${flashcard.definition}</p>
        `;
        
        flashcardDiv.onclick = function() {
            const definition = flashcardDiv.querySelector('.definition');
            definition.style.display = definition.style.display === 'none' ? 'block' : 'none';
        };
        
        flashcardsDisplay.appendChild(flashcardDiv);
    });
}

// Display all flashcards on page load
window.onload = displayFlashcards;

// Add event listener to the flashcards form
document.getElementById('flashcardForm').addEventListener('submit', saveFlashcard);