const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    total_price: Joi.number().presence(presence),
    date: Joi.string().max(50).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const validateProductsOrder = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    id_product: Joi.number().integer().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const findMany = () => {
  return db.query('SELECT * FROM orders', []).then(([results]) => results);
};

const findOne = (id_order) => {
  return db
    .query('SELECT * FROM orders WHERE id_order = ?', [id_order])
    .then(([results]) => results);
};

const create = ({ total_price, date }) => {
  return db
    .query(
      'INSERT INTO orders (total_price, date) VALUES (?, ?)',
      [total_price, date]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, total_price, date };
    });
};

const createListProducts = (id_order, { id_product }) => {
  return db
    .query(
      'INSERT INTO products_orders (id_order, id_product) VALUES (?, ?)',
      [id_order, id_product]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, id_order, id_product };
    })
};

module.exports = {
  validate,
  validateProductsOrder,
  findMany,
  findOne,
  create,
  createListProducts,
};