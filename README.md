#event-registration

 Date, 2024/10/17 By Shadrack Kipkemei 

This is a single-page application that allows users to register for events, update their registrations, receive confirmation message and view details of upcoming events. The application is built using HTML, CSS, and JavaScript, and it fetches data from a local server.

Features
Event listing: Display a list of upcoming events with details like date, time, location, and description.

Register for Events: Users can register for an event by providing their name, email, phone number, and the number of attendees.

Update Registration: Users can update their existing registration details.

Dynamic Dropdowns: Event options in the registration and update forms are populated dynamically from the server.

Toggle Update Form: Users can toggle the visibility of the update registration form.

Mouseover Effects: Highlight events when hovering over them.

Registration Confirmation Messages: Show confirmation messages upon successful registration and update.

Technologies Used
1. HTML: For structuring the content.

2. CSS: For styling the application.

3. JavaScript: For interactivity and handling data.

4. JSON Server: For storing events and registrations data.

Installation
Installation Requirements Git, any code editor preferably visual studio code and a chrome browser as all code is meant to be tested in the chrome browser. Node.js and npm(Node Package Manager) installed on your machine 

Installation instruction 
1. Clone the repository: git clone https://github.com/Shadrack-Kipkemei/event-registration.git
2. Navigate to the project directory: cd event-registration
3. Install JSON Server: npm install -g json-server
4. Start JSON Server with the provided db.json: json-server --watch db.json
5. Open index.html in your browser to view the application

Project Structure
index.html: The main HTML file containing the structure of the application.

style.css: The CSS file for styling the application.

script.js: The JavaScript file containing the logic for fetching data, handling form submissions, and updating the UI.

db.json: The JSON file containing sample data for events and registrations.

JSON Server Endpoints
Events: http://localhost:3000/events

Registrations: http://localhost:3000/registrations

Code Overview
HTML
1. Forms: For registering and updating registrations.

2. Buttons: To submit forms and toggle the update form visibility.

3. Divs: To display event details and confirmation messages.

CSS
1. Styling: For layout, colors, and effects.

2. Classes: hidden class to toggle visibility.

JavaScript
1. Event Listeners: For form submissions, toggling update form, and mouseover effects.

2. Fetch API: For fetching data from JSON Server.

3. Functions: For handling form submissions, fetching data, and updating the UI.

Contributing
Feel free to submit issues, fork the repository and create pull requests. Contributions are always welcome!

Support and contact details https://github.com/Shadrack-Kipkemei

License 
The content of this project is licensed under the MIT license Copyright (c) 2024.