const express = require('express');
const app = express.Router(); 
const dbConnect = require('../../server/dbConnect');
const User = require('../../server/models/userModel');

app.use(express.json());
     
// Define your serverless function to handle a POST request
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