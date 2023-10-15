const axios = require('axios');
const express = require('express');
const cors = require('cors');
const dbConnect = require('../../dbConnect');
const port = process.env.PORT || 8888;
const path = require('path');
const User = require('../../models/userModel');
const app = express.Router(); 

app.use(cors()); // This line enables CORS for all origins
app.use(express.json());
axios.defaults.baseURL = '/';

// Define a route for the root URL
app.get(`${process.env.REACT_APP_API_URL}/.netlify/functions/nodeserverfn_register`, (req, res) => {
    console.log('You are in serverless nodeserverfn_register');
    res.send('Welcome to the serverless nodeserverfn_register');
});

app.post(`${process.env.REACT_APP_API_URL}/.netlify/functions/nodeserverfn_register`, async (req, res) => {
  console.log('inside .. app.post(/.netlify/functions/nodeserverfn_register, async (req, res)')
  try {
      const data = req.body;
      console.log(`request body : `+req.body)
     /*  res.header("Access-Control-Allow-Origin", "*") */

        const resigsteredUser = await registerUser(data);
        console.log(`registered user data is : `+resigsteredUser)
        if (resigsteredUser) {
            console.log(`registered user data `+resigsteredUser)
            res.status(200).json(resigsteredUser); // Return authenticated user data
        } else {
            console.log(`registered user data is : `+resigsteredUser)
            res.status(401).json({ message: 'Authentication failed' }); // Unauthorized
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' }); // Internal Server Error
    }
});

async function registerUser(data) {
  console.log('inside registerUser fn... data received from REGISTER FORM is: ' + data.username + ' ' + data.password);

  // Check if username and password are provided in the request body
  if (!data.username || !data.password) {
    console.log('Both username and password are required.');
    return null; // Return null when data is missing
  }

  try {
      console.log("inside server registerUser register call");
      const newuser = new User({ username: data.username, password: data.password });
      await newuser.save();
    if (newuser._id) {
      console.log("User registered successfully with ID:", newuser._id);
      return newuser ? newuser : null;
    } else {
      console.log("User registration failed");
    }
  } catch (error) {
    console.log(error);
  }
}



exports.handler = async (event) => {
  // console.log('inside exports.handler register, event received is  : ' + JSON.stringify(event))
  try {
      if (!event.body) {
          return {
              statusCode: 400,
              body: JSON.stringify({ message: 'Request body is empty' }),
          };}

    // Parse the incoming JSON data from the request
    const data = JSON.parse(event.body);
    console.log('inside handler - data: ' + JSON.stringify(data)); // Corrected this line

    // Perform your registration logic here
    const resigsteredUser = await registerUser(data, null);

    if (resigsteredUser) {
      // Return the authenticated user data
      return {
        statusCode: 200,
        body: JSON.stringify(resigsteredUser),
      };
    } else {
      return {
      
        statusCode: 401, // Unauthorized
        body: JSON.stringify({ message: 'Authentication failed' + resigsteredUser }),
      };
    } 
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
