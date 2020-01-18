const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/alumni/users', require('./routes/api/alumni/users'));
app.use('/api/alumni/auth', require('./routes/api/alumni/auth'));
app.use('/api/alumni/profile', require('./routes/api/alumni/profile'));
app.use('/api/alumni/posts', require('./routes/api/alumni/posts'));

//Routes for Colleges
app.use('/api/college/colleges', require('./routes/api/college/colleges'));
// app.use("/api/college/login", require("./routes/api/college/login"));
app.use("/api/college/register", require("./routes/api/college/register"));
app.use('/api/college/authcollege', require('./routes/api/college/authcollege'));
// app.use('/api/college/authcollege', require('./routes/api/college/login'));
app.use('/api/college/profile', require('./routes/api/college/collegeprofile'));
app.use('/api/getRecommendation', require('./routes/api/recommended/getRecommended'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
