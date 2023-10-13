// server.js (or wherever you configure your Express app)
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Define your routes here, such as userRoute
app.use('/api/user', userRoute);

// Serve static assets (React app) from the 'app/build' directory
app.use(express.static(path.join(__dirname, 'app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app/build', 'index.html'));
});

module.exports = app;