const auth = async (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  const token = await req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'トークンがありません' });
  }
  try {
    // TODO
  } catch (err) {}
};

module.exports = auth;
