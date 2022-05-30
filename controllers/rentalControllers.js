import connection from '../db.js'
import dayjs from 'dayjs'

export async function getRentals(req, res) {
  const { customerId, gameId } = req.params
  let rentals;
  try {
    let query = ` 
    SELECT rentals.*, 
    customers.name AS "customerName", 
    games.name AS "gameName", 
    categories.id AS "categoryId", 
    categories.name AS "categoryName" 
    FROM rentals 
    JOIN customers ON customers.id = rentals."customerId" 
    JOIN games ON games.id = rentals."gameId" 
    JOIN categories ON games."categoryId" = categories.id
    `;


    if (customerId) {
      query += ` WHERE "customerId" = ` + customerId;
    }

    if (gameId) {
      query += ` WHERE "gameId" = ` + gameId;
    }

    const rentalsList = await connection.query(query)
    rentals = rentalsList.rows;

    const response = [];
    for (let rental of rentals) {
      rental = {
        ...rental,
        customer: {
          id: rental.customerId,
          name: rental.customerName
        },
        game: {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName
        }
      }
      delete rental.customerName;
      delete rental.gameName;
      delete rental.categoryId;
      delete rental.categoryName;
      response.push(rental);
    }
    res.json(response);
  }

  catch (error) {
    res.send(error)
  }
};

export async function postRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body
  const rentDate = dayjs(Date.now()).format('YYYY-MM-DD');
  try {
    if (daysRented < 1) return res.sendStatus(400)

    const consumer = await connection.query(`
      SELECT * FROM customers WHERE id = ${customerId}
      `);
    if (consumer.rows[0] === undefined) return res.sendStatus(400)

    const game = await connection.query(`
            SELECT * FROM games WHERE id = ${gameId}
    `);
    if (!game.rows[0]) return res.sendStatus(400);

    const rentals = await connection.query(`
            SELECT * FROM rentals WHERE "gameId" = ${game.rows[0].id}
        `);
    if (game.rows[0].stockTotal <= rentals.rows.length) return res.sendStatus(400);

    const originalPrice = daysRented * game.rows[0].pricePerDay;

    await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    res.sendStatus(201);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function finishRentals(req, res) {
  const { id } = req.params;
}

export async function deleteRentals(req, res) {
  const { id } = req.params
  try {
    await connection.query(
      `
      DELETE * from rentals WHERE id = $1
      ` [id]
    )
    res.sendStatus(200)
  }
  catch (error) {
    res.send(error)
  }
};