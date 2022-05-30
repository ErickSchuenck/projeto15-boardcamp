import { query } from 'express';
import connection from '../db.js'

export async function getGames(req, res) {
  const { name } = req.query;
  if (name === undefined) {
    try {
      const result = await connection.query(
        `
        SELECT *
        FROM games;
        `
      )
      return res.send(result.rows)
    } catch (error) {
      return res.send(error)
    }
  } else try {
    const result = await connection.query(
      `
      SELECT * 
      FROM games
      WHERE name
      LIKE $1
      `, [`${name}%`]
    )
    res.send(result.rows)
  }
  catch (error) {
    res.send(error)
  }
};

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    const result = await connection.query(
      `
      INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay")
      VALUES ($1, $2, $3, $4, $5);
      ` [name, image, stockTotal, categoryId, pricePerDay]
    )
    res.sendStatus(201)
  }
  catch (error) {
    res.send(error)
  }
};