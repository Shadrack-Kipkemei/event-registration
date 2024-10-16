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
        if (updateregistrationDiv.style.display === "none" || updateregistrationDiv.style.display ==="") {
            updateregistrationDiv.style.display = "block";
        } else {
            updateregistrationDiv.style.display = "none";
        }
    })
  
 
});


// Function to fetch events
function fetchEvents() {
    fetch("http://localhost:3000/events")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
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
                    eventDiv.style.backgroundColor = "#8EC2C4"
                });
                eventDiv.addEventListener("mouseout", () => {
                    eventDiv.style.backgroundColor="#E6FFFF"
                })

                    // Creating options for the select elements
                    const option = document.createElement("option");
                    option.value = event.id;
                    option.textContent = event.name;
                    registrationSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error fetching events:", error));
}

// Function to fetch registrations for the update dropdown
function fetchRegistrations() {
    fetch("http://localhost:3000/registrations")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const updateSelect = document.getElementById("event-select-update");

            if (Array.isArray(data)) {
                data.forEach(registration => {
                    const option = document.createElement("option");
                    option.value = registration.id; 
                    option.textContent = `${registration.name} (${registration.email})`; // Display name and email
                    updateSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error fetching registrations:", error));
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

    fetch("http://localhost:3000/registrations", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("confirmation").classList.remove("hidden");
        document.getElementById("registration-form").reset();
    })
    .catch(error => console.error("Error registering for event:", error));
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

    fetch(`http://localhost:3000/registrations/${registrationId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("updateConfirmation").classList.remove("hidden");
        document.getElementById("update-form").reset();

        // Hide confirmation after a few seconds
        setTimeout(() => {
            document.getElementById("updateConfirmation").classList.add("hidden");
        }, 3000);
    })
    .catch(error => console.error("Error updating registration:", error));
}
