const mongoose =  require('mongoose')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.MONGODB_URI
mongoose
    .connect(url, {useUnifiedTopology:true , useNewUrlParser:true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) =>{
        console.error('Some problem connecting MongoDB...');
    })

const connection = mongoose.connection
connection.on('connected', ()=>{
    console.log('MongoDb connection successful')
})
connection.on('error', (error) =>{
    console.log(error)
})

// Define API routes for user authentication, data retrieval, etc.
//app.use('/api/login', require('./routes/userRoute'));

// Add more routes as needed

module.exports = mongoose