const mongoose =  require('mongoose')
require('dotenv').config();

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

module.exports = mongoose