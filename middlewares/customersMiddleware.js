import joi, { func } from 'joi'
import connection from '../db.js'
import DateExtension from '@joi/date';
import res from 'express/lib/response';
const Joi = joi.extend(DateExtension);

const CPF_REGEX = /^[0-9]{11,11}$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;

const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().pattern(PHONE_REGEX).required(),
  cpf: joi.string().pattern(CPF_REGEX).required(),
  birthday: Joi.date().format('YYYY-MM-DD').required(),
});

export async function customerMiddleware() {
  const validation = customersSchema.validate(req.body)
  if (validation.error) {
    return res.sendStatus(400)
  }
  else {
    next()
  }
}

export async function updateCustomerMiddleware() {
  const validation = customersSchema.validate(req.body)
  if (validation.error) {
    return res.sendStatus(200)
  }
  else {
    next()
  }
}
