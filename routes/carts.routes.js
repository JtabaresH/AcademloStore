const express = require('express');

// Controllers
const {
  addProductToCart,
  updatedCartProduct,
  deleteProductFromCarById,
  purcharseCart,
} = require('../controllers/carts.controller');

// Middlewares
const {
  createCategoriesValidators,
  createProductValidators,
} = require('../middlewares/validators.middleware');

const { productExists } = require('../middlewares/products.middleware');
const { categoryExists } = require('../middlewares/categories.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const cartsRouter = express.Router();

cartsRouter.use(protectSession);
cartsRouter.post('/add-product', addProductToCart);
cartsRouter.patch('/update-cart', updatedCartProduct);
cartsRouter.delete('/:productId', deleteProductFromCarById);
cartsRouter.post('/purchase', purcharseCart);

module.exports = { cartsRouter };
