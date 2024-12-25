// scripts.js

// Function to handle button clicks
function handleButtonClick(buttonValue) {
    console.log('Button clicked:', buttonValue);

    // You can add more logic here, for example, making an AJAX call to the server
    // sendScoreToServer(buttonValue);
}

// Utility function to get CSRF token from the cookie
function getCSRFToken() {
    let csrfToken = null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            csrfToken = cookie.substring('csrftoken='.length);
            break;
        }
    }
    return csrfToken;
}

// Function to send score to server (example with fetch API)
function sendScoreToServer(score) {
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
        console.error('CSRF token not found');
        return;
    }

    fetch('/your-score-endpoint/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ score: score }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Update UI based on response if necessary
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Set up event listeners when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons with the 'button' class and set up click event listeners
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonValue = event.target.textContent || event.target.innerText;
            handleButtonClick(buttonValue);
        });
    });

    // Example of setting up click event for a specific button with an ID
    const noRunButton = document.getElementById('no-run');
    noRunButton.addEventListener('click', function() {
        handleButtonClick('NO RUN');
    });

    // More event listeners can be added here for other interactive elements
});
