Output Link : https://agentanalytics.netlify.app/



Product Management Web Application:

This project is a simple web application built with React, Redux, React Router, and Axios for API calls. It allows users to manage a list of products, view details of individual products, create new products, and update existing ones.

Setup Instructions:

Follow these steps to set up and run the project locally:

Prerequisites
1.Node.js installed on your machine
2.npm (Node Package Manager) or yarn installed

Installation:
1.Clone the repository:
git clone <repository-url>
cd <projectName>

2.Install dependencies:
npm install
 or
yarn install

Running the Application:

1.Start the JSON Server (Mock API):

This project uses json-server to mock a REST API for product data. Make sure to start the JSON Server first.

npm run server
 or
yarn server

The server will start at http://localhost:3001 by default.

2.Start the React application

Open a new terminal and run the React application:

npm start
 or
yarn start

The React development server will start at http://localhost:3000 and open in your default web browser.

Usage:
Navigate to http://localhost:3000 to view the Product List page.
Click on a product to view its details.
Use the navigation buttons and links to create new products, edit existing ones, and navigate between pages.
The application provides basic error handling and loading states.

Additional Notes:
Ensure the json-server is running whenever you want to use the application, as it provides the mock API endpoints (http://localhost:3001/products).
The project structure follows a modular approach, with components and Redux slices organized for clarity and maintainability.
Customize the project as per your specific requirements and expand functionality as needed.

