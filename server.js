const express = require('express');
const connectDB = require('./database/connection');
require('dotenv').config();
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// express app
const app = express();
const port = process.env.PORT || 3000;

// cors
app.use(cors(corsOptions));
// app.use(cors());

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes
app.use('/api/user/', userRoutes);
app.use('/api/workouts', workoutRoutes);

// connect to mongodb
connectDB();

// listen for requests
app.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`);
});
