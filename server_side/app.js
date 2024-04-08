const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const connectDB = require('./config/db');
const {startCronJob} = require('./services/cronJob');
require('dotenv').config
// const port = process.env.port;
const port = process.env.PORT || 3000;

// Database Connection
connectDB()

// Initialize cron job
startCronJob(); 

// Middleware to parse JSON-encoded bodies
app.use(express.json());

// Enable CORS for specific origins
app.use(cors({
    origin: 'http://localhost:5173'
  }));

  // Define routes
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
