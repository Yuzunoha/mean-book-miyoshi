const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const msg = 'こんにちは!';
  const statusCode = 200;
  return res.status(statusCode).json(msg);
});

// ITEM function
// Create Item
// Read All Items
// Read Single Item
// Update Item
// Delete Item

// USER function
// Register User
// Login User

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
