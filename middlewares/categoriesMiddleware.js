import joi from 'joi'
import connection from '../db.js'

const schema = joi.object({
  name: joi.string().required()
});

export async function categoriesMiddleware(req, res, next) {
  const validation = schema.validate(req.body)
  const { name } = req.body
  if (validation.error) {
    return res.sendStatus(400);
  }
  try {
    const result = await connection.query(`
        SELECT *
        FROM categories
        WHERE name= $1;`, [name]);
    if (result.rows.length > 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    res.send(err);
  }
  next();
};