// Load existing notes from localStorage
document.addEventListener("DOMContentLoaded", function () {
    loadNotes();
});

// Function to save a note to localStorage
function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load and display notes from localStorage
function loadNotes() {
    const notesList = document.querySelector(".notes");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Clear existing notes
    notesList.innerHTML = "";

    // Display each note
    notes.forEach(function (note, index) {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.content}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        notesList.appendChild(noteDiv);
    });
}

// Handle form submission
document.getElementById("note-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;

    // Create a new note object
    const newNote = {
        title: title,
        content: content
    };

    // Save the note
    saveNote(newNote);

    // Reset the form
    document.getElementById("note-form").reset();

    // Reload notes to update the list
    loadNotes();
});

// Function to delete a note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    // Reload notes to update the list
    loadNotes();
}