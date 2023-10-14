const express = require('express');
const app = express();
const port = 3000;

// Middleware to check if it's within working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Set up EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Apply the custom middleware for all routes
app.use(checkWorkingHours);

// Define routes for the three pages
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
