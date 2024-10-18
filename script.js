document.addEventListener("DOMContentLoaded", () => {
    fetchEvents();
    fetchRegistrations(); // Fetch registrations to populate the update dropdown

    const form = document.getElementById("registration-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const eventId = document.getElementById("event-select-registration").value;
        registerForEvent(eventId);
    });

    // Add submit event listener
    const updateForm = document.getElementById("update-form");
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const registrationId = document.getElementById("event-select-update").value;
        updateRegistration(registrationId);
    });

    // Toggle to update registration details
    const toggleButton = document.getElementById("toggle-update");
    const updateregistrationDiv = document.getElementById("update-registration");

    // Add click event listener
    toggleButton.addEventListener("click", () => {
        updateregistrationDiv.style.display = (updateregistrationDiv.style.display === "none" || updateregistrationDiv.style.display === "") ? "block" : "none";
    });
});

// Fetch data from the server and handle errors
function fetchData(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error("Error fetching data:", error));
}

// Function to fetch events
function fetchEvents() {
    fetchData("http://localhost:3000/events", data => {
        const eventsContainer = document.getElementById("events");
        const registrationSelect = document.getElementById("event-select-registration");

        if (Array.isArray(data)) {
            data.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p>${event.description}</p>
                `;
                eventsContainer.appendChild(eventDiv);

                // Add mouseover event listener
                eventDiv.addEventListener("mouseover", () => {
                    eventDiv.style.backgroundColor = "#8EC2C4";
                });
                eventDiv.addEventListener("mouseout", () => {
                    eventDiv.style.backgroundColor = "#E6FFFF";
                });

                // Creating options for the select elements
                const option = document.createElement("option");
                option.value = event.id;
                option.textContent = event.name;
                registrationSelect.appendChild(option);
            });
        }
    });
}

// Function to fetch registrations for the update dropdown
function fetchRegistrations() {
    fetchData("http://localhost:3000/registrations", data => {
        const updateSelect = document.getElementById("event-select-update");

        if (Array.isArray(data)) {
            data.forEach(registration => {
                const option = document.createElement("option");
                option.value = registration.id;
                option.textContent = `${registration.name} (${registration.email})`;
                updateSelect.appendChild(option);
            });
        }
    });
}

// Function to handle form submissions (both registration and update)
function handleFormSubmission(url, method, data, formId, confirmationId) {
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(() => {
        alert(`${method === 'POST' ? 'Registration' : 'Update Registration'} successful!`);
        document.getElementById(confirmationId).classList.remove("hidden");
        document.getElementById(formId).reset();
        // Hide confirmation after a few seconds
        setTimeout(() => {
            document.getElementById(confirmationId).classList.add("hidden");
        }, 5000);
    })
    .catch(error => console.error(`Error ${method === 'POST' ? 'registering' : 'updating'} for event:`, error));
}

// Function to handle registration
function registerForEvent(eventId) {
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone-number").value,
        attendees: document.getElementById("attendees").value,
        event_id: eventId
    };

    handleFormSubmission("http://localhost:3000/registrations", 'POST', formData, "registration-form", "confirmation");
}

// Function to handle update registration
function updateRegistration(registrationId) {
    const updateData = {
        name: document.getElementById("updatename").value,
        email: document.getElementById("updateEmail").value,
        phoneNumber: document.getElementById("updatePhoneNumber").value,
        attendees: document.getElementById("updateAttendees").value,
        event_id: document.getElementById("event-select-update").value
    };

    handleFormSubmission(`http://localhost:3000/registrations/${registrationId}`, 'PUT', updateData, "update-form", "updateConfirmation");
}
