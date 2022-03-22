module.exports = (err, _req, res, _next) => {
  const { message } = err;
  const status = err.status || 500;
  return res.status(status).json({ message });
}; 