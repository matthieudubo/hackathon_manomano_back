const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    img: Joi.string().max(255).presence(presence),
    name: Joi.string().max(255).presence(presence),
    price: Joi.number().integer().presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const findMany = () => {
  return db.query('SELECT * FROM products', []).then(([results]) => results);
};

const findOne = (id_product) => {
  return db
    .query('SELECT * FROM products WHERE id_product = ?', [id_product])
    .then(([results]) => results[0]);
};

const findProductsFromOrder = (id_order) => {
  return db
    .query(
      'SELECT products.* FROM products INNER JOIN products_orders ON products.id_product = products_orders.id_product WHERE products_orders.id_order = ?',
      [id_order]
    )
    .then(([results]) => results)
}

const getMostPurchasedProducts = () => {
  return db
    .query(
      'SELECT products.*, COUNT(*) as number_ordered FROM products_orders INNER JOIN products ON products_orders.id_product = products.id_product GROUP BY products_orders.id_product ORDER BY number_ordered DESC'
    )
    .then(([results]) => results)
}

module.exports = {
  findMany,
  findOne,
  validate,
  findProductsFromOrder,
  getMostPurchasedProducts
};