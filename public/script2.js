// Registration Form Submission
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.getElementById('gender').value;
    const id = document.getElementById('id').value; // This will be the file input
    const idFile = document.getElementById('id').files[0]; // Get the uploaded file

    // Use API to verify gender based on the provided ID
    verifyGenderWithAPI(id, function(isFemale) {
        if (isFemale) {
            // Proceed with registration
            console.log('Registration successful for:', username, email);
            // Here you would typically send the registration data to your server for processing
            // Redirect to login page or show success message
        } else {
            document.getElementById('register-error-message').textContent = 'Verification failed. Only female users can register.';
        }
    });

    // If it's a normal ID and they uploaded a PDF
    if (idFile && idFile.type === "application/pdf") {
        document.getElementById('register-error-message').textContent = 'Your registration will be verified in 2-3 days.';
        // Here you would typically send the registration data to your server for processing
        console.log('Registration submitted for verification:', username, email);
    } else {
        document.getElementById('register-error-message').textContent = 'Please upload a valid PDF of your college/school ID.';
    }
});

// Function to verify gender using an API
function verifyGenderWithAPI(collegeID, callback) {
    // Example API call (replace with actual API endpoint and logic)
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.gender-api.com/get?name=${collegeID}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns a field 'gender' that can be 'female' or 'male'
            if (data.gender === 'female') {
                callback(true);
            } else {
                callback(false);
            }
        })
        .catch(error => {
            console.error('Error verifying gender:', error);
            callback(false); // Handle error case
        });
}

// Login Form Submission

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("Error: 'loginForm' not found in the DOM.");
        return;
    }

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded user credentials (for demonstration purposes only)
    const validUsername = 'user';
    const validPassword = 'password123';

    // Check if credentials are valid
    if (username === validUsername && password === validPassword) {
        //console.log('Login successful! Redirecting to the community page...');
        //window.location.href = '/community.html'; // Redirect to the community page
        console.log('Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'register.html'; // Redirect after a short delay
        }, 500);
    } else {
        console.log('Invalid username or password.');
        document.getElementById('error-message').textContent = 'Invalid username or password.';
    }
});
})
