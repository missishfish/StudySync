let timeLeft = 25 * 60;
let timer;
let isRunning = false;
let sessionCount = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = 
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert("Time's up! Take a break.");
                sessionCount++;
                document.getElementById("sessionCount").textContent = sessionCount;
                isRunning = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

// Mode Selection (Work, Short Break, Long Break)
document.getElementById("work").addEventListener("click", function() {
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

document.getElementById("shortBreak").addEventListener("click", function() {
    timeLeft = 5 * 60;
    updateTimerDisplay();
});

document.getElementById("longBreak").addEventListener("click", function() {
    timeLeft = 15 * 60;
    updateTimerDisplay();
});

// Button Events
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

// Initialize Display
updateTimerDisplay();