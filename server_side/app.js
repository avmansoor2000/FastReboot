const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const app = express();
const connectDB = require('./config/db')
const {startCronJob} = require('./services/cronJob')
require('dotenv').config
const port = process.env.port

// Database Connection
connectDB()

// Initialize cron job
startCronJob(); 

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Initialize cron job
// cronJob.start();

// app.use(cors())

// Enable CORS for specific origins
app.use(cors({
    origin: 'http://localhost:2000'
  }));

  // Define routes
app.use('/',userRoutes)
app.use('/admin',adminRoutes)


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
