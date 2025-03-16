require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8800;

// Explicit CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Database connection
connectDB();

app.get("/", (req, res) => {
    res.send('Yes, we are good to go!');
});

// CORS preflight handling for all routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Routes
const userRouter = require('./routes/api/userRoutes');
app.use('/api', userRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is up and running on Port: ${port}`);
});
