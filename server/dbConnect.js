const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const url = process.env.MONGODB_URI;
if (!url) {
  console.error('MONGODB_URI is not set. Check your .env file.');
} else {
  mongoose
    .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Some problem connecting MongoDB...');
      console.error(error);
    });
}

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('MongoDB connection successful');
});
connection.on('error', (error) => {
  console.error(error);
});

module.exports = mongoose;
