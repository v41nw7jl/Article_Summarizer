# Article_Summarizer

- **Step 1: README.md & File Structure**
- **Step 2: Required Dependencies & Installation**
- **Step 3: Code for Files**
- **Step 4: Setup DB - MongoDB**
- **Step 5: Steps to Start the Project on Codespace**

# Blog/Article Summarizer

This is a full-stack AI-powered web application built using the MERN stack (MongoDB, Express, React, Node.js) and Google AI Studio. The application allows users to paste a long article URL or text, and it generates a concise summary of the key points using Google AI Studio's PaLM (Pathways Language Model).

## Features

- **Summarize Articles**: Users can paste a URL or text to get a summary.
- **Save Summaries**: Summaries are stored in MongoDB for future reference.
- **User History**: Track user history of summarized articles.

## File Structure

blog-summarizer/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Summarizer.js
│   │   │   └── History.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
├── server/
│   ├── models/
│   │   └── Summary.js
│   ├── routes/
│   │   └── summarizer.js
│   ├── config/
│   │   └── db.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── README.md

## How to Run

1. Clone the repository.
2. Install dependencies for both client and server.
3. Set up Google AI Studio API key in `.env`.
4. Start the server and client.
5. Access the application via `http://localhost:3000`.

## Dependencies

- Node.js
- Express
- MongoDB
- React
- Google AI Studio API

## MongoDB Setup

1. **Start MongoDB**:
```bash
sudo mongod --auth --dbpath /data/db
```

2. **Connect to MongoDB**:
```bash
mongosh
```

3. **Create Database and User**:
```javascript
use article_summarizer_db
db.createUser({
  user: "admin",
  pwd: "password",
  roles: ["readWrite", "dbAdmin"]
})
```

4. **Verify Connection**:
```bash
mongosh mongodb://admin:password@localhost:27017/article_summarizer_db

5. **Connect with the admin user:**:
```bash
mongosh -u admin -p your_password --authenticationDatabase admin