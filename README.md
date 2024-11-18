# FinTrack - Full Stack Application with Next.js & Python Flask

This repository contains a full-stack web application with a **Next.js** frontend and a **Flask** backend using **SQLite** for data storage. The application is designed to demonstrate how to integrate a modern React-based frontend with a Python-based API.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Backend Setup (Flask)](#backend-setup-flask)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This application showcases a simple full-stack setup with a **Next.js** frontend (React) that communicates with a **Flask** backend to handle database interactions using **SQLite**. The frontend is responsible for the user interface, while the backend provides RESTful API endpoints for handling data.

## Technologies

- **Frontend**: Next.js, React
- **Backend**: Flask, SQLite
- **Database**: SQLite (for local development)
- **Environment**: Node.js (for frontend), Python (for backend)

## Frontend Setup (Next.js)

1. Clone this repository:
   `git clone https://github.com/your-username/repository-name.git`

2. Navigate to the frontend directory:
   `cd frontend`

3. Install dependencies:
   `npm install`

4. Run the development server:
   `npm run dev`

   Your Next.js app will be available at `http://localhost:3000`.

## Backend Setup (Flask)

1. Navigate to the backend directory:
   `cd backend`

2. Create a virtual environment:
   `python3 -m venv venv`

3. Activate the virtual environment:
   - On macOS/Linux:
     `source venv/bin/activate`
     
   - On Windows:
     `.\venv\Scripts\activate`

4. Install dependencies:
   `pip install -r requirements.txt`

5. Set up the SQLite database:
   `python setup_db.py`

6. Run the Flask server:
   `python main.py`

   The backend API will be available at `http://127.0.0.1`.

## Running the Application

After setting up both the frontend and backend, you can start both servers:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://127.0.0.1`

Make sure the frontend is properly communicating with the backend API.

## API Endpoints

Here are the available API endpoints in the Flask backend:

- `GET /transactions` — Retrieve all transactions.
- `GET /balance` — Retrieve balance.
- `POST /transactions` — Create a new transaction.
- `PATCH /transactions/<id>` — Update a transaction.
- `DELETE /transactions/<id>` — Delete a transaction.

Example of calling the `GET` endpoint from the frontend:

```javascript
fetch('http://127.0.0.1/transactions')
  .then(response => response.json())
  .then(data => console.log(data));
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.
