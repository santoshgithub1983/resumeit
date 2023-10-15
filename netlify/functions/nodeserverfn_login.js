const express = require('express');
const app = express.Router(); 
const dbConnect = require('../../server/dbConnect');
const User = require('../../server/models/userModel');

app.use(express.json());

// Define your serverless function to handle a POST request
exports.handler = async (event) => {
  console.log('inside login serverless handler , event found is : '+event)
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Request body is empty' }),
      };
    }

    // Parse the incoming JSON data from the request
    const data = JSON.parse(event.body);

    // Perform your authentication logic here
    const authenticatedUser = await authenticateUser(data.username, data.password);

    if (authenticatedUser) {
      // Return the authenticated user data
      return {
        statusCode: 200,
        body: JSON.stringify(authenticatedUser),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    } else {
      return {
        statusCode: 401, // Unauthorized
        body: JSON.stringify({ message: 'Authentication failed' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Internal Server Error' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  }
};

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
