const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true })); // post用設定
app.use(express.json()); // post用設定
const { jwt, auth, secret_key } = require('./utils/auth');
const connectDB = require('./utils/database');
const { ItemModel, UserModel } = require('./utils/schemaModels');

// ITEM function
// Create Item
app.post('/item/create', auth, async (req, res) => {
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
app.put('/item/update/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email === req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: 'アイテム編集成功' });
    }
  } catch (error) {}
  return res.status(400).json({ message: 'アイテム編集失敗' });
});

// Delete Item
app.delete('/item/delete/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: 'アイテム削除成功' });
    }
  } catch (error) {}
  return res.status(400).json({ message: 'アイテム削除失敗' });
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

app.get('/test', async (req, res) => {
  // await connectDB();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbTQiLCJpYXQiOjE2NzEyOTg5MzAsImV4cCI6MTY3MTM4MTczMH0.ZtUq8MS0CaKriekWlbDyd6Lj1pECz40TDHecQ-hCBm8';
  const decoded = jwt.verify(token, secret_key);
  const msg = '123あいう';
  return res.json({ msg, decoded });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
