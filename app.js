const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js app this image was built using Jenkins !' });
});

app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ greeting: `Hello, ${name}!` });
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ received: data, status: 'success' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
