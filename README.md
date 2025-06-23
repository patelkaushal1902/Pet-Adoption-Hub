Pet Adoption Hub
A static website crafted with HTML, CSS, and JavaScript to connect pet adopters with shelters. This project features login-based adoption and contact forms integrated with the Formspree API to send admin email notifications with user-submitted messages, complemented by an interactive pet gallery for enhanced user engagement.
Live Demo
View Live
Features

Adoption and Contact Forms: Secure, login-based forms enable users to submit adoption requests or inquiries, with messages emailed to admins via Formspree.
Interactive Pet Gallery: Displays available pets in a responsive, visually appealing layout.
Responsive Design: Optimized for seamless usability across desktop and mobile devices.
User-Friendly Navigation: Intuitive interface for exploring shelters and pets.

Technologies Used

Frontend: HTML, CSS, JavaScript
API Integration: Formspree for email notifications
AI Tools: Grok, ChatGPT, DeepSeek, Blackbox for planning, form validation, and code optimization

About Formspree
Formspree is a third-party API service that enables static websites to handle form submissions without a backend server. In this project, Formspree processes adoption and contact form data, sending user-submitted messages directly to the admin’s email, ensuring efficient communication between adopters and shelters.
Setup Instructions

Clone the repository:git clone https://github.com/patelkaushal1902/Pet-Adoption-Hub.git


Open index.html in a web browser to view the site locally.
To enable email notifications:
Sign up at Formspree to obtain a form endpoint.
Update the form action in index.html (e.g., <form action="https://formspree.io/f/your-endpoint">).
Test form submissions to ensure emails are received.


Folder Structure

style.css: Stylesheet for responsive design and visual styling
script.js: JavaScript for form validation, login functionality, and interactivity
index.html: Homepage with adoption and contact forms

Notes

The live demo is hosted on a free domain (kingsrowcafe.rf.gd), shared for hosting purposes due to naming constraints.
Formspree handles email notifications, eliminating the need for a PHP backend.
AI tools (e.g., ChatGPT) were used to optimize JavaScript form validation and enhance development efficiency.

License
MIT License
