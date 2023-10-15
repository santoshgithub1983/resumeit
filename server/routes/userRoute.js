const express = require('express')
const User = require('../models/userModel')
const app = express.Router()

 app.post("/login" , async(req, res) => {
    try { 
        console.log("inside server userRoute login call")
        const result = await User.findOne({
            username: req.body.username,  
            password: req.body.password,
        });

        if (result) {
            res.send(result)

        } else {
            res.status(400).json('Login Failed');
        }
    } catch (error){
        res.status(400).json(error)
    }
}); 
 

 app.post("/register" , async(req, res) => {
    try{
       console.log("inside server userRoute register call")
       const newuser = new User(req.body)
       await newuser.save()
       res.send('Registration Successful')
    } catch (error){
        res.status(400).json(error)
    }
}); 

app.post('/update', async(req, res) => {
    try{
        console.log("inside server userRoute update call")
            await User.findOneAndUpdate({ _id : req.body._id} , req.body)
            const user = await User.findOne({_id : req.body._id})
            res.send(user) 
    } catch (error){
        res.status(400).json(error)
    }
});

module.exports = app