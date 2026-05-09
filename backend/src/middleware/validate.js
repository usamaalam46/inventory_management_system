exports.validate = (fields) => {
  return (req, res, next) => {
    for (let f of fields) {
      if (!req.body[f]) {
        return res.status(400).json({ message: `${f} required` });
      }
    }
    next();
  };
};