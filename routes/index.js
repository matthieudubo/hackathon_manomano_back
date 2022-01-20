const productsRouter = require('./products');

const setupRoutes = (app) => {
  app.use('/api/products', productsRouter);
};

module.exports = {
  setupRoutes,
};