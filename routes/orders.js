const ordersRouter = require('express').Router();
const Order = require('../models/order');
const Product = require('../models/product');

ordersRouter.get('/', (req, res) => {
  Order.findMany()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving orders from database');
    });
});

ordersRouter.get('/:id', (req, res) => {
  Order.findOne(req.params.id)
    .then((order) => {
      if (order) {
        res.json(order);
      } else {
        res.status(404).send('Order not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving order from database');
    });
});

ordersRouter.get('/:id_order/products', (req, res) => {
  Product.findProductsFromOrder(req.params.id_order)
  .then((listProducts) => {
    if (listProducts) {
      res.json(listProducts);
    } else {
      res.status(404).send(`Products from order ${req.params.id_order} not found`);
    }
  })
  .catch((err) => {
    res.status(500).send(`Error retrieving products from order with id ${req.params.id_order} from database`);
  });
});

ordersRouter.post('/', (req, res) => {
  const error = Order.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    Order.create(req.body)
      .then((createdOrder) => {
        res.status(201).json(createdOrder);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the order');
      });
  }
});

ordersRouter.post('/:id_order/products', (req, res) => {
  const error = Order.validateProductsOrder(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    Order.createListProducts(parseInt(req.params.id_order), req.body)
      .then((createdListProducts) => {
        res.status(201).json(createdListProducts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error saving the list of products');
      })
  }
});

module.exports = ordersRouter;