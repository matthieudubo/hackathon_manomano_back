const purchasedProductsRouter = require('express').Router();
const Product = require('../models/product');

purchasedProductsRouter.get('/', (req, res) => {
  Product.getMostPurchasedProducts()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving most purchased products from database');
    });
});

module.exports = purchasedProductsRouter;