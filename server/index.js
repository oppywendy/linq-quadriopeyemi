const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mock data
const mockJourneys = require('./data/mockJourneys.json');

// Simulated user database (in-memory)
const users = [
  {
    id: 1,
    username: 'user1',
    // Hashed password for 'password123'
    password: '$2b$10$UEgPdiOHN2.b54zA99nq2eI682K2ZgCuNyFill.FacTLMelvBMH8O'
  }
];

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware to check if the user is authenticated using JWT
function isAuthenticated(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
}

// Route to authenticate and generate JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '20m' });
  res.json({ token });
});

// Helper function to apply sorting
function sortJourneys(journeys, sortBy, order = 'asc') {
  return journeys.sort((a, b) => {
    let comparison = 0;
    if (a[sortBy] < b[sortBy]) comparison = -1;
    if (a[sortBy] > b[sortBy]) comparison = 1;
    return order === 'desc' ? -comparison : comparison;
  });
}

app.get('/journeys/exchanges', isAuthenticated, (req, res) => {
  const { origin, destination, order = 'asc' } = req.query;

  // Filter journeys based on origin and destination
  const filteredJourneys = mockJourneys.filter(j => j.route[0] === origin && j.route[j.route.length - 1] === destination);

  // Sort journeys by exchanges
  const sortedJourneys = sortJourneys(filteredJourneys, 'exchanges', order);

  res.json({
    origin,
    destination,
    journeys: sortedJourneys
  });
});

app.get('/journeys/cheapest', isAuthenticated, (req, res) => {
  const { origin, destination, departure, order = 'asc' } = req.query;

  // Filter journeys based on origin and destination
  const filteredJourneys = mockJourneys.filter(j => j.route[0] === origin && j.route[j.route.length - 1] === destination);

  // Sort journeys by price
  const sortedJourneys = sortJourneys(filteredJourneys, 'price', order);

  res.json({
    origin,
    destination,
    departure,
    journeys: sortedJourneys
  });
});

app.get('/journeys/fastest', isAuthenticated, (req, res) => {
  const { origin, destination, departure, order = 'asc' } = req.query;

  // Filter journeys based on origin and destination
  const filteredJourneys = mockJourneys.filter(j => j.route[0] === origin && j.route[j.route.length - 1] === destination);

  // Sort journeys by duration
  const sortedJourneys = sortJourneys(filteredJourneys, 'duration', order);

  res.json({
    origin,
    destination,
    departure,
    journeys: sortedJourneys
  });
});

// Paginated Journeys API
app.get('/journeys', isAuthenticated, (req, res) => {
    // Default to page 1 and limit of 10 journeys per page
    const { page = 1, limit = 10 } = req.query;
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedJourneys = mockJourneys.slice(startIndex, endIndex);
  
    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalJourneys: mockJourneys.length,
      totalPages: Math.ceil(mockJourneys.length / limit),
      journeys: paginatedJourneys
    });
  });

// Start server
app.listen(port, () => {
  console.log(`Mock Journey API listening at http://localhost:${port}`);
});
