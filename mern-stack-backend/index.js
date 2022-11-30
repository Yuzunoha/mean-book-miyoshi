const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true })); // post用設定
app.use(express.json()); // post用設定
const connectDB = require('./utils/database');
const { ItemModel } = require('./utils/schemaModels');

// ITEM function
// Create Item
app.post('/item/create', async (req, res) => {
  let message = 'アイテム作成成功';
  try {
    await connectDB();
    await ItemModel.create(req.body);
    return res.status(200).json({ message });
  } catch (error) {
    message = 'アイテム作成失敗';
    return res.status(400).json({ message });
  }
});

// Read All Items
app.get('/', async (req, res) => {
  let message = 'アイテム読み取りAll成功';
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res.status(200).json({ message, allItems });
  } catch (error) {
    message = 'アイテム読み取りAll失敗';
    return res.status(400).json({ message });
  }
});

// Read Single Item
app.get('/item/:id', async (req, res) => {
  let message = 'アイテム読み取りSingle成功';
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    return res.status(200).json({ message, singleItem });
  } catch (error) {
    message = 'アイテム読み取りSingle失敗';
    return res.status(400).json({ message });
  }
});

// Update Item
app.put('/item/update/:id', async (req, res) => {
  let message = 'アイテム編集成功';
  try {
    await connectDB();
    const result = await ItemModel.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({ message, result });
  } catch (error) {
    message = 'アイテム編集失敗';
    return res.status(400).json({ message });
  }
});

// Delete Item

// USER function
// Register User
// Login User

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
