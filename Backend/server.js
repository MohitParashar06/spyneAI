const express = require('express');
require(`dotenv`).config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const cors = require('cors');
const connectDB = require(`./connect`);

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true,              // Allows cookies to be sent
  };
  app.use(cors(corsOptions)); 

// mongoose.connect('mongodb://localhost:27017');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log(process.env.MONGO_URI);
    
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
  } catch (error) {
      console.log(error);
  }
}

start();

