export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const formatted = error.errors.map((e) => e.message).join(", ");
    res.status(400).json({ message: formatted });
  }
};
