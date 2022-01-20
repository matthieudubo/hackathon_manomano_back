const ordersRouter = require('./orders');
const productsRouter = require('./products');

const setupRoutes = (app) => {
  app.use('/api/products', productsRouter);
  app.use('/api/orders', ordersRouter);
};

module.exports = {
  setupRoutes,
};