import connection from '../db.js'

export async function getRentals(req, res) {
  const { customerId, gameId } = req.params
  if (customerId) {
    try {
      const result = await connection.query(
        `
        SELECT *
        FROM customers
        WHERE id = {$1};
        ` [customerId]
      )
      res.send(result.rows)
    }
    catch (error) {
      res.send(error)
    }
  }
  if (gameId) {
    try {
      const result = await connection.query(
        `
        SELECT *
        FROM games
        WHERE id = {$1};
        ` [gameId]
      )
      res.send(result.rows)
    }
    catch (error) {
      res.send(error)
    }
  } else try {
    const result = await connection.query(
      `
        SELECT *
        FROM customers;
        `
    )
    res.send(result.rows)
  }
  catch (error) {
    res.send(error)
  }
};

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body
  try {
    await connection.query(
      `
      INSERT INTO rentals ("customerId", "gameId", "daysRented")
      VALUES ($1, $2, $3);
      `, [customerId, gameId, daysRented]
    )
    res.sendStatus(201)
  }
  catch (error) {
    res.send(error)
  }
};

export async function finishRentals(req, res) {

}

export async function deleteRentals(req, res) {
  const { id } = req.params
  // try {
  //   await connection.query(
  //     `
  //     DELETE * from rentals WHERE id = $1
  //     ` [id]
  //   )
  //   res.sendStatus(404)
  // }
  // catch (error) {
  //   res.send(error)
  // }
};