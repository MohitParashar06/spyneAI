const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const cors = require('cors');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true,              // Allows cookies to be sent
  };
  app.use(cors(corsOptions)); 

mongoose.connect('mongodb://localhost:27017');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

