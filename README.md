# FlashCard Learning App
This project is a full-stack application that helps users improve their memory recall using the SM2 algorithm for spaced repetition learning.

# 📂 Project Structure
- **Client** : _Built with React + Vite._
- **Server** : _Built with Node.js, Express, MongoDB._


# Client-Side Setup
Follow these steps to run the React frontend locally:

### Navigate to client folder
cd client

### Install all dependencies
npm install

### Start the development server
npm run dev
The client will typically run at:
➡️ http://localhost:5173

# Server-Side Setup
Follow these steps to run the Node.js backend locally:

### Navigate to server folder
cd server

### Install all dependencies
npm install

### Start the server
nodemon app.js
The server will typically run at:
➡️ http://localhost:5000

📚 How SM2 Algorithm is Used
The SM2 algorithm is a proven method for spaced repetition, designed to optimize learning efficiency.
_**In this application:**_
After attempting a flashcard, the user rates their recall on a scale of 0-5.

Based on the score:

- ✅ If the user scores high (good recall), the next review is scheduled further into the future.

- ⚡ If the user scores low (poor recall), the next review is scheduled sooner.

- This dynamic scheduling helps users retain information better over time without overwhelming them.

- Each card's review history is saved in the backend, and next review dates are calculated accordingly.

✨ Key Features
- 🔹 Random flashcard generation.

- 🔹 Self-scoring (0 to 5) after reviewing a card.

- 🔹 Progress tracking with an interactive progress circle.

- 🔹 Login and Logout functionality.
