const productsRouter = require('express').Router();
const Product = require('../models/product');

productsRouter.get('/', (req, res) => {
  Product.findMany()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving products from database');
    });
});

productsRouter.get('/:id', (req, res) => {
  Product.findOne(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).send('Product not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving product from database');
    });
});

module.exports = productsRouter;