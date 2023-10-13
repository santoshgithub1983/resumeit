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
    console.log('You are in serverless nodeserverfn_profile');
    res.send('Welcome to the serverless nodeserverfn_profile');
});

app.post(`${process.env.REACT_APP_API_URL}/.netlify/functions/nodeserverfn_profile`, async (req, res) => {
  console.log('inside .. app.post(/.netlify/functions/nodeserverfn_profile, async (req, res)')
  try {
      const data = req.body;
      res.header("Access-Control-Allow-Origin",`${process.env.REACT_APP_API_URL}` )
    
      const user = await User.findOne({ _id: data._id });
      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
      }
      const updatedUserData = await updateProfileCheck(data);
      if (updatedUserData) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.status(200).json(updatedUserData);
      } else {
          res.status(401).json({ message: 'Update failed' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

async function updateProfileCheck(data) {
  try {
      const updatedUser = await User.findOneAndUpdate({ _id: data._id }, data, { new: true });
      return updatedUser ? updatedUser : null;
  } catch (error) {
      throw error;
  }
}

exports.handler = async (event) => {
  console.log('inside profile exports handler for CORS')
  return new Promise((resolve, reject) => {
    cors(event, null, (err) => {
      if (err) {
        reject(err);
      }
      // Your function logic here
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'CORS-enabled function' }),
      });
    });
  });
};

exports.handler = async (event) => {
 // console.log('inside exports.handler in nodeserverfn_profile, event received is  : ' + JSON.stringify(event))
  try {
      if (event.httpMethod === 'POST') {
          if (!event.body) {
              return {
                  statusCode: 400,
                  body: JSON.stringify({ message: 'Request body is empty' }),
              };
          }

          const data = JSON.parse(event.body);
          const user = await User.findOne({ _id: data._id });
          if (!user) {
              return {
                  statusCode: 404,
                  body: JSON.stringify({ message: 'User not found' }),
              };
          }

          const updatedUserData = await updateProfileCheck(data);

          if (updatedUserData) {
              return {
                  statusCode: 200,
                  body: JSON.stringify(updatedUserData),
              };
          } else {
              return {
                  statusCode: 401,
                  body: JSON.stringify({ message: 'Update failed' }),
              };
          }
      } else {
          return {
              statusCode: 405,
              body: JSON.stringify({ message: 'Method not allowed' }),
          };
      }
  } catch (error) {
      console.error(error);
      return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' }),
      };
  }

};