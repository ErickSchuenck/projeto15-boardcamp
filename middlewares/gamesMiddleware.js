import joi from 'joi'
import connection from '../db.js'

const schema = joi.object({
  name: joi.string().required(),
  stockTotal: joi.number().min(1),
  pricePerDay: joi.number().min(1)
});

export async function gamesMiddleware(req, res, next) {
  const validation = schema.validate(req.body)
  if (validation.error) {
    return res.sendStatus(400);
  }
  const { categoryId, name } = req.body

  try {
    const result = await connection.query(`
        SELECT *
        FROM games
        WHERE name= $1;`, [name]);
    if (result.rows.length !== 0) {
      return res.sendStatus(409);
    }
  } catch (err) {
    res.send(err);
  }

  try {
    const result = await connection.query(`
        SELECT *
        FROM categories
        WHERE id= $1;`, [categoryId]);
    if (result.rows.length === 0) {
      return res.sendStatus(400);
    }
  } catch (err) {
    res.send(err);
  }

  next();
}
