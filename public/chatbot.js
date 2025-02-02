// Handle opening and closing the chatbot iframe
const chatToggleButton = document.getElementById('chat-toggle');
const chatbox = document.getElementById('chatbox');

chatToggleButton.addEventListener('click', () => {
    // Toggle the visibility of the chatbot iframe
    if (chatbox.style.display === 'none' || chatbox.style.display === '') {
        chatbox.style.display = 'block';  // Show the chatbox
        chatToggleButton.textContent = 'Close Chat';  // Change button text
    } else {
        chatbox.style.display = 'none';  // Hide the chatbox
        chatToggleButton.textContent = 'Chat with Haley';  // Change button text back
    }
});