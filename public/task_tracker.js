document.getElementById("addTask").addEventListener("click", function() {
    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;
    const taskText = taskInput.value.trim();
    
    if (taskText === "") return;

    const taskContainer = document.getElementById("taskContainer");

    const li = document.createElement("li");
    li.innerHTML = `<span>${taskText} <small>(${deadline})</small></span>`;

    // Assign priority color
    if (priority === "high") li.classList.add("priority-high");
    else if (priority === "medium") li.classList.add("priority-medium");
    else li.classList.add("priority-low");

    // Task Actions
    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "✔";
    completeButton.style.color = "#4CAF50";
    completeButton.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.style.color = "#FFB347";
    editButton.addEventListener("click", () => {
        const newText = prompt("Edit task:", taskText);
        if (newText) li.firstChild.textContent = newText;
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "✖";
    deleteButton.style.color = "#FF6961";
    deleteButton.addEventListener("click", () => {
        taskContainer.removeChild(li);
    });

    actions.appendChild(completeButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    li.appendChild(actions);
    taskContainer.appendChild(li);

    // Clear input field
    taskInput.value = "";
});