import connection from '../db.js'

export async function getRentals(req, res) {
  if (req.params) {
    try {
      await connection.query(
        `
        `
      )
      res.send()
    }
    catch (error) {
      res.send(error)
    }
  }
};

export async function postRentals(req, res) {
};