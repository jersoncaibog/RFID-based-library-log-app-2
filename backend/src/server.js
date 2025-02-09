const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection } = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Test database connection
testConnection();

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/check-in', require('./routes/checkIns'));
app.use('/api/visits', require('./routes/visits'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
