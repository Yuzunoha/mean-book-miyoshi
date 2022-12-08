const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true })); // post用設定
app.use(express.json()); // post用設定
const jwt = require('jsonwebtoken');
const connectDB = require('./utils/database');
const { ItemModel, UserModel } = require('./utils/schemaModels');
const secret_key = 'mern-market';

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
app.delete('/item/delete/:id', async (req, res) => {
  let message = 'アイテム削除成功';
  try {
    await connectDB();
    const result = await ItemModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message, result });
  } catch (error) {
    message = 'アイテム削除失敗';
    return res.status(400).json({ message });
  }
});

// USER function
// Register User
app.post('/user/register', async (req, res) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: 'ユーザ登録成功' });
  } catch (error) {
    return res.status(400).json({ message: 'ユーザ登録失敗' });
  }
});
// Login User
app.post('/user/login', async (req, res) => {
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: req.body.email });
    if (savedUserData) {
      /* ユーザがいる */
      if (savedUserData.password === req.body.password) {
        /* パスワードが正しい */
        // jwt発行
        const payload = { email: req.body.email };
        const token = jwt.sign(payload, secret_key, { expiresIn: '23h' });
        return res.status(200).json({ message: 'ログイン成功', token });
      }
    }
  } catch (error) {}
  return res.status(400).json({ message: 'ログイン失敗' });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
