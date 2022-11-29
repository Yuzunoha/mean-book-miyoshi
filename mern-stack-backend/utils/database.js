// mongodb+srv://yuzunoha:<password>@cluster0.2wg6dv1.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');

const getSchema = () => {
  const dbName = 'Cluster0';
  const dbUser = 'yuzunoha';
  const dbUserPass = 'hbOeS7y6tuWRwMAA';
  let schema = '';
  schema += `mongodb+srv://${dbUser}:${dbUserPass}@cluster0.2wg6dv1.mongodb.net/`;
  schema += `${dbName}?retryWrites=true&w=majority`;
  return schema;
};

const connectDB = () => {
  const schema = getSchema();
  try {
    mongoose.connect(schema);
    console.log('MongoDB 接続成功 ' + schema);
  } catch (err) {
    const errMsg = 'MongoDB 接続失敗' + schema;
    console.log(errMsg);
    throw new Error(errMsg);
  }
};

module.exports = connectDB;
