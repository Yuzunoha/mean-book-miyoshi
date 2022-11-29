const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true })); // post用設定
app.use(express.json()); // post用設定
const connectDB = require('./utils/database');

app.get('/', (req, res) => {
  const msg = 'こんにちは!';
  const statusCode = 200;
  return res.status(statusCode).json(msg);
});

// ITEM function
// Create Item
app.post('/item/create', (req, res) => {
  connectDB();
  const { body } = req;
  console.log({ body });
  return res.status(200).json('こんにちは');
});

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
