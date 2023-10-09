const express = require('express')
const app = express()
const cors = require('cors');
const dbConnect = require('.././server/dbConnect')
app.use(express.json())
const port = process.env.PORT || 5001
const userRoute  = require('.././server/routes/userRoute')
const path = require('path')

// Enable CORS for all routes
app.use(cors());

// Define an array of allowed origins
const allowedOrigins = [
    'https://resumeit-santoshgithub1983s-projects.vercel.app',
    'http://resumeit-santoshgithub1983-santoshgithub1983s-projects.vercel.app',
    'http://resumeit-theta.vercel.app',
    'https://resumeit-p7eeegmv6-santoshgithub1983s-projects.vercel.app',
    'https://resumeit-p7eeegmv6-santoshgithub1983s-projects.vercel.app/api/user/login',
  ];
  
  const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,POST,PATCH,OPTIONS,PUT',
    // Additional CORS options if needed
  };
  
app.use(cors(corsOptions));  

// Serve static assets (React app) from the 'app/build' directory
app.use(express.static(path.join(__dirname, 'app/build')));

app.use('/' , userRoute)
app.use('/api/user' , userRoute)
app.use('/api/login' , userRoute)
app.use('/api/user/login' , userRoute)
app.use('/api/user/register' , userRoute)
app.use('/api/user/profile' , userRoute)
app.use('/api/user/update' , userRoute)

//  if ( process.env.NODE_ENV === 'production')
//  {
//     app.use('/', express.static("app/build"))
//     // Serve static files from the "build" directory
//    // app.use(express.static(path.join(__dirname, 'resume-it/app/build')));

//     app.get("*" , (req , res) => {
//         // res.sendFile(path.resolve(__dirname , "app/build/index.html"))
//         res.sendFile(path.join(__dirname, 'app/build', 'index.html'));
//     });
//  }

app.get('/', (req, res) => res.send('Hi , you are at backend now..'))
app.listen(port, () => console.log(`This app is listening on port ${port}!`))