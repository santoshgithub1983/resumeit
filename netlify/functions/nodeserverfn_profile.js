const express = require('express');
const app = express.Router(); 
const dbConnect = require('../../server/dbConnect');
const User = require('../../server/models/userModel');

app.use(express.json());
     
// Define your serverless function to handle a POST request

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

   async function updateProfileCheck(data) {
    console.log('inside updateProfileCheck fn from servefn_profile... ')
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: data._id }, data, { new: true });
        return updatedUser ? updatedUser : null;
    } catch (error) {
        throw error;
    }
  }