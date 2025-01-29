document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded user credentials (for demonstration purposes only)
    const validUsername = 'user';
    const validPassword = 'password123';

    // Debugging: Log the entered credentials
    console.log('Entered Username:', username);
    console.log('Entered Password:', password);

    // Check if credentials are valid
    if (username === validUsername && password === validPassword) {
        console.log('Login successful! Redirecting to the community page...');
        window.location.href = 'community.html'; // Redirect to the community page
    } else {
        console.log('Invalid username or password.');
        document.getElementById('error-message').textContent = 'Invalid username or password.';
    }
});