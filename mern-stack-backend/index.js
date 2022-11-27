const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const msg = 'こんにちは!';
  const statusCode = 200;
  return res.status(statusCode).json(msg);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
