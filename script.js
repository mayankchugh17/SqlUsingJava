const apiUrl = "http://localhost:3000/users";

function createUser() {
    const name = prompt("Enter User Name:");
    const email = prompt("Enter User Email:");

    if (!name || !email) {
        alert("Both Name and Email are required!");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => displayOutput("User Created", data))
    .catch(error => console.error("Error:", error));
}

function getUsers() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayOutput("Users List", data))
    .catch(error => console.error("Error:", error));
}

function selectUser() {
    const userId = prompt("Enter User ID to Fetch:");
    if (!userId) {
        alert("User ID is required!");
        return;
    }

    fetch(`${apiUrl}/${userId}`)
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            displayOutput("Error", data.message);
        } else {
            displayOutput("User Details", data);
        }
    })
    .catch(error => console.error("Error:", error));
}

function updateUser() {
    const userId = prompt("Enter User ID to Update:");
    if (!userId) {
        alert("User ID is required!");
        return;
    }

    const name = prompt("Enter New Name:");
    const email = prompt("Enter New Email:");

    if (!name || !email) {
        alert("Both Name and Email are required!");
        return;
    }

    fetch(`${apiUrl}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => displayOutput("User Updated", data))
    .catch(error => console.error("Error:", error));
}

function deleteUser() {
    const userId = prompt("Enter User ID to Delete:");
    if (!userId) {
        alert("User ID is required!");
        return;
    }

    fetch(`${apiUrl}/${userId}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => displayOutput("User Deleted", data))
    .catch(error => console.error("Error:", error));
}

// 🆕 Function to Display Output Properly
function displayOutput(title, data) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
}
