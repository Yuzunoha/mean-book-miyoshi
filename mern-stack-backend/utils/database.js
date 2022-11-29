// mongodb+srv://yuzunoha:<password>@cluster0.2wg6dv1.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');

const getConnectionStr = () => {
  const dbName = 'Cluster0';
  const dbUser = 'yuzunoha';
  const dbUserPass = 'hbOeS7y6tuWRwMAA';
  let connectionStr = '';
  connectionStr += `mongodb+srv://${dbUser}:${dbUserPass}@cluster0.2wg6dv1.mongodb.net/`;
  connectionStr += `${dbName}?retryWrites=true&w=majority`;
  return connectionStr;
};

const connectDB = async () => {
  const connectionStr = getConnectionStr();
  try {
    await mongoose.connect(connectionStr);
    console.log('MongoDB 接続成功 ' + connectionStr);
  } catch (err) {
    const errMsg = 'MongoDB 接続失敗' + connectionStr;
    console.log(errMsg);
    throw new Error(errMsg);
  }
};

module.exports = connectDB;
