const axios = require('axios');
const express = require('express');
const cors = require('cors');
const dbConnect = require('../../server/dbConnect');
const port = process.env.PORT || 8888;
const path = require('path');
const User = require('../../server/models/userModel');
const app = express.Router(); 

app.use(cors()); // This line enables CORS for all origins
app.use(express.json());


// Define a route for the root URL
app.get('/', (req, res) => {
    // console.log('You are in serverless nodeserverfn_login');
    res.send('Welcome to the serverless nodeserverfn_login');
});


// Define a route for the login endpoint

app.post(`${process.env.REACT_APP_API_URL}/.netlify/functions/nodeserverfn_login`, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.options('/.netlify/functions/nodeserverfn_login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(204).send();
  });

  console.log('inside app.post - /.netlify/functions/nodeserverfn_login')
    try {
        // Handle the POST request for login here
        const data = req.body; // You can access the request body here
      
        // Perform authentication logic and return a response
        const authenticatedUser = await authenticateUser(data.username, data.password);
        if (authenticatedUser) {
           //res.header("Access-Control-Allow-Origin", "*")
           // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
           
            res.status(200).json(authenticatedUser); // Return authenticated user data

        } else {
            res.status(401).json({ message: 'Authentication failed' }); // Unauthorized
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
});
async function authenticateUser(username, password) {
    console.log('inside authenticateUser fn from servefn_login... ')
    try {
      // Implement your authentication logic here
      const result = await User.findOne({
        username: username,
        password: password,
      });
  
      // Return the user if authenticated, or null if authentication fails
      return result || null;
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error up to the caller
    }
}
exports.handler = async (event) => {
  // console.log('inside exports.handler in nodeserverfn_login, event received is  : ' + JSON.stringify(event))
  try {
      if (!event.body) {
          return {
              statusCode: 400,
              body: JSON.stringify({ message: 'Request body is empty' }),
          };}

    // Parse the incoming JSON data from the request
    const data = JSON.parse(event.body);

    // Perform your authentication logic here
    const authenticatedUser = await authenticateUser(data.username, data.password);

    if (authenticatedUser) {
      // Return the authenticated user data
      return {
        statusCode: 200,
        body: JSON.stringify(authenticatedUser),
      };
    } else {
      return {
        statusCode: 401, // Unauthorized
        body: JSON.stringify({ message: 'Authentication failed' }),
      };
    } 
  } catch (error) {
    // console.error(error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
