const express = require('express')
const app = express()
const dbConnect = require('./dbConnect')
app.use(express.json())
const port = process.env.PORT || 5000
const userRoute  = require('./routes/userRoute')
const path = require('path')


app.use('/api/user' , userRoute)
/* app.use('/api/login' , userRoute)
app.use('/api/register' , userRoute)
app.use('/api/update' , userRoute)
app.use('api/home' , userRoute)
app.use('/templates/:id' , userRoute)
app.use('api/user/profile' , userRoute)
app.use('./Template1' , userRoute)
app.use('./Template2' , userRoute)
 */

    
if ( process.env.NODE_ENV === 'production')
{
   // app.use('/', express.static("app/build"))
    // Serve static files from the "build" directory
    app.use(express.static(path.join(__dirname, 'app/build')));

    app.get("*" , (req , res) => {
        // res.sendFile(path.resolve(__dirname , "app/build/index.html"))
        res.sendFile(path.join(__dirname, 'build', 'app/build/index.html'));
    });
}

app.get('/', (req, res) => res.send('Hi'))
app.listen(port, () => console.log(`This app is listening on port ${port}!`))