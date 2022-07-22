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
const { cartExists } = require('../middlewares/carts.middleware');
const { productExists } = require('../middlewares/products.middleware');
const { categoryExists } = require('../middlewares/categories.middleware');

const { protectSession } = require('../middlewares/auth.middleware');

const cartsRouter = express.Router();

cartsRouter.use(protectSession);
cartsRouter.post('/add-product', cartExists, productExists, addProductToCart);
cartsRouter.patch('/update-cart', updatedCartProduct);
cartsRouter.delete('/:productId', deleteProductFromCarById);
cartsRouter.post('/purchase', purcharseCart);

module.exports = { cartsRouter };
