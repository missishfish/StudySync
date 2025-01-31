document.addEventListener("DOMContentLoaded", function () {
    // Questions Data
    const questions = [
        {
            title: "Why are you using StudySync?",
            options: [
                "Prepare for exams",
                "Find like-minded peers",
                "Learn new skills",
                "Overcome lack of motivation",
                "Focus on specific subjects.",
                "Other"
            ]
        },
        {
            title: "Your Primary Interests?",
            options: [
                "HighSchool",
                "Intermediate Studies",
                "Programming",
                "Artificial Intelligence",
                "Arts",
                "Others"
            ]
        },
        {
            title: "How do you prefer to study?",
            options: [
                "Alone",
                "With a group",
                "Through online courses",
                "With a tutor",
                "Reading books",
                "Watching videos"
            ]
        },
        {
            title: "Great, thank you! And where are you from? 🌎",
            input: true // Special case for country input
        }
    ];

    let currentIndex = 0;
    const progressBar = document.querySelector(".progress");
    const progressText = document.querySelector(".progress-text");
    const questionTitle = document.querySelector(".question-box h2");
    const optionsContainer = document.querySelector("#question-form");
    const buttonContainer = document.querySelector(".button-container");
    const totalQuestions = questions.length;

    function loadQuestion(index) {
        const questionData = questions[index];
        questionTitle.textContent = questionData.title;
        optionsContainer.innerHTML = ""; // Clear previous content

        if (questionData.input) {
            // Create an input field for country
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.placeholder = "Please enter your country";
            inputField.id = "country-input";
            inputField.classList.add("input-box");
            optionsContainer.appendChild(inputField);
        } else {
            // Create multiple-choice options
            questionData.options.forEach(option => {
                const label = document.createElement("label");
                label.classList.add("option");

                const input = document.createElement("input");
                input.type = "checkbox";
                input.name = "answer";
                input.value = option;

                const span = document.createElement("span");
                span.textContent = option;

                label.appendChild(input);
                label.appendChild(span);
                optionsContainer.appendChild(label);
            });
        }

        // Update progress bar and text
        progressBar.style.transition = "width 0.3s ease";
        progressBar.style.width = `${((index) / totalQuestions) * 100}%`;
        progressText.textContent = `${index} of ${totalQuestions} completed`;
    }

    document.getElementById("next").addEventListener("click", function () {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion(currentIndex);
        } else {
            // Show final welcome message
            showFinalMessage();
        }
    });

    document.getElementById("skip").addEventListener("click", function () {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            loadQuestion(currentIndex);
        } else {
            showFinalMessage();
        }
    });

    function showFinalMessage() {
        const userCountry = document.getElementById("country-input")?.value || "your country";
        questionTitle.textContent = `Perfect, nice to meet you! 😎`;
        optionsContainer.innerHTML = `<p class=\"final-message\">Welcome to Study Together! ❤️</p>`;

        // Create "Go to Community" button
        const communityButton = document.createElement("button");
        communityButton.textContent = "Go to Community";
        communityButton.classList.add("community-button");
        communityButton.addEventListener("click", function () {
            window.location.href = "communities.html"; // Redirect to the community page
        });

        // Clear existing buttons and add the new one
        buttonContainer.innerHTML = "";
        buttonContainer.appendChild(communityButton);

        // Final progress update
        progressBar.style.width = "100%";
        progressText.textContent = `${totalQuestions} of ${totalQuestions} completed`;
    }

    // **Initial progress setup: 0 of 4**
    progressBar.style.width = "0%"; 
    progressText.textContent = `0 of ${totalQuestions} completed`;

    // Load the first question on page load
    loadQuestion(currentIndex);
});
