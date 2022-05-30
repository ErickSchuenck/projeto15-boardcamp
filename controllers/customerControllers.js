import connection from '../db.js'

export async function getCustomers(req, res) {
  if (Object.keys(req.query).length === 0) {
    try {
      const result = await connection.query(
        `
      SELECT * FROM customers;
      `
      )
      res.send(result.rows)
    }
    catch (error) {
      res.send(error)
    }
  } else try {
    const { cpf } = req.query;
    const result = await connection.query(
      `
      SELECT * FROM customers WHERE cpf LIKE $1%;
      `, [cpf]
    )
    res.send(result.rows)
  }
  catch (error) {
    res.send(error)
  }
};

export async function getCustomersById(req, res) {
  const { id } = req.params;
  try {
    const result = await connection.query(
      `
      SELECT * FROM customers WHERE id = $1;
      `, [id]
    )
    res.send(result.rows[0])
  }
  catch (error) {
    res.send(error)
  }
};

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  console.log('entrou2')
  try {
    await connection.query(
      `
      INSERT INTO customers ("name", "phone", "cpf", "birthday")
      VALUES ($1, $2, $3, $4); 
      `, [name, phone, cpf, birthday]
    )
    res.sendStatus(201)
  }
  catch (error) {
    console.log('entrou3')
    res.send(error)
  }
};

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query(
      `
      UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5 
      ` [name, phone, cpf, birthday, id]
    )
    res.sendStatus(200)
  }
  catch (error) {
    res.send(error)
  }
};