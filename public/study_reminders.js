// Load existing reminders from localStorage
document.addEventListener("DOMContentLoaded", function () {
    loadReminders();
});

// Function to save a reminder to localStorage
function saveReminder(reminder) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));
}

// Function to load reminders from localStorage and display them
function loadReminders() {
    const remindersList = document.querySelector(".reminders-list");
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

    // Clear previous list
    remindersList.innerHTML = "";

    // Display each reminder
    reminders.forEach(function (reminder) {
        const reminderDiv = document.createElement("div");
        reminderDiv.classList.add("reminder");

        reminderDiv.innerHTML = `
            <p><strong>Reminder:</strong> ${reminder.title}</p>
            <p><strong>Description:</strong> ${reminder.description}</p>
            <p><strong>Time:</strong> ${new Date(reminder.time).toLocaleString()}</p>
            <p><strong>Type:</strong> ${reminder.type}</p>
        `;

        remindersList.appendChild(reminderDiv);
    });
}

// Handle form submission
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const title = document.getElementById("reminder-title").value;
    const description = document.getElementById("reminder-description").value;
    const time = document.getElementById("reminder-time").value;
    const type = document.getElementById("reminder-type").value;

    // Create a new reminder object
    const newReminder = {
        title: title,
        description: description,
        time: time,
        type: type
    };

    // Save the reminder
    saveReminder(newReminder);

    // Clear the form
    document.querySelector("form").reset();

    // Reload reminders to update the list
    loadReminders();
});