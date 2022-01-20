const ordersRouter = require('./orders');
const productsRouter = require('./products');
const purchasedProductsRouter = require('./purchasedProducts');

const setupRoutes = (app) => {
  app.use('/api/products', productsRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/purchased-products', purchasedProductsRouter);
};

module.exports = {
  setupRoutes,
};